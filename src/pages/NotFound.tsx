import { Link } from 'react-router-dom';
export default function NotFound() {
  return <div className="editorial-page" lang="fr" dir="ltr"><header className="editorial-heading"><p className="editorial-eyebrow">Erreur 404</p><h1>Cette page est introuvable.</h1><p className="editorial-deck">Le lien a peut-être changé. Retrouvez nos guides ou les informations pour préparer votre visite.</p></header><p className="flex flex-wrap gap-6"><Link className="btn-outline" to="/blog">Découvrir le blog</Link><Link className="btn-outline" to="/contact">Contactez-nous</Link><Link to="/">Revenir à l’accueil</Link></p></div>;
}
