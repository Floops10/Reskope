import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useT } from '../i18n';

/* Petit menu « onglets extensibles » : icône seule au repos, l'onglet
   actif (et celui survolé) déplie son libellé. Animation framer-motion. */

const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  width: 19,
  height: 19,
};

const Icons = {
  why: (
    <svg {...svg}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M9.4 9.4a2.7 2.7 0 1 1 3.3 3.1c-.7.3-1 .7-1 1.4v.4" />
      <circle cx="11.9" cy="16.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  method: (
    <svg {...svg}>
      <circle cx="4.8" cy="15.5" r="2.1" />
      <circle cx="12" cy="6.6" r="2.1" />
      <circle cx="19.2" cy="14" r="2.1" />
      <path d="M6.4 14.1 10.4 8.2M13.8 7.7 17.7 12.2" />
    </svg>
  ),
  offer: (
    <svg {...svg}>
      <path d="M3.6 11.3 11 3.9a1.9 1.9 0 0 1 1.5-.6l4.7.2a1.5 1.5 0 0 1 1.4 1.4l.2 4.7a1.9 1.9 0 0 1-.6 1.5l-7.4 7.4a1.5 1.5 0 0 1-2.1 0L3.6 13.4a1.5 1.5 0 0 1 0-2.1Z" />
      <circle cx="15.2" cy="8.4" r="1.3" />
    </svg>
  ),
  doc: (
    <svg {...svg}>
      <path d="M6.2 3.3h6.6l4.9 4.9v11.5a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1V4.3a1 1 0 0 1 1-1Z" />
      <path d="M12.6 3.5V8h4.6" />
      <path d="M8.4 12.4h7.2M8.4 15.8h7.2" />
    </svg>
  ),
  leaf: (
    <svg {...svg}>
      <path d="M5.2 19c-.6-7.2 4-13.4 13.6-14 1 9.4-4.2 15-13.6 14Z" />
      <path d="M5.2 19C9.4 14 13 11.2 17.6 9.2" />
    </svg>
  ),
  user: (
    <svg {...svg}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0" />
    </svg>
  ),
};

const ITEMS = [
  { to: '/pourquoi', icon: Icons.why },
  { to: '/methode', icon: Icons.method },
  { to: '/offres', icon: Icons.offer },
  { to: '/exemple', icon: Icons.doc },
  { to: '/numerique-responsable', icon: Icons.leaf },
  { to: '/a-propos', icon: Icons.user },
];

const transition = { type: 'spring', bounce: 0, duration: 0.5 };

export default function ExpandableNav() {
  const { pathname } = useLocation();
  const [hover, setHover] = useState(null);
  const t = useT();

  return (
    <div className="enav" role="navigation" aria-label="Navigation principale">
      {ITEMS.map((it, i) => {
        const active = pathname === it.to;
        const expanded = active || hover === i;
        const label = t.nav.tabs[it.to];
        return (
          <NavLink
            key={it.to}
            to={it.to}
            className={`enav__tab${active ? ' is-active' : ''}`}
            aria-label={label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <span className="enav__icon">{it.icon}</span>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.span
                  className="enav__label"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={transition}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        );
      })}
    </div>
  );
}
