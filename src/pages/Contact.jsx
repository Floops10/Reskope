import { useState } from 'react';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import Quiz from '../components/Quiz';
import { Reveal, RevealItem } from '../components/Reveal';
import { useLang } from '../i18n';
import { CONTACT, FORMSUBMIT_URL } from '../data/site';

const CONTENT = {
  fr: {
    metaTitle: 'Contact · parlons de vos outils',
    metaDesc:
      "Un premier échange de 30 minutes, sans engagement, pour comprendre votre contexte et voir s'il y a quelque chose à faire.",
    eyebrow: 'Contact',
    title: 'Parlons de vos outils.',
    lead: "Un premier échange de 30 minutes, sans engagement, pour comprendre votre contexte et voir s'il y a quelque chose à faire.",
    quizEyebrow: 'Encore plus simple',
    quizTitle: 'Répondez à quelques questions.',
    quizLead: 'Deux minutes, et je reçois votre demande pré-remplie en un clic.',
    card1H: 'Par e-mail',
    card1P: 'Le plus direct. Décrivez votre contexte en deux lignes, je reviens vers vous rapidement.',
    card2H: 'Ce qui se passe ensuite',
    card2P:
      "On cale un échange de 30 minutes. Je vous explique la démarche, les jalons, et on voit si un audit a du sens pour vous. Sans engagement.",
    name: 'Votre nom',
    email: 'Votre e-mail',
    message: 'Votre message',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    successTitle: 'Message envoyé !',
    successText: 'Je vous réponds sous 24 h.',
    errorText: 'Une erreur est survenue. Réessayez ou écrivez-moi directement.',
  },
  en: {
    metaTitle: "Contact · let's talk about your tools",
    metaDesc:
      "A first 30-minute conversation, no strings attached, to understand your context and see whether there's something worth doing.",
    eyebrow: 'Contact',
    title: 'Talk about your tools.',
    lead: "A first 30-minute conversation, no strings attached, to understand your context and see whether there's something worth doing.",
    quizEyebrow: 'Even simpler',
    quizTitle: 'Answer a few questions.',
    quizLead: 'Two minutes, and I get your pre-filled request in one click.',
    card1H: 'By email',
    card1P: "The most direct. Describe your context in two lines, I'll get back to you quickly.",
    card2H: 'What happens next',
    card2P:
      'We set up a 30-minute conversation. I walk you through the approach, the milestones, and we see whether an audit makes sense for you. No strings attached.',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    submit: 'Send the message',
    sending: 'Sending…',
    successTitle: 'Message sent!',
    successText: "I'll get back to you within 24 h.",
    errorText: 'Something went wrong. Please try again or write to me directly.',
  },
};

export default function Contact() {
  const { lang } = useLang();
  const c = CONTENT[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Contact Reskope · ${form.name}`,
          _captcha: 'false',
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Page title={c.metaTitle} description={c.metaDesc}>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <section className="section section--tight">
        <div className="container contact-page">
          <Reveal className="contact-page__aside">
            <RevealItem className="contact-card">
              <h3>{c.card1H}</h3>
              <p>{c.card1P}</p>
              <a className="link link--lg" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </RevealItem>
            <RevealItem className="contact-card">
              <h3>{c.card2H}</h3>
              <p>{c.card2P}</p>
            </RevealItem>
          </Reveal>

          <Reveal className="contact-form-wrap">
            {status === 'sent' ? (
              <RevealItem className="contact-form contact-form--success">
                <p className="contact-form__success-title">{c.successTitle}</p>
                <p>{c.successText}</p>
              </RevealItem>
            ) : (
              <RevealItem as="form" className="contact-form" onSubmit={onSubmit}>
                <label>
                  <span>{c.name}</span>
                  <input type="text" name="name" value={form.name} onChange={update} required autoComplete="name" />
                </label>
                <label>
                  <span>{c.email}</span>
                  <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
                </label>
                <label>
                  <span>{c.message}</span>
                  <textarea name="message" rows="5" value={form.message} onChange={update} required />
                </label>
                {status === 'error' && (
                  <p className="contact-form__error">{c.errorText}</p>
                )}
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? c.sending : c.submit}
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
              </RevealItem>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" id="qcm">
        <div className="container">
          <Reveal className="section__head">
            <RevealItem as="p" className="eyebrow eyebrow--index">{c.quizEyebrow}</RevealItem>
            <RevealItem as="h2" className="h2">{c.quizTitle}</RevealItem>
            <RevealItem as="p" className="lead">{c.quizLead}</RevealItem>
          </Reveal>
          <Reveal className="quiz-wrap" amount={0.1}>
            <RevealItem>
              <Quiz />
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
