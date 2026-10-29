import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { articles, wordCount } from '../src/data/articles';
import { editorialRoutes, getEditorialSeo } from '../src/data/editorialSeo';

assert.equal(articles.length, 10);
assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
for (const article of articles) {
  assert.ok(wordCount(article) >= 600 && wordCount(article) <= 1000, `${article.slug}: word count`);
}
for (const route of [...editorialRoutes, '/contact']) {
  const html = fs.readFileSync(path.join('dist', route.slice(1), 'index.html'), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one H1`);
  assert.ok(html.includes('rel="canonical" href="https://prestigedejeux.com/'), `${route}: canonical`);
  assert.ok(!html.includes('adsbygoogle.js'), `${route}: no uncontrolled ad requests`);
  assert.ok(!html.includes('elfsightcdn.com/platform.js'), `${route}: no automatic reviews tracking`);
  if (route !== '/contact') assert.ok(getEditorialSeo(route), `${route}: metadata`);
  const article = articles.find(article => route.endsWith(article.slug));
  if (article) {
    assert.ok(html.includes('"@type":"BlogPosting"'), `${route}: article schema`);
    assert.ok(html.includes(article.sections[0].paragraphs[0].slice(0, 35)), `${route}: static article text`);
    assert.ok(html.includes(article.sections.at(-1)!.title), `${route}: complete article`);
  }
  for (const target of ['/privacy-policy', '/terms', '/about', '/contact']) assert.ok(html.includes(`href="${target}"`), `${route}: footer ${target}`);
  const assetUrls = [...html.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)].map(match => match[1]);
  for (const url of assetUrls) assert.ok(fs.existsSync(path.join('dist', url)), `${route}: asset ${url}`);
}
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
for (const route of editorialRoutes) assert.ok(sitemap.includes(`https://prestigedejeux.com${route}</loc>`), `${route}: sitemap entry`);
assert.ok(fs.readFileSync('dist/404.html', 'utf8').includes('content="noindex, follow"'));
console.log(`Verified ${articles.length} articles (600–1000 words), 15 HTML content pages, metadata, structured data, footer links, assets, sitemap and 404.`);
