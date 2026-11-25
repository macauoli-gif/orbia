import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // O pdf.js (~500 kB) só é baixado quando o aluno abre um resumo em PDF
    // (import dinâmico em src/components/pdf.js); não pesa na abertura do app.
    // O limite sobe só o bastante para ele não sujar a saída do npm run check.
    chunkSizeWarningLimit: 1600,
  },
})
