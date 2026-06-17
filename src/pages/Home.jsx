import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { HeroLogo } from '../components/Logo';
import NetField from '../components/NetField';
import CTASection from '../components/CTASection';
import { Reveal, RevealItem } from '../components/Reveal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useLang } from '../i18n';

const CONTENT = {
  fr: {
    metaTitle: 'Conseil & ingénierie numérique',
    metaDesc:
      'Reskope audite vos outils sur le terrain, salarié par salarié, puis simplifie et construit ce qui manque. Prix affichés, démarche ouverte, gains chiffrés.',
    eyebrow: 'Audit digital & productivité',
    heroTitle: 'Vos équipes perdent des heures dans leurs outils.',
    line1: "Outils dispersés, saisies en double, allers-retours sans fin. Le coût ne se voit pas, mais il est bien réel.",
    line2: "Reskope remet de l'ordre : on audite le terrain, on simplifie, on construit ce qui manque. Toujours au grand jour, jalon après jalon.",
    sub: "On audite le terrain, on simplifie, on construit ce qui manque. Toujours au grand jour, jalon après jalon.",
    startEyebrow: 'Par où commencer',
    startTitle: 'Explorez à votre rythme.',
    primary: 'Parler de vos outils',
    ghost: 'Pourquoi',
    dest: [
      { to: '/pourquoi', label: 'Pourquoi', desc: "Le coût caché, et pour qui on agit" },
      { to: '/methode', label: 'La méthode', desc: '5 jalons, en toute transparence' },
      { to: '/offres', label: 'Offres & tarifs', desc: 'Prix affichés, devis sur-mesure' },
      { to: '/exemple', label: 'Exemple de bilan', desc: 'Un audit réel, détaillé' },
    ],
    ecoEyebrow: 'Numérique responsable',
    ecoTitle: "Simplifier vos outils, c'est aussi consommer moins.",
    ecoLead: "Moins d'outils, moins de serveurs, moins de doublons. L'angle écologique de notre démarche a sa propre page.",
    ecoBtn: "Découvrir l'angle écologique",
  },
  en: {
    metaTitle: 'Consulting & digital engineering',
    metaDesc:
      'Reskope audits your tools on the ground, employee by employee, then simplifies and builds what is missing. Prices shown, open process, quantified gains.',
    eyebrow: 'Digital audit & productivity',
    heroTitle: 'Your teams lose hours inside their tools.',
    line1: 'Scattered tools, double data entry, endless back-and-forth. The cost is hidden, but it is very real.',
    line2: 'Reskope puts things back in order: we audit the ground, simplify, and build what is missing. Always in the open, milestone by milestone.',
    sub: 'We audit the ground, simplify, and build what is missing. Always in the open, milestone by milestone.',
    startEyebrow: 'Where to start',
    startTitle: 'Explore at your own pace.',
    primary: 'Talk about your tools',
    ghost: 'Why',
    dest: [
      { to: '/pourquoi', label: 'Why', desc: 'The hidden cost, and who we act for' },
      { to: '/methode', label: 'The method', desc: '5 milestones, in full transparency' },
      { to: '/offres', label: 'Pricing', desc: 'Prices shown, custom quotes' },
      { to: '/exemple', label: 'Example report', desc: 'A real, detailed audit' },
    ],
    ecoEyebrow: 'Responsible digital',
    ecoTitle: 'Simplifying your tools also means consuming less.',
    ecoLead: 'Fewer tools, fewer servers, fewer duplicates. The ecological angle of our approach has its own page.',
    ecoBtn: 'Explore the ecological angle',
  },
};

function DestGrid({ dest }) {
  return (
    <div className="dest-grid">
      {dest.map((d, i) => (
        <Link key={d.to} to={d.to} className="dest-card">
          <span className="dest-card__num">{`0${i + 1}`}</span>
          <span className="dest-card__label">{d.label}</span>
          <span className="dest-card__desc">{d.desc}</span>
          <span className="dest-card__arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}

function HeroPinned({ c }) {
  const heroRef = useRef(null);
  return (
    <header className="hero hero--pinned" ref={heroRef} id="top">
      <div className="container hero__grid">
        <div className="hero__scroller">
          <Reveal className="hero__step" onMount>
            <RevealItem as="p" className="eyebrow">{c.eyebrow}</RevealItem>
            <RevealItem as="h1" className="display">{c.heroTitle}</RevealItem>
          </Reveal>

          <Reveal className="hero__step" amount={0.6}>
            <RevealItem as="p" className="hero__line">{c.line1}</RevealItem>
          </Reveal>

          <Reveal className="hero__step" amount={0.6}>
            <RevealItem as="p" className="hero__line">{c.line2}</RevealItem>
          </Reveal>

          <Reveal className="hero__step hero__step--final" amount={0.4}>
            <RevealItem as="p" className="eyebrow eyebrow--index">{c.startEyebrow}</RevealItem>
            <RevealItem>
              <DestGrid dest={c.dest} />
            </RevealItem>
          </Reveal>
        </div>

        <div className="hero__sticky" aria-hidden="true">
          <HeroLogo containerRef={heroRef} mode="scroll" />
        </div>
      </div>
    </header>
  );
}

function HeroCompact({ c }) {
  return (
    <header className="hero hero--compact" id="top">
      <div className="hero__bg-net" aria-hidden="true">
        <NetField variant="cluster" />
      </div>
      <div className="container">
        <Reveal className="hero__copy" onMount>
          <RevealItem as="div" className="hero__compact-logo" aria-hidden="true">
            <HeroLogo mode="mount" />
          </RevealItem>
          <RevealItem as="p" className="eyebrow">{c.eyebrow}</RevealItem>
          <RevealItem as="h1" className="display">{c.heroTitle}</RevealItem>
          <RevealItem as="p" className="lead hero__sub">{c.sub}</RevealItem>
          <RevealItem as="div" className="hero__links">
            <Link to="/contact" className="btn btn--primary">
              {c.primary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link to="/pourquoi" className="btn btn--ghost">
              {c.ghost}
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </header>
  );
}

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 881px)');
  const { lang } = useLang();
  const c = CONTENT[lang];

  return (
    <Page title={c.metaTitle} description={c.metaDesc}>
      {isDesktop ? <HeroPinned c={c} /> : <HeroCompact c={c} />}

      {!isDesktop && (
        <section className="section section--tight" id="start" aria-labelledby="start-title">
          <div className="container">
            <Reveal className="section__head">
              <RevealItem as="p" className="eyebrow eyebrow--index">{c.startEyebrow}</RevealItem>
              <RevealItem as="h2" className="h2" id="start-title">{c.startTitle}</RevealItem>
            </Reveal>
            <Reveal amount={0.1}>
              <RevealItem>
                <DestGrid dest={c.dest} />
              </RevealItem>
            </Reveal>
          </div>
        </section>
      )}

      {/* Teaser — numérique responsable */}
      <section className="section eco-teaser" aria-labelledby="eco-teaser-title">
        <div className="container">
          <Reveal className="eco-teaser__inner">
            <div className="eco-teaser__text">
              <RevealItem as="p" className="eyebrow eyebrow--eco">{c.ecoEyebrow}</RevealItem>
              <RevealItem as="h2" className="h2 eco-teaser__title" id="eco-teaser-title">{c.ecoTitle}</RevealItem>
              <RevealItem as="p" className="eco-teaser__lead">{c.ecoLead}</RevealItem>
              <RevealItem>
                <Link to="/numerique-responsable" className="btn btn--eco">
                  {c.ecoBtn}
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </Link>
              </RevealItem>
            </div>
            <RevealItem as="div" className="eco-teaser__art" aria-hidden="true">
              <NetField variant="leaf" />
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </Page>
  );
}
