import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { makeScrub, enterProgress, instant } from '../lib/scrub';

/* Effet signature réutilisable : un réseau de nœuds + liens qui se dessine
   au scroll (liens en strokeDasharray, nœuds en fondu + scale). Piloté par la
   progression d'entrée dans le viewport. instant() => état final affiché. */

const D = (n, [a, b]) => `M${n[a][0]} ${n[a][1]} L${n[b][0]} ${n[b][1]}`;

const VARIANTS = {
  // Convergence : tout pointe vers un échange central
  converge: {
    viewBox: '0 0 420 420',
    nodes: [
      [210, 210],
      [372, 210], [296, 96], [210, 52], [124, 96],
      [48, 210], [124, 324], [210, 368], [296, 324],
    ],
    links: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]],
    hub: 0,
  },
  // Constellation large : maillage qui se tisse
  constellation: {
    viewBox: '0 0 620 300',
    nodes: [
      [50, 70], [160, 180], [270, 60], [370, 210],
      [470, 90], [560, 180], [120, 250], [330, 250], [520, 260],
    ],
    links: [
      [0, 1], [1, 2], [2, 4], [4, 5], [1, 3], [3, 5],
      [0, 6], [6, 7], [7, 3], [7, 8], [8, 5], [2, 3],
    ],
  },
  // Cluster : un système qui s'organise autour d'un cœur
  cluster: {
    viewBox: '0 0 420 380',
    nodes: [
      [210, 190], [90, 80], [330, 90], [60, 250],
      [360, 250], [210, 60], [150, 320], [300, 320],
    ],
    links: [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [1, 5], [2, 5], [3, 6], [4, 7], [6, 7],
    ],
  },
  // Feuille : nervure centrale + nervures latérales (écologie)
  leaf: {
    viewBox: '0 0 300 364',
    nodes: [
      [150, 18], [150, 110], [150, 200], [150, 285], [150, 344], // nervure 0-4
      [96, 92], [66, 186], [100, 272],   // contour gauche 5-7
      [204, 92], [234, 186], [200, 272], // contour droit 8-10
    ],
    links: [
      [0, 1], [1, 2], [2, 3], [3, 4],            // nervure centrale
      [0, 5], [5, 6], [6, 7], [7, 4],            // contour gauche
      [0, 8], [8, 9], [9, 10], [10, 4],          // contour droit
      [1, 5], [1, 8], [2, 6], [2, 9], [3, 7], [3, 10], // nervures
    ],
    hub: 2,
  },
};

export default function NetField({ variant = 'constellation', className = '' }) {
  const ref = useRef(null);
  const cfg = VARIANTS[variant] || VARIANTS.constellation;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const linkEls = el.querySelectorAll('.nf-link');
    const nodeEls = el.querySelectorAll('.nf-node');
    linkEls.forEach((l) => {
      const len = l.getTotalLength();
      l.style.strokeDasharray = len;
      l.style.strokeDashoffset = instant() ? 0 : len;
    });
    if (instant()) {
      gsap.set(nodeEls, { opacity: 1, scale: 1 });
      return;
    }
    let cleanup = () => {};
    const ctx = gsap.context(() => {
      gsap.set(nodeEls, { opacity: 0, scale: 0 });
      const tl = gsap.timeline({ paused: true });
      tl.to(nodeEls, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0);
      tl.to(linkEls, { strokeDashoffset: 0, duration: 0.5, stagger: 0.04, ease: 'power1.inOut' }, 0.15);
      cleanup = makeScrub(() => enterProgress(el, 0.92, 0.4), (p) => tl.progress(p));
    }, el);
    return () => {
      cleanup();
      ctx.revert();
    };
  }, [variant]);

  return (
    <svg
      ref={ref}
      className={`netfield ${className}`}
      viewBox={cfg.viewBox}
      role="img"
      aria-label="Motif réseau Reskope animé au défilement"
    >
      <g className="netfield__links">
        {cfg.links.map((lk, i) => (
          <path key={i} className="nf-link" d={D(cfg.nodes, lk)} strokeWidth="1.4" />
        ))}
      </g>
      <g className="netfield__nodes">
        {cfg.nodes.map(([x, y], i) => (
          <circle key={i} className="nf-node" cx={x} cy={y} r={i === cfg.hub ? 9 : 5.5} />
        ))}
      </g>
    </svg>
  );
}
