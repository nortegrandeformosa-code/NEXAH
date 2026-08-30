import { useEffect, useState, type FormEvent } from "react";
import { engine } from "../audio";
import {
  ACCENT_HEX,
  ARCHITECTS,
  CHART,
  IMG,
  LIBRARY,
  LIB_COVERS,
  NEWS,
  NEWS_CATS,
  PARTNERS,
  type NewsCat,
} from "../data";
import { useInView } from "../hooks";
import { CyberImg } from "./Img";
import { IconCheck, IconExt, IconDown, IconFlat, IconUp, IconSend, IconX, IconIG, IconYT, IconTW } from "./Icons";
import { SectionHead } from "./Sections";

/* ================= 05 · música ================= */
export function Musica() {
  const rv = useInView<HTMLDivElement>(0.05);
  const lib = useInView<HTMLDivElement>(0.05);
  const [, force] = useState(0);
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const current = engine.state.track.title;

  return (
    <section id="musica" className="relative scroll-mt-24 border-t border-white/5 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="05 — EL SONIDO DE LA MÁQUINA"
          title={
            <>
              Música que la radio <span className="text-mag glow-mag">piensa</span>
            </>
          }
          sub="El Top NEXAH, curado por ARIA-7 con datos reales de la señal, y la biblioteca original de NEXAH Studios producida con Suno. Tocá cualquier tema: esta página lo sintetiza en vivo con el motor PULSE-9."
        />

        {/* chart */}
        <div ref={rv.ref} className="mt-14 border-t border-white/10">
          {CHART.map((t, i) => {
            const active = current === t.title;
            return (
              <button
                key={t.pos}
                onClick={() => engine.tune(t, { play: true })}
                className={`rv ${rv.inView ? "in" : ""} group grid w-full grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-white/8 px-3 py-4 text-left transition-colors duration-300 hover:bg-white/[0.035] md:grid-cols-[72px_1fr_130px_90px_70px] md:gap-6 md:px-5 ${
                  active ? "bg-neon/[0.05]" : ""
                }`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <span className={`font-display text-3xl font-extrabold md:text-4xl ${active ? "text-neon" : "text-stroke-dim"}`}>
                  {String(t.pos).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <span className={`truncate text-[16px] font-semibold md:text-lg ${active ? "text-neon" : "text-snow"}`}>{t.title}</span>
                    {active && (
                      <span className="eq hidden shrink-0 text-neon sm:inline-flex">
                        <span /><span /><span /><span />
                      </span>
                    )}
                  </span>
                  <span className="block truncate font-mono text-[11px] tracking-[0.14em] text-mut">
                    {t.artist} · {t.genre}
                  </span>
                </span>
                <span className="hidden font-mono text-[11px] tracking-[0.16em] text-mut md:block">{t.plays} plays</span>
                <span className="hidden font-mono text-[11px] text-mut md:block">{t.dur}</span>
                <span className="flex items-center justify-end gap-3">
                  {t.trend === 1 && <IconUp className="h-3.5 w-3.5 text-lime" />}
                  {t.trend === -1 && <IconDown className="h-3.5 w-3.5 text-mag" />}
                  {t.trend === 0 && <IconFlat className="h-3.5 w-3.5 text-mut" />}
                  <span className="hidden h-8 w-8 items-center justify-center border border-white/15 text-snow opacity-0 transition-all duration-300 group-hover:border-neon group-hover:text-neon group-hover:opacity-100 sm:flex">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M7 4.5v15l13-7.5L7 4.5Z" /></svg>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* biblioteca */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-snow md:text-4xl">
              Biblioteca <span className="text-stroke">NEXAH</span>
            </h3>
            <p className="font-mono text-[11px] tracking-[0.24em] text-mut">ORIGINAL NEXAH STUDIOS · PRODUCIDA CON SUNO</p>
          </div>

          <div ref={lib.ref} className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {LIBRARY.map((tr, i) => (
              <a
                key={tr.title}
                href={tr.url}
                target="_blank"
                rel="noreferrer"
                className={`rv ${lib.inView ? "in" : ""} zoom-hover group relative block aspect-square overflow-hidden border border-white/8`}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <CyberImg src={LIB_COVERS[i % LIB_COVERS.length]} zh className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden="true" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-white/25 bg-ink/55 text-snow opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <IconExt className="h-3.5 w-3.5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-neon">{tr.kind.toUpperCase()}</p>
                  <p className="mt-1 truncate text-[13px] font-semibold leading-snug text-snow">{tr.title}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-mut">{tr.dur} · ESCUCHAR EN SUNO ↗</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 06 · feed ORACLE-3 ================= */
const CAT_COLOR: Record<NewsCat, string> = {
  ARG: ACCENT_HEX.neon,
  MUSIC: ACCENT_HEX.mag,
  TECH: ACCENT_HEX.lime,
  WORLD: ACCENT_HEX.amber,
};

export function Feed() {
  const rv = useInView<HTMLDivElement>(0.05);
  const [cat, setCat] = useState<NewsCat | "ALL">("ALL");
  const items = NEWS.filter((n) => cat === "ALL" || n.cat === cat).slice(0, 8);

  return (
    <section id="senal" className="relative scroll-mt-24 border-t border-white/5 bg-abyss/60 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="06 — ORACLE-3 / BOLETÍN"
          title={
            <>
              Lo que la radio <span className="text-amber">lee</span> por vos
            </>
          }
          sub="Cada hora, ORACLE-3 cruza 128 fuentes verificadas y redacta el boletín de la señal. Esto es lo que está procesando ahora mismo."
        />

        <div className={`rv ${rv.inView ? "in" : ""} mt-12 flex flex-wrap gap-2`}>
          {NEWS_CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`px-4 py-2 font-mono text-[11px] tracking-[0.22em] transition-all duration-300 ${
                cat === c.key ? "bg-snow text-ink" : "border border-white/12 text-mut hover:border-white/40 hover:text-snow"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div ref={rv.ref} className="mt-10 border-t border-white/10">
          {items.map((n, i) => (
            <a
              key={n.title}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className={`rv ${rv.inView ? "in" : ""} group grid grid-cols-[86px_1fr_28px] items-center gap-5 border-b border-white/8 px-3 py-5 transition-all duration-300 hover:bg-white/[0.03] md:grid-cols-[120px_1fr_auto_28px] md:px-5`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span
                className="border px-2 py-1 text-center font-mono text-[10px] tracking-[0.2em]"
                style={{ color: CAT_COLOR[n.cat], borderColor: `${CAT_COLOR[n.cat]}55` }}
              >
                {n.cat}
              </span>
              <span className="min-w-0 text-[15px] font-medium leading-snug text-snow/85 transition-colors duration-300 group-hover:text-snow md:text-lg">
                {n.title}
              </span>
              <span className="hidden font-mono text-[10px] tracking-[0.18em] text-mut md:block">{n.source.toUpperCase()}</span>
              <IconExt className="h-4 w-4 justify-self-end text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-mut">
          FUENTES VIVAS: <span className="text-snow/70">PÁGINA/12 · PITCHFORK</span> — EL BOLETÍN COMPLETO SUENA EN EL AIRE, CADA HORA.
        </p>
      </div>
    </section>
  );
}

/* ================= 07 · partners ================= */
export function Partners() {
  const rv = useInView<HTMLDivElement>(0.08);
  const [main, ...rest] = PARTNERS;

  return (
    <section id="partners" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          index="07 — DOSSIER PARTNERS"
          title={
            <>
              Quienes sostienen <span className="text-stroke">la señal</span>
            </>
          }
          sub="Aliados que financian, potencian y ponen a prueba la infraestructura de NEXAH."
        />

        <div ref={rv.ref} className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* sponsor principal */}
          <a
            href={main.url}
            target="_blank"
            rel="noreferrer"
            className={`rv ${rv.inView ? "in" : ""} zoom-hover group relative overflow-hidden border border-white/10 lg:col-span-6`}
          >
            <CyberImg src={IMG.console} zh className="absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/60" aria-hidden="true" />
            <div className="relative flex h-full flex-col p-9 md:p-12">
              <p className="font-mono text-[10px] tracking-[0.3em] text-amber">◈ {main.tag}</p>
              <h3 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight text-snow md:text-5xl">{main.name}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-mut">{main.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {main.campaigns?.map((c) => (
                  <span
                    key={c.title}
                    className="border border-white/15 px-3 py-2 text-[12px] font-medium text-snow/80 transition-colors duration-300 group-hover:border-amber/60 group-hover:text-amber"
                  >
                    {c.title} ↗
                  </span>
                ))}
              </div>
              <span className="mt-auto flex items-center gap-2 pt-10 font-mono text-[11px] tracking-[0.22em] text-amber">
                SITIO OFICIAL <IconExt className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </a>

          {/* resto */}
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1">
            {rest.map((p, i) => {
              const hex = ACCENT_HEX[p.accent];
              return (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`rv ${rv.inView ? "in" : ""} group flex items-center gap-6 border border-white/8 bg-panel/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/25`}
                  style={{ transitionDelay: `${(i + 1) * 90}ms` }}
                >
                  <span className="font-display text-3xl font-extrabold" style={{ color: hex }}>
                    {p.name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold uppercase tracking-tight text-snow">{p.name}</span>
                    <span className="block font-mono text-[9px] tracking-[0.24em]" style={{ color: hex }}>
                      {p.tag}
                    </span>
                    <span className="mt-1.5 block truncate text-[13px] text-mut">{p.desc}</span>
                  </span>
                  <IconExt className="h-4 w-4 shrink-0 text-mut transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-snow" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= footer ================= */
export function Footer() {
  const rv = useInView<HTMLDivElement>(0.15);
  const [mail, setMail] = useState("");
  const [ok, setOk] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mail.trim().length > 3) setOk(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-abyss">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10">
        <div ref={rv.ref} className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`rv ${rv.inView ? "in" : ""} font-mono text-[11px] tracking-[0.32em] text-neon`}>NEXAH RADIO LAB</p>
            <p className={`rv ${rv.inView ? "in" : ""} mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-snow md:text-6xl`} style={{ transitionDelay: "80ms" }}>
              La señal <br />
              <span className="text-stroke">no duerme.</span>
            </p>
            <form onSubmit={submit} className={`rv ${rv.inView ? "in" : ""} mt-9 max-w-sm`} style={{ transitionDelay: "160ms" }}>
              <p className="mb-3 text-sm text-mut">Recibí el boletín neural de ORACLE-3, una vez por semana.</p>
              {ok ? (
                <p className="flex items-center gap-3 border border-lime/40 bg-lime/10 px-4 py-3.5 text-sm font-medium text-lime">
                  <IconCheck className="h-4 w-4" /> Señal registrada — ORACLE-3 te escribirá.
                </p>
              ) : (
                <div className="flex border border-white/15 focus-within:border-neon">
                  <input
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-snow outline-none placeholder:text-mut/60"
                  />
                  <button type="submit" aria-label="Suscribirme" className="btn-primary flex items-center px-5">
                    <IconSend className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className={`rv ${rv.inView ? "in" : ""} grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pt-2`} style={{ transitionDelay: "120ms" }}>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-mut">SEÑAL</p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["El proyecto", "#proyecto"],
                  ["Los agentes", "#agentes"],
                  ["Parrilla", "#parrilla"],
                  ["Música", "#musica"],
                  ["Partners", "#partners"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="link-slide text-snow/75 hover:text-neon">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-mut">ECOSISTEMA</p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["Suno", "https://suno.com"],
                  ["ElevenLabs", "https://elevenlabs.io"],
                  ["Radio Paradise", "https://radioparadise.com"],
                  ["Banco Formosa", "https://www.bancoformosa.com.ar/"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} target="_blank" rel="noreferrer" className="link-slide text-snow/75 hover:text-neon">
                      {l} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-mut">ARQUITECTOS</p>
              <ul className="mt-5 space-y-3 text-sm text-snow/75">
                {ARCHITECTS.map((a) => (
                  <li key={a.name}>{a.name}</li>
                ))}
              </ul>
              <div className="mt-7 flex gap-3">
                {[IconX, IconIG, IconYT, IconTW].map((I, i) => (
                  <a
                    key={i}
                    href="#top"
                    aria-label="Red social"
                    className="flex h-9 w-9 items-center justify-center border border-white/12 text-mut transition-all duration-300 hover:border-neon hover:text-neon"
                  >
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="pointer-events-none mt-16 select-none text-center font-display text-[clamp(3rem,11vw,10rem)] font-extrabold uppercase leading-none text-stroke-dim" aria-hidden="true">
          NEXAH
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 font-mono text-[10px] tracking-[0.2em] text-mut md:flex-row">
          <p>© 2026 NEXAH STUDIOS · FRECUENCIA DIGITAL 108.0</p>
          <p>DISEÑADO POR HUMANOS · <span className="text-neon">OPERADO POR AGENTES</span></p>
        </div>
      </div>
    </footer>
  );
}
