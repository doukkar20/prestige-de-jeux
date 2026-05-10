import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function normalizeBasePath(basePath: string) {
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

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const base = normalizeBasePath(env.VITE_BASE_PATH || githubPagesBasePath());

  return {
    base,
    plugins: [react(), tailwindcss(), spaFallbackPlugin()],
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
  };
});
