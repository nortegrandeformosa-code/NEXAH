(() => {
  const STREAM_URL = "https://ice4.somafm.com/groovesalad-128-mp3";

  const rdsItems = [
    { track: "Formosa despierta", agent: "CURAH", block: "NOTICIAS" },
    { track: "Corte Banco Formosa", agent: "LINA", block: "SPOT" },
    { track: "Señal en movimiento", agent: "KIRO", block: "MÚSICA" },
    { track: "Clima NEA 14 hs", agent: "CURAH", block: "SERVICIO" },
    { track: "Nexus cobranza — bloque 2", agent: "MAZCLIN", block: "OPERACIÓN" },
  ];

  const stations = [
    "PROMPT",
    "IDEA",
    "VALIDACIÓN",
    "COMPOSICIÓN",
    "MASTER",
    "PLAYLIST",
    "ANTENA",
    "AIRE",
  ];

  const shapes = ["glyph", "note", "staff", "disc", "wave", "phones"];

  const audio = document.getElementById("stream");
  const playBtn = document.getElementById("playBtn");
  const playHero = document.getElementById("playHero");
  const onair = document.getElementById("onair");
  const rdsEl = document.getElementById("rdsLine");
  const nowTrack = document.getElementById("nowTrack");
  const nowAgent = document.getElementById("nowAgent");
  const nowBlock = document.getElementById("nowBlock");
  const edu = document.getElementById("edu");
  const token = document.getElementById("token");
  const tokenIcon = document.getElementById("tokenIcon");
  const pipeStatus = document.getElementById("pipeStatus");
  const steps = [...document.querySelectorAll(".step")];
  const canvas = document.getElementById("net");

  let rdsIndex = 0;
  let playing = false;
  let unlocked = false;

  function setRds(i) {
    const item = rdsItems[i % rdsItems.length];
    rdsEl.innerHTML = `<b>${item.track}</b> · <em>${item.agent}</em> · ${item.block}`;
    nowTrack.textContent = item.track;
    nowAgent.textContent = item.agent;
    nowBlock.textContent = item.block;
  }

  setRds(0);
  setInterval(() => {
    rdsIndex += 1;
    setRds(rdsIndex);
  }, 7000);

  function setPlaying(on) {
    playing = on;
    document.body.classList.toggle("is-playing", on);
    playBtn.classList.toggle("on", on);
    playBtn.textContent = on ? "PAUSA" : "PLAY";
    playHero.textContent = on ? "EN REPRODUCCIÓN" : "ESCUCHAR AHORA";
  }

  function markOnAir(ok, label) {
    onair.classList.toggle("down", !ok);
    onair.lastElementChild.textContent = label;
  }

  async function togglePlay() {
    if (!audio.src) audio.src = STREAM_URL;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
        return;
      }
      await audio.play();
      setPlaying(true);
      markOnAir(true, "EN AIRE");
      unlocked = true;
      edu.classList.add("open");
    } catch (err) {
      markOnAir(false, "SEÑAL CAÍDA");
      setPlaying(false);
      audio.removeAttribute("src");
    }
  }

  audio.addEventListener("error", () => {
    markOnAir(false, "SEÑAL CAÍDA");
    setPlaying(false);
  });
  audio.addEventListener("stalled", () => markOnAir(false, "REINTENTO"));
  audio.addEventListener("playing", () => markOnAir(true, "EN AIRE"));

  playBtn.addEventListener("click", togglePlay);
  playHero.addEventListener("click", togglePlay);

  const pipeToggle = document.getElementById("pipeToggle");
  const pipeBox = document.querySelector(".pipeline");
  pipeToggle.addEventListener("click", () => {
    const on = pipeBox.classList.toggle("collapsed");
    pipeToggle.textContent = on ? "MAX" : "MIN";
  });

  const ctx = canvas.getContext("2d");
  const nodes = Array.from({ length: 28 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
  }));

  function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener("resize", resize);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function drawNet() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    nodes.forEach((n) => {
      if (!reduce) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }
    });
    ctx.lineWidth = 1 * devicePixelRatio;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 0.22) {
          ctx.strokeStyle = `rgba(0,168,255,${(0.22 - d) * 1.4})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
          ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
          ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.fillStyle = "#28c4ff";
      ctx.beginPath();
      ctx.arc(n.x * w, n.y * h, 2.2 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduce) requestAnimationFrame(drawNet);
  }
  drawNet();

  const pts = [
    [18, 28],
    [92, 28],
    [166, 28],
    [250, 28],
    [250, 84],
    [166, 84],
    [92, 140],
    [18, 140],
  ];

  function icon(inner) {
    return `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">${inner}</svg>`;
  }
  const icons = {
    glyph: icon('<text x="12" y="16" text-anchor="middle" font-size="13" fill="currentColor">¶</text>'),
    note: icon('<path d="M10 6v10a3 3 0 1 1-1.5-2.6V8l8-2v8A3 3 0 1 1 15 11V4l-5 2z" fill="currentColor"/>'),
    staff: icon('<path d="M4 7h16M4 11h16M4 15h16M8 5v14M16 5v14" stroke="currentColor" fill="none" stroke-width="1.6"/>'),
    disc: icon('<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2" fill="currentColor"/>'),
    wave: icon('<path d="M3 12c2-6 4 6 6 0s4 6 6 0 4 6 6 0" fill="none" stroke="currentColor" stroke-width="1.8"/>'),
    phones: icon('<path d="M5 13a7 7 0 0 1 14 0v4h-3v-4a4 4 0 0 0-8 0v4H5v-4z" fill="currentColor"/>'),
  };

  let t = 0;
  let stage = 0;
  let rejecting = false;
  let shape = 0;

  function placeToken(index, lerp) {
    const a = pts[index];
    const b = pts[(index + 1) % pts.length];
    const x = a[0] + (b[0] - a[0]) * lerp;
    const y = a[1] + (b[1] - a[1]) * lerp;
    token.style.left = `${(x / 296) * 100}%`;
    token.style.top = `${(y / 168) * 100}%`;
  }

  function paintStage(index, reject) {
    steps.forEach((el, i) => {
      el.classList.toggle("active", i === index);
      el.classList.toggle("reject", reject && i === 2);
    });
    token.classList.toggle("reject", reject);
    tokenIcon.innerHTML = icons[shapes[shape % shapes.length]];
    pipeStatus.textContent = reject ? "RECHAZO → REWRITE" : stations[index];
  }

  function tickPipe(ts) {
    if (!tickPipe.t0) tickPipe.t0 = ts;
    const dt = Math.min(32, ts - tickPipe.t0);
    tickPipe.t0 = ts;

    if (!reduce) t += dt * 0.00022;
    if (t >= 1) {
      t = 0;
      if (stage === 2 && !rejecting && Math.random() < 0.45) {
        rejecting = true;
        stage = 1;
        shape = 1;
        paintStage(2, true);
      } else {
        rejecting = false;
        stage = (stage + 1) % 8;
        shape = Math.min(5, Math.floor((stage / 7) * 5));
        paintStage(stage, false);
      }
    }
    placeToken(stage, t);
    requestAnimationFrame(tickPipe);
  }

  paintStage(0, false);
  placeToken(0, 0);
  requestAnimationFrame(tickPipe);
})();
