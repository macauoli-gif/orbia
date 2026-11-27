// Questões: sugestão por série e conferência do conteúdo de fábrica.
import { filtrarQuestoes, questaoDaSerie, NIVEIS, LETRAS } from '../src/lib/questoes.js'
import { SERIES } from '../src/lib/series.js'
import { QUESTOES_APP, MATERIAS } from '../src/lib/fabrica.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

const f = { materia_id: '', assunto: '', nivel: '', instituicao: '', ano: '', situacao: 'Todas', soSugerido: true }
const q = (id, serie_minima, user_id = null) => ({ id, serie_minima, user_id })
const lista = [q('a', '9º ano EF'), q('b', '2º ano EM'), q('c', null), q('minha', null, 'u1')]

conferir('sugere só a da própria série (e as sem série)', filtrarQuestoes(lista, f, { serie: '2º ano EM' }).map((x) => x.id), ['b', 'c', 'minha'])
conferir('o 3º ano não recebe a do 9º', questaoDaSerie(q('a', '9º ano EF'), '3º ano EM'), false)
conferir('desmarcando a sugestão aparece tudo', filtrarQuestoes(lista, { ...f, soSugerido: false }, { serie: '2º ano EM' }).length, 4)

// Conteúdo de fábrica: cada série tem questões suficientes e as do ensino médio têm nível Difícil.
for (const s of SERIES) {
  const daSerie = QUESTOES_APP.filter((x) => questaoDaSerie(x, s))
  conferir(`${s}: pelo menos 10 questões`, daSerie.length >= 10, true)
  if (s !== '9º ano EF') conferir(`${s}: tem nível Difícil`, daSerie.some((x) => x.nivel === 'Difícil'), true)
}
conferir('3º ano: todas as questões são Difíceis', QUESTOES_APP.filter((x) => x.serie_minima === '3º ano EM').every((x) => x.nivel === 'Difícil'), true)

// Cada questão passa nos CHECK do banco (antes de chegar lá).
const materias = new Set(MATERIAS.map((m) => m.id))
const problemas = QUESTOES_APP.filter((x) =>
  !materias.has(x.materia_id) || !NIVEIS.includes(x.nivel) || !x.enunciado?.trim() || !x.assunto?.trim() ||
  x.alternativas.length < 4 || x.alternativas.length > 5 ||
  !x.alternativas.some((a) => a.letra === x.correta) || !x.alternativas.every((a, i) => a.letra === LETRAS[i] && a.texto?.trim()) ||
  (x.serie_minima && !SERIES.includes(x.serie_minima)))
conferir('todas as questões de fábrica são válidas', problemas.map((x) => x.id), [])
conferir('toda questão de fábrica diz de que prova veio', QUESTOES_APP.filter((x) => !/Fonte: (ENEM|IFSC)/.test(x.resposta_comentada) || !x.instituicao || !x.ano).map((x) => x.id), [])
conferir('ids sem repetição', new Set(QUESTOES_APP.map((x) => x.id)).size, QUESTOES_APP.length)

console.log(`${ok}/${tot} — questoes`)
process.exit(ok === tot ? 0 : 1)
