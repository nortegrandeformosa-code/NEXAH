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
      "</code><h4>" + a.name + "</h4><p>" + a.job + "</p></article>";
  }).join("");
  const queue = [
    { who: "Vero", kind: "SERVICIO", title: "Clima Formosa" },
    { who: "Pablo", kind: "MÚSICA", title: D.tracks[0] },
    { who: "Sofi", kind: "SPOT", title: D.spots[0].title },
    { who: "Pablo", kind: "MÚSICA", title: D.tracks[2] },
    { who: "Diego", kind: "QA", title: "Validación de corte" }
  ];
  document.getElementById("queue").innerHTML = queue.map((q) =>
    '<div class="q"><small class="mono">' + q.who + " · " + q.kind + "</small><div>" + q.title + "</div></div>"
  ).join("");
  document.getElementById("inv").innerHTML = D.spots.map((s) =>
    '<div class="q"><small class="mono">' + s.dur + "</small><div>" + s.title + "</div></div>"
  ).join("");
  async function weather() {
    try {
      const u = "https://api.open-meteo.com/v1/forecast?latitude=-26.1849&longitude=-58.1731&current=temperature_2m&timezone=America%2FArgentina%2FBuenos_Aires";
      const j = await (await fetch(u)).json();
      const t = Math.round(j.current.temperature_2m);
      E.setText("wxBox", "Clima " + t + "° Formosa");
      log("<b>VERO</b> clima " + t + "° a mesa.");
    } catch (e) { log("Clima no disponible."); }
  }
  weather();
  log("<b>DIEGO</b> reglas cargadas.");
  log("<b>KIRO</b> rack online.");
  log("<b>MAZCLIN</b> supervisor en consola.");
  document.getElementById("vol").addEventListener("input", (ev) => {
    document.getElementById("stream").volume = Number(ev.target.value);
  });
})();
