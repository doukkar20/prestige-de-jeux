import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'src/pages/Menu.tsx');
const outputDir = resolve(root, 'dist');
const htmlPath = resolve(outputDir, 'menu-prestige-updated.html');
const pdfPath = resolve(outputDir, 'menu-prestige-updated.pdf');

const source = readFileSync(sourcePath, 'utf8');
const itemPattern =
  /\{\s*id:\s*'([^']+)'[\s\S]*?name:\s*(['"])([\s\S]*?)\2,\s*category:\s*'([^']+)'[\s\S]*?price:\s*'([^']+)'[\s\S]*?description:\s*(['"])([\s\S]*?)\6,[\s\S]*?\.\.\.foodImage\(([^)]*)\)/g;

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function repairText(value) {
  return value
    .replaceAll('Ã©', 'é')
    .replaceAll('Ã¨', 'è')
    .replaceAll('Ãª', 'ê')
    .replaceAll('Ã ', 'à')
    .replaceAll('Ã§', 'ç')
    .replaceAll('Ã®', 'î')
    .replaceAll('Ã¯', 'ï')
    .replaceAll('Ã‰', 'É')
    .replaceAll('ÃŠ', 'Ê')
    .replaceAll('Å’', 'Œ')
    .replaceAll('â€™', "'")
    .replaceAll('HAWAÃ', 'HAWAÏ');
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
  return pathToFileURL(chosen).href;
}

const items = [];
for (const match of source.matchAll(itemPattern)) {
  const [, id, , name, category, price, , description, imageArgs] = match;
  const image = imageFor(parseFoodImageArgs(imageArgs));
  items.push({
    id,
    name: repairText(name),
    category: repairText(category),
    price,
    description: repairText(description),
    image,
  });
}

const order = [
  'Burgers',
  'Tacos',
  'Petits Déjeuners',
  'Crêpes Sucrées',
  'Crêpes Salées',
  'Jus Frais',
  'Eaux & Boissons Gazeuses',
  'Boissons Chaudes',
  'Boissons Froides',
  'Cocktails Signature',
];

const grouped = order
  .map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }))
  .filter((section) => section.items.length);

const sectionMarkup = grouped
  .map(
    (section) => `
      <section class="section">
        <header class="section-header">
          <span>Prestige de Jeux</span>
          <h2>${htmlEscape(section.category)}</h2>
        </header>
        <div class="grid">
          ${section.items
            .map(
              (item) => `
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
              `,
            )
            .join('')}
        </div>
      </section>
    `,
  )
  .join('');

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

      @page {
        size: A4;
        margin: 12mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #0b0b0b;
        color: #fff;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .cover {
        min-height: 273mm;
        display: grid;
        align-content: center;
        gap: 18mm;
        padding: 22mm 14mm;
        border: 1px solid rgba(212, 175, 55, 0.5);
        background:
          radial-gradient(circle at 50% 6%, rgba(15, 77, 47, 0.92), transparent 42%),
          radial-gradient(circle at 16% 24%, rgba(212, 175, 55, 0.22), transparent 30%),
          linear-gradient(180deg, rgba(11, 11, 11, 0.9), #0b0b0b 86%);
        page-break-after: always;
      }

      .eyebrow,
      .section-header span,
      .meta span {
        color: #d4af37;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      strong {
        font-family: "Playfair Display", Georgia, serif;
      }

      h1 {
        margin: 0;
        color: #d4af37;
        font-size: 72px;
        line-height: 0.92;
        text-shadow: 0 0 28px rgba(212, 175, 55, 0.24);
      }

      .cover p {
        max-width: 142mm;
        margin: 0;
        color: rgba(255, 255, 255, 0.82);
        font-size: 17px;
        line-height: 1.7;
      }

      .cover-footer {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        border-top: 1px solid rgba(212, 175, 55, 0.32);
        padding-top: 7mm;
        color: rgba(255, 255, 255, 0.72);
        font-size: 10px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .section {
        margin: 0 0 9mm;
      }

      .section-header {
        break-after: avoid;
        margin: 0 0 4mm;
        border-bottom: 1px solid rgba(212, 175, 55, 0.28);
        padding-bottom: 2.7mm;
      }

      h2 {
        margin: 2mm 0 0;
        color: #fff;
        font-size: 28px;
        line-height: 0.98;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 4mm;
      }

      .card {
        display: grid;
        grid-template-columns: 32mm 1fr;
        min-height: 43mm;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.42);
        border-radius: 4mm;
        background: rgba(11, 11, 11, 0.82);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        break-inside: avoid;
      }

      .card img {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 43mm;
        object-fit: cover;
        background:
          radial-gradient(circle at 50% 42%, rgba(212, 175, 55, 0.16), transparent 52%),
          linear-gradient(145deg, #070707, #17120a 58%, #050505);
      }

      .card-body {
        display: flex;
        min-width: 0;
        flex-direction: column;
        padding: 3mm;
      }

      .meta {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 2.5mm;
        margin-bottom: 2mm;
      }

      .meta strong {
        color: #d4af37;
        font-size: 18px;
        line-height: 1;
        white-space: nowrap;
      }

      h3 {
        margin: 0;
        color: #fff;
        font-size: 14.5px;
        line-height: 1.08;
      }

      .card p {
        margin: 2mm 0 0;
        color: rgba(255, 255, 255, 0.74);
        font-size: 9.2px;
        line-height: 1.35;
      }

      .print-footer {
        position: fixed;
        right: 12mm;
        bottom: 5mm;
        left: 12mm;
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
    </style>
  </head>
  <body>
    <main>
      <section class="cover">
        <div>
          <div class="eyebrow">Prestige de Jeux</div>
          <h1>Notre<br>Menu</h1>
        </div>
        <p>Petits déjeuners, crêpes, jus frais, eaux & boissons gazeuses, boissons chaudes, boissons froides, burgers, tacos et cocktails signature.</p>
        <div class="cover-footer">
          <span>Menu imprimable A4</span>
          <span>Prix mis à jour le ${htmlEscape(generatedAt)}</span>
        </div>
      </section>
      ${sectionMarkup}
    </main>
    <footer class="print-footer">
      <span>Prestige de Jeux</span>
      <span>prestigedejeux.com/menu</span>
    </footer>
  </body>
</html>`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(htmlPath, html);

const edgeCandidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];
const browser = edgeCandidates.find((candidate) => existsSync(candidate));

if (!browser) {
  throw new Error('No Chromium browser found for PDF generation.');
}

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

if (result.status !== 0) {
  throw new Error(`PDF generation failed with exit code ${result.status}.`);
}

console.log(`Generated ${pdfPath}`);
console.log(`Source HTML ${htmlPath}`);
console.log(`Parsed ${items.length} menu items.`);
