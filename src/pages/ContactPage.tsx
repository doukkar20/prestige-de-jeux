import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { business } from '../data/information';
import LocationMap from '../components/LocationMap';

export function createContactUrl(data: { name: string; email: string; subject: string; message: string }) {
  const text = `Bonjour Prestige de Jeux,\n\nNom : ${data.name}\nE-mail : ${data.email}\nSujet : ${data.subject}\n\n${data.message}`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const [preparedUrl, setPreparedUrl] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(['name', 'email', 'subject', 'message'].map(key => [key, String(data.get(key) || '').trim()]));
    if (Object.values(values).some(value => !value)) return;
    setPreparedUrl(createContactUrl(values as { name: string; email: string; subject: string; message: string }));
  };
  return <div className="editorial-page editorial-wide" lang="fr" dir="ltr">
    <header className="editorial-heading"><p className="editorial-eyebrow">Meknès · Contact & accès</p><h1>Préparons votre prochaine visite.</h1><p className="editorial-deck">Une table de billard, une découverte du snooker ou une demande VIP ? Indiquez la date, l’heure et le nombre de personnes. L’équipe vous confirme les disponibilités et les conditions.</p></header>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
      <section className="space-y-8" aria-label="Coordonnées">
        <div className="editorial-note !mt-0"><h2>Prestige de Jeux</h2><address className="not-italic space-y-5"><p>{business.address}</p><p>Téléphone : <a href={`tel:${business.telephone}`}>{business.phone}</a><br />WhatsApp : <a href={`https://wa.me/${business.whatsapp}`}>Contacter l’équipe</a><br />E-mail : <a className="break-all" href={`mailto:${business.email}`}>{business.email}</a></p></address><p className="mt-6">Pour les horaires du jour, les tarifs ou une demande de groupe, contactez-nous avant votre déplacement. Une demande reste à confirmer par notre équipe.</p></div>
        <LocationMap />
      </section>
      <section aria-labelledby="contact-form-heading"><h2 id="contact-form-heading" className="font-display text-2xl mb-5">Votre demande</h2>
        <p className="text-white/75 leading-relaxed mb-7 text-sm">Ce formulaire prépare votre message. Après vérification, ouvrez WhatsApp pour l’envoyer vous-même. Vous pouvez également nous écrire directement par e-mail.</p>
        <form className="contact-form" onSubmit={handleSubmit} onChange={() => setPreparedUrl('')}>
          <label htmlFor="contact-name">Nom<input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
          <label htmlFor="contact-email">Adresse e-mail<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={160} /></label>
          <label htmlFor="contact-subject">Sujet<input id="contact-subject" name="subject" required minLength={3} maxLength={160} placeholder="Réservation, espace VIP, question…" /></label>
          <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" required minLength={10} maxLength={2000} placeholder="Votre date, le nombre de personnes et votre demande" /></label>
          <label className="contact-consent" htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required /><span>J’ai lu la <Link className="text-gold underline" to="/privacy-policy">politique de confidentialité</Link> et souhaite transmettre ces informations pour obtenir une réponse à ma demande.</span></label>
          <button className="btn-gold" type="submit">Préparer ma demande WhatsApp</button>
          {preparedUrl && <div className="editorial-note !my-0" role="status"><p>Votre message est prêt. Il n’a pas encore été envoyé. Ouvrez la conversation et appuyez sur Envoyer dans WhatsApp.</p><a href={preparedUrl} target="_blank" rel="noreferrer" className="inline-block mt-3">Ouvrir WhatsApp et envoyer ma demande ↗</a></div>}
        </form>
      </section>
    </div>
  </div>;
}
