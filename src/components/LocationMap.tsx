import { useState } from 'react';
import { business } from '../data/information';
export default function LocationMap() {
  const [visible, setVisible] = useState(false);
  return <div className="border border-gold/25 p-5 text-sm text-white/75 space-y-4" lang="fr" dir="ltr">
    <p>{business.address}</p>
    {visible ? <iframe title="Localisation de Prestige de Jeux à Meknès" src="https://www.google.com/maps?q=Prestige+de+jeux+Meknes&output=embed" className="w-full h-72 border-0" loading="lazy" referrerPolicy="no-referrer" /> : <><p>La carte est fournie par Google Maps. L’afficher transmet des données techniques à Google. <a className="underline text-gold" href="/privacy-policy">En savoir plus</a>.</p><button className="btn-outline !px-5 !py-3" type="button" onClick={() => setVisible(true)}>Afficher la carte Google Maps</button></>}
    <p><a className="text-gold underline" href={business.mapUrl} target="_blank" rel="noreferrer">Ouvrir l’itinéraire dans Google Maps ↗</a></p>
  </div>;
}
