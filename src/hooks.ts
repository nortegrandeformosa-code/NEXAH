import { useEffect, useRef, useState } from "react";

/* ---------- prefers-reduced-motion ---------- */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/* ---------- in view (scroll reveal) ---------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

/* ---------- scramble / decode de texto ---------- */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01△▚▞";

export function useScramble(text: string, startDelay = 0, speed = 28) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }
    let frame = 0;
    let raf = 0;
    let started = false;
    const total = text.length * 3 + 12;
    const t0 = performance.now() + startDelay;
    const tick = (now: number) => {
      if (now < t0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      started = true;
      frame++;
      const progress = frame / total;
      const settled = Math.floor(progress * text.length * 1.15);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || ch === "\n") s += ch;
        else if (i < settled) s += ch;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (settled >= text.length) {
        setOut(text);
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (started) setDone(true);
    };
  }, [text, startDelay, speed, reduced]);
  return { out, done };
}

/* ---------- reloj ---------- */
export function useClock(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/* ---------- contador animado ---------- */
export function useCountUp(target: number, active: boolean, duration = 1600, decimals = 0) {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((target * eased).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, decimals, reduced]);
  return val;
}

/* ---------- listeners simulados en vivo ---------- */
export function useListeners(base = 128417): number {
  const [n, setN] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => Math.max(base - 500, v + Math.floor(Math.random() * 180) - 70));
    }, 2600);
    return () => clearInterval(id);
  }, [base]);
  return n;
}
