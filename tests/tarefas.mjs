// Regras do Quadro: prazos, avisos, ordem e conclusão.
// Import com .js explícito: o Node exige, o Vite não.
import { textoPrazo, urgencia, ordenarTarefas, visivelNoQuadro, comStatus, avisosDeTarefas, prazoNestaSemana, validarTarefa, etiquetaPrazo, colunasVizinhas } from '../src/lib/tarefas.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

const HOJE = '2026-11-25' // quarta-feira
const t = (id, prazo, prioridade = 'Média', status = 'A fazer', extra = {}) => ({ id, titulo: id, prazo, prioridade, status, materia_id: 'm', ...extra })

conferir('prazo hoje', textoPrazo('2026-11-25', HOJE), 'hoje')
conferir('prazo amanhã', textoPrazo('2026-11-26', HOJE), 'amanhã')
conferir('prazo em 3 dias', textoPrazo('2026-11-28', HOJE), 'em 3 dias')
conferir('atrasada há 1 dia (singular)', textoPrazo('2026-11-24', HOJE), 'atrasada há 1 dia')
conferir('atrasada há 4 dias', textoPrazo('2026-11-21', HOJE), 'atrasada há 4 dias')
conferir('sem prazo', textoPrazo(null, HOJE), 'sem prazo')
conferir('virada de mês conta certo', textoPrazo('2026-12-02', HOJE), 'em 7 dias')

conferir('prazo ontem é atrasada', urgencia(t('a', '2026-11-24'), HOJE), 'atrasada')
conferir('prazo em 2 dias é "perto" (48 h)', urgencia(t('a', '2026-11-27'), HOJE), 'perto')
conferir('prazo em 3 dias é normal', urgencia(t('a', '2026-11-28'), HOJE), 'normal')
conferir('concluída nunca é atrasada', urgencia(t('a', '2026-11-01', 'Alta', 'Concluído'), HOJE), 'concluida')

const ordem = ordenarTarefas([
  t('sem-prazo', null, 'Alta'), t('dez', '2026-12-02', 'Baixa'), t('dez-alta', '2026-12-02', 'Alta'),
  t('atrasada', '2026-11-21', 'Baixa'), t('amanha', '2026-11-26'),
], HOJE).map((x) => x.id)
conferir('atrasadas primeiro, depois prazo, depois prioridade, sem prazo no fim', ordem, ['atrasada', 'amanha', 'dez-alta', 'dez', 'sem-prazo'])

conferir('concluída há 30 dias ainda aparece', visivelNoQuadro(t('a', null, 'Média', 'Concluído', { concluida_em: '2026-10-26T10:00:00-03:00' }), HOJE), true)
conferir('concluída há 31 dias some da coluna', visivelNoQuadro(t('a', null, 'Média', 'Concluído', { concluida_em: '2026-10-25T10:00:00-03:00' }), HOJE), false)
conferir('aberta antiga continua aparecendo', visivelNoQuadro(t('a', '2026-01-01'), HOJE), true)

const agora = new Date('2026-11-25T15:00:00-03:00')
const feita = comStatus(t('a', null), 'Concluído', agora)
conferir('ir para Concluído grava a data', feita.concluida_em, agora.toISOString())
conferir('sair de Concluído apaga a data (o banco exige)', comStatus(feita, 'Em andamento', agora).concluida_em, null)
conferir('mesmo status não muda nada', comStatus(feita, 'Concluído', new Date()) === feita, true)

const avisos = avisosDeTarefas([t('ok', '2026-12-10'), t('perto', '2026-11-26'), t('atr', '2026-11-20'), t('fim', '2026-11-20', 'Alta', 'Concluído')], HOJE)
conferir('avisos: só atrasadas e perto, atrasada primeiro', avisos.map((a) => [a.tipo, a.tarefa.id]), [['atrasada', 'atr'], ['perto', 'perto']])

conferir('semana: segunda conta', prazoNestaSemana(t('a', '2026-11-23'), HOJE), true)
conferir('semana: domingo conta', prazoNestaSemana(t('a', '2026-11-29'), HOJE), true)
conferir('semana: próxima segunda não', prazoNestaSemana(t('a', '2026-11-30'), HOJE), false)

conferir('título vazio é recusado', Object.keys(validarTarefa({ ...t('a', null), titulo: '  ' })), ['titulo'])
conferir('prioridade fora da lista é recusada', Object.keys(validarTarefa({ ...t('a', null), prioridade: 'media' })), ['prioridade'])

conferir('etiqueta: atrasada 1 d', etiquetaPrazo(t('a', '2026-11-24'), HOJE), { texto: 'Atrasada 1 d', classe: 'crit' })
conferir('etiqueta: vence hoje', etiquetaPrazo(t('a', '2026-11-25'), HOJE).texto, 'Vence hoje')
conferir('etiqueta: vence em 2 d', etiquetaPrazo(t('a', '2026-11-27'), HOJE).texto, 'Vence em 2 d')
conferir('etiqueta: longe, sem prazo ou concluída não tem', [etiquetaPrazo(t('a', '2026-12-20'), HOJE), etiquetaPrazo(t('a', null), HOJE), etiquetaPrazo(t('a', '2026-11-01', 'Média', 'Concluído'), HOJE)], [null, null, null])
conferir('setas de A fazer', colunasVizinhas('A fazer'), { anterior: null, proxima: 'Em andamento' })
conferir('setas de Em andamento', colunasVizinhas('Em andamento'), { anterior: 'A fazer', proxima: 'Concluído' })
conferir('setas de Concluído', colunasVizinhas('Concluído'), { anterior: 'Em andamento', proxima: null })

console.log(`${ok}/${tot} — tarefas`)
process.exit(ok === tot ? 0 : 1)
