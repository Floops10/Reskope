import NetWord from './NetWord';
import { Reveal, RevealItem } from './Reveal';

/* En-tête de page : le premier mot du titre se forme via la trame
   (réseau de lettres), le reste reste en texte. Le titre complet est
   présent pour le SEO et les lecteurs d'écran (sans doublon).
   Le mot-réseau est toujours le 1er mot réel du titre (préfixe), pour
   ne jamais casser la phrase de la balise h1. */
export default function PageHeader({ eyebrow, title, lead, tone = 'default', action }) {
  const word = title.split(' ')[0];
  const rest = title.slice(word.length).replace(/^\s+/, '');

  return (
    <header className={`pagehead${tone === 'eco' ? ' pagehead--eco' : ''}`}>
      <div className={`container${action ? ' pagehead__inner' : ''}`}>
        <div className="pagehead__main">
          {eyebrow && (
            <Reveal onMount>
              <RevealItem as="p" className="eyebrow eyebrow--index">
                {eyebrow}
              </RevealItem>
            </Reveal>
          )}

          <h1 className="pagehead__title">
            <span className="pagehead__title-word">
              {/* Texte réel (couleur du fond) sous le mot-réseau : invisible à
                  l'œil mais bien présent dans le H1 pour le SEO. */}
              <span className="pagehead__title-ghost">{word}</span>
              <NetWord className="pagehead__netword">{word}</NetWord>
            </span>
            {rest && (
              <>
                {' '}
                <span className="pagehead__title-rest">{rest}</span>
              </>
            )}
          </h1>

          {lead && (
            <Reveal>
              <RevealItem as="p" className="lead pagehead__lead">
                {lead}
              </RevealItem>
            </Reveal>
          )}
        </div>

        {action && <div className="pagehead__action">{action}</div>}
      </div>
    </header>
  );
}
