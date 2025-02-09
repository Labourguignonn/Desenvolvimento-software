import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // Garante caminhos relativos para Netlify
  build: {
    outDir: 'dist',
  },
  publicDir: resolve(__dirname, 'public'), // Garante que `public/` seja copiado para `dist/`
});