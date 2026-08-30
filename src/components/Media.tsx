import { useEffect, useRef, useState } from "react";
import { BACKSTAGE, IMG } from "../data";
import { usePrefersReducedMotion } from "../hooks";

/* ============================================================
   Video de back de producción — monocromo, en bucle, ambiental
   ============================================================ */
export function BackstageVideo() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(!reduced);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing && !reduced) {
      v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  }, [playing, reduced]);

  return (
    <div className="scan-sweep relative h-full w-full overflow-hidden bg-abyss">
      {!failed ? (
        <video
          ref={ref}
          src={BACKSTAGE.video}
          poster={IMG.backstage}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.5)" }}
          aria-hidden="true"
        />
      ) : (
        <img
          src={IMG.backstage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.5)" }}
          aria-hidden="true"
        />
      )}

      {/* tinte cian + viñeta */}
      <div className="absolute inset-0 bg-neon/8 mix-blend-color" aria-hidden="true" />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 140px 40px rgba(4,6,13,0.9)" }} aria-hidden="true" />

      {/* scanlines de CRT */}
      <div className="screen-scan absolute inset-0 opacity-60" aria-hidden="true" />

      {/* marco de visor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-neon/60" />
        <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-neon/60" />
        <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-neon/60" />
        <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-neon/60" />
      </div>

      {/* controles */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
        <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-snow/70">
          <span className="led bg-mag shadow-[0_0_8px_rgba(255,77,143,0.9)]" /> {playing && !reduced ? "REC" : "PAUSA"}
        </span>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar video" : "Reproducir video"}
          className="flex h-9 w-9 items-center justify-center border border-white/25 bg-ink/50 text-snow backdrop-blur-sm transition-all hover:border-neon hover:text-neon"
        >
          {playing && !reduced ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 4.5h3.4v15H7zM13.6 4.5H17v15h-3.4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 4.5v15l13-7.5L7 4.5Z" /></svg>
          )}
        </button>
      </div>

      <p className="absolute bottom-5 left-5 z-10 font-mono text-[8.5px] tracking-[0.22em] text-snow/50">
        {BACKSTAGE.credit}
      </p>
    </div>
  );
}
