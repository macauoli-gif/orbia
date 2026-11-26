// Painel do dia: contadores e avisos (tarefas e blocos de hoje).
import { painelDoDia } from '../src/lib/painel.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

const AGORA = new Date(2026, 10, 25, 16, 0) // quarta-feira, 16h
const nomeMateria = (id) => ({ mat: 'Matemática', qui: 'Química' }[id] || '')
const t = (id, prazo, status = 'A fazer') => ({ id, titulo: id, prazo, status, materia_id: 'mat' })
const b = (id, dia, inicio, fim, extra = {}) => ({ id, dia_semana: dia, inicio, fim, materia_id: 'qui', titulo: 'Exercícios', tipo: 'Estudo', feito_em: null, ...extra })

const p = painelDoDia({
  agora: AGORA, nomeMateria,
  tarefas: [
    t('Lista', '2026-11-22'), t('Redação', '2026-11-24'), t('Relatório', '2026-11-26'),
    t('Hoje', '2026-11-25'), t('Longe', '2026-12-10'), t('Sem prazo', null), t('Feita', '2026-11-20', 'Concluído'),
  ],
  blocos: [
    b('passou', 3, '14:00', '14:50'), b('agora', 3, '15:30', '16:30'), b('depois', 3, '18:00', '19:00'),
    b('feito', 3, '10:00', '11:00', { feito_em: '2026-11-25' }), b('ontem', 2, '14:00', '15:00'),
    b('prova', 3, '08:00', '09:00', { materia_id: null, tipo: 'Prova anterior' }),
  ],
})

conferir('contadores', [p.atrasadas, p.vencem48h, p.pendencias, p.semRegistro], [2, 2, 6, 2])
conferir('ordem dos avisos', p.avisos.map((a) => a.tag), ['Atrasada', 'Atrasada', 'Vence hoje', 'Em 1 dia', 'Sem registro', 'Agora', 'Sem registro'])
conferir('texto de atrasada (plural)', p.avisos[0].texto, 'Lista (Matemática), venceu há 3 dias')
conferir('texto de atrasada (singular)', p.avisos[1].texto, 'Redação (Matemática), venceu há 1 dia')
conferir('bloco sem registro', p.avisos[4].texto, 'Química das 14:00 às 14:50. Marque se você estudou.')
conferir('bloco sem matéria usa o tipo', p.avisos[6].texto.startsWith('Prova anterior das 08:00'), true)
conferir('aviso de tarefa leva à tarefa', p.avisos[0].tarefaId, 'Lista')
conferir('aviso de bloco leva ao bloco', p.avisos[5].blocoId, 'agora')
conferir('bloco de outro dia não conta', p.avisos.some((a) => a.blocoId === 'ontem'), false)
conferir('tudo em dia', painelDoDia({ agora: AGORA }).avisos.length, 0)

console.log(`${ok}/${tot} — painel`)
process.exit(ok === tot ? 0 : 1)
