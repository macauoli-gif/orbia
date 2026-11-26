import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // O pacote principal leva os dados oficiais embutidos (gabaritos dos Simulados
    // e os 118 elementos do ExactLab), por isso passa dos 500 kB padrão do Vite.
    // O limite sobe só o bastante para não sujar a saída do npm run check.
    chunkSizeWarningLimit: 1600,
  },
})
