import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita métodos globales como vi
    environment: "jsdom", // Simula un entorno DOM
    setupFiles: "./src/setupTests.ts", // Archivo de configuración para tests
  },
});