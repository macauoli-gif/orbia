// Regras dos resumos em PDF: arquivo aceito, traço, borracha e desfazer.
import {
  validarPdf, tituloDoArquivo, larguraTraco, normalizarPonto, apagarTracosEm,
  paginaTemAlgo, limparTextosVazios, empilhar, desfazer, LIMITE_PDF_MB,
} from '../src/lib/anotacoes.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}
const PDF = [37, 80, 68, 70] // "%PDF"
const MB = 1024 * 1024

conferir('PDF de verdade é aceito', validarPdf({ nome: 'aula.pdf', tamanho: 2 * MB, tipo: 'application/pdf' }, PDF), null)
conferir(`acima de ${LIMITE_PDF_MB} MB é recusado`, validarPdf({ nome: 'aula.pdf', tamanho: 21 * MB, tipo: 'application/pdf' }, PDF) != null, true)
conferir('foto renomeada para .pdf é recusada', validarPdf({ nome: 'foto.pdf', tamanho: MB, tipo: 'application/pdf' }, [255, 216, 255, 224]) != null, true)
conferir('Word é recusado', validarPdf({ nome: 'aula.docx', tamanho: MB, tipo: 'application/msword' }, [80, 75, 3, 4]) != null, true)
conferir('arquivo vazio é recusado', validarPdf({ nome: 'a.pdf', tamanho: 0, tipo: 'application/pdf' }, PDF) != null, true)

conferir('título vem do nome do arquivo', tituloDoArquivo('Aula_3 - Química.PDF'), 'Aula 3 - Química')
conferir('sem nome, título padrão', tituloDoArquivo(''), 'Resumo em PDF')

conferir('mais pressão, traço mais grosso', larguraTraco(0.005, 1, 800) > larguraTraco(0.005, 0.2, 800), true)
conferir('mouse e dedo (pressão 0) usam a média', larguraTraco(0.005, 0, 800), larguraTraco(0.005, 0.5, 800))
conferir('traço acompanha o tamanho da página', larguraTraco(0.005, 0.5, 1600) > larguraTraco(0.005, 0.5, 400), true)

conferir('ponto vira fração da página', normalizarPonto(200, 100, 400, 400, 0.734), [0.5, 0.25, 0.73])
conferir('ponto fora da página fica na borda', normalizarPonto(-10, 900, 400, 400), [0, 1, 0.5])

const linha = { cor: 'x', espessura: 0.005, pontos: [[0.1, 0.5, 0.5], [0.9, 0.5, 0.5]] }
const ponto = { cor: 'x', espessura: 0.005, pontos: [[0.2, 0.2, 0.5]] }
conferir('borracha no meio da linha apaga a linha inteira', apagarTracosEm([linha, ponto], [0.5, 0.505]).length, 1)
conferir('borracha longe não apaga nada', apagarTracosEm([linha, ponto], [0.5, 0.8]).length, 2)
conferir('borracha apaga um ponto solto', apagarTracosEm([linha, ponto], [0.205, 0.2]), [linha])

conferir('página só com caixa vazia não conta como anotada', paginaTemAlgo({ tracos: [], textos: [{ texto: '  ' }] }), false)
conferir('caixa de texto vazia não é guardada', limparTextosVazios({ tracos: [], textos: [{ texto: '' }, { texto: 'oi' }] }).textos.length, 1)

let h = empilhar([], 1, { tracos: [], textos: [] })
h = empilhar(h, 2, { tracos: [linha], textos: [] })
const d1 = desfazer(h, { 1: { tracos: [ponto], textos: [] }, 2: { tracos: [], textos: [] } })
conferir('desfazer volta a última mudança, na página certa', [d1.pagina, d1.anotacoes[2].tracos.length, d1.historico.length], [2, 1, 1])
conferir('desfazer sem histórico não faz nada', desfazer([], {}).pagina, null)
conferir('histórico tem limite', empilhar(Array.from({ length: 60 }, () => ({})), 1, {}).length, 50)

console.log(`${ok}/${tot} — anotacoes`)
process.exit(ok === tot ? 0 : 1)
