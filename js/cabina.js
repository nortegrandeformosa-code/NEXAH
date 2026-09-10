(() => {
  const D = window.NEXAH;
  const E = window.NexahEngine;
  const logEl = document.getElementById("log");
  const onNow = E.currentShow();
  function log(line) {
    logEl.insertAdjacentHTML("afterbegin", "<div>[" + E.nowAR() + "] " + line + "</div>");
  }
  document.getElementById("agents").innerHTML = D.agents.map((a) => {
    const on = a.name === onNow.host || a.name === "Diego" || a.name === "Kiro";
    return '<article class="agent' + (on ? " on" : "") + '"><code class="mono">' + a.desk +
      '</code><h4>' + a.name + '</h4><p>' + a.job + '</p></article>';
  }).join("");
  const queue = [
    { who: "Vero", kind: "SERVICIO", title: "Clima Formosa" },
    { who: "Pablo", kind: "MÚSICA", title: D.tracks[0] },
    { who: "Sofi", kind: "SPOT", title: D.spots[0].title },
    { who: "Pablo", kind: "MÚSICA", title: D.tracks[2] },
    { who: "Diego", kind: "QA", title: "Validación de corte" }
  ];
  document.getElementById("queue").innerHTML = queue.map((q) =>
    '<li class="card" style="padding:10px"><div class="tag mono">' + q.who + " · " + q.kind +
    "</div><strong>" + q.title + "</strong></li>"
  ).join("");
  document.getElementById("inv").innerHTML = D.spots.map((s) =>
    '<article class="card" style="margin-bottom:8px;padding:10px"><div class="tag mono">' + s.dur +
    "</div><strong>" + s.title + "</strong></article>"
  ).join("");
  async function weather() {
    try {
      const u = "https://api.open-meteo.com/v1/forecast?latitude=-26.1849&longitude=-58.1731&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FBuenos_Aires";
      const j = await (await fetch(u)).json();
      const t = Math.round(j.current.temperature_2m);
      E.setText("wxBox", "CLIMA · " + t + "° Formosa");
      log("<b>VERO</b> clima " + t + "° cargado a mesa.");
    } catch (e) { log("Clima no disponible. Buffer activo."); }
  }
  weather();
  log("<b>DIEGO</b> reglas de aire cargadas. Tope de reescritura: 3.");
  log("<b>KIRO</b> rack musical online. Stream 24/7 listo.");
  log("<b>MAZCLIN</b> supervisor en consola. Sin repetición.");
  log("Piso operativo. Esperando play del operador.");
  document.getElementById("vol").addEventListener("input", (ev) => {
    document.getElementById("stream").volume = Number(ev.target.value);
  });
})();
