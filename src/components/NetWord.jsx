import { useRef, useEffect, useMemo } from 'react';
import { gsap } from '../lib/gsap';
import { instant } from '../lib/scrub';
import { layoutWord } from '../lib/netfont';

/* Rend un mot comme un réseau de lettres (la trame de la marque) :
   un maillage désordonné (qui ne veut rien dire) se réorganise pour
   écrire le mot — les liens suivent les nœuds en temps réel. Le texte
   réel reste porté par le composant parent (SEO) ; ici le SVG est
   décoratif (aria-hidden). */
const PAD_X = 10;
const PAD_TOP = 22;
const PAD_BOTTOM = 16;

/* Léger décalage déterministe AUTOUR de la position finale de chaque nœud
   (pas une dispersion plein cadre) : la trame part d'un état un peu en
   désordre, mais lisible, puis se cale proprement. Stable (pas de random). */
function scatter(i, tx, ty) {
  const a = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  const b = Math.sin(i * 78.233 + 1.7) * 12543.197;
  const rx = (a - Math.floor(a)) - 0.5;
  const ry = (b - Math.floor(b)) - 0.5;
  return [tx + rx * 70, ty + ry * 64];
}

export default function NetWord({ children, className = '', dur = 1.25, heightEm = 0.82 }) {
  const svgRef = useRef(null);
  const text = String(children || '');

  const { nodes, links, vb, scattered, size } = useMemo(() => {
    const { nodes, links, width, height } = layoutWord(text);
    const vbW = width + PAD_X * 2;
    const vbH = height + PAD_TOP + PAD_BOTTOM;
    const scattered = nodes.map((n, i) => scatter(i, n[0], n[1]));
    return {
      nodes,
      links,
      vb: `${-PAD_X} ${-PAD_TOP} ${vbW} ${vbH}`,
      scattered,
      size: { w: (vbW / vbH) * heightEm, h: heightEm },
    };
  }, [text, heightEm]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const nodeEls = [...svg.querySelectorAll('.nw-node')];
    const linkEls = [...svg.querySelectorAll('.nw-link')];

    // Positions « vivantes » : on part du maillage désordonné.
    const cur = scattered.map((p) => [p[0], p[1]]);
    const place = (i) => {
      nodeEls[i].setAttribute('cx', cur[i][0]);
      nodeEls[i].setAttribute('cy', cur[i][1]);
    };
    const redrawLinks = () => {
      linkEls.forEach((l, i) => {
        const [a, b] = links[i];
        l.setAttribute('d', `M${cur[a][0]} ${cur[a][1]} L${cur[b][0]} ${cur[b][1]}`);
      });
    };

    if (instant()) {
      nodes.forEach((p, i) => {
        cur[i][0] = p[0];
        cur[i][1] = p[1];
        place(i);
      });
      redrawLinks();
      gsap.set([...nodeEls, ...linkEls], { opacity: 1 });
      return;
    }

    nodeEls.forEach((_, i) => place(i));
    redrawLinks();
    gsap.set(svg, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.12 });
    tl.to(svg, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0);

    // Chaque nœud rejoint sa lettre ; léger décalage = vague de gauche à droite.
    const stagger = Math.min(0.5, nodes.length * 0.01) / Math.max(nodes.length, 1);
    nodes.forEach((target, i) => {
      const proxy = { x: cur[i][0], y: cur[i][1] };
      tl.to(
        proxy,
        {
          x: target[0],
          y: target[1],
          duration: dur,
          ease: 'power3.inOut',
          onUpdate: () => {
            cur[i][0] = proxy.x;
            cur[i][1] = proxy.y;
            place(i);
          },
        },
        0.1 + i * stagger
      );
    });
    // Les liens se redessinent à chaque frame depuis les positions vivantes.
    tl.eventCallback('onUpdate', redrawLinks);

    return () => tl.kill();
  }, [nodes, links, scattered, dur]);

  return (
    <span className={`netword ${className}`} aria-hidden="true">
      <svg
        ref={svgRef}
        className="netword__svg"
        viewBox={vb}
        preserveAspectRatio="xMinYMid meet"
        focusable="false"
        style={{ width: `${size.w}em`, height: `${size.h}em` }}
      >
        <g className="netword__links">
          {links.map((_, i) => (
            <path key={i} className="nw-link" />
          ))}
        </g>
        <g className="netword__nodes">
          {scattered.map(([x, y], i) => (
            <circle key={i} className="nw-node" cx={x} cy={y} r="4" />
          ))}
        </g>
      </svg>
    </span>
  );
}
