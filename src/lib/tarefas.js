// Regras do Quadro. Os textos são idênticos aos CHECK do banco (PRD-BACKEND).
import { diasEntre, hojeISO, paraData } from './datas.js'

export const STATUS_TAREFA = ['A fazer', 'Em andamento', 'Concluído']
export const PRIORIDADES = ['Alta', 'Média', 'Baixa']
export const DIAS_VISIVEL_CONCLUIDA = 30

// "hoje", "amanhã", "em 3 dias", "atrasada há 2 dias", "sem prazo"
export function textoPrazo(prazo, hoje = hojeISO()) {
  if (!prazo) return 'sem prazo'
  const n = diasEntre(hoje, prazo)
  if (n === 0) return 'hoje'
  if (n === 1) return 'amanhã'
  if (n > 1) return `em ${n} dias`
  return n === -1 ? 'atrasada há 1 dia' : `atrasada há ${-n} dias`
}

// 'concluida' | 'atrasada' | 'perto' (vence em até 48 h) | 'normal'
export function urgencia(t, hoje = hojeISO()) {
  if (t.status === 'Concluído') return 'concluida'
  if (!t.prazo) return 'normal'
  const n = diasEntre(hoje, t.prazo)
  if (n < 0) return 'atrasada'
  if (n <= 2) return 'perto'
  return 'normal'
}

// Atrasadas primeiro, depois prazo mais próximo (sem prazo no fim), depois prioridade.
export function ordenarTarefas(lista, hoje = hojeISO()) {
  const peso = (t) => (urgencia(t, hoje) === 'atrasada' ? 0 : 1)
  return [...lista].sort((a, b) =>
    peso(a) - peso(b) ||
    (a.prazo || '9999-12-31').localeCompare(b.prazo || '9999-12-31') ||
    PRIORIDADES.indexOf(a.prioridade) - PRIORIDADES.indexOf(b.prioridade))
}

// Concluída há mais de 30 dias sai da coluna (mas continua no banco e no Desempenho).
export function visivelNoQuadro(t, hoje = hojeISO()) {
  if (t.status !== 'Concluído' || !t.concluida_em) return true
  return diasEntre(t.concluida_em.slice(0, 10), hoje) <= DIAS_VISIVEL_CONCLUIDA
}

// Mudar de coluna: ao ir para Concluído grava a data; ao sair, apaga.
// O banco recusa Concluído sem concluida_em (CHECK), então a regra mora aqui.
export function comStatus(t, status, agora = new Date()) {
  if (status === t.status) return t
  return { ...t, status, concluida_em: status === 'Concluído' ? agora.toISOString() : null }
}

// "Só desta semana": prazo entre a segunda e o domingo da semana de hoje.
export function prazoNestaSemana(t, hoje = hojeISO()) {
  if (!t.prazo) return false
  const n = diasEntre(hoje, t.prazo)
  const diaHoje = ((paraData(hoje).getDay() + 6) % 7) + 1
  return n >= 1 - diaHoje && n <= 7 - diaHoje
}

export function avisosDeTarefas(lista, hoje = hojeISO()) {
  const avisos = []
  for (const t of lista) {
    const u = urgencia(t, hoje)
    if (u === 'atrasada') avisos.push({ tipo: 'atrasada', tarefa: t, texto: `${t.titulo} — ${textoPrazo(t.prazo, hoje)}` })
    else if (u === 'perto') avisos.push({ tipo: 'perto', tarefa: t, texto: `${t.titulo} — vence ${textoPrazo(t.prazo, hoje)}` })
  }
  return ordenarTarefas(avisos.map((a) => ({ ...a.tarefa, _aviso: a })), hoje).map((t) => t._aviso)
}

export function validarTarefa(t) {
  const erros = {}
  if (!t.titulo || !t.titulo.trim()) erros.titulo = 'Escreva o título.'
  else if (t.titulo.trim().length > 120) erros.titulo = 'Até 120 caracteres.'
  if (!t.materia_id) erros.materia_id = 'Escolha a matéria.'
  if (!PRIORIDADES.includes(t.prioridade)) erros.prioridade = 'Escolha a prioridade.'
  if (!STATUS_TAREFA.includes(t.status)) erros.status = 'Escolha a situação.'
  return erros
}

// Etiqueta de prazo do cartão: "Atrasada 1 d", "Vence hoje", "Vence em 2 d" (ou nada).
export function etiquetaPrazo(t, hoje = hojeISO()) {
  if (t.status === 'Concluído' || !t.prazo) return null
  const n = diasEntre(hoje, t.prazo)
  if (n < 0) return { texto: `Atrasada ${-n} d`, classe: 'crit' }
  if (n === 0) return { texto: 'Vence hoje', classe: 'warn' }
  if (n <= 2) return { texto: `Vence em ${n} d`, classe: 'warn' }
  return null
}

// Setas do cartão: a coluna da esquerda e a da direita (null na ponta).
export function colunasVizinhas(status) {
  const i = STATUS_TAREFA.indexOf(status)
  return { anterior: STATUS_TAREFA[i - 1] || null, proxima: i < 0 ? null : STATUS_TAREFA[i + 1] || null }
}
