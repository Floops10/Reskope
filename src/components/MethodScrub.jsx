import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { makeScrub, pinProgress } from '../lib/scrub';
import { Reveal, RevealItem } from './Reveal';

const S = [
  [60, 120], [210, 50], [340, 140],
  [120, 210], [270, 170], [300, 250],
  [70, 330], [180, 300], [340, 320],
];
const G = [
  [80, 90], [200, 90], [320, 90],
  [80, 200], [200, 200], [320, 200],
  [80, 310], [200, 310], [320, 310],
];
const LOOSE = [[0, 4], [1, 3], [2, 6], [4, 7], [3, 2], [1, 8], [5, 0], [6, 4]];
const GRID = [
  [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
  [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
];
const PULSE_ROUTE = [0, 1, 4, 7, 8];

const PHASES = [
  {
    tag: 'Phase 01 · Audit',
    title: 'On comprend avant d’agir.',
    items: [
      'Entretiens individuels avec vos équipes.',
      'Cartographie des outils et des process.',
      'Diagnostic priorisé par impact.',
      'Un bilan clair et actionnable.',
    ],
  },
  {
    tag: 'Phase 02 · Mise en œuvre',
    title: 'On règle, dans l’ordre des priorités.',
    items: [
      'Automatisation des tâches répétitives.',
      'Intégration et fluidification de vos outils.',
      'Refonte ou développement si nécessaire.',
      'Des équipes autonomes au bout du compte.',
    ],
  },
];

function ScrubSVG({ animated }) {
  return (
    <svg
      className="trame"
      viewBox="0 0 400 400"
      role="img"
      aria-label="Transformation d'un ensemble d'outils dispersés en un système structuré."
    >
      {LOOSE.map(([a, b], i) => (
        <path
          key={`l${i}`}
          className="trame-link trame-link--loose m-loose"
          strokeWidth="1"
          style={animated ? undefined : { opacity: 0 }}
          d={`M${S[a][0]} ${S[a][1]} L${S[b][0]} ${S[b][1]}`}
        />
      ))}
      {GRID.map(([a, b], i) => (
        <path
          key={`g${i}`}
          className="trame-link m-grid"
          strokeWidth="1.25"
          d={`M${G[a][0]} ${G[a][1]} L${G[b][0]} ${G[b][1]}`}
        />
      ))}
      {S.map(([x, y], i) => {
        const [px, py] = animated ? [x, y] : G[i];
        return (
          <circle
            key={`n${i}`}
            className="m-node"
            cx={px}
            cy={py}
            r={i === 4 ? 7 : 5}
            fill={animated ? '#b7b3a9' : '#1c0cb3'}
          />
        );
      })}
      <circle
        className="m-pulse"
        cx={G[0][0]}
        cy={G[0][1]}
        r="4"
        fill="#5b4be6"
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

export default function MethodScrub() {
  const reduce = useReducedMotion() || (typeof document !== 'undefined' && document.hidden);
  const pinRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const scope = pinRef.current;
    if (!scope) return;

    let scrubCleanup = () => {};
    const ctx = gsap.context(() => {
      const nodes = scope.querySelectorAll('.m-node');
      scope.querySelectorAll('.m-grid').forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(scope.querySelector('[data-phase="1"]'), { opacity: 0, y: 16 });

      const tl = gsap.timeline({ paused: true });
      nodes.forEach((el, i) => {
        tl.to(
          el,
          {
            x: G[i][0] - S[i][0],
            y: G[i][1] - S[i][1],
            duration: 0.5,
            ease: 'power2.inOut',
          },
          0
        );
      });
      tl.to('.m-loose', { opacity: 0, duration: 0.3 }, 0);
      tl.to('.m-grid', { strokeDashoffset: 0, duration: 0.42, stagger: 0.012, ease: 'power1.inOut' }, 0.2);
      tl.to('.m-node', { fill: '#1c0cb3', duration: 0.25 }, 0.35);
      tl.to('[data-phase="0"]', { opacity: 0, y: -16, duration: 0.12 }, 0.5);
      tl.to('[data-phase="1"]', { opacity: 1, y: 0, duration: 0.18 }, 0.55);
      tl.set('.m-pulse', { opacity: 1 }, 0.6);
      PULSE_ROUTE.slice(1).forEach((idx, k) => {
        tl.to('.m-pulse', { attr: { cx: G[idx][0], cy: G[idx][1] }, duration: 0.1, ease: 'none' }, 0.62 + k * 0.095);
      });
      tl.to('.m-pulse', { opacity: 0, duration: 0.06 }, 0.99);
      tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);

      scrubCleanup = makeScrub(() => pinProgress(scope), (p) => tl.progress(p));
    }, scope);

    return () => {
      scrubCleanup();
      ctx.revert();
    };
  }, [reduce]);

  const head = (
    <Reveal className="section__head">
      <RevealItem as="p" className="eyebrow eyebrow--index">
        La transformation
      </RevealItem>
      <RevealItem as="h2" className="h2">
        Du désordre au système.
      </RevealItem>
      <RevealItem as="p" className="lead">
        Au scroll, la réalité dispersée de vos outils se réorganise en un système
        clair. C’est exactement ce que produit l’intervention de Reskope.
      </RevealItem>
    </Reveal>
  );

  if (reduce) {
    return (
      <section className="section section--tint">
        <div className="container">
          {head}
          <div style={{ maxWidth: 480, margin: '0 auto 3.5rem' }}>
            <ScrubSVG animated={false} />
          </div>
          {PHASES.map((p, i) => (
            <div className="phase phase--static" key={i} style={{ position: 'static', marginBottom: '2.5rem' }}>
              <p className="phase__tag">{p.tag}</p>
              <h3>{p.title}</h3>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section section--tint">
      <div className="container">{head}</div>
      <div className="method__pin" ref={pinRef}>
        <div className="method__stage container">
          <div className="method__phases">
            {PHASES.map((p, i) => (
              <div className="phase" data-phase={i} key={i}>
                <p className="phase__tag">{p.tag}</p>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="method__visual">
            <ScrubSVG animated />
            <div className="method__progress">
              <span ref={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
