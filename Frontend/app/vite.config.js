import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Mantém os caminhos relativos para funcionar no Netlify
  build: {
    outDir: 'dist', // Garante que o build vá para a pasta correta
  }
});