import { engine } from "../audio";
import { ACCENT_HEX, HOSTS, IMG, SHOWS, SHOW_IMG, currentShow, showWindow, type Show, type Track } from "../data";
import { useClock, useInView } from "../hooks";
import { CyberImg } from "./Img";
import { IconPlay } from "./Icons";
import { BackstageVideo } from "./Media";
import { SectionHead } from "./Sections";

/* mini avatar pop art */
function MiniHost({ img, name, accent }: { img: string; name: string; accent: string }) {
  return (
    <span className="group/mini relative inline-flex flex-col items-center">
      <span
        className="block h-14 w-14 -rotate-3 overflow-hidden rounded-full border-2 border-snow shadow-lg transition-transform duration-300 group-hover/mini:rotate-0 group-hover/mini:scale-110"
        style={{ boxShadow: `0 0 0 3px ${accent}33` }}
      >
        <CyberImg src={img} eager className="h-full w-full" />
      </span>
      <span className="mt-1.5 font-mono text-[8px] tracking-[0.18em] text-mut">{name}</span>
    </span>
  );
}

const showTrack = (s: Show): Track => ({
  pos: 0,
  title: s.name,
  artist: s.agent,
  genre: s.genre,
  plays: "LIVE",
  trend: 0,
  dur: "∞",
});

/* ================= interludio · la torre ================= */
export function Torre() {
  const rv = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <CyberImg src={IMG.tower} kb eager className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" aria-hidden="true" />

      <div ref={rv.ref} className="relative mx-auto w-full max-w-[1400px] px-5 py-28 md:px-10">
        <p className={`rv ${rv.inView ? "in" : ""} font-mono text-[11px] tracking-[0.34em] text-neon`}>
          <span className="led mr-3 bg-neon shadow-[0_0_10px_rgba(94,233,255,0.9)]" />
          TX-108 · TRANSMITIENDO DESDE EL NODO SUR
        </p>
        <h2 className="mt-7 font-display font-extrabold uppercase leading-[0.95] tracking-tight">
          <span className={`mask-line ${rv.inView ? "in" : ""}`}>
            <span className="mask-inner text-[clamp(2.8rem,7vw,6rem)] text-snow">La señal</span>
          </span>
          <span className={`mask-line ${rv.inView ? "in" : ""}`} style={{ transitionDelay: "130ms" }}>
            <span className="mask-inner text-[clamp(2.8rem,7vw,6rem)] text-stroke">no duerme.</span>
          </span>
        </h2>
        <p className={`rv ${rv.inView ? "in" : ""} mt-8 max-w-md text-lg leading-relaxed text-snow/75`} style={{ transitionDelay: "260ms" }}>
          Cuando una franja termina, otra señal toma el dial en menos de un segundo. Sin silencio. Sin estática.
          Sin «volvemos enseguida».
        </p>
      </div>

      <span className="absolute bottom-6 right-8 font-mono text-[10px] tracking-[0.28em] text-snow/50">
        58.18°O · 26.18°S
      </span>
    </section>
  );
}

/* ================= galería · la cabina ================= */
export function Cabina() {
  const rv = useInView<HTMLDivElement>(0.08);
  const items = [
    { src: IMG.cabin, cap: "La cabina — 3 micrófonos abiertos, 0 humanos de turno", wide: true },
    { src: IMG.console, cap: "PULSE-9 — mezcla y loudness en vivo" },
    { src: IMG.rock, cap: "NEXAH ROCK — la guitarra nunca se apaga" },
  ];
  return (
    <section className="relative border-t border-white/5 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="GALERÍA / INFRAESTRUCTURA"
          title={
            <>
              Dentro de <span className="text-neon glow-neon">la máquina</span>
            </>
          }
          sub="La infraestructura que sostiene el aire, operada en remoto por los nueve agentes."
        />

        <div ref={rv.ref} className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <figure
              key={it.cap}
              className={`rv ${rv.inView ? "in" : ""} zoom-hover group relative min-h-[280px] overflow-hidden border border-white/8 transition-colors duration-500 hover:border-white/25 ${
                it.wide ? "md:col-span-2 md:min-h-[480px]" : "md:min-h-[340px]"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <CyberImg src={it.src} kb={it.wide} zh className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                <span className="text-[15px] font-medium text-snow/90">{it.cap}</span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-mag">
                  <span className="led bg-mag shadow-[0_0_8px_rgba(255,77,143,0.9)]" /> REC
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 04 · parrilla ================= */
export function Parrilla() {
  const now = useClock();
  const rv = useInView<HTMLDivElement>(0.05);
  const live = currentShow(now);
  const rest = SHOWS.filter((s) => s.id !== live.id);
  const liveHex = ACCENT_HEX[live.accent];

  return (
    <section id="parrilla" className="relative scroll-mt-24 border-t border-white/5 bg-abyss/60 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="04 — PARRILLA 2026"
          title={
            <>
              Cinco señales, <span className="text-stroke">un solo dial</span>
            </>
          }
          sub="La programación rota sola según tu franja horaria. Lo que está sonando en este exacto momento, en tu zona:"
        />

        {/* ahora al aire */}
        <div className={`rv ${rv.inView ? "in" : ""} zoom-hover group relative mt-16 overflow-hidden border border-white/10`}>
          <CyberImg src={SHOW_IMG[live.id]} kb zh eager className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/20" aria-hidden="true" />
          <div className="relative grid min-h-[480px] gap-8 p-9 md:p-14 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-5">
              <span className="flex w-fit items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-mag">
                <span className="led bg-mag shadow-[0_0_10px_rgba(255,77,143,0.9)]" /> AL AIRE AHORA · {showWindow(live)} HS
              </span>
              <h3 className="font-display text-5xl font-extrabold uppercase leading-[0.98] tracking-tight text-snow md:text-7xl">
                {live.name}
              </h3>
              <p className="font-mono text-[12px] tracking-[0.22em]" style={{ color: liveHex }}>
                {live.genre.toUpperCase()}
              </p>
              <p className="max-w-lg text-[16px] leading-relaxed text-snow/75">{live.desc}</p>
              <p className="font-mono text-[11px] tracking-[0.18em] text-mut">
                {live.agent} — {live.director}
              </p>
              <div className="flex items-center gap-5">
                {HOSTS.map((h) => (
                  <MiniHost key={h.name} img={IMG[h.name.toLowerCase() as "kiro" | "luna"]} name={h.name} accent={ACCENT_HEX[h.accent]} />
                ))}
                <p className="font-mono text-[10px] leading-relaxed tracking-[0.14em] text-mut">
                  VOZ: <span className="text-snow">{live.voice}</span>
                </p>
              </div>
              <div className="mt-2 flex items-center gap-5">
                <button
                  onClick={() => engine.tune(showTrack(live), { play: true })}
                  className="btn-primary flex items-center gap-3 px-7 py-3.5 font-display text-[12px] font-bold tracking-[0.18em]"
                >
                  <IconPlay className="h-3.5 w-3.5" /> SINTONIZAR AHORA
                </button>
                <span className="font-mono text-[11px] tracking-[0.2em] text-mut">HD · 320 KBPS</span>
              </div>
            </div>
            <span className="pointer-events-none hidden select-none justify-self-end font-display text-[9rem] font-extrabold leading-none text-stroke-dim lg:block" aria-hidden="true">
              {live.id}
            </span>
          </div>
        </div>

        {/* resto */}
        <div className="mt-16 space-y-20">
          {rest.map((s, i) => {
            const hex = ACCENT_HEX[s.accent];
            const flip = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`rv ${rv.inView ? "in" : ""} zoom-hover grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`relative min-h-[320px] overflow-hidden border border-white/8 lg:min-h-[400px] ${flip ? "lg:order-2" : ""}`}>
                  <CyberImg src={SHOW_IMG[s.id]} zh className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-5 left-6 font-display text-4xl font-extrabold text-snow drop-shadow-lg">
                    {showWindow(s)}
                  </span>
                  <span
                    className="absolute right-5 top-5 border px-2.5 py-1 font-mono text-[10px] tracking-[0.26em] backdrop-blur-sm"
                    style={{ color: hex, borderColor: `${hex}66`, background: "rgba(7,10,19,0.55)" }}
                  >
                    {s.id} · AUTO 24/7
                  </span>
                </div>

                <div className={flip ? "lg:order-1" : ""}>
                  <p className="font-mono text-[11px] tracking-[0.28em]" style={{ color: hex }}>
                    AUTO SIGNAL — {s.agent}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[1] tracking-tight text-snow md:text-5xl">
                    {s.name}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.22em] text-mut">{s.genre.toUpperCase()}</p>
                  <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-mut">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-mut/80">{s.director}</p>
                    <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: hex }}>
                      ◉ VOZ {s.voice}
                    </p>
                  </div>
                  <button
                    onClick={() => engine.tune(showTrack(s), { play: true })}
                    className="group/btn mt-8 flex items-center gap-3 font-display text-[12px] font-bold tracking-[0.2em] text-snow transition-colors duration-300 hover:text-neon"
                  >
                    <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-all duration-300 group-hover/btn:border-neon group-hover/btn:shadow-[0_0_24px_rgba(94,233,255,0.35)]">
                      <IconPlay className="h-3.5 w-3.5" />
                    </span>
                    INICIAR SEÑAL
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-16 border-l-2 border-amber pl-5 font-mono text-[11px] leading-relaxed tracking-[0.16em] text-mut">
          <span className="text-amber">◈</span> PULSO NEXAH ES EL ÚNICO PROGRAMA HÍBRIDO: HUMANOS EN LA MESA, AGENTES EN
          LA CABINA. EL RESTO DEL DIAL CORRE 100% AUTÓNOMO.
        </p>
      </div>
    </section>
  );
}

/* ================= backstage · video de producción ================= */
export function Backstage() {
  const rv = useInView<HTMLDivElement>(0.2);
  return (
    <section className="relative border-t border-white/5">
      <div className="mx-auto grid max-w-[1400px] items-stretch px-5 py-28 md:px-10 lg:grid-cols-12 lg:gap-12">
        <div ref={rv.ref} className="flex flex-col justify-center lg:col-span-5">
          <p className={`rv ${rv.inView ? "in" : ""} font-mono text-[11px] tracking-[0.34em] text-mag`}>
            <span className="led mr-3 bg-mag shadow-[0_0_10px_rgba(255,77,143,0.9)]" />
            BACK DE PRODUCCIÓN · DETRÁS DEL AIRE
          </p>
          <h2 className="mt-6 font-display font-extrabold uppercase leading-[0.94] tracking-tight">
            <span className={`mask-line ${rv.inView ? "in" : ""}`}>
              <span className="mask-inner text-5xl text-snow md:text-6xl">La sala</span>
            </span>
            <span className={`mask-line ${rv.inView ? "in" : ""}`} style={{ transitionDelay: "120ms" }}>
              <span className="mask-inner glow-mag text-5xl text-mag md:text-6xl">de máquinas</span>
            </span>
          </h2>
          <p className={`rv ${rv.inView ? "in" : ""} mt-7 max-w-md leading-relaxed text-mut`} style={{ transitionDelay: "200ms" }}>
            Mientras KIRO y LUNA están al aire, el back de producción no se detiene: servidores, modelos de voz y el
            motor de streaming trabajan en bucle. Así se ve el turno que nunca termina.
          </p>
          <div className={`rv ${rv.inView ? "in" : ""} mt-9 grid grid-cols-3 gap-px border-t border-white/10 pt-6`} style={{ transitionDelay: "280ms" }}>
            {[
              ["3", "réplicas de streaming"],
              ["24/7", "render de voces"],
              ["0", "operador humano de turno"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-snow">{v}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mut">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 min-h-[380px] overflow-hidden border border-white/10 lg:col-span-7 lg:mt-0 lg:min-h-[520px]">
          <BackstageVideo />
        </div>
      </div>
    </section>
  );
}
