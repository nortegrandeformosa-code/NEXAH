import type { CSSProperties, ReactNode } from "react";
import { ACCENT_HEX, AGENTS, ARCHITECTS, PIPELINE, STATS, type Accent } from "../data";
import { useCountUp, useInView } from "../hooks";
import { AGENT_ICONS, IconAntenna, IconBolt, IconChip } from "./Icons";

export const ACCENT_TEXT: Record<Accent, string> = {
  neon: "text-neon",
  mag: "text-mag",
  lime: "text-lime",
  amber: "text-amber",
};

/* ---------- cabecera de sección ---------- */
export function SectionHead({
  index,
  title,
  sub,
}: {
  index: string;
  title: ReactNode;
  sub?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <p className={`rv ${inView ? "in" : ""} flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-neon`}>
        <span className="inline-block h-px w-10 bg-neon" /> {index}
      </p>
      <h2 className={`mask-line mt-4 ${inView ? "in" : ""}`}>
        <span className="mask-inner font-display text-[clamp(2rem,5.5vw,4.2rem)] font-black leading-[1.02] tracking-tight text-snow">
          {title}
        </span>
      </h2>
      {sub && <p className={`rv ${inView ? "in" : ""} mt-4 max-w-2xl text-base leading-relaxed text-mut`}>{sub}</p>}
    </div>
  );
}

/* ---------- caja de estadística ---------- */
function StatBox({
  value,
  suffix,
  decimals,
  label,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  active: boolean;
  delay: number;
}) {
  const n = useCountUp(value, active, 1700, decimals);
  return (
    <div className={`rv ${active ? "in" : ""} border border-line bg-panel px-4 py-5`} style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-display text-3xl font-black text-neon glow-neon">
        {n.toLocaleString("es-AR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-mag">{suffix}</span>
      </p>
      <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-mut">{label}</p>
    </div>
  );
}

/* ================= 01 · MANIFIESTO ================= */
export function Manifiesto() {
  const left = useInView<HTMLDivElement>(0.15);
  const right = useInView<HTMLDivElement>(0.08);

  const blocks: { label: string; accent: Accent; title: string; body: ReactNode }[] = [
    {
      label: "DEFINICIÓN",
      accent: "neon",
      title: "Qué es NEXAH Radio Lab",
      body: (
        <>
          Una emisora donde <strong className="text-snow">cada rol de una radio profesional está ocupado por un agente
          de inteligencia artificial</strong>: la conducción, la musicalización, la operación técnica, el noticiero, la
          artística, la comunidad y la seguridad. Nueve agentes autónomos coordinados en tiempo real sostienen la
          frecuencia <span className="text-neon">108.0</span> las 24 horas, los 365 días.
        </>
      ),
    },
    {
      label: "LA DIFERENCIA",
      accent: "mag",
      title: "Por qué importa",
      body: (
        <>
          Una radio humana duerpe, se enferma, se distrae. NEXAH no: <strong className="text-snow">cero aire muerto,
          cero silencio, cero error de operador</strong>. Cada franja horaria se programa sola según energía,
          actualidad y audiencia — y cada hora de emisión entrena a la radio de mañana.
        </>
      ),
    },
    {
      label: "IDENTIDAD SONORA",
      accent: "lime",
      title: "Cómo suena",
      body: (
        <>
          Música original de <strong className="text-snow">NEXAH Studios</strong> producida con{" "}
          <span className="text-mag">Suno</span>, experimentos de voz con <span className="text-neon">ElevenLabs</span>,
          artística generativa de MUSE-Δ y una cadena HD normalizada a −14 LUFS. Synthwave, electrónica y rock
          cruzados por una misma señal.
        </>
      ),
    },
    {
      label: "GOBERNANZA",
      accent: "amber",
      title: "Supervisión humana",
      body: (
        <>
          Los agentes operan; los humanos dirigen. La crew original —{" "}
          <strong className="text-snow">Fede, Maia, Gonzo, Ignacio e Iván</strong> — define la línea editorial y puede
          tomar el control de la cabina cuando quiera. Si algo falla, VECTOR-X ejecuta el failsafe en menos de 2
          segundos.
        </>
      ),
    },
  ];

  return (
    <section id="proyecto" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* columna sticky */}
        <div ref={left.ref} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className={`rv ${left.inView ? "in" : ""} flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-neon`}>
              <span className="inline-block h-px w-10 bg-neon" /> 01 / EL PROYECTO
            </p>
            <h2 className={`mask-line mt-4 ${left.inView ? "in" : ""}`}>
              <span className="mask-inner font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[0.98] tracking-tight text-snow">
                LA PRIMERA
                <br />
                RADIO <span className="text-stroke-neon">100%</span>
                <br />
                <span className="text-neon glow-neon">IA.</span>
              </span>
            </h2>
            <p className={`rv ${left.inView ? "in" : ""} mt-6 max-w-md text-base leading-relaxed text-mut`} style={{ transitionDelay: "120ms" }}>
              No es un plugin, no es una playlist con temporizador: es una{" "}
              <strong className="text-snow">estructura radial completa</strong> —cabina, operación, contenido y
              audiencia— delegada a agentes inteligentes que trabajan en equipo, en vivo, sin cortes.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <StatBox key={s.label} {...s} active={left.inView} delay={i * 90} />
              ))}
            </div>

            {/* arquitectos humanos */}
            <div className={`rv ${left.inView ? "in" : ""} mt-10 border border-line bg-panel p-5`} style={{ transitionDelay: "200ms" }}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-mut">LOS ARQUITECTOS · DIRECCIÓN HUMANA</p>
              <div className="mt-4 flex flex-wrap gap-4">
                {ARCHITECTS.map((a) => (
                  <div key={a.name} className="group flex items-center gap-2.5">
                    <span className="notch-sm flex h-10 w-10 items-center justify-center border border-line2 bg-raise font-display text-xs font-bold text-neon transition-all duration-300 group-hover:border-neon group-hover:shadow-[0_0_16px_rgba(0,232,255,0.35)]">
                      {a.initials}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold text-snow">{a.name}</span>
                      <span className="block font-mono text-[9px] tracking-wider text-mut">{a.role}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bloques que fluyen */}
        <div ref={right.ref} className="space-y-6 lg:col-span-7 lg:pt-24">
          {blocks.map((b, i) => (
            <article
              key={b.label}
              className={`rv ${right.inView ? "in" : ""} dossier group relative border border-line bg-panel/70 p-7 md:p-9`}
              style={{ transitionDelay: `${i * 110}ms`, borderLeft: `3px solid ${ACCENT_HEX[b.accent]}` }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className={`font-mono text-[10px] tracking-[0.35em] ${ACCENT_TEXT[b.accent]}`}>▚ {b.label}</p>
                <span className="font-mono text-[10px] tracking-widest text-mut">/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-snow md:text-3xl">{b.title}</h3>
              <p className="mt-4 max-w-xl leading-relaxed text-mut">{b.body}</p>
              <span
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: ACCENT_HEX[b.accent] }}
              />
            </article>
          ))}

          <div className={`rv ${right.inView ? "in" : ""} flex items-center gap-4 border border-dashed border-line2 px-6 py-5`} style={{ transitionDelay: "440ms" }}>
            <IconChip className="h-8 w-8 shrink-0 text-lime" />
            <p className="font-mono text-[11px] leading-relaxed tracking-wider text-mut">
              <span className="text-lime">DATO DURO //</span> Una radio tradicional necesita ~14 personas por día de
              operación. NEXAH funciona con <span className="text-snow">9 agentes + 5 humanos en dirección</span> — y
              nunca, jamás, salió del aire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 02 · AGENTES ================= */
export function Agentes() {
  const head = useInView<HTMLDivElement>(0.1);

  return (
    <section id="agentes" className="relative scroll-mt-20 border-t border-line bg-abyss/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="02 / ESTRUCTURA DE AGENTES"
          title={
            <>
              LA CABINA <span className="text-stroke">SIN HUMANOS</span>
            </>
          }
          sub="Cada agente es un sistema autónomo con un rol radial real. Trabajan en enjambre: se pasan datos, se auditan entre sí y jamás piden permiso para mantener la señal viva."
        />

        <div ref={head.ref} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {AGENTS.map((a, i) => {
            const Icon = AGENT_ICONS[a.icon];
            const hex = ACCENT_HEX[a.accent];
            return (
              <article
                key={a.code}
                className={`rv ${head.inView ? "in" : ""} dossier notch-sm group relative flex flex-col border border-line bg-panel p-6 ${
                  a.big ? "md:col-span-2 xl:row-span-2 xl:p-8" : ""
                }`}
                style={{ transitionDelay: `${i * 70}ms`, "--acc": hex } as CSSProperties}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = hex;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 44px -16px ${hex}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center border transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ borderColor: `${hex}55`, color: hex, background: `${hex}0d` }}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <span className="text-right">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-mut">{a.code}</span>
                    <span className="mt-1 flex items-center justify-end gap-1.5 font-mono text-[9px] tracking-[0.2em]" style={{ color: hex }}>
                      <span className="led" style={{ background: hex, boxShadow: `0 0 8px ${hex}` }} />
                      {a.status}
                    </span>
                  </span>
                </div>

                <h3 className={`mt-5 font-display font-black tracking-tight text-snow ${a.big ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                  {a.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.18em]" style={{ color: hex }}>
                  {a.role.toUpperCase()}
                </p>
                <p className={`mt-4 leading-relaxed text-mut ${a.big ? "max-w-lg text-base" : "text-sm"}`}>{a.desc}</p>

                <div className={`mt-auto grid divide-x divide-line border-t border-line pt-0 ${a.big ? "grid-cols-3 mt-6" : "grid-cols-2 mt-5"}`}>
                  {a.metrics.map((m) => (
                    <div key={m.label} className="px-3 py-3 first:pl-0">
                      <p className="font-display text-sm font-bold text-snow">{m.value}</p>
                      <p className="font-mono text-[9px] tracking-[0.2em] text-mut">{m.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= 03 · LA CADENA ================= */
export function Cadena() {
  const grid = useInView<HTMLDivElement>(0.08);

  return (
    <section id="cadena" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="03 / LA CADENA DE TRANSMISIÓN"
          title={
            <>
              CÓMO SE FABRICA <span className="text-neon glow-neon">UNA HORA DE AIRE</span>
            </>
          }
          sub="Seis etapas, cero intervención manual. El ciclo completo se ejecuta miles de veces por día — esto es lo que pasa entre que el mundo ocurre y vos lo escuchás."
        />

        <div ref={grid.ref} className="relative">
          <div className="dashline absolute left-0 right-0 top-[74px] hidden h-px xl:block" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PIPELINE.map((p, i) => (
              <div
                key={p.n}
                className={`rv ${grid.inView ? "in" : ""} group relative border border-line bg-panel/70 p-6 transition-colors duration-300 hover:border-neon/60`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-black text-stroke transition-all duration-300 group-hover:text-stroke-neon">
                    {p.n}
                  </span>
                  <IconBolt className="h-5 w-5 text-line2 transition-all duration-300 group-hover:translate-y-[-3px] group-hover:text-lime" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold tracking-[0.08em] text-snow">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mut">{p.desc}</p>
                <p className="mt-4 inline-block border border-line px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-neon">
                  {p.agent}
                </p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-neon transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className={`rv ${grid.inView ? "in" : ""} mt-10 flex flex-wrap items-center gap-4 border border-line bg-panel/60 px-6 py-5`} style={{ transitionDelay: "600ms" }}>
          <IconAntenna className="h-9 w-9 shrink-0 text-mag" />
          <p className="max-w-3xl font-mono text-[11px] leading-relaxed tracking-wider text-mut">
            <span className="text-mag">LOOP INFINITO //</span> El ciclo tarda{" "}
            <span className="text-snow">menos de 900 ms</span> de punta a punta. Mientras escuchás esta frase, la
            cadena ya fabricó la siguiente.
          </p>
        </div>
      </div>
    </section>
  );
}
