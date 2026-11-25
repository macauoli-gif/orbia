// Regras do Cronograma.
import { diaDaSemana, hojeISO, inicioDaSemana, minutosDoDia } from './datas.js'

// Idênticos ao CHECK de cronograma_blocos.tipo.
export const TIPOS_BLOCO = ['Estudo', 'Prova anterior', 'Redação', 'Revisão de erros']

// "feito" vale só para a semana em que foi marcado.
export function feitoNestaSemana(bloco, agora = new Date()) {
  return !!bloco.feito_em && bloco.feito_em >= hojeISO(inicioDaSemana(agora))
}

// 'feito' | 'agora' | 'perdido' (já passou e não foi marcado) | 'futuro'
export function situacaoBloco(bloco, agora = new Date()) {
  if (feitoNestaSemana(bloco, agora)) return 'feito'
  const hoje = diaDaSemana(agora)
  const min = agora.getHours() * 60 + agora.getMinutes()
  if (bloco.dia_semana < hoje) return 'perdido'
  if (bloco.dia_semana > hoje) return 'futuro'
  if (min >= minutosDoDia(bloco.fim)) return 'perdido'
  if (min >= minutosDoDia(bloco.inicio)) return 'agora'
  return 'futuro'
}

export function ordenarBlocos(lista) {
  return [...lista].sort((a, b) => a.dia_semana - b.dia_semana || a.inicio.localeCompare(b.inicio))
}

export function validarBloco(b) {
  const erros = {}
  if (!(b.dia_semana >= 1 && b.dia_semana <= 7)) erros.dia_semana = 'Escolha o dia.'
  if (!b.inicio) erros.inicio = 'Escolha o início.'
  if (!b.fim) erros.fim = 'Escolha o fim.'
  else if (b.inicio && minutosDoDia(b.fim) <= minutosDoDia(b.inicio)) erros.fim = 'O fim precisa ser depois do início.'
  if (!b.materia_id && b.tipo === 'Estudo') erros.materia_id = 'Escolha a matéria.'
  if (!b.titulo?.trim()) erros.titulo = 'Escreva o que fazer.'
  else if (b.titulo.trim().length > 80) erros.titulo = 'Até 80 caracteres.'
  if (!TIPOS_BLOCO.includes(b.tipo)) erros.tipo = 'Escolha o tipo.'
  return erros
}
