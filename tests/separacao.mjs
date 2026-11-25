// Separação entre alunos e licença, na camada de dados (mock que imita a RLS).
// Critério do PRD-BACKEND: "testado, não presumido".
// Bug corrigido na etapa 6: apagar a tarefa de outro aluno era recusado,
// mas mesmo assim limpava a ligação nos blocos e sessões dele.
import * as d from '../src/lib/dados.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}
const donos = (r) => [...new Set(r.data.map((x) => x.user_id))]
const como = async (email) => { await d.sair(); await d.entrar(email, 'exemplo123') }
const TABELAS_DO_ALUNO = ['listarResumos', 'listarTarefas', 'listarBlocos', 'listarRespostasQuestoes', 'listarCaderno', 'listarSessoesFoco', 'listarResumosLidos', 'listarRespostasFlashcards']

await d.recomecarMock()

await como('pedro@exemplo.com')
for (const f of TABELAS_DO_ALUNO) {
  const r = await d[f]()
  conferir(`Pedro só recebe linhas dele em ${f}`, donos(r).filter((u) => u !== 'u-pedro'), [])
}
const resumosPedro = (await d.listarResumos()).data
conferir('Pedro só vê os resumos dele (não há resumos do app)', donos({ data: resumosPedro }), ['u-pedro'])
conferir('Pedro vê o conteúdo de fábrica (flashcards)', (await d.listarFlashcards()).data.some((x) => x.user_id == null), true)
conferir('Pedro não abre o PDF da Maria', (await d.lerPdfDoResumo('r-m2')).erro != null, true)
conferir('Pedro não lê as anotações do PDF da Maria', (await d.listarAnotacoes('r-m2')).data.length, 0)
conferir('Pedro não anota no PDF da Maria', (await d.salvarAnotacao('r-m2', 1, { tracos: [], textos: [] })).erro != null, true)
conferir('Pedro não apaga o PDF da Maria', (await d.apagarResumo('r-m2')).erro != null, true)
conferir('Pedro não marca como lido o resumo da Maria', (await d.marcarResumoLido('r-m1', true)).erro != null, true)
conferir('Pedro não responde questão própria da Maria', (await d.registrarRespostaQuestao({ questao_id: 'q-m1', escolhida: 'B', acertou: true, tempo_seg: 1 })).erro != null, true)

// O bug: apagar tarefa de outro aluno.
conferir('Pedro não apaga tarefa da Maria', (await d.apagarTarefa('t-m1')).erro != null, true)
await como('maria@exemplo.com')
conferir('a tarefa da Maria continua lá', (await d.listarTarefas()).data.some((t) => t.id === 't-m1'), true)
conferir('a ligação bloco → tarefa da Maria continua', (await d.listarBlocos()).data.some((b) => b.tarefa_id === 't-m1'), true)
conferir('a sessão de foco da Maria continua ligada', (await d.listarSessoesFoco()).data.some((s) => s.tarefa_id === 't-m1'), true)

conferir('o PDF da Maria continua lá', (await d.listarResumos()).data.some((r) => r.id === 'r-m2'), true)
conferir('as anotações da Maria continuam lá', (await d.listarAnotacoes('r-m2')).data.length, 1)
const salvou = await d.salvarAnotacao('r-m2', 2, { tracos: [{ cor: '#1b3a8a', espessura: 0.005, pontos: [[0.1, 0.1, 0.5]] }], textos: [] })
conferir('Maria anota a página 2', salvou.erro, null)
await d.salvarAnotacao('r-m2', 2, { tracos: [], textos: [{ id: 'a', x: 0.1, y: 0.1, texto: 'oi', cor: '#c4321f' }] })
conferir('salvar de novo a mesma página atualiza, não duplica', (await d.listarAnotacoes('r-m2')).data.filter((a) => a.pagina === 2).length, 1)
conferir('página que o PDF não tem é recusada', (await d.salvarAnotacao('r-m2', 3, { tracos: [], textos: [] })).erro != null, true)
conferir('resumo digitado novo não vira PDF pela porta errada', (await d.salvarResumo({ titulo: 'x', materia_id: 'm-artes', tipo: 'PDF', texto: 'x' })).erro != null, true)
conferir('Maria apaga o próprio PDF', (await d.apagarResumo('r-m2')).erro, null)
conferir('as anotações vão junto', (await d.listarAnotacoes('r-m2')).data.length, 0)

conferir('Concluído sem data é recusado (CHECK do banco)', (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'Concluído', concluida_em: null })).erro != null, true)
conferir('A fazer com data de conclusão é recusado', (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'A fazer', concluida_em: '2026-11-25T10:00:00Z' })).erro != null, true)

await como('admin@exemplo.com')
for (const f of TABELAS_DO_ALUNO) conferir(`administradora recebe zero em ${f}`, (await d[f]()).data.length, 0)
conferir('administradora vê as licenças', (await d.listarLicencas()).data.length > 0, true)

for (const email of ['ana@exemplo.com', 'lucas@exemplo.com']) {
  await como(email)
  conferir(`${email}: nada de tarefas`, (await d.listarTarefas()).data.length, 0)
  conferir(`${email}: nem o conteúdo de fábrica`, (await d.listarQuestoes()).data.length, 0)
  conferir(`${email}: não grava nada`, (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'A fazer', concluida_em: null })).erro != null, true)
  conferir(`${email}: não vê licenças`, (await d.listarLicencas()).data.length, 0)
}

await como('maria@exemplo.com')
conferir('aluno não libera licença', (await d.liberarEmail({ email: 'x@exemplo.com' })).erro != null, true)
conferir('aluno não muda o próprio papel', (await d.salvarPerfil({ role: 'admin' })).data.role, 'aluno')

console.log(`${ok}/${tot} — separacao`)
process.exit(ok === tot ? 0 : 1)
