import { useEffect, useState } from "react";
import { engine } from "../audio";
import { IMG, TICKER, pad2 } from "../data";
import { useClock, useListeners, useScramble } from "../hooks";
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

/* ================= apertura · afiche ================= */
export function Hero() {
  const { out, done } = useScramble("NEXAH", 200);
  const now = useClock();
  const listeners = useListeners();
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const st = engine.state;

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-16">
      {/* la cabina, en movimiento */}
      <div className="absolute inset-0" aria-hidden="true">
        <CyberImg src={IMG.cabin} kb eager className="absolute inset-0" />
        <div className="img-veil absolute inset-0" />
        <div className="img-veil-b absolute inset-0" />
      </div>

      {/* frecuencia fantasma */}
      <span
        className="pointer-events-none absolute right-6 top-24 hidden select-none font-display text-[10rem] font-extrabold leading-none text-stroke-dim lg:block"
        aria-hidden="true"
      >
        108.0
      </span>

      {/* contenido del afiche */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-28 pt-24 md:px-10 md:pb-32">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-neon">
          <span className="led bg-neon shadow-[0_0_10px_rgba(94,233,255,0.9)]" />
          FRECUENCIA DIGITAL · TRANSMISIÓN GLOBAL 24/7
        </p>

        <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.9] tracking-tight">
          <span className="glitch block text-[clamp(4.5rem,13vw,11.5rem)] text-snow glow-neon" data-text={done ? "NEXAH" : out}>
            {out || "\u00A0"}
          </span>
          <span className="block text-[clamp(2.2rem,6vw,5.2rem)] text-stroke">RADIO LAB</span>
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

        {/* ahora suena */}
        <div className="mt-14 flex max-w-xl items-center gap-4 border border-white/10 bg-ink/55 px-5 py-4 backdrop-blur-md">
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

        {/* métricas al pie del afiche */}
        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px border-t border-white/10 pt-6 sm:grid-cols-4">
          {[
            [listeners.toLocaleString("es-AR"), "oyentes ahora"],
            ["9", "agentes al aire"],
            ["99.98%", "uptime"],
            ["<40 ms", "latencia"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-bold text-snow">{v}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-mut uppercase">{l}</p>
            </div>
          ))}
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
