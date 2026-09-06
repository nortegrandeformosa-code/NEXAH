(() => {
  const D = window.NEXAH;
  const $ = (id) => document.getElementById(id);
  const audio = $("stream");
  const playBtn = $("playBtn");
  const onair = $("onair");
  let playing = false;

  function clock() {
    const t = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    });
    $("clock").textContent = t + " · FORMOSA";
  }
  clock();
  setInterval(clock, 1000);

  function setRds(text, src) {
    $("rdsLine").textContent = text;
    if (src) $("srcPill").textContent = "FUENTE · " + src;
  }

  function hourPart() {
    const h = Number(new Date().toLocaleString("en-GB", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", hour12: false }));
    if (h >= 6 && h < 10) return 0;
    if (h >= 10 && h < 14) return 1;
    if (h >= 14 && h < 20) return 2;
    return 3;
  }

  $("dayparts").innerHTML = D.dayparts.map((p, i) =>
    '<article class="dp' + (i === hourPart() ? ' active' : '') + '">' +
    '<b class="mono">' + p.range + ' · ' + p.agent.toUpperCase() + '</b>' +
    '<h3>' + p.title + '</h3><p>' + p.text + '</p></article>'
  ).join('');

  $("agentGrid").innerHTML = D.agents.map((a) =>
    '<article class="agent"><code class="mono">' + a.role.toUpperCase() + '</code>' +
    '<h3>' + a.name + '</h3><p>' + a.job + '</p><div class="st mono">EN CONSOLA</div></article>'
  ).join('');

  $("archiveGrid").innerHTML = D.archive.map((a) =>
    '<article class="card"><div class="thumb"><img src="' + a.img + '" alt="" /></div>' +
    '<div class="body"><div class="who mono">' + a.agent.toUpperCase() + ' · ' + a.kind + '</div>' +
    '<h3>' + a.title + '</h3></div></article>'
  ).join('');

  async function itunesCover(term) {
    try {
      const u = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&entity=song&limit=1';
      const j = await (await fetch(u)).json();
      const hit = j.results && j.results[0];
      if (!hit) return null;
      return { art: hit.artworkUrl100.replace('100x100', '400x400'), title: hit.trackName + ' — ' + hit.artistName, src: 'ITUNES' };
    } catch (e) { return null; }
  }

  async function weather() {
    try {
      const u = 'https://api.open-meteo.com/v1/forecast?latitude=-26.1849&longitude=-58.1731&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FBuenos_Aires';
      const j = await (await fetch(u)).json();
      const t = Math.round(j.current.temperature_2m);
      const map = { 0: 'despejado', 1: 'casi despejado', 2: 'parcial', 3: 'nublado', 45: 'niebla', 61: 'lluvia', 80: 'chaparrones', 95: 'tormenta' };
      const desc = map[j.current.weather_code] || 'en curso';
      $("wxTemp").textContent = t + '°';
      $("wxDesc").textContent = 'Formosa · ' + desc;
      $("nowWx").textContent = 'CLIMA · ' + t + '° ' + desc;
      return { t: t, desc: desc };
    } catch (e) { $("wxTemp").textContent = '—'; return null; }
  }

  async function news() {
    const feeds = ['https://www.clarin.com/rss/lo-ultimo/', 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml'];
    for (var i = 0; i < feeds.length; i++) {
      try {
        const u = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feeds[i]);
        const j = await (await fetch(u)).json();
        if (!j.items || !j.items.length) continue;
        return j.items.slice(0, 6).map(function (it) {
          return {
            title: it.title,
            lead: String(it.description || '').replace(/<[^>]+>/g, '').slice(0, 140),
            img: it.thumbnail || (it.enclosure && it.enclosure.link) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=70',
            agent: 'Vero', kind: 'NOTICIAS', src: 'RSS'
          };
        });
      } catch (e) {}
    }
    return [];
  }

  function paintNow(item, art, src) {
    $("nowTitle").textContent = item.title;
    $("nowLead").textContent = item.lead || item.kind || '';
    $("nowAgent").textContent = (item.agent || 'Vero').toUpperCase();
    $("nowBlock").textContent = item.block || item.kind || 'AIRE';
    if (art) $("nowArt").src = art;
    $("nowSrc").textContent = 'MOTOR · ' + (src || 'INTERNO');
    setRds(item.title + ' · ' + item.agent + ' · ' + (item.block || item.kind), src || 'RDS');
  }

  async function buildQueue() {
    const covers = [];
    for (var i = 0; i < 4; i++) {
      const hit = await itunesCover(D.tracks[i]);
      covers.push(hit || { art: D.archive[3].img, title: D.tracks[i], src: 'BUFFER' });
    }
    const wx = await weather();
    const newsItems = await news();
    const queue = [
      { title: wx ? 'Clima Formosa ' + wx.t + '°' : 'Clima Formosa', agent: 'Vero', kind: 'SERVICIO', art: D.archive[4].img, src: 'OPEN-METEO' },
      { title: covers[0].title, agent: 'Pablo', kind: 'MUSICA', art: covers[0].art, src: covers[0].src },
      { title: D.spots[0].title, agent: 'Sofi', kind: 'SPOT', art: D.archive[1].img, src: 'AGENTE' },
      { title: covers[1].title, agent: 'Pablo', kind: 'MUSICA', art: covers[1].art, src: covers[1].src }
    ];
    $("queue").innerHTML = queue.map(function (q) {
      return '<li><img src="' + q.art + '" alt="" /><div><strong>' + q.title + '</strong><br /><small class="mono">' + q.agent.toUpperCase() + ' · ' + q.kind + '</small></div><small class="mono">' + q.src + '</small></li>';
    }).join('');
    $("nowNext").textContent = 'SIGUE · ' + queue[1].title;
    const feed = newsItems.concat(
      covers.map(function (c) { return { title: c.title, lead: 'Alta de Pablo via iTunes.', img: c.art, agent: 'Pablo', kind: 'MUSICA', src: c.src }; }),
      D.spots.map(function (s) { return { title: s.title, lead: 'Pauta ' + s.dur + '. Validado por Diego.', img: D.archive[1].img, agent: 'Sofi', kind: 'SPOT', src: 'AGENTE' }; })
    ).slice(0, 8);
    $("feedGrid").innerHTML = feed.map(function (f) {
      return '<article class="card"><div class="thumb"><img src="' + f.img + '" alt="" /></div><div class="body"><div class="who mono">' + f.agent.toUpperCase() + ' · ' + f.kind + ' · ' + f.src + '</div><h3>' + f.title + '</h3><p>' + (f.lead || '') + '</p></div></article>';
    }).join('');
    if (newsItems[0]) paintNow({ title: newsItems[0].title, lead: newsItems[0].lead, agent: 'Vero', block: 'NOTICIAS' }, newsItems[0].img, 'RSS');
    else if (covers[0]) paintNow({ title: covers[0].title, lead: 'Rotacion musical. Pablo en consola.', agent: 'Pablo', block: 'MUSICA' }, covers[0].art, covers[0].src);
    const tick = [wx ? 'FORMOSA ' + wx.t + '° ' + wx.desc : 'FORMOSA', 'NEXAH RADIO — la senal no duerme', 'VERO noticias · DIEGO control · PABLO musica · SOFI pauta', queue[0].title, 'SIN SILENCIO — buffer activo'];
    $("ticker").innerHTML = tick.concat(tick).map(function (t) { return '<span>' + t + '</span>'; }).join('');
  }

  function markAir(ok, label) {
    onair.classList.toggle('down', !ok);
    onair.querySelector('span').textContent = label;
  }

  async function togglePlay() {
    if (!audio.src) audio.src = D.stream;
    try {
      if (playing) { audio.pause(); playing = false; playBtn.textContent = 'PLAY'; playBtn.classList.remove('on'); return; }
      await audio.play();
      playing = true; playBtn.textContent = 'PAUSA'; playBtn.classList.add('on'); markAir(true, 'EN AIRE');
    } catch (e) { markAir(false, 'SENAL CAIDA'); playing = false; playBtn.textContent = 'PLAY'; }
  }
  playBtn.addEventListener('click', togglePlay);
  audio.addEventListener('error', function () { markAir(false, 'SENAL CAIDA'); });
  setRds('NEXAH RADIO · Formosa · la radio esta siempre en movimiento', 'RDS');
  buildQueue();
  setInterval(async function () {
    const hit = await itunesCover(D.tracks[Math.floor(Math.random() * D.tracks.length)]);
    if (hit) paintNow({ title: hit.title, lead: 'Rotacion Pablo. Motor iTunes.', agent: 'Pablo', block: 'MUSICA' }, hit.art, hit.src);
  }, 48000);
})();
