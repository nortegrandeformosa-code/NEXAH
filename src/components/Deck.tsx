import { useEffect, useState } from "react";
import { engine } from "../audio";
import { CHART, TICKER, currentShow, pad2 } from "../data";
import { useClock, useInView, useScramble } from "../hooks";
import { IconLogo, IconPlay, IconSignal } from "./Icons";
import { Visualizer } from "./Player";

const NAV = [
  { href: "#proyecto", label: "PROYECTO" },
  { href: "#agentes", label: "AGENTES" },
  { href: "#cadena", label: "CADENA" },
  { href: "#parrilla", label: "PARRILLA" },
  { href: "#musica", label: "MÚSICA" },
  { href: "#partners", label: "PARTNERS" },
];

/* ================= header ================= */
export function Header() {
  const now = useClock();
  const [open, setOpen] = useState(false);
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const playing = engine.state.playing;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <IconLogo className="h-8 w-8 text-neon transition-transform duration-500 group-hover:rotate-[30deg]" />
          <span className="leading-none">
            <span className="block font-display text-lg font-black tracking-[0.18em] text-snow">NEXAH</span>
            <span className="block font-mono text-[9px] tracking-[0.42em] text-neon">RADIO LAB</span>
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative font-mono text-[11px] tracking-[0.22em] text-mut transition-colors hover:text-neon"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-neon transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden font-mono text-[11px] tracking-widest text-mut md:block">
            {pad2(now.getHours())}:{pad2(now.getMinutes())}
            <span className="text-neon">:{pad2(now.getSeconds())}</span>
          </span>
          <span className="hidden items-center gap-1.5 border border-line px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-snow sm:flex">
            <span className="led bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" /> ON AIR
          </span>
          <button
            onClick={() => engine.toggle()}
            className={`notch-sm flex items-center gap-2 px-4 py-2 font-display text-[11px] font-bold tracking-[0.18em] transition-all duration-300 active:scale-95 ${
              playing
                ? "bg-mag text-ink shadow-[0_0_20px_rgba(255,46,126,0.45)]"
                : "bg-neon text-ink shadow-[0_0_20px_rgba(0,232,255,0.4)] hover:shadow-[0_0_32px_rgba(0,232,255,0.6)]"
            }`}
          >
            <IconPlay className="h-3 w-3" />
            {playing ? "EN VIVO ●" : "ESCUCHAR"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line text-snow lg:hidden"
          >
            <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-abyss px-6 py-4 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 font-mono text-xs tracking-[0.25em] text-mut last:border-0 hover:text-neon"
            >
              ▸ {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ================= consola de apertura ================= */
export function Hero() {
  const { out, done } = useScramble("NEXAH", 250);
  const sub = useInView<HTMLDivElement>(0.1);
  const now = useClock();
  const [, force] = useState(0);
  const [trackIdx, setTrackIdx] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const st = engine.state;
  const show = currentShow(now);

  const nextTrack = () => {
    const i = (trackIdx + 1) % CHART.length;
    setTrackIdx(i);
    engine.tune(CHART[i], { play: true });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* capas de fondo */}
      <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e8ff 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] left-[-8%] h-[480px] w-[480px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff2e7e 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute right-2 top-28 hidden select-none font-display text-[11rem] font-black leading-none text-stroke opacity-[0.06] xl:block" aria-hidden="true">
        108.0
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 pb-16 pt-14 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* columna editorial */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-neon">
            <span className="led bg-neon shadow-[0_0_8px_rgba(0,232,255,0.9)]" />
            TRANSMISIÓN GLOBAL · 24/7 · FORMOSA → MUNDO
          </p>

          <h1 className="mt-6 font-display font-black leading-[0.92] tracking-tight">
            <span className="glitch glitch-live block text-[clamp(4.2rem,12vw,10rem)] text-snow glow-neon" data-text={done ? "NEXAH" : out}>
              {out || "\u00A0"}
            </span>
            <span ref={sub.ref} className={`mask-line ${sub.inView ? "in" : ""}`}>
              <span className="mask-inner text-stroke text-[clamp(2.6rem,7.5vw,6.2rem)]">RADIO LAB</span>
            </span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="border border-neon/50 px-2 py-1 font-mono text-[11px] tracking-[0.25em] text-neon">
              108.0 · FRECUENCIA DIGITAL
            </span>
            <span className="border border-line px-2 py-1 font-mono text-[11px] tracking-[0.25em] text-mut">
              SEÑAL 100% AUTÓNOMA
            </span>
          </div>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mut">
            La <strong className="font-semibold text-snow">primera radio del mundo</strong> operada de punta a punta por
            una estructura de <strong className="font-semibold text-neon">agentes de inteligencia artificial</strong>:
            curan, mezclan, conducen, informan y responden — sin pausas, sin silencios, sin turno noche. Los humanos
            diseñamos el sistema. Los agentes lo mantienen al aire.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => engine.toggle()}
              className={`notch group flex items-center gap-3 px-7 py-4 font-display text-sm font-black tracking-[0.2em] transition-all duration-300 active:scale-95 ${
                st.playing
                  ? "bg-mag text-ink shadow-[0_0_36px_rgba(255,46,126,0.5)]"
                  : "bg-neon text-ink shadow-[0_0_36px_rgba(0,232,255,0.45)] hover:shadow-[0_0_56px_rgba(0,232,255,0.7)]"
              }`}
            >
              <IconPlay className={`h-4 w-4 transition-transform ${st.playing ? "" : "group-hover:translate-x-0.5"}`} />
              {st.playing ? "SEÑAL EN VIVO — CORTAR" : "SINTONIZAR 108.0"}
            </button>
            <a
              href="#proyecto"
              className="notch border border-line2 px-7 py-4 font-display text-sm font-bold tracking-[0.2em] text-snow transition-colors duration-300 hover:border-neon hover:text-neon"
            >
              LEER EL MANIFIESTO ↓
            </a>
          </div>

          {/* lecturas rápidas */}
          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line border border-line">
            {[
              ["99.98%", "UPTIME"],
              ["<40 MS", "LATENCIA"],
              ["9/9", "AGENTES ONLINE"],
            ].map(([v, l]) => (
              <div key={l} className="px-4 py-3">
                <p className="font-display text-lg font-bold text-snow">{v}</p>
                <p className="font-mono text-[10px] tracking-[0.2em] text-mut">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* consola de señal */}
        <div className="relative lg:col-span-5">
          <div className="absolute -inset-10 -z-10 hidden items-center justify-center lg:flex" aria-hidden="true">
            <div className="radar-sweep h-[480px] w-[480px] rounded-full opacity-60" />
            <div className="absolute h-[480px] w-[480px] rounded-full border border-neon/15" />
            <div className="absolute h-[340px] w-[340px] rounded-full border border-neon/10" />
            <div className="ring-pulse absolute h-[340px] w-[340px] rounded-full border border-neon/25" />
          </div>

          <div className="notch relative border border-line bg-panel/85 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-mut">
                <IconSignal className="h-3.5 w-3.5 text-neon" /> SIGNAL FEED
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-mag">
                <span className="led bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" /> LIVE{" "}
                <span className="text-mut">
                  {pad2(now.getHours())}:{pad2(now.getMinutes())}:{pad2(now.getSeconds())}
                </span>
              </span>
            </div>

            <div className="px-5 pt-4">
              <Visualizer bars={52} vu className="h-44 w-full" />
            </div>

            <div className="grid grid-cols-4 divide-x divide-line border-y border-line text-center">
              {[
                ["108.0", "MHZ"],
                ["320", "KBPS"],
                ["−14", "LUFS"],
                ["HD", "MODO"],
              ].map(([v, l]) => (
                <div key={l} className="px-1 py-2.5">
                  <p className="font-display text-sm font-bold text-neon">{v}</p>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-mut">{l}</p>
                </div>
              ))}
            </div>

            {/* sonando ahora */}
            <div className="space-y-3 p-5">
              <p className="font-mono text-[10px] tracking-[0.3em] text-mut">SONANDO AHORA</p>
              <div className="flex items-center gap-3 border border-line bg-raise px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon/40 font-display text-lg font-black text-neon">
                  {st.track.pos}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold tracking-wide text-snow">{st.track.title.toUpperCase()}</p>
                  <p className="truncate font-mono text-[11px] text-mut">
                    {st.track.artist} · {st.track.genre}
                  </p>
                </div>
                <button
                  onClick={nextTrack}
                  className="ml-auto shrink-0 border border-line px-2 py-1 font-mono text-[10px] tracking-widest text-mut transition-colors hover:border-neon hover:text-neon"
                  aria-label="Siguiente tema"
                >
                  SIG ▸
                </button>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-mut">
                <span>
                  FRONTE: <span className="text-amber">{show.id}</span> {show.name}
                </span>
                <span className="flicker text-neon">NEXAH ID ACTIVE</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-right font-mono text-[10px] tracking-[0.25em] text-mut">
            26.18°S · 58.18°O — NODO SUR
          </p>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

/* ================= ticker ================= */
export function Ticker({ reverse = false }: { reverse?: boolean }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-line bg-abyss py-3">
      <div className={`ticker-track ${reverse ? "ticker-reverse" : ""}`}>
        {items.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[11px] tracking-[0.25em] text-mut">
            <span className={i % 2 ? "text-mag" : "text-neon"}>▲</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
