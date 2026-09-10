(() => {
  const D = window.NEXAH;
  const E = window.NexahEngine;
  const strip = document.getElementById("programacion");
  const show = E.currentShow();
  strip.innerHTML = D.dayparts.map((p) =>
    '<article class="slot' + (p.title === show.title ? " active" : "") + '">' +
    '<small class="mono">' + p.range + '</small><b>' + p.title + '</b><span>' + p.host + '</span></article>'
  ).join("");
  document.getElementById("notes").innerHTML = D.notes.map((n) =>
    '<article class="card"><div class="tag mono">' + n.tag + '</div><h4>' + n.title + '</h4><p>' + n.lead + '</p></article>'
  ).join("");
  document.getElementById("spots").innerHTML = D.spots.map((s) =>
    '<article class="card"><div class="tag mono">PAUTA · ' + s.dur + '</div><h4>' + s.title + '</h4><p>' + s.line + '</p></article>'
  ).join("");
  async function cover() {
    try {
      const term = D.tracks[Math.floor(Math.random() * D.tracks.length)];
      const u = "https://itunes.apple.com/search?term=" + encodeURIComponent(term) + "&entity=song&limit=1";
      const j = await (await fetch(u)).json();
      const hit = j.results && j.results[0];
      if (!hit) return;
      document.getElementById("nowArt").src = hit.artworkUrl100.replace("100x100", "400x400");
      const line = hit.trackName + " — " + hit.artistName;
      E.setText("nowTrack", line);
      E.setText("pTitle", hit.trackName);
      E.setText("pSub", hit.artistName + " · " + show.title);
    } catch (e) {}
  }
  cover();
  setInterval(cover, 52000);
  document.getElementById("vol").addEventListener("input", () => {
    document.getElementById("stream").volume = Number(document.getElementById("vol").value);
  });
})();
