// Simulados de vestibulares: escolher a prova, corrigir e acompanhar a evolução.
// As provas e os gabaritos oficiais vêm de simulados-provas.js (gerado).
// Regra pura: recebe a prova e as marcações, devolve números.

import { LETRAS } from './questoes.js'

// Ordem em que as instituições aparecem no filtro.
export const INSTITUICOES = ['ENEM', 'Fuvest', 'Unicamp', 'UERJ']
// Idênticos ao CHECK de simulados_tentativas.idioma.
export const IDIOMAS = ['Inglês', 'Espanhol', 'Francês']

// Limite do CHECK de simulados_tentativas.tempo_seg (24 h).
export const TEMPO_MAXIMO_SEG = 86400
// O cronômetro conta também o tempo fora do app (rascunho reaberto dias depois):
// grava no máximo 24 h, senão o banco recusa e a tentativa nunca salva.
export const tempoParaGravar = (seg) => Math.min(TEMPO_MAXIMO_SEG, Math.max(0, Math.round(seg || 0)))
export const letrasDa = (prova) => LETRAS.slice(0, prova.alternativas)

export const titulo = (p) => `${p.instituicao} ${p.ano} · ${p.nome}`

export function filtrarProvas(provas, { instituicao = '', ano = '' } = {}) {
  return provas
    .filter((p) => (!instituicao || p.instituicao === instituicao) && (!ano || String(p.ano) === String(ano)))
    .sort((a, b) => INSTITUICOES.indexOf(a.instituicao) - INSTITUICOES.indexOf(b.instituicao) || b.ano - a.ano || a.id.localeCompare(b.id))
}

export function anosDisponiveis(provas, instituicao = '') {
  return [...new Set(provas.filter((p) => !instituicao || p.instituicao === instituicao).map((p) => p.ano))].sort((a, b) => b - a)
}

// Línguas estrangeiras entre as quais o aluno escolhe (vazio = a prova não tem).
export const idiomasDa = (prova) => Object.keys(prova.variantes || {})

// Gabarito com a língua escolhida já aplicada. Sem a língua, essas questões ficam sem gabarito.
export function gabaritoDa(prova, idioma) {
  const v = (idioma && prova.variantes?.[idioma]) || {}
  return prova.questoes.map((q) => (q.r == null ? { ...q, r: v[q.n] ?? null } : q))
}

// situação de cada questão: 'certa' | 'errada' | 'branca' | 'anulada'
// Anulada sai da conta (não soma nem como acerto nem como erro), como nas provas oficiais.
export function corrigir(prova, respostas = {}, idioma = null) {
  const mapa = gabaritoDa(prova, idioma).map((q) => {
    const marcada = respostas[q.n] || null // chaves de objeto já são texto: 3 e '3' são a mesma
    const situacao = q.r === '*' ? 'anulada' : !marcada ? 'branca' : q.r && marcada === q.r ? 'certa' : 'errada'
    return { n: q.n, area: q.area, gabarito: q.r, marcada, situacao }
  })
  const conta = (lista) => {
    const c = { certas: 0, erradas: 0, brancas: 0, anuladas: 0 }
    for (const q of lista) c[q.situacao + 's']++
    const validas = c.certas + c.erradas + c.brancas
    return { ...c, validas, pct: validas ? Math.round((c.certas / validas) * 100) : 0 }
  }
  const areas = [...new Set(mapa.map((q) => q.area).filter(Boolean))]
  return {
    ...conta(mapa),
    porArea: areas.map((area) => ({ area, ...conta(mapa.filter((q) => q.area === area)) })),
    mapa,
  }
}

// Quantas questões foram marcadas (para o aviso de "ainda tem questão em branco").
export const marcadas = (respostas = {}) => Object.values(respostas).filter(Boolean).length

// Todas as tentativas, da mais antiga para a mais nova, com a correção de cada uma.
// Tentativa de prova que saiu do catálogo é ignorada (não dá para corrigir).
export function evolucao(tentativas, provas) {
  const porId = Object.fromEntries(provas.map((p) => [p.id, p]))
  return tentativas
    .filter((t) => porId[t.prova_id])
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((t) => ({ tentativa: t, prova: porId[t.prova_id], resultado: corrigir(porId[t.prova_id], t.respostas, t.idioma) }))
}

// Por área: o percentual da última tentativa e a diferença para a anterior que tinha a mesma área.
export function comparaAreas(lista) {
  const ultimaPorArea = new Map()
  for (const { resultado } of lista) {
    for (const a of resultado.porArea) {
      const antes = ultimaPorArea.get(a.area)
      ultimaPorArea.set(a.area, { area: a.area, pct: a.pct, anterior: antes ? antes.pct : null })
    }
  }
  return [...ultimaPorArea.values()].map((a) => ({ ...a, diferenca: a.anterior == null ? null : a.pct - a.anterior }))
}

// A tentativa anterior da MESMA prova (para "na vez passada você fez X%").
export function tentativaAnterior(lista, tentativa) {
  const daProva = lista.filter((x) => x.tentativa.prova_id === tentativa.prova_id && new Date(x.tentativa.created_at) < new Date(tentativa.created_at))
  return daProva.length ? daProva[daProva.length - 1] : null
}

export function textoDuracao(seg) {
  const s = Math.max(0, Math.round(seg || 0))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60
  return h ? `${h} h ${String(m).padStart(2, '0')} min` : `${m} min ${String(ss).padStart(2, '0')} s`
}

// Antes de gravar: a prova existe, a língua é válida quando a prova pede, e só letras da prova.
export function validarTentativa(t, provas) {
  const prova = provas.find((p) => p.id === t.prova_id)
  if (!prova) return 'Prova não encontrada.'
  const idiomas = idiomasDa(prova)
  if (idiomas.length && !idiomas.includes(t.idioma)) return 'Escolha a língua estrangeira.'
  if (!idiomas.length && t.idioma) return 'Esta prova não tem língua estrangeira.'
  const letras = letrasDa(prova), numeros = new Set(prova.questoes.map((q) => String(q.n)))
  for (const [n, r] of Object.entries(t.respostas || {})) {
    if (!numeros.has(String(n))) return `A prova não tem a questão ${n}.`
    if (!letras.includes(r)) return `Resposta inválida na questão ${n}.`
  }
  if (!(t.tempo_seg >= 0 && t.tempo_seg <= TEMPO_MAXIMO_SEG)) return 'Tempo inválido.'
  return null
}
