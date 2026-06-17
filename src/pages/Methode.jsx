import { Link } from 'react-router-dom';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import RoadmapJourney from '../components/RoadmapJourney';
import CTASection from '../components/CTASection';
import { Reveal, RevealItem } from '../components/Reveal';
import { useLang } from '../i18n';

const CONTENT = {
  fr: {
    metaTitle: 'La méthode · 5 jalons, en toute transparence',
    metaDesc:
      'Reskope ne propose jamais de solution avant le diagnostic. Cadrage, audit, bilan, mise en œuvre, autonomie : à chaque jalon vous savez où on en est et ce qui suit.',
    eyebrow: 'La méthode',
    title: 'Ensemble, jalon par jalon.',
    lead: "Reskope ne propose jamais de solution avant le diagnostic. À chaque étape, vous savez précisément où on en est, et ce qui vient après. Le réseau ci-dessous se réorganise au fil du parcours : de vos outils dispersés vers un système clair.",
    calloutTitle: 'Le livrable : un bilan que vous gardez.',
    calloutText:
      "À la fin de l'audit, vous repartez avec un document clair : constats, cartographie, recommandations priorisées et gains estimés. Vous l'appliquez vous-même ou vous m'en confiez la mise en œuvre.",
    calloutBtn: 'Voir un exemple de bilan',
  },
  en: {
    metaTitle: 'The method · 5 milestones, in full transparency',
    metaDesc:
      'Reskope never proposes a solution before the diagnosis. Framing, audit, report, delivery, autonomy: at each milestone you know where we are and what comes next.',
    eyebrow: 'The method',
    title: 'Together, milestone by milestone.',
    lead: 'Reskope never proposes a solution before the diagnosis. At each step, you know exactly where we are, and what comes next. The network below reorganizes as the journey unfolds: from your scattered tools to a clear system.',
    calloutTitle: 'The deliverable: a report you keep.',
    calloutText:
      'At the end of the audit, you leave with a clear document: findings, mapping, prioritized recommendations and estimated gains. You apply it yourself, or you entrust the delivery to me.',
    calloutBtn: 'See an example report',
  },
};

export default function Methode() {
  const { lang } = useLang();
  const c = CONTENT[lang];

  return (
    <Page title={c.metaTitle} description={c.metaDesc}>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <section className="section section--tight">
        <RoadmapJourney />
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="callout">
            <RevealItem as="h2" className="h2">{c.calloutTitle}</RevealItem>
            <RevealItem as="p" className="lead">{c.calloutText}</RevealItem>
            <RevealItem>
              <Link className="btn btn--ghost" to="/exemple">
                {c.calloutBtn}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </Page>
  );
}
