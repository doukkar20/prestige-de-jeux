import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'src/pages/Menu.tsx');
const outputDir = resolve(root, 'dist');
const htmlPath = resolve(outputDir, 'menu-prestige-updated.html');
const pdfPath = resolve(outputDir, 'menu-prestige-updated.pdf');
const scrapedLogoPath = resolve(outputDir, 'prestige-live-logo.jpg');
const targetUrl = 'https://prestigedejeux.com/menu';
const siteRoot = 'https://prestigedejeux.com';

const fallbackBrand = {
  primary: '#0b0b0b',
  secondary: '#111111',
  accent: '#d4af37',
  accentLight: '#f1d279',
  green: '#0f4d2f',
  text: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.74)',
  displayFont: '"Playfair Display", Georgia, serif',
  sansFont: 'Inter, ui-sans-serif, system-ui, sans-serif',
};

const categoryOrder = [
  'Burgers',
  'Tacos',
  'Petits D\u00e9jeuners',
  'Cr\u00eapes Sucr\u00e9es',
  'Cr\u00eapes Sal\u00e9es',
  'Jus Frais',
  'Eaux & Boissons Gazeuses',
  'Boissons Chaudes',
  'Boissons Froides',
  'Cocktails Signature',
];

const ledger = [
  ['CHEES BURGER', 'Burgers', 30],
  ['CHEKNE BURGER', 'Burgers', 30],
  ['TACOS POULET', 'Tacos', 35],
  ['TACOS V H', 'Tacos', 38],
  ['TACOS MIXT', 'Tacos', 40],
  ['Espresso', 'Boissons Chaudes', 13],
  ['Double Espresso', 'Boissons Chaudes', 18],
  ['Caf\u00e9 Cr\u00e8me', 'Boissons Chaudes', 15],
  ['Chocolat Chaud', 'Boissons Chaudes', 20],
  ['Th\u00e9 Anglais', 'Boissons Chaudes', 15],
  ['Th\u00e9 Am\u00e9ricain', 'Boissons Chaudes', 15],
  ['Cappuccino Viennois', 'Boissons Chaudes', 25],
  ['Moka', 'Boissons Chaudes', 20],
  ['Monte Cristo', 'Boissons Chaudes', 32],
  ['Caf\u00e9 Latte', 'Boissons Chaudes', 20],
  ['LAIT VERVEINE', 'Boissons Chaudes', 15],
  ['THE M3ACHAB', 'Boissons Chaudes', 15],
  ['Cappuccino', 'Boissons Chaudes', 18],
  ['CAFE AMIRECANE', 'Boissons Chaudes', 18],
  ['Red Paradise', 'Cocktails Signature', 38],
  ['Mojito Virgin', 'Cocktails Signature', 35],
  ['Bora Bora', 'Cocktails Signature', 35],
  ['Prestige Cocktail', 'Cocktails Signature', 45],
  ['PINACOLADA', 'Cocktails Signature', 45],
  ['Milk Shake', 'Boissons Froides', 30],
  ['Frappuccino', 'Boissons Froides', 35],
  ['Ice Tea', 'Boissons Froides', 30],
  ['Smoothie', 'Boissons Froides', 30],
  ['SPANESH ICE LATTE', 'Boissons Froides', 35],
  ['EAU 33', 'Eaux & Boissons Gazeuses', 4],
  ['OUALMAS', 'Eaux & Boissons Gazeuses', 12],
  ['OUALMAS AROMATISE', 'Eaux & Boissons Gazeuses', 16],
  ['Cr\u00eape Sal\u00e9e Poulet Champignon', 'Cr\u00eapes Sal\u00e9es', 38],
  ['Cr\u00eape Nutella Classique', 'Cr\u00eapes Sucr\u00e9es', 30],
  ['Cr\u00eape Banane Chocolat', 'Cr\u00eapes Sucr\u00e9es', 35],
  ['Chamalli', 'Petits D\u00e9jeuners', 33],
  ['Fassi Premium', 'Petits D\u00e9jeuners', 35],
  ['French Breakfast', 'Petits D\u00e9jeuners', 35],
  ['Croque Monsieur', 'Petits D\u00e9jeuners', 38],
  ['Croque Madame', 'Petits D\u00e9jeuners', 38],
  ['\u0152ufs au Choix', 'Petits D\u00e9jeuners', 26],
  ['Prestige Breakfast', 'Petits D\u00e9jeuners', 55],
];

const ledgerByName = new Map(ledger.map(([name, category, price]) => [normalizeName(name), { name, category, price }]));

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function repairText(value) {
  const text = String(value);
  if (!/[ÃÅâ]/.test(text)) return text;
  return Buffer.from(text, 'latin1').toString('utf8').replaceAll('\u2019', "'");
}

function normalizeName(value) {
  return repairText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .toUpperCase();
}

function formatMad(value) {
  const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.]/g, ''));
  return `${numeric.toFixed(2)} MAD`;
}

function parseFoodImageArgs(args) {
  const values = [...args.matchAll(/'([^']+)'/g)].map((match) => match[1]);
  return {
    slug: values[0],
    source: values[1] || 'optimized',
    extension: values[2] || 'webp',
  };
}

function imageFor({ slug, source = 'optimized', extension = 'webp' }) {
  const modal = resolve(root, `src/assets/images/pic food/${source}/${slug}.${extension}`);
  const thumb = resolve(root, `src/assets/images/pic food/${source}/${slug}-thumb.${extension}`);
  const fallback = resolve(root, 'src/assets/images/snooker-table.jpg');
  const chosen = existsSync(thumb) ? thumb : existsSync(modal) ? modal : fallback;
  return { href: pathToFileURL(chosen).href, missing: chosen === fallback, path: chosen };
}

async function fetchText(url) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'PrestigeMenuPDF/1.0' } });
    return response.ok ? await response.text() : '';
  } catch {
    return '';
  }
}

function absoluteUrl(url) {
  try {
    return new URL(url, siteRoot).href;
  } catch {
    return '';
  }
}

async function scrapeBranding() {
  const html = await fetchText(targetUrl);
  const cssLinks = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi)].map((match) => absoluteUrl(match[1]));
  const css = `${readFileSync(resolve(root, 'src/pages/Menu.css'), 'utf8')}\n${(await Promise.all(cssLinks.map(fetchText))).join('\n')}`;

  const logoCandidates = [
    ...[...html.matchAll(/(?:src|href)=["']([^"']*(?:logo|prestige)[^"']*\.(?:png|jpe?g|webp|svg))["']/gi)].map((match) => absoluteUrl(match[1])),
    `${siteRoot}/logo-prestige.jpg`,
    `${siteRoot}/assets/images/logo.jpg`,
  ].filter(Boolean);

  for (const logoUrl of logoCandidates) {
    try {
      const response = await fetch(logoUrl, { headers: { 'user-agent': 'PrestigeMenuPDF/1.0' } });
      if (!response.ok) continue;
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 2048) continue;
      const ext = extname(new URL(logoUrl).pathname) || '.jpg';
      const logoPath = scrapedLogoPath.replace(/\.jpg$/, ext);
      writeFileSync(logoPath, buffer);
      return { ...fallbackBrand, logoPath, cssBytes: css.length, logoUrl };
    } catch {
      continue;
    }
  }

  const localLogo = resolve(root, 'public/logo-prestige.jpg');
  return { ...fallbackBrand, logoPath: existsSync(localLogo) ? localLogo : resolve(root, 'src/assets/images/logo.jpg'), cssBytes: css.length, logoUrl: 'local fallback' };
}

function parseSourceMenu() {
  const source = readFileSync(sourcePath, 'utf8');
  const itemPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?name:\s*(['"])([\s\S]*?)\2,\s*category:\s*'([^']+)'[\s\S]*?price:\s*'([^']+)'[\s\S]*?description:\s*(['"])([\s\S]*?)\6,[\s\S]*?\.\.\.foodImage\(([^)]*)\)/g;
  const items = [];

  for (const match of source.matchAll(itemPattern)) {
    const [, id, , rawName, rawCategory, rawPrice, , rawDescription, imageArgs] = match;
    const name = repairText(rawName);
    const category = repairText(rawCategory);
    const ledgerEntry = ledgerByName.get(normalizeName(name));
    const image = imageFor(parseFoodImageArgs(imageArgs));

    items.push({
      id,
      name: ledgerEntry?.name || name,
      category: ledgerEntry?.category || category,
      price: formatMad(ledgerEntry?.price ?? rawPrice),
      description: repairText(rawDescription),
      image: image.href,
      missingImage: image.missing,
    });
  }

  for (const [name, category, price] of ledger) {
    if (items.some((item) => normalizeName(item.name) === normalizeName(name))) continue;
    items.push({
      id: normalizeName(name).toLowerCase().replaceAll(' ', '-'),
      name,
      category,
      price: formatMad(price),
      description: `${name} servi dans l'esprit premium Prestige de Jeux.`,
      image: pathToFileURL(resolve(root, 'src/assets/images/snooker-table.jpg')).href,
      missingImage: true,
    });
  }

  const seen = new Set();
  return items.filter((item) => {
    const key = `${normalizeName(item.category)}:${normalizeName(item.name)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderSections(items) {
  return categoryOrder
    .map((category) => ({ category, items: items.filter((item) => item.category === category) }))
    .filter((section) => section.items.length)
    .map((section) => `
      <section class="section">
        <header class="section-header">
          <span>Prestige de Jeux</span>
          <h2>${htmlEscape(section.category)}</h2>
        </header>
        <div class="grid">
          ${section.items.map((item) => `
            <article class="card">
              <img src="${item.image}" alt="${htmlEscape(item.name)}">
              <div class="card-body">
                <div class="meta">
                  <span>${htmlEscape(item.category)}</span>
                  <strong>${htmlEscape(item.price)}</strong>
                </div>
                <h3>${htmlEscape(item.name)}</h3>
                <p>${htmlEscape(item.description)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `)
    .join('');
}

async function main() {
  mkdirSync(outputDir, { recursive: true });
  const brand = await scrapeBranding();
  const items = parseSourceMenu();
  const missing = items.filter((item) => item.missingImage).map((item) => item.name);
  const generatedAt = new Intl.DateTimeFormat('fr-MA', {
    dateStyle: 'long',
    timeZone: 'Africa/Casablanca',
  }).format(new Date());

  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Menu Prestige de Jeux</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

      @page { size: A4; margin: 15mm; }
      * { box-sizing: border-box; }
      html { background: ${brand.primary}; }
      body {
        margin: 0;
        background: ${brand.primary};
        color: ${brand.text};
        font-family: ${brand.sansFont};
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .cover {
        min-height: 267mm;
        display: grid;
        place-items: center;
        text-align: center;
        padding: 18mm;
        border: 1px solid rgba(212, 175, 55, 0.5);
        background:
          radial-gradient(circle at 50% 0%, rgba(15, 77, 47, 0.86), transparent 40%),
          radial-gradient(circle at 18% 26%, rgba(212, 175, 55, 0.16), transparent 32%),
          linear-gradient(180deg, rgba(11, 11, 11, 0.76), ${brand.primary} 88%);
        break-after: page;
        page-break-after: always;
      }
      .cover-inner { display: grid; justify-items: center; gap: 9mm; }
      .logo-wrap {
        display: grid;
        place-items: center;
        width: 84mm;
        height: 84mm;
        border: 1px solid rgba(212, 175, 55, 0.44);
        border-radius: 50%;
        background: rgba(11, 11, 11, 0.52);
        box-shadow: 0 0 48px rgba(212, 175, 55, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }
      .logo-wrap img { max-width: 64mm; max-height: 64mm; object-fit: contain; border-radius: 50%; }
      .eyebrow, .section-header span, .meta span {
        color: ${brand.accent};
        font-size: 8.5px;
        font-weight: 900;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      h1, h2, h3, strong { font-family: ${brand.displayFont}; }
      h1 {
        margin: 0;
        color: ${brand.accent};
        font-size: 48px;
        line-height: 0.96;
        text-shadow: 0 0 28px rgba(212, 175, 55, 0.24);
      }
      .subtitle {
        margin: 0;
        color: rgba(255, 255, 255, 0.82);
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .cover-footer {
        display: flex;
        justify-content: center;
        gap: 8mm;
        width: 100%;
        max-width: 150mm;
        border-top: 1px solid rgba(212, 175, 55, 0.32);
        padding-top: 6mm;
        color: rgba(255, 255, 255, 0.72);
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .section { margin: 0 0 8mm; }
      .section-header {
        break-after: avoid;
        page-break-after: avoid;
        margin: 0 0 4mm;
        border-bottom: 1px solid rgba(212, 175, 55, 0.28);
        padding-bottom: 2.7mm;
      }
      h2 { margin: 2mm 0 0; color: #fff; font-size: 27px; line-height: 1; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4mm; }
      .card {
        display: grid;
        grid-template-columns: 31mm 1fr;
        min-height: 41mm;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.42);
        border-radius: 4mm;
        background: rgba(11, 11, 11, 0.82);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .card img {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 41mm;
        object-fit: cover;
        background:
          radial-gradient(circle at 50% 42%, rgba(212, 175, 55, 0.16), transparent 52%),
          linear-gradient(145deg, #070707, #17120a 58%, #050505);
      }
      .card-body { display: flex; min-width: 0; flex-direction: column; padding: 3mm; }
      .meta { display: flex; align-items: baseline; justify-content: space-between; gap: 2.5mm; margin-bottom: 2mm; }
      .meta strong { color: ${brand.accent}; font-size: 15px; line-height: 1; white-space: nowrap; }
      h3 { margin: 0; color: #fff; font-size: 14px; line-height: 1.08; }
      .card p { margin: 2mm 0 0; color: ${brand.muted}; font-size: 8.8px; line-height: 1.35; }
      .print-footer {
        position: fixed;
        right: 15mm;
        bottom: 5mm;
        left: 15mm;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(212, 175, 55, 0.22);
        padding-top: 2mm;
        color: rgba(255, 255, 255, 0.52);
        font-size: 8px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .page-number::after { content: "Page " counter(page); }
    </style>
  </head>
  <body>
    <main>
      <section class="cover">
        <div class="cover-inner">
          <div class="logo-wrap"><img src="${pathToFileURL(brand.logoPath).href}" alt="Prestige de Jeux"></div>
          <div>
            <div class="eyebrow">Prestige de Jeux</div>
            <h1>Premium Lounge Menu</h1>
          </div>
          <p class="subtitle">Menu imprimable A4</p>
          <div class="cover-footer">
            <span>prestigedejeux.com/menu</span>
            <span>Prix mis a jour le ${htmlEscape(generatedAt)}</span>
          </div>
        </div>
      </section>
      ${renderSections(items)}
    </main>
    <footer class="print-footer">
      <span>Prestige de Jeux</span>
      <span class="page-number"></span>
    </footer>
  </body>
</html>`;

  writeFileSync(htmlPath, html);

  const edgeCandidates = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ];
  const browser = edgeCandidates.find((candidate) => existsSync(candidate));
  if (!browser) throw new Error('No Chromium browser found for PDF generation.');

  const result = spawnSync(
    browser,
    [
      '--headless',
      '--disable-gpu',
      '--allow-file-access-from-files',
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) throw new Error(`PDF generation failed with exit code ${result.status}.`);

  console.log(`Generated ${pdfPath}`);
  console.log(`Source HTML ${htmlPath}`);
  console.log(`Parsed ${items.length} menu items.`);
  console.log(`Scraped branding CSS bytes: ${brand.cssBytes}`);
  console.log(`Logo source: ${brand.logoUrl}`);
  console.log(`Missing image fallbacks: ${missing.length ? missing.join(', ') : 'none'}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
