import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar `describe`, `it`, `expect` sem importar
    environment: 'jsdom', // Simula o ambiente do navegador
    setupFiles: './src/test/setup.js', // Configurações globais (opcional)
  },
});
