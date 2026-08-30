import { type CSSProperties } from "react";
import { engine } from "../audio";
import { ACCENT_HEX, IMG, SHOWS, SHOW_IMG, currentShow, showWindow, type Show, type Track } from "../data";
import { useClock, useInView } from "../hooks";
import { CyberImg } from "./Img";
import { IconPlay } from "./Icons";
import { SectionHead } from "./Sections";

const showTrack = (s: Show): Track => ({
  pos: 0,
  title: s.name,
  artist: s.agent,
  genre: s.genre,
  plays: "LIVE",
  trend: 0,
  dur: "∞",
});

/* ================= interludio · torre ================= */
export function Torre() {
  const rv = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative flex h-[74vh] min-h-[520px] items-center overflow-hidden">
      <CyberImg src={IMG.tower} kb eager className="absolute inset-0" />
      <div className="img-veil-t absolute inset-0" aria-hidden="true" />
      <div className="img-veil absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div ref={rv.ref} className="relative mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <p className={`rv ${rv.inView ? "in" : ""} font-mono text-[11px] tracking-[0.32em] text-neon`}>
          <span className="led mr-2 bg-neon shadow-[0_0_8px_rgba(0,232,255,0.9)]" />
          TRANSMISIÓN DESDE EL NODO SUR
        </p>
        <h2 className="mt-5 font-display font-black leading-[0.94]">
          <span className={`mask-line ${rv.inView ? "in" : ""}`}>
            <span className="mask-inner text-stroke text-[clamp(2.6rem,6.5vw,5.4rem)]">UNA RADIO</span>
          </span>
          <span className={`mask-line ${rv.inView ? "in" : ""}`} style={{ transitionDelay: "140ms" }}>
            <span className="mask-inner glow-neon text-[clamp(2.6rem,6.5vw,5.4rem)] text-snow">QUE NO DUERME.</span>
          </span>
        </h2>
        <p
          className={`rv ${rv.inView ? "in" : ""} mt-6 max-w-md text-sm leading-relaxed text-mut`}
          style={{ transitionDelay: "260ms" }}
        >
          La torre nunca corta. Cuando una franja termina, otra señal toma el dial en menos de un segundo — sin
          silencio, sin estática, sin «volvemos enseguida».
        </p>
      </div>

      <div className="absolute bottom-5 right-6 font-mono text-[10px] tracking-[0.28em] text-mut">
        58.18°O · 26.18°S · TX-108
      </div>
      <div className="absolute right-6 top-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-mag">
        <span className="led bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" /> TX ACTIVA
      </div>
    </section>
  );
}

/* ================= galería · la cabina ================= */
export function Cabina() {
  const rv = useInView<HTMLDivElement>(0.08);
  const items = [
    { src: IMG.cabin, tag: "LA CABINA", cap: "3 micrófonos abiertos · 0 humanos de turno", big: true },
    { src: IMG.console, tag: "PULSE-9", cap: "Consola de mezcla · loudness en vivo" },
    { src: IMG.tower, tag: "TX-108", cap: "Torre de emisión · redundancia triple" },
  ];
  return (
    <section className="relative border-t border-line bg-abyss/40 py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="GALERÍA / SEÑAL"
          title={
            <>
              DENTRO DE <span className="glow-neon text-neon">LA MÁQUINA</span>
            </>
          }
          sub="Registro visual de la infraestructura que sostiene el aire: cabina, consola y torre. Todo operado en remoto por los 9 agentes."
        />

        <div ref={rv.ref} className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {items.map((it, i) => (
            <figure
              key={it.tag}
              className={`rv ${rv.inView ? "in" : ""} zoom-hover group relative min-h-[240px] overflow-hidden border border-line transition-colors duration-500 hover:border-neon/60 ${
                it.big ? "md:col-span-2 md:row-span-2 md:min-h-[540px]" : ""
              }`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              <CyberImg src={it.src} kb={it.big} zh className="absolute inset-0" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="absolute left-4 top-4 border border-neon/50 bg-ink/60 px-2 py-1 font-mono text-[10px] tracking-[0.28em] text-neon backdrop-blur-sm">
                {it.tag}
              </span>
              <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.25em] text-mut transition-colors duration-300 group-hover:text-lime">
                REC ●
              </span>
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <span className="font-display text-sm font-bold tracking-wide text-snow md:text-base">{it.cap}</span>
                <span className="led shrink-0 bg-lime shadow-[0_0_8px_rgba(200,255,46,0.9)]" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 04 · parrilla visual ================= */
export function Parrilla() {
  const now = useClock();
  const rv = useInView<HTMLDivElement>(0.05);
  const live = currentShow(now);
  const rest = SHOWS.filter((s) => s.id !== live.id);
  const liveHex = ACCENT_HEX[live.accent];

  return (
    <section id="parrilla" className="relative scroll-mt-20 border-t border-line bg-abyss/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="04 / PARRILLA 2026"
          title={
            <>
              AUTO SIGNALS · <span className="text-stroke">PROGRAMACIÓN CONTINUA</span>
            </>
          }
          sub="Cinco señales propias que rotan sin fricción. El sistema detecta tu franja y resalta lo que está al aire en este exacto momento."
        />

        {/* banner AL AIRE AHORA */}
        <div className={`rv ${rv.inView ? "in" : ""} notch mt-12 grid overflow-hidden border border-line bg-panel lg:grid-cols-2`}>
          <div className="relative flex flex-col justify-center gap-4 p-8 md:p-12">
            <span className="flex w-fit items-center gap-2 border border-mag px-2.5 py-1 font-mono text-[10px] tracking-[0.28em] text-mag">
              <span className="led bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" /> AL AIRE AHORA
            </span>
            <p className="font-mono text-[11px] tracking-[0.28em] text-mut">
              {showWindow(live)} HS · SEÑAL {live.id}
            </p>
            <h3 className="font-display text-4xl font-black tracking-tight text-snow md:text-6xl">{live.name}</h3>
            <p className="font-mono text-[12px] tracking-[0.22em]" style={{ color: liveHex }}>
              {live.genre.toUpperCase()}
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-mut">{live.desc}</p>
            <p className="font-mono text-[11px] tracking-[0.2em]" style={{ color: liveHex }}>
              ▸ {live.agent}
            </p>
            <p className="font-mono text-[10px] tracking-wider text-mut">{live.director}</p>
            <div className="mt-2">
              <button
                onClick={() => engine.tune(showTrack(live), { play: true })}
                className="notch-sm flex items-center gap-2 px-5 py-3 font-display text-[11px] font-bold tracking-[0.22em] text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                style={{ background: liveHex, boxShadow: `0 0 28px -6px ${liveHex}` }}
              >
                <IconPlay className="h-3 w-3" /> SINTONIZAR {live.id}
              </button>
            </div>
          </div>

          <div className="zoom-hover relative min-h-[300px] lg:min-h-[540px]">
            <CyberImg src={SHOW_IMG[live.id]} kb zh eager className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-panel via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-none" aria-hidden="true" />
            <span className="absolute bottom-4 right-5 font-display text-5xl font-black text-stroke opacity-70 md:text-6xl">
              {showWindow(live)}
            </span>
            <span className="absolute left-5 top-5 border border-mag/70 bg-ink/60 px-2 py-1 font-mono text-[10px] tracking-[0.28em] text-mag backdrop-blur-sm">
              {live.id} · EN VIVO
            </span>
          </div>
        </div>

        {/* resto de la parrilla — filas con imagen */}
        <div className="mt-12 space-y-5">
          {rest.map((s, i) => {
            const hex = ACCENT_HEX[s.accent];
            const flip = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`rv ${rv.inView ? "in" : ""} zoom-hover notch group grid overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-line2 lg:grid-cols-2`}
                style={{ transitionDelay: `${i * 90}ms`, "--acc": hex } as CSSProperties}
              >
                <div className={`relative min-h-[250px] lg:min-h-[310px] ${flip ? "lg:order-2" : ""}`}>
                  <CyberImg src={SHOW_IMG[s.id]} zh className="absolute inset-0" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent ${
                      flip ? "lg:bg-gradient-to-l" : "lg:bg-gradient-to-r"
                    } lg:from-transparent lg:via-transparent lg:to-panel`}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute left-4 top-4 border px-2 py-1 font-mono text-[10px] tracking-[0.28em]"
                    style={{ color: hex, borderColor: `${hex}66`, background: "rgba(4,6,13,0.6)" }}
                  >
                    {s.id}
                  </span>
                  <span className="absolute bottom-3 left-4 font-display text-3xl font-black tracking-tight text-snow md:text-4xl">
                    {showWindow(s)}
                  </span>
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.25em] text-mut">
                    AUTO · 24/7
                  </span>
                </div>

                <div className={`flex flex-col gap-3 p-8 md:p-10 ${flip ? "lg:order-1" : ""}`}>
                  <p className="font-mono text-[10px] tracking-[0.28em]" style={{ color: hex }}>
                    AUTO SIGNAL · {s.agent}
                  </p>
                  <h3 className="font-display text-3xl font-black tracking-tight text-snow transition-colors duration-300 group-hover:text-[var(--acc)] md:text-4xl">
                    {s.name}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-mut">{s.genre.toUpperCase()}</p>
                  <p className="max-w-xl text-sm leading-relaxed text-mut">{s.desc}</p>
                  <p className="font-mono text-[10px] tracking-wider text-mut">{s.director}</p>
                  <div className="mt-auto flex items-center gap-4 pt-3">
                    <button
                      onClick={() => engine.tune(showTrack(s), { play: true })}
                      className="notch-sm flex items-center gap-2 px-4 py-2.5 font-display text-[11px] font-bold tracking-[0.2em] text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                      style={{ background: hex }}
                    >
                      <IconPlay className="h-3 w-3" /> INICIAR SEÑAL
                    </button>
                    <span className="dashline h-px flex-1 opacity-40" />
                    <span className="font-mono text-[10px] tracking-[0.22em] text-mut">HD 320K</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className={`rv ${rv.inView ? "in" : ""} mt-8 font-mono text-[11px] tracking-[0.2em] text-mut`}
          style={{ transitionDelay: "450ms" }}
        >
          <span className="text-amber">◈</span> PULSO NEXAH es el único programa híbrido: humanos en la mesa, agentes
          en la cabina. El resto del dial corre 100% autónomo.
        </p>
      </div>
    </section>
  );
}
