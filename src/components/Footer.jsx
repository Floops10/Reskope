import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark, HeroLogo } from './Logo';
import NetField from './NetField';
import BusinessCard from './BusinessCard';
import { useT } from '../i18n';
import { CONTACT } from '../data/site';

export default function Footer() {
  const [cardOpen, setCardOpen] = useState(false);
  const t = useT();
  const f = t.footer;
  const tabs = t.nav.tabs;

  return (
    <footer className="footer">
      <div className="footer__net" aria-hidden="true">
        <NetField variant="constellation" />
      </div>

      <div className="container footer__main">
        <div className="footer__brand">
          <div className="footer__logo">
            <LogoMark />
            <span className="footer__name">Reskope</span>
          </div>
          <p className="footer__tagline">{f.tagline}</p>
          <Link to="/contact" className="btn btn--primary footer__cta-btn">
            {f.cta}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <nav className="footer__col" aria-label={f.site}>
          <span className="footer__heading">{f.site}</span>
          <Link to="/">{f.home}</Link>
          <Link to="/pourquoi">{tabs['/pourquoi']}</Link>
          <Link to="/methode">{tabs['/methode']}</Link>
          <Link to="/offres">{tabs['/offres']}</Link>
        </nav>

        <nav className="footer__col" aria-label={f.resources}>
          <span className="footer__heading">{f.resources}</span>
          <Link to="/exemple">{tabs['/exemple']}</Link>
          <Link to="/numerique-responsable" className="footer__eco-link">
            {tabs['/numerique-responsable']}
          </Link>
          <Link to="/a-propos">{tabs['/a-propos']}</Link>
          <a href="/reskope-logo.svg" download>
            {f.logo}
          </a>
        </nav>

        <div className="footer__col">
          <span className="footer__heading">{f.contact}</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <Link to="/contact">{f.talk}</Link>
          <button
            type="button"
            className="footer__card-btn"
            onClick={() => setCardOpen(true)}
          >
            {f.card} <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="footer__signature" aria-hidden="true">
          <HeroLogo mode="enter" />
          <p className="footer__sign-text">{f.sign}</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Reskope · {f.rights}</p>
        <p className="footer__meta">{f.meta}</p>
      </div>

      {cardOpen && <BusinessCard onClose={() => setCardOpen(false)} />}
    </footer>
  );
}
