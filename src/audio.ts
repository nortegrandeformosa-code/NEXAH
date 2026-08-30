import { CHART, currentShow, type Track } from "./data";

/* ============================================================
   NEXAH ENGINE — motor de señal generativa (WebAudio)
   Sintetiza en tiempo real la "señal" de la radio y expone
   un analyser para los visualizadores + store de emisión.
   ============================================================ */

export interface BroadcastState {
  playing: boolean;
  track: Track;
  showName: string;
  showId: string;
  volume: number;
  muted: boolean;
}

type Sub = () => void;

const BPM = 96;
const SIXTEENTH = 60 / BPM / 4;
const PROG: number[][] = [
  [45, 48, 52, 55], // Am7
  [41, 45, 48, 52], // Fmaj7
  [48, 52, 55, 59], // Cmaj7
  [43, 47, 50, 53], // G7
];
const ARP16 = [0, 2, 1, 3, 0, 2, 3, 1, 0, 2, 1, 3, 2, 0, 3, 1];
const BASS_STEPS = [0, 3, 6, 8, 11, 14];

const m2f = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

class NexaEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private delaySend: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private freq: Uint8Array<ArrayBuffer> | null = null;
  private timer: number | null = null;
  private step = 0;
  private bar = 0;
  private nextTime = 0;
  private fadeTimer: number | null = null;

  private subs = new Set<Sub>();

  state: BroadcastState = (() => {
    const show = currentShow(new Date());
    return {
      playing: false,
      track: CHART[0],
      showName: show.name,
      showId: show.id,
      volume: 0.7,
      muted: false,
    };
  })();

  subscribe(fn: Sub) {
    this.subs.add(fn);
    return () => {
      this.subs.delete(fn);
    };
  }
  private emit() {
    this.subs.forEach((f) => f());
  }

  /* ---------------- infraestructura ---------------- */
  private ensure() {
    if (this.ctx) return;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 5;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.82;

    master.connect(comp);
    comp.connect(analyser);
    analyser.connect(ctx.destination);

    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = SIXTEENTH * 3;
    const fb = ctx.createGain();
    fb.gain.value = 0.36;
    const damp = ctx.createBiquadFilter();
    damp.type = "lowpass";
    damp.frequency.value = 2600;
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    const send = ctx.createGain();
    send.gain.value = 1;

    send.connect(delay);
    delay.connect(damp);
    damp.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(master);

    const len = Math.floor(ctx.sampleRate * 0.5);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    this.master = master;
    this.analyser = analyser;
    this.delaySend = send;
    this.noiseBuf = buf;
    this.freq = new Uint8Array(analyser.frequencyBinCount);
  }

  /* ---------------- transporte ---------------- */
  toggle() {
    if (this.state.playing) this.stop();
    else this.start();
  }

  start() {
    this.ensure();
    const ctx = this.ctx!;
    if (ctx.state === "suspended") void ctx.resume();
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
    this.step = 0;
    this.bar = 0;
    this.nextTime = ctx.currentTime + 0.08;
    const t = ctx.currentTime;
    this.master!.gain.cancelScheduledValues(t);
    this.master!.gain.setTargetAtTime(this.state.muted ? 0 : this.state.volume, t, 0.08);
    if (this.timer) clearInterval(this.timer);
    this.timer = window.setInterval(() => this.schedule(), 30);
    this.state = { ...this.state, playing: true };
    this.emit();
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const ctx = this.ctx;
    if (ctx && this.master) {
      const t = ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(0, t, 0.05);
      this.fadeTimer = window.setTimeout(() => {
        if (!this.state.playing && this.ctx && this.ctx.state === "running") {
          void this.ctx.suspend();
        }
      }, 300);
    }
    this.state = { ...this.state, playing: false };
    this.emit();
  }

  setVolume(v: number) {
    this.state = { ...this.state, volume: v, muted: v === 0 ? this.state.muted : false };
    if (this.ctx && this.master && this.state.playing) {
      this.master.gain.setTargetAtTime(this.state.muted ? 0 : v, this.ctx.currentTime, 0.03);
    }
    this.emit();
  }

  setMuted(m: boolean) {
    this.state = { ...this.state, muted: m };
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(m ? 0 : this.state.volume, this.ctx.currentTime, 0.03);
    }
    this.emit();
  }

  tune(track: Track, opts?: { play?: boolean }) {
    const show = currentShow(new Date());
    this.state = { ...this.state, track, showName: show.name, showId: show.id };
    this.emit();
    if (opts?.play && !this.state.playing) this.start();
  }

  /* ---------------- secuenciador ---------------- */
  private schedule() {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + 0.18) {
      this.playStep(this.step % 16, this.nextTime);
      this.nextTime += SIXTEENTH;
      this.step++;
      if (this.step % 16 === 0) this.bar++;
    }
  }

  private chord() {
    return PROG[this.bar % 4];
  }

  private tone(
    type: OscillatorType,
    midi: number,
    t: number,
    dur: number,
    peak: number,
    opts: { lp?: number; attack?: number; send?: number; detune?: number } = {}
  ) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = m2f(midi);
    if (opts.detune) osc.detune.value = opts.detune;
    const g = ctx.createGain();
    const atk = opts.attack ?? 0.006;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node: AudioNode = osc;
    if (opts.lp) {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = opts.lp;
      osc.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(this.master!);
    if (opts.send && this.delaySend) {
      const sg = ctx.createGain();
      sg.gain.value = opts.send;
      g.connect(sg);
      sg.connect(this.delaySend);
    }
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }

  private noise(t: number, dur: number, peak: number, filter: { type: BiquadFilterType; freq: number }) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf!;
    const f = ctx.createBiquadFilter();
    f.type = filter.type;
    f.frequency.value = filter.freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master!);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.11);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.85, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    osc.connect(g);
    g.connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  private playStep(s: number, t: number) {
    const chord = this.chord();

    // pad al inicio del compás
    if (s === 0) {
      const dur = SIXTEENTH * 16;
      [1, 2, 3].forEach((i) => {
        this.tone("sawtooth", chord[i], t, dur, 0.035, { lp: 820, attack: 0.7, detune: -7 });
        this.tone("sawtooth", chord[i], t, dur, 0.035, { lp: 820, attack: 0.7, detune: 7 });
      });
      this.tone("triangle", chord[0] - 12, t, dur, 0.06, { lp: 400, attack: 0.5 });
    }

    // bajo
    if (BASS_STEPS.includes(s)) {
      const oct = s >= 8 ? 0 : 0;
      this.tone("sawtooth", chord[0] - 12 + oct, t, SIXTEENTH * 2.2, 0.3, { lp: 300, attack: 0.004 });
      this.tone("square", chord[0] - 12, t, SIXTEENTH * 1.6, 0.08, { lp: 220 });
    }

    // batería
    if (s % 4 === 0) this.kick(t);
    if (s === 4 || s === 12) this.noise(t, 0.12, 0.2, { type: "bandpass", freq: 1900 });
    if (s === 2 || s === 6 || s === 10 || s === 14) this.noise(t, 0.045, 0.14, { type: "highpass", freq: 7600 });
    if (s === 15) this.noise(t, 0.14, 0.1, { type: "highpass", freq: 6800 });

    // arpegio
    const arpNote = chord[ARP16[s]] + 12 + (s === 7 ? 12 : 0);
    this.tone("square", arpNote, t, SIXTEENTH * 1.4, 0.085, { lp: 2600, send: 0.55 });
    if (s % 4 === 2) this.tone("triangle", arpNote + 12, t, SIXTEENTH * 2, 0.05, { lp: 3200, send: 0.4 });
  }

  /* ---------------- visualizador ---------------- */
  getLevels(n: number): number[] {
    const out: number[] = new Array(n).fill(0);
    if (this.state.playing && this.analyser && this.freq) {
      this.analyser.getByteFrequencyData(this.freq);
      const bins = this.freq.length;
      for (let i = 0; i < n; i++) {
        const a = Math.floor(Math.pow(i / n, 1.6) * (bins * 0.72)) + 2;
        const b = Math.max(a + 1, Math.floor(Math.pow((i + 1) / n, 1.6) * (bins * 0.72)) + 2);
        let sum = 0;
        for (let j = a; j < b && j < bins; j++) sum += this.freq[j];
        out[i] = Math.min(1, (sum / (b - a) / 255) * 1.35);
      }
      return out;
    }
    // señal en reposo (simulada)
    const now = performance.now();
    for (let i = 0; i < n; i++) {
      const v =
        0.1 +
        0.09 * Math.sin(now / 900 + i * 0.85) +
        0.06 * Math.sin(now / 340 + i * 1.9) +
        0.03 * Math.sin(now / 150 + i * 3.1);
      out[i] = Math.max(0.03, Math.min(0.34, v + 0.12));
    }
    return out;
  }
}

export const engine = new NexaEngine();
