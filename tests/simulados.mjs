// Simulados: correção, línguas, áreas, evolução e conferência do catálogo oficial.
import { corrigir, gabaritoDa, evolucao, comparaAreas, tentativaAnterior, filtrarProvas, anosDisponiveis, validarTentativa, textoDuracao, INSTITUICOES, tempoParaGravar } from '../src/lib/simulados.js'
import { PROVAS } from '../src/lib/simulados-provas.js'
import { progressoDaSemana } from '../src/lib/metas.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

// Prova pequena de mentira: 1–2 língua estrangeira, 3–4 Matemática (4 anulada), 5 Humanas.
const P = {
  id: 'teste-2026', instituicao: 'ENEM', ano: 2026, nome: 'teste', alternativas: 5,
  questoes: [{ n: 1, r: null, area: 'Língua' }, { n: 2, r: null, area: 'Língua' }, { n: 3, r: 'C', area: 'Matemática' }, { n: 4, r: '*', area: 'Matemática' }, { n: 5, r: 'E', area: 'Humanas' }],
  variantes: { 'Inglês': { 1: 'A', 2: 'B' }, 'Espanhol': { 1: 'D', 2: 'B' } },
}

conferir('a língua escolhida entra no gabarito', gabaritoDa(P, 'Espanhol').slice(0, 2).map((q) => q.r), ['D', 'B'])
const r = corrigir(P, { 1: 'A', 2: 'C', 3: 'C', 4: 'A' }, 'Inglês')
conferir('certas, erradas, brancas, anuladas', [r.certas, r.erradas, r.brancas, r.anuladas], [2, 1, 1, 1])
conferir('anulada fora da conta: 2 de 4 válidas = 50%', [r.validas, r.pct], [4, 50])
conferir('mapa da prova', r.mapa.map((q) => q.situacao), ['certa', 'errada', 'certa', 'anulada', 'branca'])
conferir('por área', r.porArea.map((a) => [a.area, a.certas, a.erradas, a.brancas, a.validas]), [['Língua', 1, 1, 0, 2], ['Matemática', 1, 0, 0, 1], ['Humanas', 0, 0, 1, 1]])
conferir('a mesma marcação em espanhol corrige diferente', corrigir(P, { 1: 'A' }, 'Espanhol').mapa[0].situacao, 'errada')
conferir('respostas com chave em texto também valem', corrigir(P, { '3': 'C' }, 'Inglês').certas, 1)
conferir('prova sem área: porArea vazio', corrigir({ ...P, questoes: P.questoes.map((q) => ({ ...q, area: null })) }, {}, 'Inglês').porArea, [])

const T = (id, prova_id, quando, respostas) => ({ id, prova_id, idioma: 'Inglês', respostas, tempo_seg: 60, created_at: quando })
const lista = evolucao([
  T('b', 'teste-2026', '2026-11-20T10:00:00Z', { 1: 'A', 2: 'B', 3: 'C', 5: 'E' }),
  T('a', 'teste-2026', '2026-11-10T10:00:00Z', { 3: 'C' }),
  T('x', 'prova-que-sumiu', '2026-11-15T10:00:00Z', {}),
], [P])
conferir('evolução em ordem de data, sem prova fora do catálogo', lista.map((e) => [e.tentativa.id, e.resultado.pct]), [['a', 25], ['b', 100]])
conferir('tentativa anterior da mesma prova', tentativaAnterior(lista, lista[1].tentativa).tentativa.id, 'a')
conferir('a primeira não tem anterior', tentativaAnterior(lista, lista[0].tentativa), null)
conferir('comparação por área', comparaAreas(lista).map((a) => [a.area, a.pct, a.diferenca]), [['Língua', 100, 100], ['Matemática', 100, 0], ['Humanas', 100, 100]])

conferir('validar: língua obrigatória', validarTentativa({ prova_id: 'teste-2026', respostas: {}, tempo_seg: 1 }, [P]), 'Escolha a língua estrangeira.')
conferir('validar: questão que não existe', validarTentativa({ prova_id: 'teste-2026', idioma: 'Inglês', respostas: { 9: 'A' }, tempo_seg: 1 }, [P]), 'A prova não tem a questão 9.')
conferir('validar: letra E em prova A–D', validarTentativa({ prova_id: 'unicamp-2027', respostas: { 1: 'E' }, tempo_seg: 1 }, PROVAS), 'Resposta inválida na questão 1.')
conferir('validar: tudo certo', validarTentativa({ prova_id: 'teste-2026', idioma: 'Inglês', respostas: { 1: 'A' }, tempo_seg: 1 }, [P]), null)
// Bug da revisão: rascunho reaberto dias depois tinha tempo > 24 h e o banco recusava para sempre.
conferir('tempo gravado nunca passa de 24 h', [tempoParaGravar(3 * 86400), tempoParaGravar(-5), tempoParaGravar(61.6)], [86400, 0, 62])
conferir('validar: tempo acima de 24 h é recusado (CHECK)', validarTentativa({ prova_id: 'teste-2026', idioma: 'Inglês', respostas: {}, tempo_seg: 90000 }, [P]), 'Tempo inválido.')
conferir('duração', [textoDuracao(75), textoDuracao(3 * 3600 + 5 * 60)], ['1 min 15 s', '3 h 05 min'])

// ----- catálogo oficial (gerado dos PDFs) -----
conferir('filtro por instituição e ano', filtrarProvas(PROVAS, { instituicao: 'ENEM', ano: 2025 }).map((p) => p.id), ['enem-2025-d1', 'enem-2025-d2'])
for (const inst of INSTITUICOES) conferir(`${inst}: pelo menos 4 anos`, anosDisponiveis(PROVAS, inst).length >= 4, true)
conferir('ids sem repetição', new Set(PROVAS.map((p) => p.id)).size, PROVAS.length)
const problemas = []
for (const p of PROVAS) {
  const letras = ['A', 'B', 'C', 'D', 'E'].slice(0, p.alternativas)
  const ns = p.questoes.map((q) => q.n)
  if (ns.some((n, i) => i && n !== ns[i - 1] + 1)) problemas.push(`${p.id}: numeração com buraco`)
  for (const q of p.questoes) if (!(q.r === '*' || letras.includes(q.r) || (q.r === null && p.variantes))) problemas.push(`${p.id} q${q.n}: ${q.r}`)
  for (const [idioma, v] of Object.entries(p.variantes || {})) {
    for (const q of p.questoes.filter((x) => x.r === null)) if (!(letras.includes(v[q.n]) || v[q.n] === '*')) problemas.push(`${p.id} ${idioma} q${q.n}`)
  }
  if (!/^https:\/\//.test(p.link_prova) || !/^https:\/\//.test(p.link_gabarito)) problemas.push(`${p.id}: link`)
  if (!(p.tempo_min > 0)) problemas.push(`${p.id}: tempo`)
}
conferir('todas as provas oficiais estão completas', problemas, [])
conferir('ENEM: 90 questões por dia', PROVAS.filter((p) => p.instituicao === 'ENEM').every((p) => p.questoes.length === 90), true)
conferir('UERJ: 60 questões', PROVAS.filter((p) => p.instituicao === 'UERJ').every((p) => p.questoes.length === 60), true)
// Pontos conferidos à mão contra o PDF oficial:
const g = (id, n) => PROVAS.find((p) => p.id === id).questoes.find((q) => q.n === n).r
conferir('ENEM 2024 2º dia: 129 anulada, 180 = E', [g('enem-2024-d2', 129), g('enem-2024-d2', 180)], ['*', 'E'])
conferir('ENEM 2022 1º dia: inglês 1 = D, espanhol 1 = E', [PROVAS.find((p) => p.id === 'enem-2022-d1').variantes['Inglês'][1], PROVAS.find((p) => p.id === 'enem-2022-d1').variantes['Espanhol'][1]], ['D', 'E'])
conferir('UERJ 2026 1º EQ: 38 anulada', g('uerj-2026-1', 38), '*')
conferir('Fuvest 2027: 80 questões, 23 anulada', [PROVAS.find((p) => p.id === 'fuvest-2027').questoes.length, g('fuvest-2027', 23)], [80, '*'])

// Meta do mês: cada simulado terminado no mês conta uma prova anterior.
const mes = progressoDaSemana({ perfil: { serie: '2º ano EM', meta_provas_mes: 1 }, agora: new Date(2026, 10, 25, 12), tentativas: [{ created_at: '2026-11-03T10:00:00-03:00' }, { created_at: '2026-11-20T10:00:00-03:00' }, { created_at: '2026-10-30T10:00:00-03:00' }] })
conferir('provas anteriores no mês contam só as de novembro', [mes.provasMes, mes.metaProvas, mes.mostraProvas], [2, 1, true])

console.log(`${ok}/${tot} — simulados`)
process.exit(ok === tot ? 0 : 1)
