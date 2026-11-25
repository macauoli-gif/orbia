// Regras dos resumos em PDF: arquivo aceito, traço, borracha e desfazer.
import {
  larguraTraco, normalizarPonto, apagarTracosEm, paginaTemAlgo, limparTextosVazios, empilhar, desfazer, posicaoNovoTexto, papelDoToque,
} from '../src/lib/anotacoes.js'
import { validarPdf, tituloDoArquivo, LIMITE_PDF_MB, validarResumo, camposEditaveis, filtrarResumos, textoTamanho, textoPaginas } from '../src/lib/resumos.js'

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

conferir('sem conferir os bytes, não é aceito', validarPdf({ nome: 'a.pdf', tamanho: MB, tipo: 'application/pdf' }) != null, true)
conferir('caixa de texto não nasce fora da página', posicaoNovoTexto([0.99, 0.99]), { x: 0.85, y: 0.95 })

const pdf = { tipo: 'PDF', titulo: 'Aula', materia_id: 'm', texto: null, paginas: 2 }
conferir('PDF válido passa', validarResumo(pdf), {})
conferir('PDF com texto digitado é recusado (CHECK)', Object.keys(validarResumo({ ...pdf, texto: 'x' })), ['texto'])
conferir('PDF sem páginas é recusado', Object.keys(validarResumo({ ...pdf, paginas: 0 })), ['paginas'])
conferir('digitado sem texto é recusado', Object.keys(validarResumo({ tipo: 'Digitado', titulo: 'a', materia_id: 'm', texto: ' ' })), ['texto'])
conferir('no PDF só título e matéria mudam', camposEditaveis('PDF'), ['titulo', 'materia_id'])

const lista = [
  { id: 1, tipo: 'PDF', titulo: 'Células', texto: null, arquivo_nome: 'bio.pdf', materia_id: 'b', created_at: '2026-11-01' },
  { id: 2, tipo: 'Digitado', titulo: 'Biomas', texto: 'Cerrado e Caatinga', arquivo_nome: null, materia_id: 'g', created_at: '2026-11-20' },
]
conferir('filtro por tipo', filtrarResumos(lista, { tipo: 'PDF' }).map((r) => r.id), [1])
conferir('busca acha no texto e no nome do arquivo', [filtrarResumos(lista, { busca: 'caatinga' }).length, filtrarResumos(lista, { busca: 'BIO.PDF' }).length], [1, 1])
conferir('mais novo primeiro', filtrarResumos(lista, {}).map((r) => r.id), [2, 1])
conferir('tamanho pequeno em KB', textoTamanho(2508), '2 KB')
conferir('tamanho grande em MB, com vírgula', textoTamanho(5.5 * MB), '5,5 MB')
conferir('uma página no singular', textoPaginas(1), '1 página')

// Rejeição da palma. O bug: a palma encostando no meio do traço da caneta apagava o traço.
const toque = (tipo, ativo, canetaVista = false, soCaneta = false) => papelDoToque({ tipo, ativo, canetaVista, soCaneta })
conferir('caneta escreve', toque('pen', null), 'escrever')
conferir('palma durante o traço da caneta é ignorada', toque('touch', 'pen', true), 'ignorar')
conferir('palma antes de a caneta ser vista, durante o traço, também', toque('touch', 'pen', false), 'ignorar')
conferir('com caneta vista, o dedo sozinho rola', toque('touch', null, true), 'rolar')
conferir('"Só caneta": o dedo rola mesmo sem caneta vista', toque('touch', null, false, true), 'rolar')
conferir('sem caneta, o dedo escreve', toque('touch', null), 'escrever')
conferir('segundo dedo não entra no traço do primeiro', toque('touch', 'touch'), 'ignorar')
conferir('caneta assume no lugar da palma que já encostou', toque('pen', 'touch'), 'assumir')
conferir('segunda caneta é ignorada', toque('pen', 'pen'), 'ignorar')
conferir('mouse escreve', toque('mouse', null), 'escrever')

console.log(`${ok}/${tot} — anotacoes e resumos`)
process.exit(ok === tot ? 0 : 1)
