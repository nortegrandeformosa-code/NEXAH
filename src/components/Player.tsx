import { useEffect, useRef, useState, type CSSProperties } from "react";
import { engine } from "../audio";
import { useListeners, usePrefersReducedMotion } from "../hooks";
import { IconMute, IconPause, IconPlay, IconVolume } from "./Icons";

/* ============================================================
   Visualizador de señal (canvas)
   ============================================================ */
export function Visualizer({ bars = 48, className = "" }: { bars?: number; className?: string }) {
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
      const gap = 2;
      const bw = (w - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        const v = levels[i];
        const bh = Math.max(2, v * h);
        const x = i * (bw + gap);
        g.fillStyle = v > 0.62 ? "rgba(255,77,143,0.9)" : "rgba(94,233,255,0.6)";
        g.fillRect(x, h - bh, bw, bh);
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
  }, [bars, reduced]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ============================================================
   Barra global — slim
   ============================================================ */
export function PlayerBar() {
  const [, force] = useState(0);
  const listeners = useListeners();
  useEffect(() => engine.subscribe(() => force((x) => x + 1)), []);
  const st = engine.state;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-ink/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-5 md:gap-6 md:px-10">
        <button
          onClick={() => engine.toggle()}
          aria-label={st.playing ? "Cortar señal" : "Sintonizar señal"}
          className={`flex h-10 w-10 shrink-0 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
            st.playing
              ? "bg-mag text-ink shadow-[0_0_26px_rgba(255,77,143,0.5)]"
              : "bg-neon text-ink shadow-[0_0_26px_rgba(94,233,255,0.45)]"
          }`}
        >
          {st.playing ? <IconPause className="h-4 w-4" /> : <IconPlay className="h-4 w-4 translate-x-[1px]" />}
        </button>

        <div className="min-w-0 flex-1 md:flex-none md:basis-80">
          <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.26em] text-mut">
            <span className={`led ${st.playing ? "bg-mag shadow-[0_0_8px_rgba(255,77,143,0.9)]" : "bg-mut"}`} />
            {st.playing ? "AL AIRE" : "SEÑAL EN ESPERA"} · {st.showId}
          </p>
          <p className="truncate text-[14px] font-semibold text-snow">
            {st.track.title} <span className="font-normal text-mut">— {st.track.artist}</span>
          </p>
        </div>

        <div className="hidden min-w-0 flex-1 md:block">
          <Visualizer bars={72} className="h-10 w-full" />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-5">
          <p className="hidden text-right font-mono text-[11px] leading-tight text-mut lg:block">
            <span className="text-neon">◉ {listeners.toLocaleString("es-AR")}</span>
            <br />
            oyentes
          </p>
          <div className="hidden items-center gap-2.5 sm:flex">
            <button
              onClick={() => engine.setMuted(!st.muted)}
              aria-label={st.muted ? "Activar sonido" : "Silenciar"}
              className="text-mut transition-colors hover:text-neon"
            >
              {st.muted ? <IconMute className="h-4 w-4" /> : <IconVolume className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(st.volume * 100)}
              onChange={(e) => engine.setVolume(Number(e.target.value) / 100)}
              className="vol w-24"
              style={{ "--fill": `${Math.round(st.volume * 100)}%` } as CSSProperties}
              aria-label="Volumen"
            />
          </div>
          <span className="hidden border border-white/12 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-neon xl:block">
            108.0
          </span>
        </div>
      </div>
    </div>
  );
}
