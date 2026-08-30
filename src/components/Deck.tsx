import { useEffect, useState } from "react";
import { engine } from "../audio";
import { ACCENT_HEX, HOST, IMG, NEWS, TICKER, pad2, type NewsCat } from "../data";
import { useClock, useListeners, usePrefersReducedMotion, useScramble } from "../hooks";
import { CyberImg } from "./Img";
import { IconLogo, IconPlay } from "./Icons";

const NAV = [
  { href: "#proyecto", label: "Proyecto" },
  { href: "#agentes", label: "Agentes" },
  { href: "#parrilla", label: "Parrilla" },
  { href: "#musica", label: "Música" },
  { href: "#partners", label: "Partners" },
];

/* ================= header minimal ================= */
export function Header() {
  const now = useClock();
  const [open, setOpen] = useState(false);
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const playing = engine.state.playing;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-5 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <IconLogo className="h-7 w-7 text-neon transition-transform duration-700 group-hover:rotate-[28deg]" />
          <span className="font-display text-[15px] font-bold tracking-[0.22em] text-snow">
            NEXAH<span className="text-neon">.</span>
          </span>
        </a>

        <nav className="ml-4 hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-slide text-[13px] font-medium text-mut transition-colors hover:text-snow">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <span className="hidden font-mono text-[11px] tracking-[0.18em] text-mut md:block">
            {pad2(now.getHours())}:{pad2(now.getMinutes())}
            <span className="text-neon">:{pad2(now.getSeconds())}</span>
          </span>
          <span className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-mag sm:flex">
            <span className="led bg-mag shadow-[0_0_10px_rgba(255,77,143,0.9)]" /> AL AIRE
          </span>
          <button
            onClick={() => engine.toggle()}
            className={`btn-primary flex items-center gap-2.5 px-5 py-2.5 text-[12px] font-bold tracking-[0.18em] ${
              playing ? "!bg-mag" : ""
            }`}
          >
            <IconPlay className="h-3 w-3" />
            {playing ? "EN VIVO" : "ESCUCHAR"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-white/15 text-snow lg:hidden"
          >
            <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/5 bg-abyss/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3.5 text-sm font-medium text-mut last:border-0 hover:text-neon"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ================= sticker · monitor de noticias ================= */
const CAT_COLOR: Record<NewsCat, string> = {
  ARG: ACCENT_HEX.neon,
  MUSIC: ACCENT_HEX.mag,
  TECH: ACCENT_HEX.lime,
  WORLD: ACCENT_HEX.amber,
};

export function NewsMonitor() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % NEWS.length), 4200);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const n = NEWS[idx];

  return (
    <div
      className="relative w-[300px] max-w-full rotate-[2.5deg] border border-white/12 bg-abyss shadow-[0_28px_70px_-18px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.025]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* cinta adhesiva */}
      <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-snow/12 backdrop-blur-[1px]" aria-hidden="true" />

      {/* marco del monitor */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-mag/80" />
          <i className="h-2 w-2 rounded-full bg-amber/80" />
          <i className="h-2 w-2 rounded-full bg-lime/80" />
        </span>
        <span className="font-mono text-[9px] tracking-[0.26em] text-mut">NOTICIAS DEL DÍA</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-mag">
          <span className="led bg-mag shadow-[0_0_8px_rgba(255,77,143,0.9)]" /> REC
        </span>
      </div>

      {/* pantalla */}
      <div className="screen-scan relative min-h-[128px] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className="border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em]"
            style={{ color: CAT_COLOR[n.cat], borderColor: `${CAT_COLOR[n.cat]}55` }}
          >
            {n.cat}
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] text-mut">
            HACE {(idx + 1) * 7} MIN · {String(idx + 1).padStart(2, "0")}/{NEWS.length}
          </span>
        </div>
        <p key={idx} className="news-in mt-3 min-h-[54px] text-[13.5px] font-semibold leading-snug text-snow">
          {n.title}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.2em] text-mut">{n.source.toUpperCase()}</span>
          <span className="flex gap-1.5">
            <button
              onClick={() => setIdx((i) => (i - 1 + NEWS.length) % NEWS.length)}
              aria-label="Noticia anterior"
              className="flex h-6 w-6 items-center justify-center border border-white/12 text-mut transition-colors hover:border-neon hover:text-neon"
            >
              ‹
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % NEWS.length)}
              aria-label="Noticia siguiente"
              className="flex h-6 w-6 items-center justify-center border border-white/12 text-mut transition-colors hover:border-neon hover:text-neon"
            >
              ›
            </button>
          </span>
        </div>
      </div>

      {/* barra de progreso del boletín */}
      <div className="h-[3px] w-full bg-white/6">
        {!reduced && !paused && <div key={idx} className="newsprog h-full bg-neon" />}
      </div>

      <p className="border-t border-white/8 px-4 py-2 font-mono text-[8.5px] tracking-[0.24em] text-mut">
        BOLETÍN ORACLE-3 · SUENA CADA HORA EN EL AIRE
      </p>
    </div>
  );
}

/* ================= sticker · KIRO, el host ================= */
export function KiroPoster() {
  return (
    <div className="relative mx-auto w-full max-w-[390px]">
      <div className="float-soft">
        <figure className="relative -rotate-[3.5deg] border-[3px] border-snow bg-panel shadow-[0_36px_90px_-22px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0">
          {/* cintas */}
          <span className="absolute -top-3.5 left-6 z-10 h-6 w-20 -rotate-6 bg-snow/14" aria-hidden="true" />
          <span className="absolute -top-3 right-8 z-10 h-6 w-16 rotate-3 bg-snow/10" aria-hidden="true" />

          <div className="relative aspect-[3/4] overflow-hidden">
            <CyberImg src={IMG.kiro} eager className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-4 left-4 right-4 font-mono text-[10px] tracking-[0.14em] text-snow/75">
              «{HOST.quote}»
            </p>
          </div>

          <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-snow">{HOST.name}</p>
              <p className="mt-0.5 font-mono text-[9px] tracking-[0.24em] text-mut">{HOST.role}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 border border-lime/50 px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-lime">
              <span className="led bg-lime shadow-[0_0_8px_rgba(198,243,91,0.9)]" /> ONLINE
            </span>
          </figcaption>
        </figure>
      </div>

      {/* sello 24/7 */}
      <span className="absolute -right-4 -top-6 z-10 flex h-[68px] w-[68px] rotate-12 items-center justify-center rounded-full bg-lime font-display text-[12px] font-extrabold text-ink shadow-[0_10px_30px_-6px_rgba(198,243,91,0.5)]">
        24/7
      </span>

      {/* monitor de noticias superpuesto */}
      <div className="relative z-20 -mt-9 ml-4 sm:ml-[-30px] lg:absolute lg:-bottom-16 lg:-left-20 lg:mt-0 lg:ml-0">
        <NewsMonitor />
      </div>
    </div>
  );
}

/* ================= apertura · afiche con protagonista ================= */
export function Hero() {
  const { out, done } = useScramble("NEXAH", 200);
  const now = useClock();
  const listeners = useListeners();
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const st = engine.state;

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-16">
      <div className="absolute inset-0" aria-hidden="true">
        <CyberImg src={IMG.cabin} kb eager className="absolute inset-0" />
        <div className="img-veil absolute inset-0" />
        <div className="img-veil-b absolute inset-0" />
      </div>

      <span
        className="pointer-events-none absolute right-6 top-24 hidden select-none font-display text-[10rem] font-extrabold leading-none text-stroke-dim xl:block"
        aria-hidden="true"
      >
        108.0
      </span>

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-start gap-16 px-5 pb-24 pt-14 md:px-10 md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* editorial */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-neon">
            <span className="led bg-neon shadow-[0_0_10px_rgba(94,233,255,0.9)]" />
            FRECUENCIA DIGITAL · TRANSMISIÓN GLOBAL 24/7
          </p>

          <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.9] tracking-tight">
            <span className="glitch block text-[clamp(4.2rem,11.5vw,10.5rem)] text-snow glow-neon" data-text={done ? "NEXAH" : out}>
              {out || "\u00A0"}
            </span>
            <span className="block text-[clamp(2.1rem,5.6vw,4.9rem)] text-stroke">RADIO LAB</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-snow/75 md:text-xl">
            La primera radio del mundo operada <em className="not-italic font-semibold text-neon">100% por agentes de inteligencia artificial</em>.
            Curan. Mezclan. Conducen. Informan. Sin pausas, sin silencios, sin turno noche.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => engine.toggle()}
              className={`btn-primary flex items-center gap-3 px-8 py-4 font-display text-sm font-bold tracking-[0.16em] ${
                st.playing ? "!bg-mag" : ""
              }`}
            >
              <IconPlay className="h-4 w-4" />
              {st.playing ? "SEÑAL EN VIVO — CORTAR" : "ESCUCHAR LA SEÑAL"}
            </button>
            <a href="#proyecto" className="btn-ghost px-8 py-4 font-display text-sm font-bold tracking-[0.16em]">
              CONOCER EL PROYECTO
            </a>
          </div>

          <div className="mt-12 flex max-w-xl items-center gap-4 border border-white/10 bg-ink/55 px-5 py-4 backdrop-blur-md">
            <span className="eq shrink-0 text-neon">
              <span /><span /><span /><span />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] tracking-[0.28em] text-mut">SONANDO AHORA</p>
              <p className="truncate text-[15px] font-semibold text-snow">
                {st.track.title} <span className="font-normal text-mut">— {st.track.artist}</span>
              </p>
            </div>
            <span className="ml-auto hidden shrink-0 font-mono text-[11px] tracking-[0.2em] text-mut sm:block">
              {pad2(now.getHours())}:{pad2(now.getMinutes())}
            </span>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px border-t border-white/10 pt-6 sm:grid-cols-4">
            {[
              [listeners.toLocaleString("es-AR"), "oyentes ahora"],
              ["9", "agentes al aire"],
              ["99.98%", "uptime"],
              ["<40 ms", "latencia"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-snow">{v}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-mut">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* protagonista: KIRO + monitor de noticias */}
        <div className="relative z-10 pt-4 lg:col-span-5 lg:pt-10">
          <KiroPoster />
        </div>
      </div>

      <Ticker />
    </section>
  );
}

/* ================= ticker ================= */
export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-ink py-3.5">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[11px] tracking-[0.3em] text-mut">
            <span className={i % 2 ? "text-mag" : "text-neon"}>◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
