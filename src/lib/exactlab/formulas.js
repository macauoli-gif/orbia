// As três áreas do ExactLab e a busca nas fórmulas.
import { MATEMATICA } from './formulas-matematica.js'
import { FISICA } from './formulas-fisica.js'
import { QUIMICA } from './formulas-quimica.js'
import { semAcento } from './tabela.js'
import { SERIES } from '../series.js'

export const AREAS = [
  { id: 'matematica', nome: 'Matemática', grupos: MATEMATICA },
  { id: 'fisica', nome: 'Física', grupos: FISICA },
  { id: 'quimica', nome: 'Química', grupos: QUIMICA },
]

// Grupos de fórmulas que passam na busca (nome, fórmula, assunto ou significado das letras).
// Grupo sem nenhuma fórmula que passa some da lista.
export function filtrarFormulas(grupos, { busca = '' } = {}) {
  const t = semAcento(busca.trim())
  return grupos
    .map((g) => ({
      ...g,
      formulas: g.formulas.filter(([nome, expr, vars]) => !t || semAcento(g.assunto).includes(t) || semAcento(nome).includes(t) || semAcento(expr).includes(t) || vars.some(([, sig]) => semAcento(sig).includes(t))),
    }))
    .filter((g) => g.formulas.length)
}

export const contarFormulas = (grupos) => grupos.reduce((n, g) => n + g.formulas.length, 0)

// Colunas do quadro Kanban: uma por série, na ordem das séries, só as que têm assunto.
// `indice` é a posição da série em SERIES (a cor da coluna não muda com a busca).
export function formulasPorSerie(grupos) {
  return SERIES.map((serie, indice) => ({ serie, indice, grupos: grupos.filter((g) => g.serie === serie) })).filter((c) => c.grupos.length)
}
