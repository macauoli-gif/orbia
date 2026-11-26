// Gera src/lib/simulados-provas.js (provas anteriores e gabaritos OFICIAIS) lendo
// os PDFs de gabarito publicados pelas instituições. Não copia as provas: guarda
// só o link oficial e a sequência de respostas.
//
//   node scripts/gerar-provas.mjs <pasta>
//
// <pasta> guarda os PDFs de gabarito; o que faltar é baixado do link oficial.
// Para uma prova nova (ou um gabarito retificado): ajuste a lista no fim deste
// arquivo, rode de novo e confira a saída (número de questões, anuladas, áreas)
// contra o PDF. Se o formato do PDF mudar, o script para com erro em vez de chutar.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'

if (!process.argv[2]) { console.error('Use: node scripts/gerar-provas.mjs <pasta-dos-pdfs>'); process.exit(1) }
const G = process.argv[2].replace(/[\\/]?$/, '/')
mkdirSync(G, { recursive: true })
async function garantir(arq, url) {
  if (existsSync(G + arq)) return
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`)
  writeFileSync(G + arq, Buffer.from(await r.arrayBuffer()))
}

async function linhas(arq) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(G + arq)), verbosity: 0 }).promise
  const out = []
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent()
    const m = new Map()
    for (const it of tc.items) {
      if (!it.str?.trim()) continue
      const y = Math.round(it.transform[5])
      const k = [...m.keys()].find((yy) => Math.abs(yy - y) <= 2) ?? y
      if (!m.has(k)) m.set(k, [])
      m.get(k).push([it.transform[4], it.str])
    }
    for (const y of [...m.keys()].sort((a, b) => b - a)) out.push(m.get(y).sort((a, b) => a[0] - b[0]).map((x) => x[1]).join(' ').replace(/\s+/g, ' ').trim())
    out.push('--- página')
  }
  return out
}
const letra = (t) => (/^anulad[ao]$/i.test(t) || t === '*' ? '*' : /^[A-E]$/.test(t) ? t : null)

// ENEM: "1 D E 46 D" (1–5 com inglês/espanhol) ou "6 E 51 E" / "129 Anulado 174 C"
async function enem(arq, dia) {
  const q = {}, ing = {}, esp = {}
  for (const l0 of await linhas(arq)) {
    // a fonte às vezes separa os dígitos ('12 1 B' = 121): junta antes de ler
    const l = l0.replace(/\b(\d{1,2}) (\d)(?= (?:[A-E]|Anulad))/g, '$1$2')
    const t = l.split(' ')
    if (!/^\d+$/.test(t[0])) continue
    let i = 0
    while (i < t.length) {
      const n = Number(t[i])
      if (!Number.isInteger(n)) break
      if (dia === 1 && n <= 5 && letra(t[i + 1]) && letra(t[i + 2]) && (t[i + 3] === undefined || /^\d+$/.test(t[i + 3]))) {
        ing[n] = letra(t[i + 1]); esp[n] = letra(t[i + 2]); i += 3; continue
      }
      const r = letra(t[i + 1]); if (!r) break
      q[n] = r; i += 2
    }
  }
  const ini = dia === 1 ? 1 : 91
  const area = (n) => dia === 1 ? (n <= 5 ? 'Língua estrangeira' : n <= 45 ? 'Linguagens' : 'Ciências Humanas') : (n <= 135 ? 'Ciências da Natureza' : 'Matemática')
  const questoes = []
  for (let n = ini; n < ini + 90; n++) {
    const r = dia === 1 && n <= 5 ? null : q[n]
    if (!(dia === 1 && n <= 5) && !r) throw new Error(`${arq}: falta ${n}`)
    questoes.push({ n, r, area: area(n) })
  }
  const variantes = dia === 1 ? { 'Inglês': ing, 'Espanhol': esp } : null
  if (dia === 1 && (Object.keys(ing).length !== 5 || Object.keys(esp).length !== 5)) throw new Error(arq + ': idiomas')
  return { questoes, variantes }
}

// Fuvest: linhas "1 E 41 C 1 A 41 C ...": os dois primeiros pares são a 1ª versão.
async function fuvest(arq) {
  const q = {}
  for (const l of await linhas(arq)) {
    if (l.startsWith('--- página')) break
    const t = l.split(' ')
    if (t.length < 4 || !/^\d+$/.test(t[0]) || !letra(t[1]) || !/^\d+$/.test(t[2]) || !letra(t[3])) continue
    q[Number(t[0])] = letra(t[1]); q[Number(t[2])] = letra(t[3])
  }
  const total = Math.max(...Object.keys(q).map(Number))
  const questoes = []
  for (let n = 1; n <= total; n++) { if (!q[n]) throw new Error(`${arq}: falta ${n}`); questoes.push({ n, r: q[n], area: null }) }
  return { questoes, variantes: null }
}

// Unicamp: linhas "01 B 19 D 37 B 55 A".
async function unicamp(arq) {
  const q = {}
  for (const l of await linhas(arq)) {
    const t = l.split(' ')
    if (!/^\d+$/.test(t[0])) continue
    for (let i = 0; i + 1 < t.length; i += 2) { const r = letra(t[i + 1]); if (/^\d+$/.test(t[i]) && r) q[Number(t[i])] = r }
  }
  const total = Math.max(...Object.keys(q).map(Number))
  const questoes = []
  for (let n = 1; n <= total; n++) { if (!q[n]) throw new Error(`${arq}: falta ${n}`); questoes.push({ n, r: q[n], area: null }) }
  return { questoes, variantes: null }
}

// UERJ: blocos [cabeçalho, números, letras]. Números repetidos = idiomas (variantes);
// cabeçalho com vários nomes e números sem repetir = divide em partes iguais.
const NOME = { 'TEXTO BASE LINGUAGENS': ['Linguagens'], 'MATEMÁTICA': ['Matemática'], 'CIÊNCIAS DA NATUREZA': ['Ciências da Natureza'], 'CIÊNCIAS HUMANAS': ['Ciências Humanas'] }
const cap = (s) => s.charAt(0) + s.slice(1).toLowerCase()
// Linhas com a posição x de cada pedaço (a UERJ põe "ANULADA" acima/abaixo da
// coluna da questão anulada, fora da linha das letras).
async function linhasComX(arq) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(G + arq)), verbosity: 0 }).promise
  const tc = await (await doc.getPage(1)).getTextContent()
  const m = new Map()
  for (const it of tc.items) {
    if (!it.str?.trim()) continue
    const y = Math.round(it.transform[5])
    const k = [...m.keys()].find((yy) => Math.abs(yy - y) <= 2) ?? y
    if (!m.has(k)) m.set(k, [])
    // posição de cada palavra dentro do pedaço, proporcional aos caracteres
    const str = it.str, larg = it.width || 0
    for (const mt of str.matchAll(/\S+/g)) {
      const meio = (mt.index + mt[0].length / 2) / str.length
      m.get(k).push({ x: it.transform[4] + larg * meio, s: mt[0] })
    }
  }
  return [...m.keys()].sort((a, b) => b - a).map((y) => m.get(y).sort((a, b) => a.x - b.x))
}
async function uerj(arq) {
  const ls = await linhasComX(arq)
  const q = {}, area = {}, variantes = {}
  const ehNumeros = (l) => l.every((t) => /^\d+$/.test(t.s))
  for (let i = 0; i + 1 < ls.length; i++) {
    if (!ehNumeros(ls[i + 1]) || ls[i + 1].length < 2) continue
    const numsL = ls[i + 1]
    // tudo até o próximo cabeçalho (linha que não é número nem letra) são as respostas
    const resp = []
    let j = i + 2
    for (; j < ls.length; j++) {
      const l = ls[j]
      if (ehNumeros(l)) break
      if (!l.every((t) => letra(t.s) || /^(ANU|LADA)$/i.test(t.s))) break
      for (const t of l) if (!/^LADA$/i.test(t.s)) resp.push({ x: t.x, r: /^ANU$/i.test(t.s) ? '*' : letra(t.s) })
    }
    const lets = numsL.map((nt) => resp.reduce((b, r) => (!b || Math.abs(r.x - nt.x) < Math.abs(b.x - nt.x) ? r : b), null)?.r)
    if (lets.some((x) => !x) || new Set(resp.map((r) => r.x)).size !== numsL.length) throw new Error(`${arq}: colunas não batem perto de ${numsL[0].s}`)
    const nums = numsL.map((t) => t.s)
    const cab = ls[i].map((t) => t.s).join(' ')
    const nomes = NOME[cab] || cab.split(' ').reduce((acc, w) => (/^(DA|DE|DO|E)$/.test(w) && acc.length ? (acc[acc.length - 1] += ' ' + w, acc) : acc.length && /( DA| DE| DO| E)$/.test(acc[acc.length - 1]) ? (acc[acc.length - 1] += ' ' + w, acc) : [...acc, w]), []).map(cap)
    const repetidos = new Set(nums).size < nums.length
    if (repetidos || /ESPANHOL|FRANCÊS|INGLÊS/.test(cab)) {
      const k = new Set(nums).size
      const partes = nums.length / k
      for (let p = 0; p < partes; p++) {
        const idioma = nomes[p]
        variantes[idioma] = variantes[idioma] || {}
        for (let j = p * k; j < (p + 1) * k; j++) { variantes[idioma][Number(nums[j])] = letra(lets[j]); area[Number(nums[j])] = 'Língua estrangeira'; q[Number(nums[j])] = null }
      }
    } else {
      const k = nums.length / nomes.length
      nums.forEach((x, j) => { q[Number(x)] = letra(lets[j]); area[Number(x)] = nomes[Math.floor(j / k)] })
    }
    i = j - 1
  }
  const total = Math.max(...Object.keys(q).map(Number))
  const questoes = []
  for (let n = 1; n <= total; n++) { if (!(n in q)) throw new Error(`${arq}: falta ${n}`); questoes.push({ n, r: q[n], area: area[n] }) }
  return { questoes, variantes }
}

const E = 'https://download.inep.gov.br/enem/provas_e_gabaritos/'
const provas = []
for (const ano of [2022, 2023, 2024, 2025, 2026]) {
  await garantir(`enem${ano}_D1_CD1.pdf`, `${E}${ano}_GB_impresso_D1_CD1.pdf`)
  await garantir(`enem${ano}_D2_CD7.pdf`, `${E}${ano}_GB_impresso_D2_CD7.pdf`)
  provas.push({ id: `enem-${ano}-d1`, instituicao: 'ENEM', ano, nome: '1º dia · Caderno 1 Azul', alternativas: 5, tempo_min: 330, link_prova: `${E}${ano}_PV_impresso_D1_CD1.pdf`, link_gabarito: `${E}${ano}_GB_impresso_D1_CD1.pdf`, ...(await enem(`enem${ano}_D1_CD1.pdf`, 1)) })
  provas.push({ id: `enem-${ano}-d2`, instituicao: 'ENEM', ano, nome: '2º dia · Caderno 7 Azul', alternativas: 5, tempo_min: 300, link_prova: `${E}${ano}_PV_impresso_D2_CD7.pdf`, link_gabarito: `${E}${ano}_GB_impresso_D2_CD7.pdf`, ...(await enem(`enem${ano}_D2_CD7.pdf`, 2)) })
}
const F = 'https://www.fuvest.br/wp-content/uploads/'
const FUV = [
  [2027, 'Versão V1', 'fuvest2027-fase1-prova-V1.pdf', 'fuvest2027-fase1-gabarito-retificado.pdf'],
  [2026, 'Versão V1', 'fuvest2026-fase1-prova-V1.pdf', 'fuvest2026-fase1-gabarito.pdf'],
  [2025, 'Versão V1', 'fuvest2025_primeira_fase_prova_V1.pdf', 'fuvest2025_gabarito_primeira_fase.pdf'],
  [2024, 'Versão V', 'fuvest2024_primeira_fase_prova_V.pdf', 'fuvest2024_gabarito_primeira_fase_retificado_2023-11-24.pdf'],
  [2023, 'Versão V', 'fuvest2023_primeira_fase_prova_V.pdf', 'fuvest2023_gabarito_primeira_fase.pdf'],
]
for (const [ano, nome, pv, gb] of FUV) await garantir(`fuvest${ano}.pdf`, F + gb)
for (const [ano, nome, pv, gb] of FUV) provas.push({ id: `fuvest-${ano}`, instituicao: 'Fuvest', ano, nome: `1ª fase · ${nome}`, alternativas: 5, tempo_min: 300, link_prova: F + pv, link_gabarito: F + gb, ...(await fuvest(`fuvest${ano}.pdf`)) })
const U = 'https://www.comvest.unicamp.br/'
// Unicamp 2023: o gabarito da 1ª fase não está mais publicado no site da Comvest
// (conferido em 26/11/2026); por isso a Unicamp tem 4 anos e não 5.
const UNI = [
  [2027, 'Q', 'vest2027/F1/F1_2027_Q_Y.pdf', 'wp-content/uploads/2026/10/gabarito_2027_QY.pdf'],
  [2026, 'Q', 'vest2026/F1/f12026Q_X.pdf', 'wp-content/uploads/2025/10/Q_X-gabarito.pdf'],
  [2025, 'Q', 'vest2025/F1/f12025Q_Z.pdf', 'wp-content/uploads/2024/10/QZ_gabarito_2025_FINAL_site.pdf'],
  [2024, 'Q', 'vest2024/F1/f12024Q_Y.pdf', 'wp-content/uploads/2023/10/Q_Y.pdf'],
]
for (const [ano, , , gb] of UNI) await garantir(`unicamp${ano}.pdf`, U + gb)
for (const [ano, v, pv, gb] of UNI) provas.push({ id: `unicamp-${ano}`, instituicao: 'Unicamp', ano, nome: `1ª fase · Prova ${v}`, alternativas: 4, tempo_min: 300, link_prova: U + pv, link_gabarito: U + gb, ...(await unicamp(`unicamp${ano}.pdf`)) })
const R = 'https://www.vestibular.uerj.br/anexos/'
const UERJ = [
  [2027, '1º Exame de Qualificação', 'uerj2027-1', '271/ExamedeQualificacao_2027.pdf', '271/Gabarito_VESTIBULAR_Anulada.pdf'],
  [2027, '2º Exame de Qualificação', 'uerj2027-2', '272/prova.pdf', '272/Gabarito_272_09-09-2026.pdf'],
  [2026, '1º Exame de Qualificação', 'uerj2026-1', '261/prova_261.pdf', '261/gabarito_261.pdf'],
  [2026, '2º Exame de Qualificação', 'uerj2026-2', '262/Prova_2_EQ.pdf', '262/Gabarito_VESTIBULAR.pdf'],
  [2025, '1º Exame de Qualificação', 'uerj2025-1', '251/01_Exame_Qualificacao.pdf', '251/Gabarito_VESTIBULAR.pdf'],
  [2025, '2º Exame de Qualificação', 'uerj2025-2', '252/252_prova.pdf', '252/252_gabarito_retificado.pdf'],
  [2024, '1º Exame de Qualificação', 'uerj2024-1', '241/prova.pdf', '241/Gabarito_VESTIBULAR_ANULADA.pdf'],
  [2024, '2º Exame de Qualificação', 'uerj2024-2', '242/2o_EQ_prova.pdf', '242/2o_EQ_gabarito_retificado.pdf'],
  [2023, 'Exame Único', 'uerj2023', '233/prova_vetibular_2023.pdf', '233/gabarito_vestibular_2023_retificado.pdf'],
]
for (const [, , arq, , gb] of UERJ) await garantir(`${arq}.pdf`, R + gb)
for (const [ano, nome, arq, pv, gb] of UERJ) provas.push({ id: arq.replace('uerj', 'uerj-'), instituicao: 'UERJ', ano, nome, alternativas: 4, tempo_min: ano === 2023 ? 300 : 240, link_prova: R + pv, link_gabarito: R + gb, ...(await uerj(`${arq}.pdf`)) })

for (const p of provas) {
  const anul = p.questoes.filter((x) => x.r === '*').length
  const areas = [...new Set(p.questoes.map((x) => x.area).filter(Boolean))]
  console.log(`${p.id.padEnd(16)} ${String(p.questoes.length).padStart(3)} q  anuladas ${anul}  idiomas ${p.variantes ? Object.keys(p.variantes).join('/') : '-'}  áreas ${areas.join(', ') || '-'}`)
}
const linha = (p) => '  ' + JSON.stringify(p)
writeFileSync('src/lib/simulados-provas.js', `// GERADO por scripts/gerar-provas.mjs a partir dos gabaritos OFICIAIS (PDF) de
// cada instituição. Não edite à mão: ajuste o script e gere de novo.
// O app não guarda as provas: o aluno abre o link oficial (link_prova).
// questoes: { n, r, area } — r = letra correta, '*' = anulada (fora da conta),
// null = depende da língua estrangeira escolhida (ver variantes).
export const PROVAS = [
${provas.map(linha).join(',\n')},
]
`)
console.log(`\n${provas.length} provas gravadas em src/lib/simulados-provas.js`)
