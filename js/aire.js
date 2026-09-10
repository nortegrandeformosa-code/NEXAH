(() => {
  const D = window.NEXAH;
  const E = window.NexahEngine;
  const show = E.currentShow();
  document.getElementById("shows").innerHTML = D.dayparts.map((p) =>
    '<article class="show' + (p.title === show.title ? " on" : "") + '">' +
    '<small class="mono">' + p.range + "</small><b>" + p.title + "</b><em>" + p.host + "</em></article>"
  ).join("");
  document.getElementById("notes").innerHTML = D.notes.map((n) =>
    '<article><div class="tag mono">' + n.tag + "</div><h4>" + n.title + "</h4><p>" + n.lead + "</p></article>"
  ).join("");
  async function cover() {
    try {
      const term = D.tracks[Math.floor(Math.random() * D.tracks.length)];
      const u = "https://itunes.apple.com/search?term=" + encodeURIComponent(term) + "&entity=song&limit=1";
      const j = await (await fetch(u)).json();
      const hit = j.results && j.results[0];
      if (!hit) return;
      document.getElementById("nowArt").src = hit.artworkUrl100.replace("100x100", "1000x1000");
      const line = hit.trackName + " — " + hit.artistName;
      E.setText("nowTrack", line);
      E.setText("pTitle", hit.trackName);
      E.setText("pSub", hit.artistName + " · " + show.title);
      E.setText("dockTitle", hit.trackName);
    } catch (e) {}
  }
  cover();
  setInterval(cover, 52000);
  document.getElementById("vol").addEventListener("input", () => {
    document.getElementById("stream").volume = Number(document.getElementById("vol").value);
  });
})();
