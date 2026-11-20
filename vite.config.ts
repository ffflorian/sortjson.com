import {defineConfig, runnerImport, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import {createElement, type ReactElement} from 'react';
import {renderToString} from 'react-dom/server';

function prerender(): Plugin {
  return {
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      const {module} = await runnerImport<{default: () => ReactElement}>('/src/App.tsx', {
        configFile: false,
        plugins: [react()],
      });
      const appHtml = renderToString(createElement(module.default));
      const page = bundle['index.html'];
      if (page?.type !== 'asset') return;
      let html = String(page.source).replace('<!--app-html-->', appHtml);
      for (const [name, file] of Object.entries(bundle)) {
        if (file.type !== 'asset' || !name.endsWith('.css')) continue;
        const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${name}"[^>]*>`);
        if (!link.test(html)) continue;
        html = html.replace(link, () => `<style>${String(file.source)}</style>`);
        delete bundle[name];
      }
      page.source = html;
    },
  };
}

export default defineConfig({
  plugins: [react(), prerender()],
});
