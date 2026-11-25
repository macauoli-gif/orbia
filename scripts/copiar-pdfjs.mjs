// Copia os arquivos de apoio do pdf.js (fontes padrão, mapas de caracteres e
// decodificadores de imagem) para public/pdfjs/, na MESMA versão instalada.
// Roda sozinho antes do dev e do build (scripts predev e prebuild).
// public/pdfjs/ não vai para o git: é gerado a partir de node_modules.
import { cpSync, existsSync, rmSync } from 'node:fs'

const origem = 'node_modules/pdfjs-dist'
const destino = 'public/pdfjs'
if (!existsSync(origem)) {
  console.error('pdfjs-dist não está instalado. Rode npm install.')
  process.exit(1)
}
rmSync(destino, { recursive: true, force: true })
for (const pasta of ['standard_fonts', 'cmaps', 'wasm', 'iccs']) {
  if (existsSync(`${origem}/${pasta}`)) cpSync(`${origem}/${pasta}`, `${destino}/${pasta}`, { recursive: true })
}
console.log('pdf.js: arquivos de apoio copiados para public/pdfjs/')
