import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function normalizeBasePath(basePath: string) {
  if (basePath === './' || basePath === '.') return './';
  if (!basePath || basePath === '/') return '/';
  return `/${basePath.replace(/^\/|\/$/g, '')}/`;
}

function githubPagesBasePath() {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (!process.env.GITHUB_ACTIONS || !repositoryName || repositoryName.endsWith('.github.io')) {
    return '/';
  }
  return `/${repositoryName}/`;
}

function spaFallbackPlugin() {
  return {
    name: 'prestige-github-pages-spa-fallback',
    closeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html');
      const fallbackPath = path.resolve(__dirname, 'dist/404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
      }
    },
  };
}

function staticSeoFilesPlugin(siteUrl: string) {
  const routes = ['/', '/about', '/services', '/menu', '/gallery', '/tournaments', '/reservation', '/contact', '/faq', '/pricing'];
  const rootUrl = siteUrl.replace(/\/?$/, '/');

  return {
    name: 'prestige-static-seo-files',
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist');
      const urls = routes
        .map((route) => {
          const loc = new URL(route.replace(/^\//, ''), rootUrl).toString();
          return `  <url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${route === '/' ? '1.0' : '0.8'}</priority></url>`;
        })
        .join('\n');

      fs.writeFileSync(
        path.join(distPath, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );

      fs.writeFileSync(
        path.join(distPath, 'robots.txt'),
        `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', rootUrl).toString()}\n`,
      );
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const base = normalizeBasePath(env.VITE_BASE_PATH || './');
  const siteUrl = env.VITE_SITE_URL || `https://doukkar20.github.io${githubPagesBasePath()}`;

  return {
    base,
    plugins: [react(), tailwindcss(), spaFallbackPlugin(), staticSeoFilesPlugin(siteUrl)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');
            if (normalizedId.includes('/node_modules/react/')) return 'react';
            if (normalizedId.includes('/node_modules/react-dom/')) return 'react';
            if (normalizedId.includes('/node_modules/react-router-dom/')) return 'react';
            if (normalizedId.includes('/node_modules/motion/')) return 'motion';
            return undefined;
          },
        },
      },
    },
  };
});
