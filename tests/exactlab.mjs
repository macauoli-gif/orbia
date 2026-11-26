// ExactLab: tabela periódica (dados, posição, família, distribuição), fórmulas e atividades.
import {
  ELEMENTOS, elementoPorZ, grupoDe, periodoDe, familiaDe, camadasDe, configEnergetica, configAbreviada, particulas,
  buscar, passaNosFiltros, escala, alternarComparacao, MAX_COMPARAR, FAMILIAS, CLASSIFICACOES, ESTADOS, PROPRIEDADES, eVparaKJmol, kelvinParaCelsius,
} from '../src/lib/exactlab/tabela.js'
import { AREAS, filtrarFormulas, contarFormulas } from '../src/lib/exactlab/formulas.js'
import { ATIVIDADES, GLOSSARIO, corrigirAtividade } from '../src/lib/exactlab/glossario.js'
import { SERIES } from '../src/lib/series.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}
const el = (s) => ELEMENTOS.find((e) => e.simbolo === s)

// ----- os 118 elementos -----
conferir('118 elementos, em ordem', ELEMENTOS.map((e) => e.z), Array.from({ length: 118 }, (_, i) => i + 1))
conferir('cada um numa posição diferente da grade', new Set(ELEMENTOS.map((e) => `${e.linha},${e.coluna}`)).size, 118)
conferir('todos têm nome e textos em português', ELEMENTOS.filter((e) => !e.nome || !e.origem || !e.caracteristicas || !e.aplicacoes || !e.curiosidade).map((e) => e.z), [])
conferir('família, classificação e estado sempre de uma lista conhecida', ELEMENTOS.filter((e) => !FAMILIAS.includes(e.familia) || !CLASSIFICACOES.includes(e.classificacao) || !ESTADOS.includes(e.estado)).map((e) => e.z), [])
conferir('elétrons das camadas somam o número atômico', ELEMENTOS.filter((e) => camadasDe(e.config).reduce((n, c) => n + c.eletrons, 0) !== e.z).map((e) => e.z), [])
conferir('nêutrons nunca negativos', ELEMENTOS.filter((e) => particulas(e).neutrons < 0).map((e) => e.z), [])

// ----- posição -----
conferir('grupo e período: H, Fe, Br, Rn, Og', ['H', 'Fe', 'Br', 'Rn', 'Og'].map((s) => [grupoDe(el(s).z), periodoDe(el(s).z)]), [[1, 1], [8, 4], [17, 4], [18, 6], [18, 7]])
conferir('lantanídeos e actinídeos sem número de grupo', [grupoDe(57), grupoDe(71), grupoDe(89), grupoDe(103), grupoDe(72), grupoDe(104)], [null, null, null, null, 4, 4])
conferir('lantanídeos na linha 9, actinídeos na 10', [el('La').linha, el('Lu').linha, el('Ac').linha, el('Lr').linha], [9, 9, 10, 10])

// ----- família e classificação -----
conferir('famílias', ['H', 'Na', 'Ca', 'Fe', 'B', 'C', 'N', 'O', 'Cl', 'Ne', 'Nd', 'U'].map((s) => familiaDe(el(s).z)),
  ['Hidrogênio', 'Metais alcalinos', 'Metais alcalino-terrosos', 'Metais de transição', 'Família do boro', 'Família do carbono', 'Família do nitrogênio', 'Calcogênios', 'Halogênios', 'Gases nobres', 'Lantanídeos', 'Actinídeos'])
conferir('classificação', ['H', 'Fe', 'O', 'Si', 'Ar', 'Br'].map((s) => el(s).classificacao), ['Hidrogênio', 'Metal', 'Ametal', 'Semimetal', 'Gás nobre', 'Ametal'])
conferir('estados a 25 °C', ['Hg', 'Br', 'O', 'Fe', 'Og'].map((s) => el(s).estado), ['Líquido', 'Líquido', 'Gasoso', 'Sólido', 'Não determinado'])
conferir('só dois líquidos a 25 °C', ELEMENTOS.filter((e) => e.estado === 'Líquido').map((e) => e.simbolo), ['Br', 'Hg'])

// ----- distribuição eletrônica -----
conferir('camadas do sódio', camadasDe(el('Na').config).map((c) => c.camada + c.eletrons).join(' '), 'K2 L8 M1')
conferir('exceção do cromo (3d⁵ 4s¹)', camadasDe(el('Cr').config).map((c) => c.eletrons), [2, 8, 13, 1])
conferir('exceção do cobre (3d¹⁰ 4s¹)', camadasDe(el('Cu').config).map((c) => c.eletrons), [2, 8, 18, 1])
conferir('ordem de energia (Linus Pauling) do ferro', configEnergetica(el('Fe').config), '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶')

conferir('forma abreviada separa o gás nobre do subnível', configAbreviada('[Ar]4s1 3d10'), '[Ar] 4s¹ 3d¹⁰')

// ----- partículas -----
conferir('bromo-79: 35 prótons, 44 nêutrons (não 45: o Br-80 não existe na natureza)', [particulas(el('Br')).protons, particulas(el('Br')).neutrons], [35, 44])
conferir('cobre-63 e cloro-35', [particulas(el('Cu')).neutrons, particulas(el('Cl')).neutrons], [34, 18])

// ----- busca, filtros, escala, comparador -----
conferir('busca por símbolo, nome sem acento e número', [buscar(ELEMENTOS, 'Fe')[0].z, buscar(ELEMENTOS, 'helio').map((e) => e.z), buscar(ELEMENTOS, '79').map((e) => e.simbolo)], [26, [2], ['Au']])
conferir('filtro: halogênios do 3º período', ELEMENTOS.filter((e) => passaNosFiltros(e, { familia: 'Halogênios', periodo: '3' })).map((e) => e.simbolo), ['Cl'])
const corEN = escala(ELEMENTOS, 'eletronegatividade')
conferir('escala: flúor no máximo, hélio sem valor', [corEN(el('F')), corEN(el('He'))], [1, null])
conferir('comparador limita a 4 e desmarca', [alternarComparacao([1, 2, 3, 4], 5), alternarComparacao([1, 2], 2), MAX_COMPARAR], [[1, 2, 3, 4], [1], 4])
conferir('propriedades periódicas apontam para campos que existem', Object.values(PROPRIEDADES).every((p) => ELEMENTOS.some((e) => e[p.campo] != null)), true)
conferir('conversões', [eVparaKJmol(13.598), kelvinParaCelsius(373.15)], [1312, 100])

// ----- atividades guiadas: as respostas batem com os dados -----
const resp = (id) => ATIVIDADES.find((a) => a.id === id).resposta
conferir('a2: o halogênio do 3º período', resp('a2').map((z) => [elementoPorZ(z).familia, elementoPorZ(z).periodo]), [['Halogênios', 3]])
conferir('a4: os líquidos', resp('a4').every((z) => elementoPorZ(z).estado === 'Líquido'), true)
conferir('a5: o mais eletronegativo', resp('a5')[0], ELEMENTOS.reduce((a, b) => ((b.eletronegatividade ?? 0) > (a.eletronegatividade ?? 0) ? b : a)).z)
conferir('a7: 3 camadas e 2 na valência', camadasDe(elementoPorZ(resp('a7')[0]).config).map((c) => c.eletrons), [2, 8, 2])
conferir('todas as atividades têm explicação e quantidade certa', ATIVIDADES.every((a) => a.explicacao && a.quantos === a.resposta.length), true)
conferir('corrigir: certo, faltando e errado', [corrigirAtividade(ATIVIDADES[3], [80, 35]).certo, corrigirAtividade(ATIVIDADES[3], [80]).faltam, corrigirAtividade(ATIVIDADES[3], [80, 1]).errados], [true, 1, [1]])
conferir('glossário sem repetição', new Set(GLOSSARIO.map((g) => g[0])).size, GLOSSARIO.length)

// ----- fórmulas -----
for (const a of AREAS) conferir(`${a.nome}: pelo menos 50 fórmulas`, contarFormulas(a.grupos) >= 50, true)
const malFormadas = AREAS.flatMap((a) => a.grupos.flatMap((g) => (SERIES.includes(g.serie) ? [] : [g.assunto]).concat(g.formulas.filter(([n, f, v]) => !n || !f || !Array.isArray(v)).map(([n]) => n))))
conferir('toda fórmula tem nome, expressão, legenda e série válida', malFormadas, [])
for (const s of SERIES) conferir(`fórmulas para o ${s} nas três áreas`, AREAS.every((a) => a.grupos.some((g) => g.serie === s)), true)
conferir('busca em fórmulas', filtrarFormulas(AREAS[1].grupos, { busca: 'snell' }).flatMap((g) => g.formulas.map((f) => f[0])), ['Lei de Snell'])

console.log(`${ok}/${tot} — exactlab`)
process.exit(ok === tot ? 0 : 1)
