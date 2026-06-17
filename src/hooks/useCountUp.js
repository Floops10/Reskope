import { useEffect, useRef, useState } from 'react';

/* Compteur animé déclenché à l'entrée dans le viewport, respecte reduced-motion. */
export function useCountUp(target, { decimals = 0, duration = 1400 } = {}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(target * eased);
              if (p < 1) raf = requestAnimationFrame(tick);
              else setVal(target);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  const display = (decimals ? val.toFixed(decimals) : Math.round(val).toString()).replace(
    '.',
    ','
  );
  return [ref, display];
}
