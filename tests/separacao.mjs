// Separação entre alunos e licença, na camada de dados (mock que imita a RLS).
// Critério do PRD-BACKEND: "testado, não presumido".
// Bug corrigido na etapa 6: apagar a tarefa de outro aluno era recusado,
// mas mesmo assim limpava a ligação nos blocos e sessões dele.
import * as d from '../src/lib/dados-mock.js'
import { telaDeEntrada } from '../src/lib/licenca.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}
const donos = (r) => [...new Set(r.data.map((x) => x.user_id))]
const como = async (email) => { await d.sair(); await d.entrar(email, 'exemplo123') }
const TABELAS_DO_ALUNO = ['listarTarefas', 'listarBlocos', 'listarRespostasQuestoes', 'listarCaderno', 'listarSessoesFoco', 'listarRespostasFlashcards', 'listarTentativas']

await d.recomecarMock()

await como('pedro@exemplo.com')
for (const f of TABELAS_DO_ALUNO) {
  const r = await d[f]()
  conferir(`Pedro só recebe linhas dele em ${f}`, donos(r).filter((u) => u !== 'u-pedro'), [])
}
conferir('Pedro vê o conteúdo de fábrica (flashcards)', (await d.listarFlashcards()).data.some((x) => x.user_id == null), true)
conferir('Pedro não responde questão própria da Maria', (await d.registrarRespostaQuestao({ questao_id: 'q-m1', escolhida: 'B', acertou: true, tempo_seg: 1 })).erro != null, true)
conferir('Pedro só vê os próprios favoritos do ExactLab', (await d.listarFavoritos()).data, [8])
await d.desfavoritar(26) // o favorito 26 é da Maria: para o Pedro não existe
conferir('favorito com número atômico 119 é recusado (CHECK)', (await d.favoritar(119)).erro != null, true)
conferir('Pedro não apaga o simulado da Maria', (await d.apagarTentativa('st-1')).erro != null, true)
conferir('Pedro grava o próprio simulado', (await d.salvarTentativa({ prova_id: 'fuvest-2027', respostas: { 1: 'E' }, tempo_seg: 60 })).erro, null)
conferir('simulado com letra inválida é recusado (CHECK)', (await d.salvarTentativa({ prova_id: 'fuvest-2027', respostas: { 1: 'Z' }, tempo_seg: 60 })).erro != null, true)
conferir('simulado com mais de 24 h é recusado, como no banco', (await d.salvarTentativa({ prova_id: 'fuvest-2027', respostas: {}, tempo_seg: 90000 })).erro != null, true)
conferir('simulado terminado não se edita', (await d.salvarTentativa({ id: 'st-3', prova_id: 'uerj-2026-1', respostas: {}, tempo_seg: 1 })).erro != null, true)

// O bug: apagar tarefa de outro aluno.
conferir('Pedro não apaga tarefa da Maria', (await d.apagarTarefa('t-m1')).erro != null, true)
await como('maria@exemplo.com')
conferir('o favorito da Maria continua lá', (await d.listarFavoritos()).data, [26])
conferir('o simulado da Maria continua lá e o do Pedro não aparece para ela', (await d.listarTentativas()).data.map((t) => t.id).sort(), ['st-1', 'st-2'])
conferir('a tarefa da Maria continua lá', (await d.listarTarefas()).data.some((t) => t.id === 't-m1'), true)
conferir('a ligação bloco → tarefa da Maria continua', (await d.listarBlocos()).data.some((b) => b.tarefa_id === 't-m1'), true)
conferir('a sessão de foco da Maria continua ligada', (await d.listarSessoesFoco()).data.some((s) => s.tarefa_id === 't-m1'), true)


conferir('Concluído sem data é recusado (CHECK do banco)', (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'Concluído', concluida_em: null })).erro != null, true)
conferir('A fazer com data de conclusão é recusado', (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'A fazer', concluida_em: '2026-11-25T10:00:00Z' })).erro != null, true)

await como('admin@exemplo.com')
for (const f of TABELAS_DO_ALUNO) conferir(`administradora recebe zero em ${f}`, (await d[f]()).data.length, 0)
conferir('administradora sem licença não vê favoritos de ninguém', (await d.listarFavoritos()).data.length, 0)
const umaLicenca = (await d.listarLicencas()).data.find((l) => l.email === 'pedro@exemplo.com')
conferir('administradora tira uma pessoa da lista', (await d.tirarDaLista(umaLicenca.id)).erro, null)
conferir('a pessoa some da lista', (await d.listarLicencas()).data.some((l) => l.id === umaLicenca.id), false)
conferir('tirar de novo a mesma avisa que não existe', (await d.tirarDaLista(umaLicenca.id)).erro != null, true)
conferir('administradora vê as licenças', (await d.listarLicencas()).data.length > 0, true)

// Administradora com licença de cortesia: estuda, mas só o que é dela.
conferir('administradora libera a própria cortesia', (await d.liberarEmail({ email: 'admin@exemplo.com', nome: 'Administradora' })).erro, null)
{
  const r = (await d.carregarEntrada()).data
  conferir('com cortesia, a entrada leva para as telas de estudo', telaDeEntrada(r), 'serie')
}
for (const f of TABELAS_DO_ALUNO) conferir(`com cortesia, ainda zero de alunos em ${f}`, (await d[f]()).data.length, 0)
conferir('com cortesia, grava a própria tarefa', (await d.salvarTarefa({ titulo: 'minha', materia_id: 'm-artes', prioridade: 'Média', status: 'A fazer', concluida_em: null })).erro, null)
conferir('com cortesia, vê só a própria tarefa', (await d.listarTarefas()).data.map((t) => t.titulo), ['minha'])
conferir('com cortesia, vê o conteúdo de fábrica', (await d.listarQuestoes()).data.length > 0, true)
await como('maria@exemplo.com')
conferir('Maria não vê a tarefa da administradora', (await d.listarTarefas()).data.some((t) => t.titulo === 'minha'), false)

for (const email of ['ana@exemplo.com', 'lucas@exemplo.com']) {
  await como(email)
  conferir(`${email}: nada de tarefas`, (await d.listarTarefas()).data.length, 0)
  conferir(`${email}: nem o conteúdo de fábrica`, (await d.listarQuestoes()).data.length, 0)
  conferir(`${email}: não grava nada`, (await d.salvarTarefa({ titulo: 'x', materia_id: 'm-artes', prioridade: 'Média', status: 'A fazer', concluida_em: null })).erro != null, true)
  conferir(`${email}: não vê licenças`, (await d.listarLicencas()).data.length, 0)
}

await como('maria@exemplo.com')
conferir('aluno não tira ninguém da lista', (await d.tirarDaLista('qualquer')).erro, 'Sem permissão.')
conferir('aluno não libera licença', (await d.liberarEmail({ email: 'x@exemplo.com' })).erro != null, true)
conferir('aluno não muda o próprio papel', (await d.salvarPerfil({ role: 'admin' })).data.role, 'aluno')

console.log(`${ok}/${tot} — separacao`)
process.exit(ok === tot ? 0 : 1)
