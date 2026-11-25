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
  const tarefa = lib.getDocument({
    data: bytes,
    standardFontDataUrl: base + 'standard_fonts/',
    cMapUrl: base + 'cmaps/',
    cMapPacked: true,
    wasmUrl: base + 'wasm/',
    iccUrl: base + 'iccs/',
  })
  try {
    return await tarefa.promise
  } catch (erro) {
    tarefa.destroy().catch(() => {}) // PDF com senha ou danificado: libera o que abriu
    throw erro
  }
}

// Libera a memória do PDF. (No pdf.js 6 o documento se fecha pela tarefa que o abriu.)
export function fecharPdf(doc) {
  doc?.loadingTask?.destroy().catch(() => {})
}

// Densidade da tela (telas "retina"), com teto para não gastar memória à toa.
export const densidadeTela = () => Math.min(window.devicePixelRatio || 1, 2.5)

// Começa a desenhar uma página na largura pedida. Devolve a tarefa do pdf.js:
// quem chama espera `.promise` e pode `.cancel()` (ex.: o tablet girou no meio).
export function desenharPagina(pagina, canvas, largura) {
  const escala = largura / pagina.getViewport({ scale: 1 }).width
  const dpr = densidadeTela()
  const vp = pagina.getViewport({ scale: escala * dpr })
  canvas.width = Math.floor(vp.width)
  canvas.height = Math.floor(vp.height)
  canvas.style.width = largura + 'px'
  canvas.style.height = Math.floor(vp.height / dpr) + 'px'
  return pagina.render({ canvas, viewport: vp })
}

export const foiCancelado = (erro) => erro?.name === 'RenderingCancelledException'
