import { type ReactNode } from "react";
import { AGENTS, IMG, PIPELINE, PRINCIPLES, ACCENT_HEX, STATS, type Accent } from "../data";
import { useCountUp, useInView } from "../hooks";
import { CyberImg } from "./Img";
import { AGENT_ICONS } from "./Icons";

export const ACCENT_TEXT: Record<Accent, string> = {
  neon: "text-neon",
  mag: "text-mag",
  lime: "text-lime",
  amber: "text-amber",
};

/* ================= cabecera de sección ================= */
export function SectionHead({ index, title, sub }: { index: string; title: ReactNode; sub?: string }) {
  const rv = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={rv.ref} className="max-w-3xl">
      <p className={`rv ${rv.inView ? "in" : ""} flex items-center gap-4 font-mono text-[11px] tracking-[0.32em] text-neon`}>
        <span className="h-px w-10 bg-neon" /> {index}
      </p>
      <h2
        className={`rv ${rv.inView ? "in" : ""} mt-5 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-snow`}
        style={{ transitionDelay: "90ms" }}
      >
        {title}
      </h2>
      {sub && (
        <p className={`rv ${rv.inView ? "in" : ""} mt-5 text-[17px] leading-relaxed text-mut`} style={{ transitionDelay: "180ms" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ================= 01 · manifiesto ================= */
function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const decimals = Number.isInteger(value) ? 0 : 2;
  const v = useCountUp(value, active, 1500, decimals);
  return (
    <div>
      <p className="font-display text-4xl font-bold text-snow md:text-5xl">
        {v.toFixed(decimals)}
        <span className="text-neon">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-mut">{label}</p>
    </div>
  );
}

export function Manifiesto() {
  const rv = useInView<HTMLDivElement>(0.08);
  const stats = useInView<HTMLDivElement>(0.3);
  return (
    <section id="proyecto" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12">
        {/* columna fija */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className={`rv ${rv.inView ? "in" : ""} flex items-center gap-4 font-mono text-[11px] tracking-[0.32em] text-neon`}>
              <span className="h-px w-10 bg-neon" /> 01 — EL PROYECTO
            </p>
            <h2
              className={`rv ${rv.inView ? "in" : ""} mt-5 font-display text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight`}
              style={{ transitionDelay: "90ms" }}
            >
              Radio sin <span className="text-stroke">humanos</span> en cabina.
            </h2>
            <p className={`rv ${rv.inView ? "in" : ""} mt-6 border-l-2 border-neon pl-5 text-lg italic leading-relaxed text-snow/80`} style={{ transitionDelay: "180ms" }}>
              «No reemplazamos a la radio. La liberamos del horario, del cansancio y del silencio.»
            </p>
            <p className={`rv ${rv.inView ? "in" : ""} mt-4 pl-5 font-mono text-[10px] tracking-[0.25em] text-mut`} style={{ transitionDelay: "220ms" }}>
              — NEXAH STUDIOS · DOSSIER 2026
            </p>
          </div>
        </div>

        {/* columna editorial */}
        <div className="lg:col-span-7">
          <div className={`rv ${rv.inView ? "in" : ""} space-y-6 text-[17px] leading-[1.8] text-mut`}>
            <p>
              <strong className="font-semibold text-snow">NEXAH RADIO LAB</strong> es la primera emisora del mundo cuya
              operación completa —curaduría musical, mezcla, conducción, boletín de noticias, artística y atención a la
              audiencia— corre sobre una estructura de <strong className="font-semibold text-neon">agentes de inteligencia artificial</strong>{" "}
              que trabajan coordinados, las 24 horas, los 365 días.
            </p>
            <p>
              No es una playlist automatizada ni un bot que lee títulos: es una <strong className="font-semibold text-snow">redacción sonora</strong>{" "}
              donde cada agente tiene un oficio, una memoria y una decisión que tomar cada segundo. El resultado se
              escucha en la frecuencia digital <strong className="font-semibold text-neon">108.0</strong>, desde Formosa para el mundo.
            </p>
          </div>

          {/* principios */}
          <div className="mt-16">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                className={`rv ${rv.inView ? "in" : ""} group grid gap-5 border-t border-white/8 py-9 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[110px_1fr]`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <span className="font-display text-5xl font-extrabold text-stroke-dim transition-colors duration-300 group-hover:text-neon/70">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-snow">{p.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-mut">{p.text}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/8" />
          </div>

          {/* métricas */}
          <div ref={stats.ref} className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`rv ${stats.inView ? "in" : ""}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <Stat value={s.value} suffix={s.suffix} label={s.label} active={stats.inView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 02 · agentes ================= */
export function Agentes() {
  const rv = useInView<HTMLDivElement>(0.05);
  const [lead, ...crew] = AGENTS;
  const LeadIcon = AGENT_ICONS[lead.icon];

  return (
    <section id="agentes" className="relative scroll-mt-24 border-t border-white/5 bg-abyss/60 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="02 — LA CABINA INTELIGENTE"
          title={
            <>
              Nueve agentes. <span className="text-neon glow-neon">Cero silencio.</span>
            </>
          }
          sub="Cada uno tiene un oficio dentro de la radio: una voz, una curadora, un ingeniero de mezcla, un noticiero, una creativa… Trabajan como un equipo, pero no paran nunca."
        />

        {/* agente principal */}
        <div className={`rv ${rv.inView ? "in" : ""} zoom-hover group relative mt-16 overflow-hidden border border-white/8`}>
          <CyberImg src={IMG.mic} kb zh eager className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/15" aria-hidden="true" />
          <div className="relative flex min-h-[420px] flex-col justify-center gap-5 p-9 md:p-14 lg:max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-neon">
              <span className="led bg-neon shadow-[0_0_10px_rgba(94,233,255,0.9)]" /> {lead.code} · {lead.status}
            </p>
            <h3 className="font-display text-5xl font-extrabold uppercase tracking-tight text-snow md:text-7xl">{lead.name}</h3>
            <p className="font-mono text-[12px] tracking-[0.24em] text-neon">{lead.role.toUpperCase()}</p>
            <p className="max-w-lg text-[16px] leading-relaxed text-snow/75">{lead.desc}</p>
            <div className="mt-3 flex flex-wrap gap-6">
              {lead.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-xl font-bold text-snow">{m.value}</p>
                  <p className="font-mono text-[9px] tracking-[0.24em] text-mut">{m.label}</p>
                </div>
              ))}
            </div>
            <span className="absolute right-8 top-8 hidden text-neon opacity-70 transition-opacity duration-300 group-hover:opacity-100 lg:block">
              <LeadIcon className="h-10 w-10" />
            </span>
          </div>
        </div>

        {/* el resto del equipo */}
        <div ref={rv.ref} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crew.map((a, i) => {
            const Icon = AGENT_ICONS[a.icon];
            const hex = ACCENT_HEX[a.accent];
            return (
              <article
                key={a.code}
                className={`rv ${rv.inView ? "in" : ""} group relative overflow-hidden border border-white/6 bg-panel/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
                  style={{ background: hex }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span style={{ color: hex }}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-mut">{a.code}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-tight text-snow">{a.name}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.22em]" style={{ color: hex }}>
                  {a.role.toUpperCase()}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-mut">{a.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/6 pt-4">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-snow/70">
                    <span className="led" style={{ background: hex }} /> {a.status}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-mut">
                    {a.metrics[0].label} {a.metrics[0].value}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= 03 · cadena de transmisión ================= */
export function Cadena() {
  const rv = useInView<HTMLDivElement>(0.1);
  return (
    <section id="cadena" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="03 — CÓMO SUENA"
          title={
            <>
              La cadena <span className="text-stroke">de transmisión</span>
            </>
          }
          sub="Del dato al aire en menos de un segundo. Así se fabrica cada hora de NEXAH, sin que nadie toque un botón."
        />

        <div ref={rv.ref} className="mt-16 grid gap-px border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE.map((p, i) => (
            <div
              key={p.n}
              className={`rv ${rv.inView ? "in" : ""} group relative bg-ink p-9 transition-colors duration-500 hover:bg-panel`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl font-extrabold text-stroke-dim transition-colors duration-300 group-hover:text-neon/60">
                  {p.n}
                </span>
                <span className="font-mono text-[9px] tracking-[0.24em] text-neon/80">{p.agent}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-snow">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mut">{p.desc}</p>
              <span className="mt-6 block h-px w-10 bg-neon/60 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
