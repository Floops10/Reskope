import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { instant } from '../lib/scrub';
import { useLang } from '../i18n';

const DAYS = {
  fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
};
const ARIA = {
  fr: "Près de la moitié d'une semaine de travail est absorbée par les e-mails et la recherche d'information.",
  en: 'Nearly half a work week is absorbed by emails and searching for information.',
};
const FILL = 0.47;

export default function WeekBar() {
  const root = useRef(null);
  const { lang } = useLang();
  const days = DAYS[lang];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fill = el.querySelector('.wb-fill');
    const marker = el.querySelector('.wb-marker');
    gsap.set(fill, { transformOrigin: 'left center' });

    if (instant()) {
      gsap.set(fill, { scaleX: FILL });
      gsap.set(marker, { x: FILL * 1000, opacity: 1 });
      return;
    }

    gsap.set(fill, { scaleX: 0 });
    gsap.set(marker, { x: 0, opacity: 0 });

    /* Animation jouée une fois, à l'entrée dans le viewport : la barre se
       remplit franchement (et non « déjà finie » car en haut de page). */
    const play = () => {
      const tl = gsap.timeline();
      tl.to(fill, { scaleX: FILL, duration: 1.15, ease: 'power2.out' }, 0.1);
      tl.to(marker, { x: FILL * 1000, opacity: 1, duration: 1.15, ease: 'power2.out' }, 0.1);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            obs.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={root}
      className="weekbar"
      viewBox="0 0 1000 132"
      role="img"
      aria-label={ARIA[lang]}
    >
      <rect x="0" y="50" width="1000" height="44" rx="8" fill="var(--cream-shade)" />
      <rect
        className="wb-fill"
        x="0"
        y="50"
        width="1000"
        height="44"
        rx="8"
        fill="var(--indigo)"
      />
      {[200, 400, 600, 800].map((x) => (
        <line key={x} x1={x} y1="50" x2={x} y2="94" stroke="var(--cream)" strokeWidth="2" />
      ))}
      {days.map((d, i) => (
        <text
          key={d}
          x={100 + i * 200}
          y="120"
          textAnchor="middle"
          fontSize="20"
          fill="var(--muted)"
          fontFamily="var(--font)"
        >
          {d}
        </text>
      ))}
      <g className="wb-marker">
        <line x1="0" y1="34" x2="0" y2="98" stroke="var(--indigo-bright)" strokeWidth="2" />
        <text
          x="0"
          y="24"
          textAnchor="middle"
          fontSize="22"
          fontWeight="500"
          fill="var(--indigo)"
          fontFamily="var(--font)"
        >
          ≈ 47 %
        </text>
      </g>
    </svg>
  );
}
