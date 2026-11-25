// O que muda com a série: metas sugeridas, semana sugerida e o que aparece primeiro.
import { SERIES_CONFIG, SEMANA_BASE, TITULOS_BLOCO } from './fabrica.js'

// Rótulos idênticos ao CHECK de profiles.serie.
export const SERIES = ['9º ano EF', '1º ano EM', '2º ano EM', '3º ano EM']

export const configSerie = (serie) => SERIES_CONFIG[serie] || null

export function metasSugeridas(serie) {
  const c = configSerie(serie)
  if (!c) return { meta_questoes_semana: 0, meta_foco_min_semana: 0, meta_provas_mes: 0 }
  return { meta_questoes_semana: c.meta_questoes_semana, meta_foco_min_semana: c.meta_foco_min_semana, meta_provas_mes: c.meta_provas_mes }
}

// O conteúdo pode aparecer para esta série? (serie_minima vazia = todas)
export function serieAlcanca(serieMinima, serie) {
  if (!serieMinima) return true
  return SERIES.indexOf(serieMinima) <= SERIES.indexOf(serie)
}

export function temFimDeSemana(serie) {
  return (configSerie(serie)?.vestibular || 0) > 0
}

// Monta os blocos da semana sugerida. `materias` resolve nome -> id;
// `tarefas` liga cada bloco à primeira tarefa aberta da mesma matéria.
export function semanaSugerida(serie, materias, tarefas = []) {
  const c = configSerie(serie)
  const titulos = { ...TITULOS_BLOCO, ...(c?.titulos || {}) }
  const idPorNome = Object.fromEntries(materias.map((m) => [m.nome, m.id]))
  const tarefaDe = (materiaId) => tarefas.find((t) => t.materia_id === materiaId && t.status !== 'Concluído')?.id || null
  const bloco = (b, titulo, tipo) => {
    const materia_id = b.materia ? idPorNome[b.materia] || null : null
    return { dia_semana: b.dia_semana, inicio: b.inicio, fim: b.fim, materia_id, titulo, tipo, tarefa_id: materia_id ? tarefaDe(materia_id) : null, feito_em: null }
  }
  const base = SEMANA_BASE.map((b) => bloco(b, titulos[b.materia] || 'Revisão e tarefas', 'Estudo'))
  const extras = (c?.extras || []).map((b) => bloco(b, b.titulo, b.tipo))
  return [...base, ...extras]
}
