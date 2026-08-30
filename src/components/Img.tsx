import { useState } from "react";

/* ============================================================
   CyberImg — imagen con carga progresiva, Ken Burns opcional,
   zoom en hover y fallback gráfico si la fuente no responde.
   ============================================================ */
export function CyberImg({
  src,
  alt = "",
  className = "",
  kb = false,
  zh = false,
  eager = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  kb?: boolean;
  zh?: boolean;
  eager?: boolean;
}) {
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-raise via-panel to-ink ${className}`}
      aria-hidden={alt === ""}
    >
      {/* fallback: retícula + halo de señal */}
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl"
        style={{ background: "radial-gradient(circle, #00e8ff 0%, transparent 70%)" }}
      />
      {state !== "err" && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setState("ok")}
          onError={() => setState("err")}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            kb ? "kb" : ""
          } ${zh ? "zh-img" : ""} ${state === "ok" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
