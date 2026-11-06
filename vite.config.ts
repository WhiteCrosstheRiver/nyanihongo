import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });

/** Writes dist/sw.js with a content-hashed list of every file the web version needs offline. */
function offlineWorker(): Plugin {
  return {
    name: 'offline-worker',
    apply: 'build',
    closeBundle() {
      const html = readFileSync('dist/index.html', 'utf8');
      const files = walk('dist')
        .map((p) => relative('dist', p).replaceAll('\\', '/'))
        .filter((p) => p !== 'sw.js' && !p.endsWith('.woff')) // every browser with service workers uses the .woff2 copies
        .map((p) => {
          const body = readFileSync(join('dist', p));
          const core = p === 'index.html' || p === 'manifest.webmanifest' || p === 'icon.svg' || html.includes(p);
          return [p, createHash('sha1').update(body).digest('hex').slice(0, 16), body.length, core ? 1 : 0];
        });
      writeFileSync('dist/sw.js', readFileSync('scripts/sw.template.js', 'utf8').replace('__FILES__', JSON.stringify(files)));
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), offlineWorker()],
  build: { chunkSizeWarningLimit: 2000 },
  test: { include: ['src/**/*.test.ts'] },
} as any);
