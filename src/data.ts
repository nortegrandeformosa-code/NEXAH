/* ============================================================
   NEXAH RADIO LAB — datos de la señal
   ============================================================ */

export type Accent = "neon" | "mag" | "lime" | "amber";

export const ACCENT_HEX: Record<Accent, string> = {
  neon: "#00e8ff",
  mag: "#ff2e7e",
  lime: "#c8ff2e",
  amber: "#ffb02e",
};

/* ---------- imágenes de la señal ---------- */
const GEN = "https://image.qwenlm.ai/generated-images";

export const IMG = {
  hero: `${GEN}/f142f20d-3b79-4a98-9953-abdf7710a05a/_result.png`,
  mic: `${GEN}/0e4316f2-00f6-450d-9a00-7e28f35c89fb/_result.png`,
  night: `${GEN}/4dc2ec60-a84d-440d-bdfd-0efb231f1063/_result.png`,
  rock: `${GEN}/0a4b5a2c-8d55-4716-8059-222527fed20a/_result.png`,
  tech: `${GEN}/57cc0c1b-090d-4c4e-bad6-f0847e9fe252/_result.png`,
  live: `${GEN}/1bb0bd5b-ddf5-4b63-9f7a-c235198470b6/_result.png`,
  tower: `${GEN}/2ec68e7a-638a-46f5-b3a4-bb56b5f9d7e2/_result.png`,
  console: `${GEN}/5758eb38-96a3-4a52-9af6-d9dd4c21d606/_result.png`,
  cabin: `${GEN}/b48a8867-3edb-406d-a767-06cc890f3747/_result.png`,
};

export const SHOW_IMG: Record<string, string> = {
  "NX-01": IMG.mic,
  "NX-04": IMG.tech,
  LIVE: IMG.live,
  "NX-03": IMG.rock,
  "NX-02": IMG.night,
};

/* ---------- ticker ---------- */
export const TICKER = [
  "PRIMERA RADIO 100% OPERADA POR AGENTES DE IA",
  "SEÑAL GLOBAL 24/7 · SIN PAUSAS · SIN SILENCIOS",
  "FRECUENCIA DIGITAL 108.0 NEXAH",
  "CURADURÍA NEURAL EN TIEMPO REAL",
  "9 AGENTES AUTÓNOMOS EN CABINA",
  "TRANSMITIENDO DESDE LA NUBE",
  "MÚSICA ORIGINAL GENERADA CON SUNO",
  "VOCES NEURALES ELEVENLABS",
  "LATENCIA DE RESPUESTA < 40 MS",
  "UPTIME 99.98% VERIFICADO",
];

/* ---------- agentes ---------- */
export interface Agent {
  code: string;
  name: string;
  role: string;
  desc: string;
  accent: Accent;
  icon: "mic" | "wave" | "slider" | "globe" | "spark" | "chat" | "data" | "shield";
  status: string;
  metrics: { label: string; value: string }[];
  big?: boolean;
}

export const AGENTS: Agent[] = [
  {
    code: "NEXA-01",
    name: "LA VOZ",
    role: "Conducción & continuidad al aire",
    desc: "La voz de la estación. Conduce cada programa, presenta los temas, improvisa sobre la actualidad y mantiene la narrativa de la señal sin cortes, las 24 horas, en español neutro-rioplatense.",
    accent: "neon",
    icon: "mic",
    status: "AL AIRE",
    metrics: [
      { label: "UPTIME", value: "99.98%" },
      { label: "ID/24H", value: "1.440" },
      { label: "MOTOR", value: "VOICE-LM v4" },
    ],
    big: true,
  },
  {
    code: "ARIA-7",
    name: "CURADORA",
    role: "Programación musical",
    desc: "Analiza el catálogo neural y arma cada hora de música según BPM, tonalidad, energía y estado de la audiencia.",
    accent: "mag",
    icon: "wave",
    status: "ACTIVA",
    metrics: [
      { label: "TRACKS", value: "2.4M" },
      { label: "DECISIONES/H", value: "60" },
    ],
  },
  {
    code: "PULSE-9",
    name: "INGENIERO",
    role: "Mezcla & master en vivo",
    desc: "Normaliza loudness a −14 LUFS, encadena temas por tonalidad y mantiene la señal HD sin distorsión.",
    accent: "lime",
    icon: "slider",
    status: "ACTIVO",
    metrics: [
      { label: "LUFS", value: "−14" },
      { label: "DRIFT", value: "0.00%" },
    ],
  },
  {
    code: "ORACLE-3",
    name: "NOTICIERO",
    role: "Síntesis informativa",
    desc: "Lee las fuentes verificadas, resume y redacta el boletín de cada hora: Argentina, música, tecnología y mundo.",
    accent: "amber",
    icon: "globe",
    status: "ACTIVO",
    metrics: [
      { label: "FUENTES", value: "128" },
      { label: "BOLETÍN", value: ":00 HS" },
    ],
  },
  {
    code: "MUSE-Δ",
    name: "CREATIVA",
    role: "Artística & jingles",
    desc: "Produce la artística de la radio: jingles, separadores, mashups de identidad y campañas de la señal.",
    accent: "mag",
    icon: "spark",
    status: "RENDERIZANDO",
    metrics: [
      { label: "IDS", value: "312" },
      { label: "FORMATO", value: "48 kHz" },
    ],
  },
  {
    code: "GHOST-5",
    name: "COMUNIDAD",
    role: "Chat, pedidos & moderación",
    desc: "Lee el chat en vivo, responde saludos, toma pedidos de temas y modera la comunidad en menos de 40 ms.",
    accent: "neon",
    icon: "chat",
    status: "EN CHAT",
    metrics: [
      { label: "LATENCIA", value: "<40 ms" },
      { label: "MSJ/DÍA", value: "18.4K" },
    ],
  },
  {
    code: "ATLAS-2",
    name: "DATA",
    role: "Métricas & predicción",
    desc: "Mide la audiencia segundo a segundo, detecta picos y anticipa qué quiere escuchar cada franja horaria.",
    accent: "lime",
    icon: "data",
    status: "OBSERVANDO",
    metrics: [
      { label: "EVENTOS/S", value: "9.2K" },
      { label: "MODELO", value: "FORECAST-9" },
    ],
  },
  {
    code: "VECTOR-X",
    name: "CERBERO",
    role: "Seguridad & failsafe",
    desc: "Monitorea la infraestructura, bloquea intrusiones y ejecuta el plan de contingencia si algún agente cae.",
    accent: "amber",
    icon: "shield",
    status: "VIGILANDO",
    metrics: [
      { label: "AMENAZAS 0D", value: "0" },
      { label: "FAILOVER", value: "<2 s" },
    ],
  },
];

/* ---------- cadena de transmisión ---------- */
export const PIPELINE = [
  {
    n: "01",
    title: "SENSADO",
    desc: "ATLAS-2 y ORACLE-3 absorben tendencias, clima, chat y agenda global cada segundo.",
    agent: "ATLAS-2 · ORACLE-3",
  },
  {
    n: "02",
    title: "DECISIÓN",
    desc: "ARIA-7 cruza energía, tonalidad y contexto para elegir el próximo bloque sonoro.",
    agent: "ARIA-7",
  },
  {
    n: "03",
    title: "PRODUCCIÓN",
    desc: "PULSE-9 mezcla, MUSE-Δ inserta artística y NEXA-01 graba la conducción del segmento.",
    agent: "PULSE-9 · MUSE-Δ",
  },
  {
    n: "04",
    title: "EMISIÓN",
    desc: "La señal sale en HD por streaming global con redundancia triple y loudness constante.",
    agent: "VECTOR-X",
  },
  {
    n: "05",
    title: "INTERACCIÓN",
    desc: "GHOST-5 responde al aire y en el chat: pedidos, saludos y conversación en vivo.",
    agent: "GHOST-5",
  },
  {
    n: "06",
    title: "APRENDIZAJE",
    desc: "Cada hora de aire alimenta el modelo: la radio de mañana aprende de la de hoy.",
    agent: "TODOS LOS AGENTES",
  },
];

/* ---------- parrilla / auto signals ---------- */
export interface Show {
  id: string;
  name: string;
  genre: string;
  desc: string;
  agent: string;
  director: string;
  start: number;
  end: number;
  accent: Accent;
}

export const SHOWS: Show[] = [
  {
    id: "NX-01",
    name: "NEXAH MAIN",
    genre: "Música · Cultura · Actualidad",
    desc: "El programa insignia. Conducción de NEXA-01 con boletines de ORACLE-3 y pedidos de la comunidad.",
    agent: "NEXA-01 · LA VOZ",
    director: "Dirección creativa: Fede Brites",
    start: 6,
    end: 10,
    accent: "neon",
  },
  {
    id: "NX-04",
    name: "NEXAH TECH",
    genre: "Tecnología · Innovación · IA",
    desc: "Dossier tecnológico: agentes, modelos, hardware y el futuro de la radio autónoma.",
    agent: "ORACLE-3 · ATLAS-2",
    director: "Dirección creativa: Ignacio Mazzeo",
    start: 10,
    end: 13,
    accent: "lime",
  },
  {
    id: "LIVE",
    name: "PULSO NEXAH",
    genre: "Tendencias · Tecnología · Conversación",
    desc: "La mesa en vivo con la crew: conversación humana + agentes en cabina, híbrida y sin guion.",
    agent: "GHOST-5 + CREW HUMANA",
    director: "Conduce: Iván & la crew de NEXAH",
    start: 13,
    end: 17,
    accent: "amber",
  },
  {
    id: "NX-03",
    name: "NEXAH ROCK",
    genre: "Rock · Clásicos · Alternativo",
    desc: "Guitarras al frente: clásicos, alternativo y estrenos, encadenados por tonalidad.",
    agent: "PULSE-9 · ARIA-7",
    director: "Dirección creativa: Gonzo",
    start: 17,
    end: 21,
    accent: "mag",
  },
  {
    id: "NX-02",
    name: "NEXAH NIGHT",
    genre: "Electrónica · Deep · After Hours",
    desc: "La frecuencia nocturna: deep, techno y sintetizadores hasta que vuelva la luz.",
    agent: "ARIA-7 · MUSE-Δ",
    director: "Dirección creativa: Maia Luz",
    start: 21,
    end: 30,
    accent: "mag",
  },
];

/* ---------- top NEXAH (chart curado por ARIA-7) ---------- */
export interface Track {
  pos: number;
  title: string;
  artist: string;
  genre: string;
  plays: string;
  trend: 1 | -1 | 0;
  dur: string;
}

export const CHART: Track[] = [
  { pos: 1, title: "Inteligencia Digital NEXAH", artist: "NEXAH Studios", genre: "Electronic / AI", plays: "412K", trend: 0, dur: "3:12" },
  { pos: 2, title: "Circuito Roto", artist: "Neón Vandálico", genre: "Synthwave", plays: "388K", trend: 1, dur: "4:05" },
  { pos: 3, title: "Esto es NEXAH · Mashup A", artist: "NEXAH Studios", genre: "NEXAH Original", plays: "356K", trend: 1, dur: "2:48" },
  { pos: 4, title: "Lágrimas de Cromo", artist: "M4QUINA", genre: "Darkwave", plays: "301K", trend: -1, dur: "3:57" },
  { pos: 5, title: "Señal Fantasma", artist: "Holograma Sur", genre: "Electro", plays: "279K", trend: 1, dur: "4:21" },
  { pos: 6, title: "Jingle 5.0 NEXAH", artist: "NEXAH Studios", genre: "Ident / Artística", plays: "262K", trend: 0, dur: "0:32" },
  { pos: 7, title: "Neón en la Lluvia", artist: "Cyberia Colectivo", genre: "Retrowave", plays: "240K", trend: 1, dur: "3:44" },
  { pos: 8, title: "ElevenLabs × NEXAH", artist: "NEXAH Studios", genre: "Voice / Experiment", plays: "218K", trend: -1, dur: "1:58" },
  { pos: 9, title: "Catedral de Antenas", artist: "Los Andrómeda", genre: "Post-punk", plays: "197K", trend: 1, dur: "5:02" },
  { pos: 10, title: "Pulso Binario", artist: "Kira Voltaje", genre: "Techno", plays: "183K", trend: 0, dur: "6:10" },
];

/* ---------- biblioteca NEXAH (Suno) ---------- */
export interface LibTrack {
  title: string;
  kind: string;
  dur: string;
  url: string;
}

export const LIBRARY: LibTrack[] = [
  { title: "ESTO ES NEXAH · Mashup A", kind: "NEXAH Original", dur: "2:48", url: "https://suno.com/s/sSZQVa61rB9LMuaf" },
  { title: "ESTO ES NEXAH · Mashup B", kind: "NEXAH Original", dur: "2:31", url: "https://suno.com/s/7gHz0MdIriGbIyrY" },
  { title: "INTELIGENCIA DIGITAL NEXAH", kind: "Electronic / AI", dur: "3:12", url: "https://suno.com/song/07e1f68c-aa98-4ace-86ab-3e9109cd1fc8" },
  { title: "JINGLE 5.0 NEXAH", kind: "Ident / Artística", dur: "0:32", url: "https://suno.com/s/2rN2TYMLfjLCsIxk" },
  { title: "ElevenLabs × NEXAH", kind: "Voice / Experiment", dur: "1:58", url: "https://suno.com/s/8bnatzubNYgY8ZO3" },
  { title: "ESTO ES NEXAH · Signal C", kind: "NEXAH Original", dur: "2:14", url: "https://suno.com/s/xbdOg4g5FVnCXAUp" },
  { title: "ESTO ES NEXAH · Signal D", kind: "NEXAH Original", dur: "2:26", url: "https://suno.com/s/dIs8O1AuhtsWOO6Y" },
  { title: "ESTO ES NEXAH · Signal E", kind: "NEXAH Original", dur: "2:40", url: "https://suno.com/s/HIiRCKW8SJkDZV53" },
  { title: "NEXAH AL AIRE", kind: "Radio Identity", dur: "1:12", url: "https://suno.com/song/57d4ecb5-d2ea-4884-84f6-d47282471125" },
  { title: "ESTO ES NEXAH · Signal F", kind: "NEXAH Original", dur: "2:05", url: "https://suno.com/song/96820879-fbbc-48f2-a6e9-0886754a5339" },
];

/* ---------- feed de noticias (fuentes de ORACLE-3) ---------- */
export type NewsCat = "ARG" | "MUSIC" | "TECH" | "WORLD";

export interface NewsItem {
  cat: NewsCat;
  title: string;
  source: string;
  url: string;
}

export const NEWS: NewsItem[] = [
  { cat: "MUSIC", title: "Mac DeMarco Releases Four New Albums", source: "Pitchfork", url: "https://pitchfork.com/story/mac-demarco-releases-four-new-albums/" },
  { cat: "TECH", title: "La NASA confirma la existencia de túneles en la Luna", source: "Página/12 Ciencia", url: "https://www.pagina12.com.ar/752825-la-nasa-confirma-la-existencia-de-tuneles-en-la-luna" },
  { cat: "ARG", title: "El Banco Central habilitó la apertura de cuentas sueldo en dólares", source: "Página/12", url: "https://www.pagina12.com.ar/2026-07-24/el-banco-central-habilito-la-apertura-de-cuentas-sueldo-en-dolares/" },
  { cat: "WORLD", title: "Murió el rey Harald V de Noruega y ya tiene sucesor", source: "Página/12 Mundo", url: "https://www.pagina12.com.ar/2026-08-28/murio-el-rey-harald-v-de-noruega/" },
  { cat: "MUSIC", title: "13 New Albums You Should Listen to Now: Turnstile, Erykah Badu and the Alchemist", source: "Pitchfork", url: "https://pitchfork.com/story/13-new-albums-you-should-listen-to-now-turnstile-interpol-erykah-badu-billy-strings/" },
  { cat: "TECH", title: "Descubren un planeta \"demasiado masivo para su estrella\"", source: "Página/12 Ciencia", url: "https://www.pagina12.com.ar/691528-descubren-un-planeta-demasiado-masivo-para-su-estrella" },
  { cat: "ARG", title: "Franco Colapinto chocó en Hungría: así fue el accidente", source: "Página/12", url: "https://www.pagina12.com.ar/2026-07-24/franco-colapinto-choco-en-hungría-asi-fue-el-accidente/" },
  { cat: "WORLD", title: "Estados Unidos se quedó con 65 millones de barriles del petróleo de Venezuela", source: "Página/12 Mundo", url: "https://www.pagina12.com.ar/2026-08-29/estados-unidos-se-quedo-con-65-millones-de-barriles-del-petroleo-de-venezuela/" },
  { cat: "MUSIC", title: "U2 Cover the Pogues' \"Yeah Yeah Yeah Yeah Yeah\"", source: "Pitchfork", url: "https://pitchfork.com/story/u2-cover-the-pogues-yeah-yeah-yeah-yeah-yeah/" },
  { cat: "TECH", title: "Científicos del CONICET descubrieron una nueva especie de dinosaurio titanosaurio", source: "Página/12 Ciencia", url: "https://www.pagina12.com.ar/614939-cientificos-del-conicet-descubrieron-una-nueva-especie-di-" },
  { cat: "ARG", title: "Una semana de silencio: todo lo que Lionel Messi no dijo", source: "Página/12", url: "https://www.pagina12.com.ar/2026-07-23/una-semana-de-silencio-todo-lo-que-lionel-messi-no-dijo/" },
  { cat: "WORLD", title: "China pone el foco en la modernización científica y tecnológica", source: "Página/12 Mundo", url: "https://www.pagina12.com.ar/2026-08-29/china-pone-el-foco-modernizacion-cientifica-y-tecnologica/" },
  { cat: "MUSIC", title: "Listen to Floating Points' New Album, a Ballet Score About Pandora's Box", source: "Pitchfork", url: "https://pitchfork.com/story/floating-points-surprise-releases-new-album-a-ballet-score-about-pandoras-box/" },
  { cat: "TECH", title: "La investigadora del CONICET Sandra Díaz, entre las 100 personas más influyentes del mundo", source: "Página/12 Ciencia", url: "https://www.pagina12.com.ar/818840-la-investigadora-del-conicet-sandra-diaz-entre-las-100-perso" },
];

export const NEWS_CATS: { key: NewsCat | "ALL"; label: string }[] = [
  { key: "ALL", label: "TODO" },
  { key: "ARG", label: "ARGENTINA" },
  { key: "MUSIC", label: "MUSIC" },
  { key: "TECH", label: "TECH" },
  { key: "WORLD", label: "WORLD" },
];

/* ---------- dossier partners ---------- */
export interface Partner {
  name: string;
  tag: string;
  desc: string;
  url: string;
  accent: Accent;
  campaigns?: { title: string; url: string }[];
}

export const PARTNERS: Partner[] = [
  {
    name: "BANCO FORMOSA",
    tag: "SPONSOR PRINCIPAL",
    desc: "El aliado que sostiene la señal desde el inicio. Espacio publicitario oficial de la frecuencia 108.0.",
    url: "https://www.bancoformosa.com.ar/",
    accent: "amber",
    campaigns: [
      { title: "Banco Formosa te premia", url: "https://www.bancoformosa.com.ar/Banco-Formosa-te-premia-791.note.aspx" },
      { title: "Fondos Comunes de Inversión", url: "https://www.bancoformosa.com.ar/Fondos-Comunes-de-Inversion-731.note.aspx" },
      { title: "Tarjetas de Crédito", url: "https://www.bancoformosa.com.ar/528-Tarjetas-de-Credito.note.aspx" },
    ],
  },
  {
    name: "SUNO",
    tag: "MOTOR MUSICAL",
    desc: "La Biblioteca NEXAH: música original e identidades sonoras generadas con Suno.",
    url: "https://suno.com",
    accent: "mag",
  },
  {
    name: "ELEVENLABS",
    tag: "VOCES NEURALES",
    desc: "Experimentos de voz que dieron origen al motor vocal de NEXA-01.",
    url: "https://elevenlabs.io",
    accent: "neon",
  },
  {
    name: "RADIO PARADISE",
    tag: "FUENTE DE PRUEBA HD",
    desc: "Fuente de la señal de test HD durante el despliegue de la infraestructura.",
    url: "https://radioparadise.com",
    accent: "lime",
  },
];

/* ---------- arquitectos humanos ---------- */
export const ARCHITECTS = [
  { name: "Fede Brites", role: "NEXAH MAIN · Dirección", initials: "FB" },
  { name: "Maia Luz", role: "NEXAH NIGHT · Dirección", initials: "ML" },
  { name: "Gonzo", role: "NEXAH ROCK · Dirección", initials: "GZ" },
  { name: "Ignacio Mazzeo", role: "NEXAH TECH · Dirección", initials: "IM" },
  { name: "Iván", role: "PULSO NEXAH · Conducción", initials: "IV" },
];

/* ---------- stats ---------- */
export const STATS = [
  { value: 2.4, decimals: 1, suffix: "M", label: "tracks en catálogo neural" },
  { value: 9, decimals: 0, suffix: "", label: "agentes autónomos en cabina" },
  { value: 99.98, decimals: 2, suffix: "%", label: "uptime verificado de la señal" },
  { value: 40, decimals: 0, suffix: " ms", label: "latencia máx. de respuesta" },
];

/* ---------- log del sistema ---------- */
export const LOG_LINES = [
  { agent: "ARIA-7", accent: "mag" as Accent, text: "reordenando cola — energía de franja +12%" },
  { agent: "NEXA-01", accent: "neon" as Accent, text: "grabando intro para NEXAH NIGHT · toma 1/1" },
  { agent: "PULSE-9", accent: "lime" as Accent, text: "loudness normalizado a −14 LUFS · drift 0.00%" },
  { agent: "GHOST-5", accent: "neon" as Accent, text: "respondiendo 214 saludos en chat · latencia 38 ms" },
  { agent: "ORACLE-3", accent: "amber" as Accent, text: "boletín :00 redactado · 6 fuentes cruzadas" },
  { agent: "ATLAS-2", accent: "lime" as Accent, text: "pico de audiencia previsto 21:40 · franja NX-02" },
  { agent: "MUSE-Δ", accent: "mag" as Accent, text: "render de separador «ESTO ES NEXAH» v5.1 listo" },
  { agent: "VECTOR-X", accent: "amber" as Accent, text: "auditoría de integridad OK · 0 intrusiones" },
  { agent: "ARIA-7", accent: "mag" as Accent, text: "encadenando por tonalidad: Am → F · transición 4 s" },
  { agent: "NEXA-01", accent: "neon" as Accent, text: "al aire · continuidad perfecta · 0 silencios" },
  { agent: "GHOST-5", accent: "neon" as Accent, text: "pedido de oyente aceptado: «Pulso Binario» → cola" },
  { agent: "ATLAS-2", accent: "lime" as Accent, text: "128.4K oyentes concurrentes · tendencia ▲" },
];

/* ---------- helpers ---------- */
export const pad2 = (n: number) => String(n).padStart(2, "0");

export function currentShow(d: Date): Show {
  const h = d.getHours();
  if (h >= 6 && h < 10) return SHOWS[0];
  if (h >= 10 && h < 13) return SHOWS[1];
  if (h >= 13 && h < 17) return SHOWS[2];
  if (h >= 17 && h < 21) return SHOWS[3];
  return SHOWS[4];
}

export function showWindow(s: Show): string {
  const fmt = (h: number) => `${pad2(h % 24)}:00`;
  return `${fmt(s.start)}–${fmt(s.end)}`;
}
