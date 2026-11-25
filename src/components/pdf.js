// Abre PDFs com o pdf.js (Mozilla). Só roda no navegador.
// A biblioteca é carregada só quando um PDF é aberto, para não pesar o app.
// Usa a versão "legacy", que funciona em tablets e celulares mais antigos.
import urlTrabalhador from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'

let pdfjs = null
async function biblioteca() {
  if (!pdfjs) {
    pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    pdfjs.GlobalWorkerOptions.workerSrc = urlTrabalhador
  }
  return pdfjs
}

// Arquivos de apoio copiados por scripts/copiar-pdfjs.mjs.
const base = import.meta.env.BASE_URL + 'pdfjs/'

export async function abrirPdf(bytes) {
  const lib = await biblioteca()
  return lib.getDocument({
    data: bytes,
    standardFontDataUrl: base + 'standard_fonts/',
    cMapUrl: base + 'cmaps/',
    cMapPacked: true,
    wasmUrl: base + 'wasm/',
    iccUrl: base + 'iccs/',
  }).promise
}

// Desenha uma página na largura pedida, nítida em tela de alta densidade.
export async function desenharPagina(pagina, canvas, largura) {
  const base1 = pagina.getViewport({ scale: 1 })
  const escala = largura / base1.width
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
  const vp = pagina.getViewport({ scale: escala * dpr })
  canvas.width = Math.floor(vp.width)
  canvas.height = Math.floor(vp.height)
  canvas.style.width = largura + 'px'
  canvas.style.height = Math.floor(vp.height / dpr) + 'px'
  const tarefa = pagina.render({ canvas, viewport: vp })
  await tarefa.promise
  return { largura, altura: vp.height / dpr }
}

// Libera a memória do PDF. (No pdf.js 6 o documento se fecha pela tarefa que o abriu.)
export function fecharPdf(doc) {
  doc?.loadingTask?.destroy().catch(() => {})
}
