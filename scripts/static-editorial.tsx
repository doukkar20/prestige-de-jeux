import fs from 'node:fs';
import path from 'node:path';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { articles, wordCount } from '../src/data/articles';
import { ArticleContent, BlogContent, InformationContent } from '../src/components/EditorialContent';
import { editorialRoutes, getEditorialSeo, getArticleSchema } from '../src/data/editorialSeo';
import Contact from '../src/pages/ContactPage';
import NotFound from '../src/pages/NotFound';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);

export function writeEditorialPages(distPath: string, rootUrl: string) {
  for (const article of articles) {
    const words = wordCount(article);
    if (words < 600 || words > 1000) throw new Error(`${article.slug}: ${words} words; expected 600–1000.`);
  }
  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const staticShell = (content: ReactNode) => renderToStaticMarkup(<StaticRouter location="/"><div className="min-h-screen bg-black text-white"><nav className="flex flex-wrap justify-center gap-6 p-6 border-b border-gold/20" aria-label="Navigation principale"><a href="/">Prestige de Jeux</a><a href="/blog">Blog</a><a href="/about">À propos</a><a href="/contact">Contact</a></nav><main>{content}</main><footer className="flex flex-wrap justify-center gap-6 p-8 border-t border-gold/20"><a href="/privacy-policy">Politique de confidentialité</a><a href="/terms">Conditions d’utilisation</a><a href="/about">À propos</a><a href="/contact">Contact</a></footer></div></StaticRouter>);
  const createHtml = (route: string, title: string, description: string, content: ReactNode) => {
    const canonical = new URL(route.slice(1), rootUrl).toString();
    const schema = getArticleSchema(route);
    return template
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeHtml(canonical)}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeHtml(canonical)}$2`)
      .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${schema ? 'article' : 'website'}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(title)}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
      .replace('<div id="root"></div>', () => `<div id="root">${staticShell(content)}</div>`)
      .replace('</head>', `${schema ? `<script id="prestige-article-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}</head>`);
  };
  for (const route of [...editorialRoutes, '/contact']) {
    const article = articles.find(item => route === `/blog/${item.slug}`);
    const seo = getEditorialSeo(route) || { title: 'Contactez-nous | Prestige de Jeux Meknès', description: 'Téléphone, e-mail, adresse à Meknès et demande de contact WhatsApp pour préparer votre visite chez Prestige de Jeux.' };
    const content = article ? createElement(ArticleContent, { article }) : route === '/blog' ? createElement(BlogContent) : route === '/contact' ? createElement(Contact) : createElement(InformationContent, { path: route });
    const directory = path.join(distPath, route.slice(1));
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), createHtml(route, seo.title, seo.description, content));
  }
  // Serve a real HTML document for the historical privacy URL without an HTTP 404.
  fs.mkdirSync(path.join(distPath, 'privacy'), { recursive: true });
  const privacySeo = getEditorialSeo('/privacy-policy')!;
  fs.writeFileSync(path.join(distPath, 'privacy/index.html'), createHtml('/privacy-policy', privacySeo.title, privacySeo.description, createElement(InformationContent, { path: '/privacy-policy' })));
  fs.writeFileSync(path.join(distPath, '404.html'), createHtml('/404', 'Page introuvable | Prestige de Jeux', 'Retrouvez le blog, les informations et les coordonnées de Prestige de Jeux.', createElement(NotFound)).replace('content="index, follow, max-image-preview:large"', 'content="noindex, follow"'));
  console.info(`Generated ${editorialRoutes.length + 1} content pages and a 404 document; validated ${articles.length} articles (600–1000 words each).`);
}
