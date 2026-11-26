// Painel do dia (topo do Quadro): contadores e avisos de tarefas e de blocos de hoje.
// Mesma lógica da versão antiga (referencia/pauta-de-estudos-v1.html, computeAlerts).
import { diasEntre, diaDaSemana, hojeISO } from './datas.js'
import { situacaoBloco } from './cronograma.js'

export const AVISOS_VISIVEIS = 5

// Ordem dos avisos: atrasada, vence hoje, vence em 1–2 dias, blocos de hoje.
const PESO = { atrasada: 0, hoje: 1, breve: 2, agora: 3, 'sem-registro': 3 }

export function painelDoDia({ tarefas = [], blocos = [], nomeMateria = () => '', agora = new Date() }) {
  const hoje = hojeISO(agora)
  const avisos = []
  let pendencias = 0, atrasadas = 0, vencem48h = 0, semRegistro = 0
  const deQue = (id) => (nomeMateria(id) ? ` (${nomeMateria(id)})` : '')

  for (const t of tarefas) {
    if (t.status === 'Concluído') continue
    pendencias++
    if (!t.prazo) continue
    const n = diasEntre(hoje, t.prazo)
    if (n < 0) {
      atrasadas++
      avisos.push({ tipo: 'atrasada', tag: 'Atrasada', texto: `${t.titulo}${deQue(t.materia_id)}, venceu há ${-n} ${n === -1 ? 'dia' : 'dias'}`, tarefaId: t.id })
    } else if (n === 0) {
      vencem48h++
      avisos.push({ tipo: 'hoje', tag: 'Vence hoje', texto: `${t.titulo}${deQue(t.materia_id)}`, tarefaId: t.id })
    } else if (n <= 2) {
      vencem48h++
      avisos.push({ tipo: 'breve', tag: `Em ${n} ${n === 1 ? 'dia' : 'dias'}`, texto: `${t.titulo}${deQue(t.materia_id)}`, tarefaId: t.id })
    }
  }

  const dia = diaDaSemana(agora)
  for (const b of blocos) {
    if (b.dia_semana !== dia) continue
    const s = situacaoBloco(b, agora)
    const nome = nomeMateria(b.materia_id) || b.tipo
    if (s === 'agora') avisos.push({ tipo: 'agora', tag: 'Agora', texto: `${nome}: ${b.titulo}, até ${b.fim}`, blocoId: b.id })
    else if (s === 'perdido') {
      semRegistro++
      avisos.push({ tipo: 'sem-registro', tag: 'Sem registro', texto: `${nome} das ${b.inicio} às ${b.fim}. Marque se você estudou.`, blocoId: b.id })
    }
  }

  avisos.sort((a, b) => PESO[a.tipo] - PESO[b.tipo])
  return { pendencias, atrasadas, vencem48h, semRegistro, avisos }
}

// "quarta-feira, 25 de novembro"
export const dataPorExtenso = (agora = new Date()) =>
  agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
