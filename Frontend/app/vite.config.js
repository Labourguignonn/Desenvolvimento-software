import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  base: './', // Garante que os caminhos relativos funcionarão corretamente
};
