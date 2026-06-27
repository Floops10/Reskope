import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import NetField from '../components/NetField';
import Stagger from '../components/Stagger';
import { Reveal, RevealItem } from '../components/Reveal';
import { useLang } from '../i18n';
import { CONTACT } from '../data/site';

const CONTENT = {
  fr: {
    metaTitle: "Numérique responsable · simplifier, c'est consommer moins",
    metaDesc:
      "L'angle écologique de Reskope : alléger votre stack d'outils réduit serveurs, stockage et données dupliquées. Une sobriété numérique sans effort supplémentaire.",
    eyebrow: 'Numérique responsable',
    title: 'Simplifier réduit aussi votre empreinte.',
    lead: "Notre métier réduit le désordre numérique. Or, moins d'outils superflus, c'est mécaniquement moins de serveurs, moins de stockage et moins d'énergie. L'efficacité et la sobriété avancent dans le même sens.",
    factsEyebrow: 'Le constat',
    factsTitle: 'Le numérique « invisible » a un coût bien réel.',
    facts: [
      { stat: '68 %', label: 'des licences SaaS sous-utilisées', detail: 'Chaque application inutilisée fait tourner des serveurs, stocke vos données et facture une licence. Rien ne le justifie.', source: 'Gartner, 2023' },
      { stat: '9,4', label: 'applications par salarié en moyenne', detail: 'Chaque app est un silo. Plus il y en a, plus la donnée est dupliquée, vieillie, et énergivore à maintenir.', source: 'Okta, Businesses at Work, 2023' },
      { stat: '× 2', label: 'moins de stockage et de doublons', detail: 'En passant de 6 à 3 outils, nos clients divisent leurs données redondantes, et l\'empreinte de stockage qui va avec.', source: 'Estimation Reskope' },
    ],
    savingsEyebrow: "Ce qu'un projet économise",
    savingsTitle: 'Quatre économies, au-delà du temps gagné.',
    savings: [
      { title: 'Moins de serveurs sollicités', text: "Chaque outil supprimé, c'est des machines qui ne tournent plus pour rien dans un datacenter. La sobriété logicielle est une sobriété énergétique." },
      { title: 'Moins de données dupliquées', text: "Une donnée saisie une seule fois, au bon endroit, c'est moins de stockage, moins de sauvegardes redondantes, moins de synchronisations permanentes." },
      { title: 'Moins de matériel à remplacer', text: "Des outils plus légers et mieux choisis allongent la durée de vie des postes. On évite le renouvellement matériel dicté par des logiciels trop lourds." },
      { title: "Moins de temps, donc moins d'énergie", text: "Le temps gagné par vos équipes, c'est aussi moins de réunions, moins d'e-mails, moins d'allers-retours numériques. La productivité rejoint la sobriété." },
    ],
    posEyebrow: 'Notre position',
    posTitle: 'On ne vend pas du « green », on évite du superflu.',
    posLead:
      "Pas de greenwashing : la sobriété n'est pas un argument ajouté, c'est la conséquence directe de notre travail. Un audit qui supprime trois outils redondants a un effet écologique réel, et il est gratuit pour la planète comme pour votre budget.",
    posBtn: 'Parler de votre stack',
    ctaTitle: 'Et si on allégeait vos outils ?',
    ctaLead:
      'Un premier échange pour mesurer ce que vous pourriez simplifier, pour vos équipes comme pour votre empreinte.',
    ctaPrimary: 'Parler de vos outils',
    ctaSecondary: 'Écrire un message',
  },
  en: {
    metaTitle: 'Responsible digital · simplifying means consuming less',
    metaDesc:
      "Reskope's ecological angle: trimming your tool stack cuts servers, storage and duplicated data. Digital sobriety with no extra effort.",
    eyebrow: 'Responsible digital',
    title: 'Simplifying also cuts your footprint.',
    lead: 'Our work reduces digital clutter. And fewer superfluous tools mechanically means fewer servers, less storage and less energy. Efficiency and sobriety move in the same direction.',
    factsEyebrow: 'The reality',
    factsTitle: '“Invisible” digital has a very real cost.',
    facts: [
      { stat: '68%', label: 'of SaaS licenses underused', detail: 'Every unused app keeps servers running, stores your data and bills a license. Nothing justifies it.', source: 'Gartner, 2023' },
      { stat: '9.4', label: 'apps per employee on average', detail: 'Every app is a silo. The more there are, the more data is duplicated, stale and energy-hungry to maintain.', source: 'Okta, Businesses at Work, 2023' },
      { stat: '× 2', label: 'less storage and fewer duplicates', detail: 'Going from 6 to 3 tools, our clients halve their redundant data, and the storage footprint that goes with it.', source: 'Reskope estimate' },
    ],
    savingsEyebrow: 'What a project saves',
    savingsTitle: 'Four savings, beyond the time gained.',
    savings: [
      { title: 'Fewer servers running', text: 'Each removed tool means machines no longer running for nothing in a datacenter. Software sobriety is energy sobriety.' },
      { title: 'Less duplicated data', text: 'Data entered once, in the right place, means less storage, fewer redundant backups, fewer constant syncs.' },
      { title: 'Less hardware to replace', text: "Lighter, better-chosen tools extend the life of your machines. You avoid hardware renewal driven by software that's too heavy." },
      { title: 'Less time, so less energy', text: 'The time your teams save also means fewer meetings, fewer emails, fewer digital back-and-forths. Productivity meets sobriety.' },
    ],
    posEyebrow: 'Our stance',
    posTitle: "We don't sell “green”, we avoid the superfluous.",
    posLead:
      'No greenwashing: sobriety is not an add-on argument, it is the direct consequence of our work. An audit that removes three redundant tools has a real ecological effect, and it is free for the planet as much as for your budget.',
    posBtn: 'Talk about your stack',
    ctaTitle: 'What if we lightened your tools?',
    ctaLead:
      'A first conversation to measure what you could simplify, for your teams as much as for your footprint.',
    ctaPrimary: 'Talk about your tools',
    ctaSecondary: 'Send a message',
  },
};

export default function Ecologie() {
  const { lang } = useLang();
  const c = CONTENT[lang];

  useLayoutEffect(() => {
    document.documentElement.classList.add('eco-theme');
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = meta?.getAttribute('content');
    meta?.setAttribute('content', '#0B6B35');
    return () => {
      document.documentElement.classList.remove('eco-theme');
      if (prev) meta?.setAttribute('content', prev);
    };
  }, []);

  return (
    <Page title={c.metaTitle} description={c.metaDesc}>
      <PageHeader tone="eco" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      {/* CHIFFRES */}
      <section className="section section--tight" aria-labelledby="eco-facts-title">
        <div className="container">
          <Reveal className="section__head">
            <RevealItem as="p" className="eyebrow eyebrow--eco">{c.factsEyebrow}</RevealItem>
            <RevealItem as="h2" className="h2 eco__h2" id="eco-facts-title">{c.factsTitle}</RevealItem>
          </Reveal>

          <Stagger className="eco-facts" stagger={0.12} y={56}>
            {c.facts.map((f) => (
              <div className="eco-fact" key={f.label}>
                <span className="eco-fact__stat">{f.stat}</span>
                <span className="eco-fact__label">{f.label}</span>
                <p className="eco-fact__detail">{f.detail}</p>
                <span className="eco-fact__source">{f.source}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CE QUE ÇA ÉCONOMISE */}
      <section className="section section--eco-band" aria-labelledby="eco-savings-title">
        <div className="eco__net" aria-hidden="true">
          <NetField variant="leaf" />
        </div>
        <div className="container">
          <Reveal className="section__head">
            <RevealItem as="p" className="eyebrow eyebrow--eco">{c.savingsEyebrow}</RevealItem>
            <RevealItem as="h2" className="h2 eco__h2" id="eco-savings-title">{c.savingsTitle}</RevealItem>
          </Reveal>

          <Stagger className="eco-savings" stagger={0.13} y={60}>
            {c.savings.map((s, i) => (
              <div className="eco-saving" key={s.title}>
                <span className="eco-saving__num">{`0${i + 1}`}</span>
                <h3 className="eco-saving__title">{s.title}</h3>
                <p className="eco-saving__text">{s.text}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* POSITION */}
      <section className="section" aria-labelledby="eco-pos-title">
        <div className="container">
          <Reveal className="eco-stance">
            <RevealItem as="p" className="eyebrow eyebrow--eco">{c.posEyebrow}</RevealItem>
            <RevealItem as="h2" className="h2 eco__h2" id="eco-pos-title">{c.posTitle}</RevealItem>
            <RevealItem as="p" className="lead eco__lead">{c.posLead}</RevealItem>
            <RevealItem>
              <Link to="/contact" className="btn btn--eco-solid">
                {c.posBtn}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* CTA vert */}
      <section className="section eco-cta" aria-label={c.ctaTitle}>
        <div className="container">
          <Reveal>
            <RevealItem as="h2" className="eco-cta__title">{c.ctaTitle}</RevealItem>
            <RevealItem as="p" className="eco-cta__lead">{c.ctaLead}</RevealItem>
            <RevealItem className="eco-cta__actions">
              <Link className="btn btn--eco-solid" to="/contact">
                {c.ctaPrimary}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <a className="btn btn--eco" href={`mailto:${CONTACT.email}`}>
                {c.ctaSecondary}
              </a>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
