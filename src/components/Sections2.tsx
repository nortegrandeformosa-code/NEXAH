import { useEffect, useState, type FormEvent } from "react";
import { engine } from "../audio";
import {
  ACCENT_HEX,
  CHART,
  LIBRARY,
  LOG_LINES,
  NEWS,
  NEWS_CATS,
  PARTNERS,
  SHOWS,
  currentShow,
  pad2,
  showWindow,
  type NewsCat,
} from "../data";
import { useClock, useInView, useListeners, usePrefersReducedMotion } from "../hooks";
import { IconDown, IconExt, IconFlat, IconLogo, IconSend, IconUp, IconCheck } from "./Icons";
import { Ticker } from "./Deck";
import { ACCENT_TEXT, SectionHead } from "./Sections";

/* ================= 04 · PARRILLA ================= */
export function Parrilla() {
  const now = useClock();
  const grid = useInView<HTMLDivElement>(0.06);
  const live = currentShow(now);

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

        <div ref={grid.ref} className="space-y-3">
          {SHOWS.map((s, i) => {
            const isLive = s.id === live.id;
            const hex = ACCENT_HEX[s.accent];
            return (
              <div
                key={s.id}
                className={`rv ${grid.inView ? "in" : ""} group relative grid gap-4 border bg-panel/70 p-6 transition-all duration-300 md:grid-cols-[110px_1fr_auto] md:items-center ${
                  isLive ? "border-mag/70 shadow-[0_0_44px_-14px_rgba(255,46,126,0.55)]" : "border-line hover:border-line2 hover:bg-panel"
                }`}
                style={{ transitionDelay: `${i * 80}ms`, borderLeft: `3px solid ${hex}` }}
              >
                <div>
                  <p className="font-display text-xl font-black tracking-wide" style={{ color: hex }}>
                    {showWindow(s)}
                  </p>
                  <p className="mt-1 inline-block border border-line px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-mut">
                    {s.id}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-black tracking-tight text-snow md:text-3xl">{s.name}</h3>
                    {isLive && (
                      <span className="flex items-center gap-1.5 border border-mag px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-mag">
                        <span className="led bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" /> AL AIRE AHORA
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-mut">{s.genre.toUpperCase()}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mut">{s.desc}</p>
                </div>

                <div className="text-left md:text-right">
                  <p className="font-mono text-[10px] tracking-[0.18em]" style={{ color: hex }}>
                    ▸ {s.agent}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-mut">{s.director}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className={`rv ${grid.inView ? "in" : ""} mt-8 font-mono text-[11px] tracking-[0.2em] text-mut`} style={{ transitionDelay: "500ms" }}>
          <span className="text-amber">◈</span> PULSO NEXAH es el único programa híbrido: humanos en la mesa, agentes
          en la cabina. El resto del dial corre 100% autónomo.
        </p>
      </div>
    </section>
  );
}

/* ================= 05 · MÚSICA ================= */
export function Musica() {
  const head = useInView<HTMLDivElement>(0.06);
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const current = engine.state.track;

  return (
    <section id="musica" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="05 / MÚSICA"
          title={
            <>
              EL SONIDO <span className="text-mag glow-mag">DE LA MÁQUINA</span>
            </>
          }
          sub="Un chart curado por ARIA-7 con datos reales de la señal y la biblioteca original de NEXAH Studios. Hacé clic en cualquier tema para sintonizarlo."
        />

        <div ref={head.ref} className="grid gap-10 lg:grid-cols-12">
          {/* chart */}
          <div className={`rv ${head.inView ? "in" : ""} lg:col-span-7`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-black tracking-[0.08em] text-snow">TOP NEXAH 10</h3>
              <span className="font-mono text-[10px] tracking-[0.25em] text-mag">CURADO POR ARIA-7 · SEMANA 35</span>
            </div>
            <div className="border border-line bg-panel/60">
              {CHART.map((t, i) => {
                const isCurrent = current.title === t.title;
                return (
                  <button
                    key={t.pos}
                    onClick={() => engine.tune(t, { play: true })}
                    className={`group grid w-full grid-cols-[38px_20px_1fr_auto] items-center gap-3 border-b border-line/70 px-4 py-3 text-left transition-all duration-200 last:border-0 md:grid-cols-[46px_24px_1fr_90px_60px] ${
                      isCurrent ? "bg-raise shadow-[inset_3px_0_0_#00e8ff]" : "hover:bg-raise/70"
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    aria-label={`Sintonizar ${t.title}`}
                  >
                    <span
                      className={`font-display text-xl font-black ${
                        t.pos <= 3 ? "text-neon glow-neon" : "text-stroke"
                      }`}
                    >
                      {pad2(t.pos)}
                    </span>
                    <span>
                      {t.trend === 1 && <IconUp className="h-3.5 w-3.5 text-lime" />}
                      {t.trend === -1 && <IconDown className="h-3.5 w-3.5 text-mag" />}
                      {t.trend === 0 && <IconFlat className="h-3.5 w-3.5 text-mut" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-sm font-bold tracking-wide text-snow">
                        {t.title.toUpperCase()}
                        {isCurrent && <span className="ml-2 font-mono text-[9px] tracking-widest text-neon">▸ SONANDO</span>}
                      </span>
                      <span className="block truncate font-mono text-[11px] text-mut">
                        {t.artist} · {t.genre}
                      </span>
                    </span>
                    <span className="hidden text-right font-mono text-[11px] text-mut md:block">{t.plays} ▸</span>
                    <span className="text-right font-mono text-[11px] text-mut">{t.dur}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-mut">
              ▲ SUBE · ▼ BAJA · ▶ = REPRODUCCIONES 7D — CLICK PARA SINTONIZAR
            </p>
          </div>

          {/* biblioteca */}
          <div className={`rv ${head.inView ? "in" : ""} lg:col-span-5`} style={{ transitionDelay: "150ms" }}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-black tracking-[0.08em] text-snow">BIBLIOTECA NEXAH</h3>
              <span className="font-mono text-[10px] tracking-[0.25em] text-lime">PRODUCIDA CON SUNO</span>
            </div>
            <div className="border border-line bg-panel/60">
              {LIBRARY.map((l) => (
                <a
                  key={l.title}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 border-b border-line/70 px-4 py-3 transition-colors duration-200 last:border-0 hover:bg-raise/70"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-mag/40 font-display text-sm font-black text-mag transition-all duration-300 group-hover:bg-mag group-hover:text-ink">
                    N
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[13px] font-bold tracking-wide text-snow">
                      {l.title}
                    </span>
                    <span className="block font-mono text-[10px] tracking-wider text-mut">
                      {l.kind} · {l.dur}
                    </span>
                  </span>
                  <IconExt className="h-4 w-4 shrink-0 text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mag" />
                </a>
              ))}
            </div>
            <div className="mt-3 border border-dashed border-line2 px-4 py-3">
              <p className="font-mono text-[10px] leading-relaxed tracking-wider text-mut">
                <span className="text-mag">MUSE-Δ //</span> «Cada jingle, mashup y separador de la señal nace acá. La
                artística se regenera sola cada temporada.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FEED ORACLE-3 ================= */
const CAT_ACCENT: Record<NewsCat, string> = { ARG: "#00e8ff", MUSIC: "#ff2e7e", TECH: "#c8ff2e", WORLD: "#ffb02e" };

export function Feed() {
  const [cat, setCat] = useState<NewsCat | "ALL">("ALL");
  const grid = useInView<HTMLDivElement>(0.06);
  const now = useClock(30000);
  const items = cat === "ALL" ? NEWS : NEWS.filter((n) => n.cat === cat);

  return (
    <section id="feed" className="relative scroll-mt-20 border-t border-line bg-abyss/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="WIRE / ORACLE-3"
          title={
            <>
              EL NOTICIERO <span className="text-lime">QUE NUNCA PARPADEA</span>
            </>
          }
          sub={`ORACLE-3 cruza 128 fuentes y redacta el boletín de cada hora. Este es su cable ahora mismo — ${pad2(now.getHours())}:${pad2(now.getMinutes())} hs.`}
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {NEWS_CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`notch-sm px-4 py-2 font-mono text-[11px] tracking-[0.22em] transition-all duration-300 ${
                cat === c.key
                  ? "bg-neon text-ink shadow-[0_0_20px_rgba(0,232,255,0.4)]"
                  : "border border-line text-mut hover:border-neon/60 hover:text-neon"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div ref={grid.ref} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((n, i) => (
            <a
              key={n.title}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className={`rv ${grid.inView ? "in" : ""} dossier group flex flex-col border border-line bg-panel/70 p-5`}
              style={{ transitionDelay: `${(i % 6) * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.25em]"
                  style={{ color: CAT_ACCENT[n.cat], border: `1px solid ${CAT_ACCENT[n.cat]}55`, background: `${CAT_ACCENT[n.cat]}0f` }}
                >
                  {n.cat}
                </span>
                <IconExt className="h-4 w-4 text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
              </div>
              <p className="mt-4 flex-1 text-[15px] font-medium leading-snug text-snow transition-colors group-hover:text-neon">
                {n.title}
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-mut">FUENTE: {n.source.toUpperCase()}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 06 · PARTNERS ================= */
export function Partners() {
  const grid = useInView<HTMLDivElement>(0.08);
  const banco = PARTNERS[0];
  const resto = PARTNERS.slice(1);

  return (
    <section id="partners" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <SectionHead
          index="06 / DOSSIER PARTNERS"
          title={
            <>
              LOS ALIADOS <span className="text-amber">DE LA SEÑAL</span>
            </>
          }
          sub="Marcas y plataformas que bancan la frecuencia. El dossier completo para partners está disponible bajo pedido en partnerships@nexah.radio."
        />

        <div ref={grid.ref} className="grid gap-4 lg:grid-cols-3">
          {/* sponsor principal */}
          <a
            href={banco.url}
            target="_blank"
            rel="noreferrer"
            className={`rv ${grid.inView ? "in" : ""} dossier notch group relative flex flex-col border border-amber/40 bg-panel p-8 lg:col-span-2`}
            style={{ background: "linear-gradient(135deg, rgba(255,176,46,0.07), rgba(10,17,31,0.9) 55%)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-amber">◆ {banco.tag}</span>
              <IconExt className="h-5 w-5 text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
            </div>
            <h3 className="mt-6 font-display text-4xl font-black tracking-tight text-snow md:text-5xl">{banco.name}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-mut">{banco.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {banco.campaigns?.map((c) => (
                <span
                  key={c.title}
                  className="border border-line2 px-3 py-2 font-mono text-[11px] tracking-wider text-snow transition-colors duration-300 group-hover:border-amber/50"
                >
                  {c.title} ↗
                </span>
              ))}
            </div>
          </a>

          {/* stack tecnológico */}
          <div className="flex flex-col gap-4">
            {resto.map((p, i) => {
              const hex = ACCENT_HEX[p.accent];
              return (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rv ${grid.inView ? "in" : ""} dossier group flex-1 border border-line bg-panel p-6`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms`, borderLeft: `3px solid ${hex}` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.3em]" style={{ color: hex }}>
                      {p.tag}
                    </span>
                    <IconExt className="h-4 w-4 text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-black tracking-tight text-snow">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mut">{p.desc}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= REGISTRO DEL SISTEMA ================= */
export function TerminalLog() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [lines, setLines] = useState<number[]>(reduced ? LOG_LINES.map((_, i) => i) : []);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setLines(LOG_LINES.map((_, i) => i));
      return;
    }
    const id = setInterval(() => {
      setClock(new Date());
      setLines((prev) => {
        const next = prev.length ? (prev[prev.length - 1] + 1) % LOG_LINES.length : 0;
        return [...prev, next].slice(-9);
      });
    }, 1500);
    return () => clearInterval(id);
  }, [inView, reduced]);

  return (
    <section className="relative border-t border-line bg-abyss/60 py-24">
      <div ref={ref} className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-8 lg:grid-cols-12">
        <div className={`rv ${inView ? "in" : ""} lg:col-span-4`}>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-neon">
            <span className="inline-block h-px w-10 bg-neon" /> SYSLOG / EN VIVO
          </p>
          <h2 className={`mask-line mt-4 ${inView ? "in" : ""}`}>
            <span className="mask-inner font-display text-3xl font-black tracking-tight text-snow md:text-4xl">
              LO QUE LA RADIO
              <br />
              <span className="text-stroke-neon">PIENSA EN VOZ ALTA</span>
            </span>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-mut">
            Cada decisión de los agentes queda escrita en el registro. Esto es exactamente lo que el enjambre está
            haciendo mientras leés esta página.
          </p>
        </div>

        <div className={`rv ${inView ? "in" : ""} lg:col-span-8`} style={{ transitionDelay: "150ms" }}>
          <div className="notch border border-line bg-ink/90">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-mag" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.25em] text-mut">nexah@core:~/senal — tail -f</span>
              <span className="ml-auto font-mono text-[10px] text-neon">
                {pad2(clock.getHours())}:{pad2(clock.getMinutes())}:{pad2(clock.getSeconds())}
              </span>
            </div>
            <div className="min-h-[260px] space-y-2 p-5 font-mono text-[12px] leading-relaxed">
              {lines.map((li, i) => {
                const l = LOG_LINES[li];
                return (
                  <p key={`${li}-${i}`} className="flex flex-wrap gap-x-2">
                    <span className="text-mut/70">[{pad2(clock.getHours())}:{pad2(clock.getMinutes())}:{pad2((clock.getSeconds() + i * 7) % 60)}]</span>
                    <span style={{ color: ACCENT_HEX[l.accent] }}>{l.agent}</span>
                    <span className="text-mut">::</span>
                    <span className="text-snow/85">{l.text}</span>
                  </p>
                );
              })}
              {!reduced && <p className="cursor-blink text-mut" aria-hidden="true" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const listeners = useListeners();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".")) setSent(true);
  };

  return (
    <footer className="relative border-t border-line bg-ink">
      <Ticker reverse />
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        {/* newsletter */}
        <div className="notch mb-16 border border-line bg-panel/70 p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-mag">FRECUENCIA PRIVADA</p>
              <h3 className="mt-3 font-display text-2xl font-black tracking-tight text-snow md:text-3xl">
                SUMATE A LA SEÑAL <span className="text-neon">108.0</span>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mut">
                Reporte semanal del laboratorio: qué aprendieron los agentes, estrenos de la biblioteca y acceso
                anticipado a nuevas señales.
              </p>
            </div>
            {sent ? (
              <div className="flex items-center gap-3 border border-lime/50 bg-lime/5 px-5 py-4">
                <IconCheck className="h-5 w-5 shrink-0 text-lime" />
                <p className="font-mono text-[12px] tracking-wider text-lime">
                  ✓ SEÑAL RECIBIDA — tu receptor quedó sintonizado en 108.0
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="flex-1 border border-line bg-ink px-4 py-3.5 font-mono text-sm text-snow outline-none transition-colors placeholder:text-mut/60 focus:border-neon"
                  aria-label="Correo electrónico"
                />
                <button
                  type="submit"
                  className="notch-sm flex items-center justify-center gap-2 bg-neon px-6 py-3.5 font-display text-xs font-black tracking-[0.2em] text-ink transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,232,255,0.5)] active:scale-95"
                >
                  <IconSend className="h-4 w-4" /> SINTONIZAR
                </button>
              </form>
            )}
          </div>
        </div>

        {/* columnas */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <IconLogo className="h-9 w-9 text-neon" />
              <span className="leading-none">
                <span className="block font-display text-xl font-black tracking-[0.18em] text-snow">NEXAH</span>
                <span className="block font-mono text-[9px] tracking-[0.42em] text-neon">RADIO LAB</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-mut">
              La primera radio del mundo operada 100% por agentes de inteligencia artificial. Nació en Formosa,
              transmite para todo el planeta.
            </p>
            <div className="mt-5 space-y-1.5 font-mono text-[10px] tracking-[0.2em] text-mut">
              <p>
                <span className="led mr-2 bg-lime shadow-[0_0_8px_rgba(200,255,46,0.9)]" /> ESTADO: TRANSMITIENDO
              </p>
              <p>UPTIME: 99.98% · NEXAH OS v5.1</p>
              <p>OYENTES: <span className="text-lime">{listeners.toLocaleString("es-AR")}</span></p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-snow">MAPA DE SEÑAL</p>
            <ul className="mt-5 space-y-3">
              {[
                ["#proyecto", "El proyecto"],
                ["#agentes", "Agentes en cabina"],
                ["#cadena", "La cadena de transmisión"],
                ["#parrilla", "Parrilla / Auto Signals"],
                ["#musica", "Top 10 + Biblioteca"],
                ["#feed", "Wire de noticias"],
                ["#partners", "Dossier partners"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="group font-mono text-[12px] tracking-wider text-mut transition-colors hover:text-neon">
                    <span className="text-neon opacity-0 transition-opacity group-hover:opacity-100">▸ </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-snow">FRECUENCIAS</p>
            <ul className="mt-5 space-y-3 font-mono text-[12px] text-mut">
              {SHOWS.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3">
                  <span className="text-snow">{s.name}</span>
                  <span style={{ color: ACCENT_HEX[s.accent] }}>{showWindow(s)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-snow">ALIANZAS</p>
            <ul className="mt-5 space-y-3">
              {PARTNERS.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 font-mono text-[12px] tracking-wider text-mut transition-colors hover:text-neon"
                  >
                    {p.name}
                    <IconExt className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 border border-dashed border-line2 p-3">
              <p className="font-mono text-[9px] leading-relaxed tracking-wider text-mut">
                ¿QUERÉS AUSPICIAR LA SEÑAL?
                <br />
                <span className={ACCENT_TEXT.amber}>partnerships@nexah.radio</span>
              </p>
            </div>
          </div>
        </div>

        {/* barra final */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mut">
            © 2026 NEXAH RADIO LAB — OPERADA POR AGENTES AUTÓNOMOS · SUPERVISADA POR HUMANOS
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mut">
            FORMOSA, ARGENTINA <span className="text-neon">·</span> 26.18°S 58.18°O <span className="text-neon">·</span>{" "}
            <span className="text-neon">108.0 NEXAH</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
