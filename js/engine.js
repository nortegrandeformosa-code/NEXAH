(() => {
  const D = window.NEXAH;
  const engine = { playing: false, ducked: false, ctx: null, srcNode: null, gain: null, analyser: null, timer: null, lastPisa: 0 };
  function $(id) { return document.getElementById(id); }
  function nowAR() {
    return new Date().toLocaleString("es-AR", { timeZone: D.tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  }
  function hourAR() {
    return Number(new Date().toLocaleString("en-GB", { timeZone: D.tz, hour: "2-digit", hour12: false }));
  }
  function currentShow() {
    const h = hourAR();
    return D.dayparts.find((p) => h >= p.from && h < p.to) || D.dayparts[0];
  }
  function setText(id, text) { const el = $(id); if (el) el.textContent = text; }
  function bootAudio() {
    const audio = $("stream");
    if (!audio || engine.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    engine.ctx = new AC();
    engine.srcNode = engine.ctx.createMediaElementSource(audio);
    engine.gain = engine.ctx.createGain();
    engine.analyser = engine.ctx.createAnalyser();
    engine.analyser.fftSize = 64;
    engine.srcNode.connect(engine.gain);
    engine.gain.connect(engine.analyser);
    engine.analyser.connect(engine.ctx.destination);
    engine.gain.gain.value = 1;
  }
  function duck(on) {
    if (!engine.gain) return;
    engine.ducked = on;
    engine.gain.gain.cancelScheduledValues(engine.ctx.currentTime);
    engine.gain.gain.linearRampToValueAtTime(on ? 0.18 : 1, engine.ctx.currentTime + 0.18);
  }
  function speak(text) {
    if (!window.speechSynthesis) return Promise.resolve();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-AR"; u.rate = 1.02; u.pitch = 1;
      const voices = speechSynthesis.getVoices();
      const es = voices.find((v) => /es-AR|es_AR|es-MX|es-ES|Spanish/i.test(v.lang + v.name));
      if (es) u.voice = es;
      u.onend = resolve; u.onerror = resolve;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    });
  }
  async function firePisador(custom) {
    if (!engine.playing) return;
    const line = custom || D.pisadores[Math.floor(Math.random() * D.pisadores.length)];
    engine.lastPisa = Date.now();
    document.body.classList.add("on-drop");
    setText("dropLine", line);
    duck(true);
    await speak(line);
    duck(false);
    document.body.classList.remove("on-drop");
    setText("dropLine", "");
  }
  function scheduleDrops() {
    clearInterval(engine.timer);
    engine.timer = setInterval(() => {
      if (!engine.playing) return;
      if (Date.now() - engine.lastPisa < 90000) return;
      const roll = Math.random();
      if (roll < 0.55) firePisador();
      else if (roll < 0.72) firePisador(D.spots[Math.floor(Math.random() * D.spots.length)].line);
    }, 28000);
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
      scheduleDrops();
      if (Date.now() - engine.lastPisa > 4000) setTimeout(() => firePisador(D.pisadores[0]), 1200);
    } catch (err) {
      audio.src = D.streamFallback;
      try {
        await audio.play();
        engine.playing = true;
        document.body.classList.add("is-live");
        setText("airState", "EN AIRE");
        scheduleDrops();
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
    document.body.classList.remove("is-live");
    document.querySelectorAll("[data-play-label]").forEach((b) => { b.textContent = "ESCUCHAR"; });
    setText("airState", "LISTA");
    speechSynthesis && speechSynthesis.cancel();
  }
  function toggle() { if (engine.playing) pause(); else play(); }
  function tickMeters() {
    const canvas = $("vu");
    if (!canvas || !engine.analyser) return;
    const ctx = canvas.getContext("2d");
    const n = engine.analyser.frequencyBinCount;
    const data = new Uint8Array(n);
    engine.analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bar = canvas.width / n;
    for (let i = 0; i < n; i += 1) {
      const v = data[i] / 255;
      ctx.fillStyle = v > 0.78 ? "#FF4D5E" : v > 0.45 ? "#00A8FF" : "#00E59B";
      ctx.fillRect(i * bar, canvas.height - v * canvas.height, bar - 1, v * canvas.height);
    }
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
  window.NexahEngine = { play, pause, toggle, firePisador, currentShow, nowAR, hourAR, setText, engine };
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-play]");
    if (btn) toggle();
    const drop = e.target.closest("[data-drop]");
    if (drop) firePisador(drop.getAttribute("data-drop"));
  });
  clockLoop();
})();
