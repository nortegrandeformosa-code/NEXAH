(() => {
  const D = window.NEXAH;
  const PINCH_MIN = D.pinchMinMs || 5 * 60 * 1000;
  const PINCH_MAX = D.pinchMaxMs || 9 * 60 * 1000;

  const engine = {
    playing: false,
    ducked: false,
    busy: false,
    ctx: null,
    srcNode: null,
    musicGain: null,
    voiceGain: null,
    master: null,
    analyser: null,
    timer: null,
    lastPisa: 0,
    nextPisaAt: 0,
    peak: 0,
    peakAt: 0,
    layer: "music"
  };

  function $(id) { return document.getElementById(id); }

  function nowAR() {
    return new Date().toLocaleString("es-AR", {
      timeZone: D.tz, hour: "2-digit", minute: "2-digit", hour12: true
    }).replace(".", "").replace("  ", " ");
  }

  function hourAR() {
    return Number(new Date().toLocaleString("en-GB", {
      timeZone: D.tz, hour: "2-digit", hour12: false
    }));
  }

  function currentShow() {
    const h = hourAR();
    return D.dayparts.find((p) => h >= p.from && h < p.to) || D.dayparts[0];
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function gapMs() {
    return PINCH_MIN + Math.floor(Math.random() * (PINCH_MAX - PINCH_MIN + 1));
  }

  function bootAudio() {
    const audio = $("stream");
    if (!audio || engine.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    engine.ctx = new AC();
    engine.srcNode = engine.ctx.createMediaElementSource(audio);
    engine.musicGain = engine.ctx.createGain();
    engine.voiceGain = engine.ctx.createGain();
    engine.master = engine.ctx.createGain();
    engine.analyser = engine.ctx.createAnalyser();
    engine.analyser.fftSize = 256;
    engine.analyser.smoothingTimeConstant = 0.72;
    engine.srcNode.connect(engine.musicGain);
    engine.musicGain.connect(engine.master);
    engine.voiceGain.connect(engine.master);
    engine.master.connect(engine.analyser);
    engine.analyser.connect(engine.ctx.destination);
    engine.musicGain.gain.value = 1;
    engine.voiceGain.gain.value = 1;
    engine.master.gain.value = 1;
  }

  function duck(on) {
    if (!engine.musicGain) return;
    engine.ducked = on;
    engine.layer = on ? "voice" : "music";
    const t = engine.ctx.currentTime;
    const ms = (D.duckMs || 180) / 1000;
    engine.musicGain.gain.cancelScheduledValues(t);
    engine.musicGain.gain.linearRampToValueAtTime(on ? (D.duckLevel || 0.16) : 1, t + ms);
  }

  function speak(text) {
    if (!window.speechSynthesis) return Promise.resolve();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-AR";
      u.rate = 1.02;
      const voices = speechSynthesis.getVoices();
      const es = voices.find((v) => /es-AR|es_AR|es-MX|es-ES|Spanish/i.test(v.lang + v.name));
      if (es) u.voice = es;
      u.onend = resolve;
      u.onerror = resolve;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    });
  }

  function armNextPinch(fromNow) {
    clearTimeout(engine.timer);
    const wait = fromNow == null ? gapMs() : fromNow;
    engine.nextPisaAt = Date.now() + wait;
    engine.timer = setTimeout(() => {
      if (!engine.playing) return;
      pickAndFire();
    }, wait);
  }

  function pickAndFire() {
    if (!engine.playing || engine.busy) {
      armNextPinch();
      return;
    }
    const roll = Math.random();
    if (roll < 0.78) firePisador();
    else {
      const s = D.spots[Math.floor(Math.random() * D.spots.length)];
      firePisador(s.line);
    }
  }

  async function firePisador(custom) {
    if (!engine.playing) return;
    if (engine.busy) return;
    engine.busy = true;
    engine.lastPisa = Date.now();
    const line = custom || D.pisadores[Math.floor(Math.random() * D.pisadores.length)];
    document.body.classList.add("on-drop");
    setText("dropLine", line);
    duck(true);
    await speak(line);
    duck(false);
    document.body.classList.remove("on-drop");
    setText("dropLine", "");
    engine.busy = false;
    engine.layer = "music";
    armNextPinch();
  }

  async function play() {
    const audio = $("stream");
    if (!audio) return;
    bootAudio();
    if (engine.ctx && engine.ctx.state === "suspended") await engine.ctx.resume();
    if (!audio.src) audio.src = D.stream;
    try {
      await audio.play();
      engine.playing = true;
      document.body.classList.add("is-live");
      document.querySelectorAll("[data-play-label]").forEach((b) => { b.textContent = "PAUSA"; });
      setText("airState", "EN AIRE");
      if (Date.now() - engine.lastPisa > PINCH_MIN) {
        setTimeout(() => firePisador(D.pisadores[0]), 1600);
      } else {
        armNextPinch();
      }
    } catch (err) {
      audio.src = D.streamFallback;
      try {
        await audio.play();
        engine.playing = true;
        document.body.classList.add("is-live");
        setText("airState", "EN AIRE");
        if (Date.now() - engine.lastPisa > PINCH_MIN) {
          setTimeout(() => firePisador(D.pisadores[0]), 1600);
        } else {
          armNextPinch();
        }
      } catch (e2) {
        setText("airState", "SEÑAL CAÍDA");
        engine.playing = false;
      }
    }
  }

  function pause() {
    const audio = $("stream");
    if (audio) audio.pause();
    engine.playing = false;
    engine.busy = false;
    clearTimeout(engine.timer);
    document.body.classList.remove("is-live", "on-drop");
    document.querySelectorAll("[data-play-label]").forEach((b) => { b.textContent = "ESCUCHAR"; });
    setText("airState", "LISTA");
    setText("dropLine", "");
    if (engine.musicGain && engine.ctx) {
      engine.musicGain.gain.cancelScheduledValues(engine.ctx.currentTime);
      engine.musicGain.gain.value = 1;
    }
    speechSynthesis && speechSynthesis.cancel();
  }

  function toggle() {
    if (engine.playing) pause();
    else play();
  }

  function drawSpectrum(canvas, freq) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const n = freq.length, bar = w / n;
    for (let i = 0; i < n; i += 1) {
      const v = freq[i] / 255;
      ctx.fillStyle = v > 0.82 ? "#ff2e91" : v > 0.5 ? "#62f6ff" : "#2ee6a6";
      ctx.fillRect(i * bar, h - v * h, Math.max(1, bar - 1), v * h);
    }
  }

  function drawScope(canvas, wave) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#62f6ff";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i < wave.length; i += 1) {
      const x = (i / (wave.length - 1)) * w;
      const y = (1 - wave[i] / 255) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function tickMeters() {
    if (!engine.analyser) return;
    const freq = new Uint8Array(engine.analyser.frequencyBinCount);
    const wave = new Uint8Array(engine.analyser.fftSize);
    engine.analyser.getByteFrequencyData(freq);
    engine.analyser.getByteTimeDomainData(wave);
    let sum = 0, peak = 0;
    for (let i = 0; i < wave.length; i += 1) {
      const v = (wave[i] - 128) / 128;
      sum += v * v;
      peak = Math.max(peak, Math.abs(v));
    }
    const rms = Math.sqrt(sum / wave.length);
    const db = rms > 0.0001 ? 20 * Math.log10(rms) : -60;
    if (peak >= engine.peak || Date.now() - engine.peakAt > 1400) {
      engine.peak = peak;
      engine.peakAt = Date.now();
    }
    const peakDb = engine.peak > 0.0001 ? 20 * Math.log10(engine.peak) : -60;
    setText("lvlDb", (db > -60 ? db.toFixed(1) : "-∞") + " dB");
    setText("peakDb", (peakDb > -60 ? peakDb.toFixed(1) : "-∞") + " PK");
    const clip = document.getElementById("clipLed");
    if (clip) clip.classList.toggle("on", peak > 0.92);
    if ($("vu")) drawSpectrum($("vu"), freq);
    if ($("vuMaster")) drawSpectrum($("vuMaster"), freq);
    if ($("vuScope")) drawScope($("vuScope"), wave);
    document.querySelectorAll("#faders .bar b").forEach((el, i) => {
      const idx = Math.min(freq.length - 1, Math.floor(i * freq.length / 18));
      el.style.height = Math.round((freq[idx] / 255) * 100) + "%";
    });
  }

  function clockLoop() {
    setText("clock", nowAR());
    const show = currentShow();
    setText("showName", show.title);
    setText("showHost", show.host);
    setText("showRange", show.range);
    tickMeters();
    requestAnimationFrame(clockLoop);
  }

  window.NexahEngine = {
    play, pause, toggle, firePisador, currentShow, nowAR, hourAR, setText, engine
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-play]");
    if (btn) toggle();
    const drop = e.target.closest("[data-drop]");
    if (drop) firePisador(drop.getAttribute("data-drop"));
  });

  clockLoop();
})();
