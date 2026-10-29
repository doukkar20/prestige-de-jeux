import { articles, editorialDate } from './articles';
import { informationPages } from './information';
export const siteUrl = 'https://prestigedejeux.com';
export const editorialRoutes = ['/blog', ...articles.map(article => `/blog/${article.slug}`), ...Object.keys(informationPages)];
export function getEditorialSeo(path: string) {
  if (path === '/blog') return { title: 'Blog billard, snooker & culture lounge | Prestige de Jeux', description: 'Dix guides en français sur les règles du snooker, le matériel, la précision au billard et les sorties entre amis à Meknès.' };
  const article = articles.find(article => path === `/blog/${article.slug}`);
  if (article) return { title: `${article.title} | Prestige de Jeux`, description: article.description };
  const page = informationPages[path];
  return page ? { title: `${page.title} | Prestige de Jeux`, description: page.description } : undefined;
}
export function getArticleSchema(path: string) {
  const article = articles.find(article => path === `/blog/${article.slug}`);
  return article ? {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
    description: article.description, inLanguage: 'fr-MA', datePublished: editorialDate,
    dateModified: editorialDate, mainEntityOfPage: `${siteUrl}${path}`,
    author: { '@type': 'Organization', name: 'Rédaction Prestige de Jeux', url: `${siteUrl}/about` },
    publisher: { '@type': 'Organization', name: 'Prestige de Jeux', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/logo-prestige.jpg` } },
    image: `${siteUrl}/og-prestige.jpg`, articleSection: article.category,
  } : undefined;
}
