import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita soporte para Jest-like testing globals
    environment: 'jsdom', // Simula el DOM
    setupFiles: './setupTests.ts', // Archivo para configuraciones iniciales
  },
});