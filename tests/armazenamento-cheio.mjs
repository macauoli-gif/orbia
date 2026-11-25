// Bug corrigido: com o armazenamento do navegador cheio, salvar dava erro mas o
// registro ficava na memória; ao tentar de novo, o resumo saía duplicado.
// Este teste finge um navegador cujo armazenamento recusa gravar.
let cheio = false
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => { if (cheio) throw new Error('QuotaExceededError') },
  removeItem: () => {},
}
const d = await import('../src/lib/dados.js')

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

await d.recomecarMock()
await d.entrar('maria@exemplo.com', 'exemplo123')
const novo = { titulo: 'Funções', materia_id: 'm-matematica', texto: 'f(x) = ax + b' }
const quantos = async () => (await d.listarResumos()).data.length
const antes = await quantos()

cheio = true
const falhou = await d.salvarResumo(novo)
conferir('com o armazenamento cheio, salvar avisa o erro', falhou.erro != null, true)
conferir('e o resumo não fica na memória', await quantos(), antes)
const tarefa = (await d.listarTarefas()).data[0]
conferir('editar com armazenamento cheio também falha', (await d.salvarTarefa({ ...tarefa, titulo: 'mudou' })).erro != null, true)
conferir('e a edição é desfeita na memória', (await d.listarTarefas()).data[0].titulo, tarefa.titulo)

cheio = false
conferir('liberado o espaço, salvar funciona', (await d.salvarResumo(novo)).erro, null)
conferir('e existe um resumo novo só, não dois', await quantos(), antes + 1)

console.log(`${ok}/${tot} — armazenamento cheio`)
process.exit(ok === tot ? 0 : 1)
