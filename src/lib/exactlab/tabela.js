// Tabela periódica: regras puras (posição, família, classificação, distribuição
// eletrônica, busca, filtros e tendências). Números do PubChem (elementos-dados.js);
// textos em português (textos-elementos-*.js).
import { ELEMENTOS_DADOS } from './elementos-dados.js'
import { TEXTOS_1 } from './textos-elementos-1.js'
import { TEXTOS_2 } from './textos-elementos-2.js'
import { TEXTOS_3 } from './textos-elementos-3.js'

// ---------- posição na tabela de 18 colunas ----------
const INICIO_PERIODO = [1, 3, 11, 19, 37, 55, 87]
export function periodoDe(z) {
  let p = 0
  for (let i = 0; i < INICIO_PERIODO.length; i++) if (z >= INICIO_PERIODO[i]) p = i + 1
  return p
}
// Grupo de 1 a 18; null para lantanídeos (57–71) e actinídeos (89–103), que ficam no bloco f.
export function grupoDe(z) {
  if (z === 1) return 1
  if (z === 2) return 18
  const p = periodoDe(z), i = z - INICIO_PERIODO[p - 1] // posição dentro do período
  if (p <= 3) return i < 2 ? i + 1 : i + 11
  if (p <= 5) return i + 1
  if (i < 2) return i + 1
  if (i < 17) return null // bloco f
  return i - 13
}
// Linha e coluna na grade da tela: lantanídeos na linha 9, actinídeos na 10 (com uma linha de folga).
export function posicaoNaGrade(z) {
  const g = grupoDe(z)
  if (g) return { linha: periodoDe(z), coluna: g }
  return { linha: z <= 71 ? 9 : 10, coluna: 3 + (z - (z <= 71 ? 57 : 89)) }
}

// ---------- famílias e classificação ----------
export const FAMILIAS = [
  'Hidrogênio', 'Metais alcalinos', 'Metais alcalino-terrosos', 'Metais de transição', 'Lantanídeos', 'Actinídeos',
  'Família do boro', 'Família do carbono', 'Família do nitrogênio', 'Calcogênios', 'Halogênios', 'Gases nobres',
]
const FAMILIA_POR_GRUPO = { 1: 'Metais alcalinos', 2: 'Metais alcalino-terrosos', 13: 'Família do boro', 14: 'Família do carbono', 15: 'Família do nitrogênio', 16: 'Calcogênios', 17: 'Halogênios', 18: 'Gases nobres' }
export function familiaDe(z) {
  if (z === 1) return 'Hidrogênio'
  if (z >= 57 && z <= 71) return 'Lantanídeos'
  if (z >= 89 && z <= 103) return 'Actinídeos'
  const g = grupoDe(z)
  return FAMILIA_POR_GRUPO[g] || 'Metais de transição'
}

// Classificação escolar. "Semimetal" não é categoria oficial da IUPAC; a ficha explica.
export const CLASSIFICACOES = ['Metal', 'Ametal', 'Semimetal', 'Gás nobre', 'Hidrogênio']
export function classificacaoDe(d) {
  if (d.z === 1) return 'Hidrogênio'
  if (d.grupoBloco === 'Noble gas') return 'Gás nobre'
  if (d.grupoBloco === 'Metalloid') return 'Semimetal'
  if (d.grupoBloco === 'Nonmetal' || d.grupoBloco === 'Halogen') return 'Ametal'
  return 'Metal'
}

export const ESTADOS = ['Sólido', 'Líquido', 'Gasoso', 'Não determinado']
export function estadoDe(d) {
  if (d.z === 118) return 'Não determinado' // só existiram poucos átomos; previsões divergem
  const s = d.estadoPubchem
  if (/Solid/.test(s)) return 'Sólido'
  if (/Liquid/.test(s)) return 'Líquido'
  if (/Gas/.test(s)) return 'Gasoso'
  return 'Não determinado'
}
export const estadoPrevisto = (d) => /Expected/.test(d.estadoPubchem)

// ---------- distribuição eletrônica ----------
const CERNES = {
  '[He]': '1s2',
  '[Ne]': '1s2 2s2 2p6',
  '[Ar]': '1s2 2s2 2p6 3s2 3p6',
  '[Kr]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6',
  '[Xe]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6',
  '[Rn]': '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 4f14 5d10 6s2 6p6',
}
const ORDEM_L = 'spdf'
// Ordem de energia (diagrama de Linus Pauling): por n + l e, no empate, por n.
const energia = ({ n, l }) => (n + ORDEM_L.indexOf(l)) * 10 + n
export function subniveis(config) {
  const cheia = config.replace(/\[[A-Za-z]+\]/, (c) => CERNES[c] + ' ')
  return cheia.trim().split(/\s+/).map((s) => {
    const m = s.match(/^(\d)([spdf])(\d+)$/)
    if (!m) throw new Error(`subnível inválido: ${s}`)
    return { n: Number(m[1]), l: m[2], e: Number(m[3]) }
  })
}
const SOBRESCRITO = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const sobrescrever = (n) => String(n).split('').map((c) => SOBRESCRITO[c]).join('')
const escrever = (lista) => lista.map((s) => `${s.n}${s.l}${sobrescrever(s.e)}`).join(' ')
// Forma abreviada (com o gás nobre anterior), como o PubChem informa.
export const configAbreviada = (config) => config.replace(']', '] ').split(/\s+/).map((s) => (/^\[/.test(s) ? s : s.replace(/^(\d)([spdf])(\d+)$/, (_, n, l, e) => `${n}${l}${sobrescrever(e)}`))).join(' ')
export const configEnergetica = (config) => escrever([...subniveis(config)].sort((a, b) => energia(a) - energia(b)))
export const CAMADAS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q']
// Elétrons por camada (K = n1 ... Q = n7).
export function camadasDe(config) {
  const c = Array(7).fill(0)
  for (const s of subniveis(config)) c[s.n - 1] += s.e
  while (c.length && c[c.length - 1] === 0) c.pop()
  return c.map((e, i) => ({ camada: CAMADAS[i], eletrons: e }))
}
export const camadaDeValencia = (config) => camadasDe(config).at(-1)
// Bloco do último subnível preenchido: s (grupos 1–2 e hélio), p (13–18), d (3–12), f (lantanídeos e actinídeos).
export function blocoDe(el) {
  if (el.z === 2) return 's'
  if (el.grupo == null) return 'f'
  return el.grupo <= 2 ? 's' : el.grupo <= 12 ? 'd' : 'p'
}
// Do 104 em diante, quase nada foi medido: a classificação é prevista por cálculos.
export const classificacaoPrevista = (el) => el.z >= 104

// Frase da ficha sobre a camada de valência. Nos grupos 1, 2 e 13 a 18 (elementos
// representativos) a última camada diz quantos elétrons fazem ligação. Nos blocos d e f
// isso não vale: elétrons do subnível d (ou f) de camadas internas também participam
// (o paládio, por exemplo, termina em 4d¹⁰ e não tem elétron na 5ª camada).
export function textoValencia(el) {
  const v = camadaDeValencia(el.config)
  const representativo = el.z <= 2 || (el.grupo != null && (el.grupo <= 2 || el.grupo >= 13))
  if (representativo) return `${v.eletrons} elétron${v.eletrons > 1 ? 's' : ''} na camada de valência (${v.camada}).`
  return `Por ser do bloco ${blocoDe(el)}, os elétrons que fazem ligação não ficam só na última camada (${v.camada}): os do subnível ${blocoDe(el)} também participam.`
}

// Texto do grupo na ficha (lantanídeos e actinídeos não têm número de grupo).
export function textoGrupo(el) {
  if (el.grupo != null) return String(el.grupo)
  const serie = el.familia === 'Lantanídeos' ? 'lantanídeos' : 'actinídeos'
  return `Sem número: a série dos ${serie} fica encaixada no lugar do grupo 3 (químicos ainda discutem quais elementos ocupam esse grupo)`
}
export const textoDescoberta = (el) => (el.ano === 'Ancient' ? 'Conhecido desde a Antiguidade' : el.ano)

// ---------- os elementos completos ----------
const TEXTOS = Object.fromEntries([...TEXTOS_1, ...TEXTOS_2, ...TEXTOS_3].map(([z, nome, origem, caracteristicas, aplicacoes, curiosidade]) => [z, { nome, origem, caracteristicas, aplicacoes, curiosidade }]))
export const ELEMENTOS = ELEMENTOS_DADOS.map((d) => ({
  ...d,
  ...TEXTOS[d.z],
  grupo: grupoDe(d.z),
  periodo: periodoDe(d.z),
  familia: familiaDe(d.z),
  classificacao: classificacaoDe(d),
  estado: estadoDe(d),
  ...posicaoNaGrade(d.z),
}))
export const elementoPorZ = (z) => ELEMENTOS[z - 1]

// prótons = elétrons (átomo neutro) = Z; nêutrons = A − Z, e A depende do isótopo.
export const particulas = (el) => ({ protons: el.z, eletrons: el.z, neutrons: el.A - el.z, A: el.A })

// ---------- busca e filtros ----------
// Comparação sem acento e sem maiúscula (dono único: fórmulas e tela usam esta).
export const semAcento = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
// "Metais de transição" -> "metais-de-transicao" (nome da cor no CSS).
export const classeCss = (s) => semAcento(s).replace(/[^a-z]+/g, '-')
export const FILTRO_VAZIO = { familia: '', periodo: '', classificacao: '' }
export function buscar(elementos, termo) {
  const t = semAcento(termo)
  if (!t) return elementos
  if (/^\d+$/.test(t)) return elementos.filter((e) => e.z === Number(t))
  return elementos.filter((e) => semAcento(e.simbolo) === t || semAcento(e.nome).includes(t))
}
// Quem passa em todos os filtros ativos (filtro vazio = todos).
export function passaNosFiltros(el, { familia = '', periodo = '', classificacao = '' } = {}) {
  return (!familia || el.familia === familia) && (!periodo || el.periodo === Number(periodo)) && (!classificacao || el.classificacao === classificacao)
}

// ---------- propriedades periódicas ----------
export const PROPRIEDADES = {
  eletronegatividade: {
    nome: 'Eletronegatividade', unidade: 'escala de Pauling', campo: 'eletronegatividade',
    sentido: { periodo: 'direita', grupo: 'cima' },
    tendencia: 'Aumenta da esquerda para a direita no período e de baixo para cima no grupo. O flúor é o mais eletronegativo. Gases nobres leves quase não formam ligações, por isso não têm valor na escala.',
    porque: 'Para a direita, o núcleo tem mais prótons e atrai mais os elétrons da ligação; para baixo, os elétrons ficam mais longe do núcleo e são menos atraídos.',
  },
  raio: {
    nome: 'Raio atômico', unidade: 'em pm, raio de van der Waals', campo: 'raio',
    sentido: { periodo: 'esquerda', grupo: 'baixo' },
    tendencia: 'Aumenta de cima para baixo no grupo e, em geral, da direita para a esquerda no período.',
    porque: 'Para baixo, cada período acrescenta uma camada eletrônica. Para a direita, mais prótons puxam as camadas para perto do núcleo.',
  },
  ionizacao: {
    nome: 'Energia de ionização', unidade: '1ª energia de ionização, em eV', campo: 'ionizacao',
    sentido: { periodo: 'direita', grupo: 'cima' },
    tendencia: 'Aumenta da esquerda para a direita no período e de baixo para cima no grupo. O hélio tem a maior de todas.',
    porque: 'É a energia para arrancar o elétron mais externo: quanto mais preso ao núcleo (átomo menor, mais prótons), mais energia é necessária.',
  },
}
// Valor de 0 a 1 para pintar a cor da escala (null quando não há medida).
export function escala(elementos, campo) {
  const vals = elementos.map((e) => e[campo]).filter((v) => v != null)
  const min = Math.min(...vals), max = Math.max(...vals)
  return (el) => (el[campo] == null ? null : (el[campo] - min) / (max - min))
}
export const eVparaKJmol = (ev) => (ev == null ? null : Math.round(ev * 96.485))
export const kelvinParaCelsius = (k) => (k == null ? null : Math.round((k - 273.15) * 10) / 10)

// ---------- comparador ----------
export const MAX_COMPARAR = 4
export function alternarComparacao(lista, z) {
  if (lista.includes(z)) return lista.filter((x) => x !== z)
  return lista.length >= MAX_COMPARAR ? lista : [...lista, z]
}
