import { useRef, useEffect } from 'react';
import { instant } from '../lib/scrub';

/* Révèle un texte MOT À MOT quand il entre dans le viewport : chaque mot
   monte et se met au net depuis un léger flou, en cascade. Même langage
   d'animation que <Reveal> (montée + focus-in), décliné au niveau du mot
   pour les grands titres → le texte « s'assemble » dans l'esprit réseau.
   Sûr : si le JS échoue / reduced-motion, tout est visible d'emblée. */
export default function RiseText({ text, as: Tag = 'span', className = '', stagger = 55, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (instant()) {
      el.classList.add('is-in');
      el.querySelectorAll('.rise-w').forEach((w) => {
        w.style.opacity = '1';
        w.style.transform = 'none';
        w.style.filter = 'none';
        w.style.transition = 'none';
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  const words = String(text).split(' ');
  return (
    <Tag ref={ref} className={`risetext ${className}`} style={{ '--stagger': `${stagger}ms` }} {...rest}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="rise-w" style={{ '--i': i }}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
