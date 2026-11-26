// As três áreas do ExactLab e a busca nas fórmulas.
import { MATEMATICA } from './formulas-matematica.js'
import { FISICA } from './formulas-fisica.js'
import { QUIMICA } from './formulas-quimica.js'

export const AREAS = [
  { id: 'matematica', nome: 'Matemática', grupos: MATEMATICA },
  { id: 'fisica', nome: 'Física', grupos: FISICA },
  { id: 'quimica', nome: 'Química', grupos: QUIMICA },
]

const semAcento = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

// Grupos de fórmulas que passam no filtro de série e na busca (nome, fórmula ou assunto).
// Grupo sem nenhuma fórmula que passa some da lista.
export function filtrarFormulas(grupos, { serie = '', busca = '' } = {}) {
  const t = semAcento(busca.trim())
  return grupos
    .filter((g) => !serie || g.serie === serie)
    .map((g) => ({
      ...g,
      formulas: g.formulas.filter(([nome, expr, vars]) => !t || semAcento(g.assunto).includes(t) || semAcento(nome).includes(t) || semAcento(expr).includes(t) || vars.some(([, sig]) => semAcento(sig).includes(t))),
    }))
    .filter((g) => g.formulas.length)
}

export const contarFormulas = (grupos) => grupos.reduce((n, g) => n + g.formulas.length, 0)
