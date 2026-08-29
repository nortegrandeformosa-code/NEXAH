import { useEffect, useRef, useState, type CSSProperties } from "react";
import { engine } from "../audio";
import { useListeners, usePrefersReducedMotion } from "../hooks";
import { IconMute, IconPause, IconPlay, IconVolume } from "./Icons";

/* ============================================================
   Visualizador de señal (canvas) — lee el analyser del engine
   ============================================================ */
export function Visualizer({
  bars = 56,
  vu = false,
  className = "",
}: {
  bars?: number;
  vu?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const g = cv.getContext("2d");
    if (!g) return;
    let raf = 0;
    let alive = true;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (w === 0 || h === 0) return;
      if (cv.width !== Math.floor(w * dpr) || cv.height !== Math.floor(h * dpr)) {
        cv.width = Math.floor(w * dpr);
        cv.height = Math.floor(h * dpr);
      }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);

      const levels = engine.getLevels(bars);
      const vuH = vu ? 12 : 0;
      const specH = h - vuH - (vu ? 6 : 0);
      const gap = 2;
      const bw = (w - gap * (bars - 1)) / bars;

      for (let i = 0; i < bars; i++) {
        const v = levels[i];
        const bh = Math.max(2, v * specH);
        const x = i * (bw + gap);
        g.fillStyle = i % 8 === 0 ? "rgba(255,46,126,0.85)" : "rgba(0,232,255,0.7)";
        g.fillRect(x, specH - bh, bw, bh);
        g.fillStyle = v > 0.62 ? "rgba(200,255,46,0.95)" : "rgba(232,241,252,0.85)";
        g.fillRect(x, specH - bh - 3, bw, 2);
      }

      if (vu) {
        const low = levels.slice(0, 8).reduce((a, b) => a + b, 0) / 8;
        const high = levels.slice(bars - 16).reduce((a, b) => a + b, 0) / 16;
        [low, high].forEach((avg, row) => {
          const y = specH + 6 + row * 6;
          const segs = 26;
          const sw = (w - (segs - 1) * 2) / segs;
          const lit = Math.round(Math.min(1, avg * 1.4) * segs);
          for (let sIdx = 0; sIdx < segs; sIdx++) {
            const on = sIdx < lit;
            g.fillStyle = !on
              ? "rgba(27,39,64,0.9)"
              : sIdx > segs * 0.82
                ? "rgba(255,46,126,0.95)"
                : sIdx > segs * 0.6
                  ? "rgba(255,176,46,0.95)"
                  : "rgba(0,232,255,0.9)";
            g.fillRect(sIdx * (sw + 2), y, sw, 3);
          }
        });
      }
    };

    const loop = () => {
      if (!alive) return;
      render();
      if (!reduced || engine.state.playing) raf = requestAnimationFrame(loop);
    };
    loop();

    const unsub = engine.subscribe(() => {
      if (reduced) render();
    });
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, [bars, vu, reduced]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ============================================================
   Barra global de reproducción — pie de la señal
   ============================================================ */
export function PlayerBar() {
  const [, force] = useState(0);
  const listeners = useListeners();
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const st = engine.state;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-abyss/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center gap-3 px-4 md:gap-5 md:px-8">
        {/* transporte */}
        <button
          onClick={() => engine.toggle()}
          aria-label={st.playing ? "Cortar señal" : "Sintonizar señal"}
          className={`notch-sm flex h-12 w-12 shrink-0 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
            st.playing ? "bg-mag text-ink shadow-[0_0_24px_rgba(255,46,126,0.5)]" : "bg-neon text-ink shadow-[0_0_24px_rgba(0,232,255,0.45)]"
          }`}
        >
          {st.playing ? <IconPause className="h-5 w-5" /> : <IconPlay className="h-5 w-5 translate-x-[1px]" />}
        </button>

        {/* ahora suena */}
        <div className="min-w-0 flex-1 md:flex-none md:basis-72">
          <div className="flex items-center gap-2">
            <span className={`led ${st.playing ? "bg-mag shadow-[0_0_8px_rgba(255,46,126,0.9)]" : "bg-mut"}`} />
            <span className="font-mono text-[10px] tracking-[0.22em] text-mut">
              {st.playing ? "AL AIRE" : "SEÑAL EN ESPERA"}
            </span>
            <span className="border border-line px-1 font-mono text-[10px] tracking-widest text-neon">{st.showId}</span>
          </div>
          <p className="truncate font-display text-[13px] font-bold tracking-wide text-snow">
            {st.track.title.toUpperCase()}
          </p>
          <p className="truncate font-mono text-[11px] text-mut">
            {st.track.artist} · {st.showName}
          </p>
        </div>

        {/* espectro */}
        <div className="hidden min-w-0 flex-1 md:block">
          <Visualizer bars={64} vu className="h-[52px] w-full" />
        </div>

        {/* métricas + volumen */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
          <div className="hidden text-right font-mono text-[11px] leading-tight text-mut lg:block">
            <p className="text-lime">◉ {listeners.toLocaleString("es-AR")}</p>
            <p>oyentes en vivo</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => engine.setMuted(!st.muted)}
              aria-label={st.muted ? "Activar sonido" : "Silenciar"}
              className="text-mut transition-colors hover:text-neon"
            >
              {st.muted ? <IconMute className="h-4.5 w-4.5" /> : <IconVolume className="h-4.5 w-4.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(st.volume * 100)}
              onChange={(e) => engine.setVolume(Number(e.target.value) / 100)}
              className="vol w-24"
              style={{ "--fill": `${Math.round(st.volume * 100)}%` } as CSSProperties}
              aria-label="Volumen de la señal"
            />
          </div>
          <div className="hidden border border-line px-2 py-1 font-mono text-[11px] tracking-widest text-neon xl:block">
            108.0
          </div>
        </div>
      </div>
    </div>
  );
}
