import { useEffect, useState, type CSSProperties } from "react";
import { engine } from "../audio";
import {
  ACCENT_HEX,
  HOSTS,
  IMG,
  LOGO_URL,
  NEWS,
  TICKER,
  pad2,
  type HostPersona,
  type NewsCat,
} from "../data";
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

/* ================= logo con fallback ================= */
export function BrandLogo({ className = "h-8 w-8" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <IconLogo className={`${className} text-neon`} />;
  return (
    <img
      src={LOGO_URL}
      alt="NEXAH"
      className={`${className} rounded-full border border-white/25 object-cover`}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}

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
          <BrandLogo className="h-8 w-8 transition-transform duration-700 group-hover:rotate-[18deg]" />
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

/* ================= banner LED · atraviesa el portal ================= */
const CAT_COLOR: Record<NewsCat, string> = {
  ARG: ACCENT_HEX.neon,
  MUSIC: ACCENT_HEX.mag,
  TECH: ACCENT_HEX.lime,
  WORLD: ACCENT_HEX.amber,
};

export function LedBanner({ reverse = false, items = "news" }: { reverse?: boolean; items?: "news" | "brand" }) {
  const lines =
    items === "news"
      ? NEWS.map((n) => ({ tag: n.cat, color: CAT_COLOR[n.cat], text: n.title }))
      : [...TICKER, "SEÑAL 108.0 · NEXAH RADIO LAB", ...TICKER].map((t) => ({
          tag: "NEXAH",
          color: ACCENT_HEX.neon,
          text: t,
        }));

  const loop = [...lines, ...lines];

  return (
    <div className="led-banner led-dots relative overflow-hidden py-3.5">
      <div className={`led-track ${reverse ? "led-reverse" : ""}`} style={{ "--speed": items === "news" ? "90s" : "60s" } as CSSProperties}>
        {loop.map((l, i) => (
          <span key={i} className="flex shrink-0 items-center gap-4 pr-10">
            <span
              className="led-text border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.2em]"
              style={{ color: l.color, borderColor: `${l.color}55`, background: `${l.color}12` }}
            >
              {l.tag}
            </span>
            <span className="led-text font-mono text-[12px] font-medium tracking-[0.14em] text-snow/90">{l.text}</span>
            <span className="led-text font-mono text-[12px] text-neon">◆</span>
          </span>
        ))}
      </div>
      {/* viñetas laterales para dar marco de pantalla */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" aria-hidden="true" />
    </div>
  );
}

/* ================= sticker · host individual ================= */
function HostSticker({ host, img, flip = false, className = "" }: { host: HostPersona; img: string; flip?: boolean; className?: string }) {
  const hex = ACCENT_HEX[host.accent];
  return (
    <figure
      className={`float-soft relative w-[190px] shrink-0 border-[3px] border-snow bg-panel shadow-[0_26px_60px_-18px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.04] sm:w-[220px] ${
        flip ? "rotate-[3.5deg]" : "-rotate-[3.5deg]"
      } ${className}`}
      style={{ animationDelay: flip ? "-3s" : "0s" }}
    >
      <span className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-2 bg-snow/14" aria-hidden="true" />
      <div className="relative aspect-[4/5] overflow-hidden">
        <CyberImg src={img} eager className="absolute inset-0" />
      </div>
      <figcaption className="flex items-center justify-between gap-2 px-3.5 py-3">
        <div>
          <p className="font-display text-lg font-extrabold uppercase leading-none tracking-tight" style={{ color: hex }}>
            {host.name}
          </p>
          <p className="mt-1 font-mono text-[8px] tracking-[0.18em] text-mut">{host.role}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 border px-1.5 py-1 font-mono text-[8px] tracking-[0.14em]" style={{ color: hex, borderColor: `${hex}55` }}>
          <span className="led" style={{ background: hex, boxShadow: `0 0 8px ${hex}` }} /> ON
        </span>
      </figcaption>
    </figure>
  );
}

/* ================= sticker duo · cabina en vivo ================= */
export function DuoPoster() {
  const [kiro, luna] = HOSTS;
  return (
    <div className="relative mx-auto flex w-full max-w-[430px] items-end justify-center">
      {/* halo de cabina */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #5ee9ff 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <HostSticker host={kiro} img={IMG.kiro} className="relative z-10 -mr-7" />
      <HostSticker host={luna} img={IMG.luna} flip className="relative z-0 -mb-5" />

      {/* sello EN CABINA */}
      <span className="absolute -top-7 left-1/2 z-20 -translate-x-1/2 rotate-[-5deg] border-2 border-mag bg-ink/85 px-4 py-1.5 font-display text-[13px] font-extrabold uppercase tracking-[0.16em] text-mag shadow-[0_10px_30px_-6px_rgba(255,77,143,0.4)]">
        EN CABINA · EN VIVO
      </span>

      {/* placa inferior */}
      <div className="absolute -bottom-12 left-1/2 z-20 w-[92%] -translate-x-1/2 border border-white/12 bg-abyss/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[9px] leading-relaxed tracking-[0.16em] text-mut">
            {kiro.voice}
            <br />
            {luna.voice}
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-lime">
            <span className="led bg-lime shadow-[0_0_8px_rgba(198,243,91,0.9)]" /> VOICES ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================= apertura · afiche con el dúo ================= */
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

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-16 px-5 pb-32 pt-14 md:px-10 md:pb-36 lg:grid-cols-12 lg:gap-8 lg:pt-16">
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

        {/* protagonista: el dúo en cabina */}
        <div className="relative z-10 pt-6 lg:col-span-5 lg:pt-0">
          <DuoPoster />
        </div>
      </div>

      <LedBanner />
    </section>
  );
}

/* ================= ticker (legacy, se mantiene export) ================= */
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
