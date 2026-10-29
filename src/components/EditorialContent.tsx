import { articles, editorialDate, readingMinutes, type Article } from '../data/articles';
import { informationPages, business } from '../data/information';

// Shared by React routes and build-time HTML. Plain links also work without JavaScript.
export function ArticleContent({ article }: { article: Article }) {
  return <article className="editorial-page" lang="fr" dir="ltr">
    <nav aria-label="Fil d’Ariane" className="editorial-breadcrumb"><a href="/">Accueil</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>{article.category}</span></nav>
    <header className="editorial-heading">
      <p className="editorial-eyebrow">Le journal · {article.category}</p>
      <h1>{article.title}</h1>
      <p className="editorial-deck">{article.description}</p>
      <p className="editorial-meta">Par la rédaction Prestige de Jeux · <time dateTime={editorialDate}>29 octobre 2026</time> · {readingMinutes(article)} min de lecture</p>
    </header>
    <nav className="editorial-toc" aria-label="Sommaire"><h2>Dans ce guide</h2><ol>{article.sections.map((section, i) => <li key={section.title}><a href={`#partie-${i + 1}`}>{section.title}</a></li>)}</ol></nav>
    <div className="editorial-prose">{article.sections.map((section, i) => <section key={section.title} id={`partie-${i + 1}`}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}</div>
    {article.sources && <aside className="editorial-note"><h2>Références pour aller plus loin</h2><p>Nos explications sont rédigées pour la découverte. Pour une compétition, vérifiez le règlement retenu par l’organisateur.</p><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} rel="noreferrer" target="_blank">{source.label} ↗</a></li>)}</ul></aside>}
    <aside className="editorial-note"><h2>Prolonger la découverte</h2><p>Une question sur ce guide ? <a href={`mailto:${business.email}`}>Écrivez-nous</a>. Pour préparer une visite à Meknès, <a href="/contact">contactez l’équipe</a> ou <a href="/reservation">demandez une réservation</a>.</p><ul>{articles.filter(item => item.slug !== article.slug).slice(article.category === 'Progression' ? 2 : 0, article.category === 'Progression' ? 5 : 3).map(item => <li key={item.slug}><a href={`/blog/${item.slug}`}>{item.title}</a></li>)}</ul></aside>
    <a className="editorial-back" href="/blog">← Tous les articles</a>
  </article>;
}

export function BlogContent() {
  return <div className="editorial-page editorial-wide" lang="fr" dir="ltr">
    <header className="editorial-heading"><p className="editorial-eyebrow">Prestige de Jeux · Le journal</p><h1>Le billard se joue.<br />Il se découvre aussi.</h1><p className="editorial-deck">Règles expliquées, exercices de précision et idées de sorties à Meknès : dix guides pour mieux comprendre le jeu et profiter du temps autour de la table.</p></header>
    <div className="editorial-grid">{articles.map((article, i) => <article className="editorial-card" key={article.slug}><p className="editorial-eyebrow"><span>{String(i + 1).padStart(2, '0')}</span> {article.category}</p><h2><a href={`/blog/${article.slug}`}>{article.title}</a></h2><p>{article.description}</p><div className="editorial-card-bottom"><span>{readingMinutes(article)} min de lecture</span><a aria-label={`Lire : ${article.title}`} href={`/blog/${article.slug}`}>Lire le guide →</a></div></article>)}</div>
    <aside className="editorial-note"><h2>Notre démarche éditoriale</h2><p>Ces articles originaux sont proposés par la rédaction Prestige de Jeux pour accompagner les joueurs débutants et curieux. Les règles sportives sont reliées aux organismes de référence ; les conseils pratiques proposent des exercices à adapter à votre niveau. Les annonces de tournois, tarifs et disponibilités doivent être confirmés auprès de l’équipe.</p><p>Une correction à suggérer ? <a href="/contact">Contactez-nous</a>. Découvrez également <a href="/about">notre espace à Meknès</a>.</p></aside>
  </div>;
}

export function InformationContent({ path }: { path: string }) {
  const page = informationPages[path];
  if (!page) return null;
  return <article className="editorial-page" lang="fr" dir="ltr">
    <header className="editorial-heading"><p className="editorial-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="editorial-deck">{page.description}</p>{path !== '/about' && <p className="editorial-meta">Version du <time dateTime={editorialDate}>29 octobre 2026</time></p>}</header>
    <div className="editorial-prose">{page.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}</div>
    {path === '/privacy-policy' && <aside className="editorial-note"><h2>Liens utiles pour vos choix</h2><ul>
      <li><a href="https://myadcenter.google.com/">Google — préférences publicitaires</a></li>
      <li><a href="https://policies.google.com/technologies/partner-sites?hl=fr">Comment Google utilise les données des sites partenaires</a></li>
      <li><a href="https://policies.google.com/privacy?hl=fr">Politique de confidentialité de Google</a></li>
      <li><a href="https://optout.aboutads.info/">YourAdChoices — choix des fournisseurs tiers</a></li>
      <li><a href="https://www.whatsapp.com/legal/privacy-policy">Politique de confidentialité de WhatsApp</a></li>
      <li><a href="https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement">Politique de confidentialité de GitHub</a></li>
      <li><a href="https://www.cndp.ma/">CNDP — protection des données au Maroc</a></li>
    </ul></aside>}
    <aside className="editorial-note"><h2>Restons en contact</h2><p>{business.address}</p><p><a href={`tel:${business.telephone}`}>{business.phone}</a> · <a href={`mailto:${business.email}`}>{business.email}</a></p><p><a href="/contact">Contactez-nous</a> · <a href="/blog">Découvrir le blog</a> · <a href={path === '/privacy-policy' ? '/terms' : '/privacy-policy'}>{path === '/privacy-policy' ? 'Conditions d’utilisation' : 'Politique de confidentialité'}</a></p></aside>
  </article>;
}
