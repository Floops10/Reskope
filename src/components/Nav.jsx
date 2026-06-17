import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoMark } from './Logo';
import ExpandableNav from './ExpandableNav';
import { useT, LangToggle } from '../i18n';
import { CONTACT } from '../data/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const t = useT();
  const tabs = Object.entries(t.nav.tabs);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav
        className={`nav${scrolled || open ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
        aria-label="Navigation principale"
      >
        <div className="container nav__inner">
          <Link to="/" className="wordmark" aria-label="Reskope, accueil">
            <LogoMark className="wordmark__mark" />
            <span>Reskope</span>
          </Link>

          <div className="nav__links">
            <ExpandableNav />
            <LangToggle />
            <Link to="/contact" className="btn btn--primary nav__cta">
              {t.nav.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`burger${open ? ' is-open' : ''}`}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </nav>

      <div className={`navmenu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="navmenu__inner">
          <div className="navmenu__links">
            {tabs.map(([to, label], i) => (
              <NavLink key={to} to={to} className="navmenu__link" style={{ '--i': i }}>
                <span className="navmenu__num">{`0${i + 1}`}</span>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="navmenu__foot">
            <Link to="/contact" className="btn btn--primary navmenu__cta">
              {t.nav.cta}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${CONTACT.email}`} className="navmenu__mail">
              {CONTACT.email}
            </a>
            <LangToggle className="navmenu__lang" />
          </div>
        </div>
      </div>
    </>
  );
}
