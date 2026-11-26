// Gera src/lib/exactlab/elementos-dados.js com os números OFICIAIS dos 118
// elementos, tirados da tabela periódica do PubChem (NIH, EUA):
//   https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON
//
//   node scripts/gerar-elementos.mjs [arquivo.json]
//
// Sem arquivo, baixa do PubChem. Os textos em português (origem do nome,
// aplicações...) não vêm daqui: estão em src/lib/exactlab/textos-elementos-*.js.
import { readFileSync, writeFileSync } from 'node:fs'

const URL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON'
const bruto = process.argv[2]
  ? JSON.parse(readFileSync(process.argv[2], 'utf8'))
  : await (await fetch(URL, { headers: { 'User-Agent': 'Mozilla/5.0' } })).json()

const col = bruto.Table.Columns.Column
const linhas = bruto.Table.Row.map((r) => Object.fromEntries(col.map((c, i) => [c, r.Cell[i]])))
if (linhas.length !== 118) throw new Error(`esperava 118 elementos, vieram ${linhas.length}`)

// Número de massa do isótopo mais abundante na natureza (elementos com isótopo
// estável ou de vida muito longa). Para os demais, o app usa o isótopo de vida
// mais longa, cuja massa o PubChem informa. Arredondar a massa atômica média
// erraria (ex.: bromo daria 80, isótopo que não existe; cobre daria 64).
const MAIS_ABUNDANTE = {
  1: 1, 2: 4, 3: 7, 4: 9, 5: 11, 6: 12, 7: 14, 8: 16, 9: 19, 10: 20, 11: 23, 12: 24, 13: 27, 14: 28, 15: 31, 16: 32, 17: 35, 18: 40,
  19: 39, 20: 40, 21: 45, 22: 48, 23: 51, 24: 52, 25: 55, 26: 56, 27: 59, 28: 58, 29: 63, 30: 64, 31: 69, 32: 74, 33: 75, 34: 80, 35: 79, 36: 84,
  37: 85, 38: 88, 39: 89, 40: 90, 41: 93, 42: 98, 44: 102, 45: 103, 46: 106, 47: 107, 48: 114, 49: 115, 50: 120, 51: 121, 52: 130, 53: 127, 54: 132,
  55: 133, 56: 138, 57: 139, 58: 140, 59: 141, 60: 142, 62: 152, 63: 153, 64: 158, 65: 159, 66: 164, 67: 165, 68: 166, 69: 169, 70: 174, 71: 175,
  72: 180, 73: 181, 74: 184, 75: 187, 76: 192, 77: 193, 78: 195, 79: 197, 80: 202, 81: 205, 82: 208, 83: 209, 90: 232, 91: 231, 92: 238,
}

const num = (v) => (v === '' || v == null ? null : Number(v))
const dados = linhas.map((l) => {
  const Z = Number(l.AtomicNumber)
  const prevista = /\((predicted|calculated)\)/.test(l.ElectronConfiguration)
  return {
    z: Z,
    simbolo: l.Symbol,
    massa: num(l.AtomicWeight),
    config: l.ElectronConfiguration.replace(/\s*\((predicted|calculated)\)/, '').trim(),
    configPrevista: prevista,
    eletronegatividade: num(l.Electronegativity),
    raio: num(l.AtomicRadius), // raio de van der Waals, em pm (PubChem)
    ionizacao: num(l.IonizationEnergy), // 1ª energia de ionização, em eV
    estadoPubchem: l.StandardState,
    grupoBloco: l.GroupBlock,
    ano: l.YearDiscovered,
    fusao: num(l.MeltingPoint), // K
    ebulicao: num(l.BoilingPoint), // K
    densidade: num(l.Density), // g/cm³ (gases: g/L no PubChem? ver nota na ficha)
    A: MAIS_ABUNDANTE[Z] ?? Math.round(num(l.AtomicWeight)),
    isotopoNatural: Z in MAIS_ABUNDANTE,
  }
})

writeFileSync('src/lib/exactlab/elementos-dados.js', `// GERADO por scripts/gerar-elementos.mjs a partir da tabela periódica do PubChem
// (NIH, EUA). Não edite à mão: rode o script de novo.
// raio: van der Waals (pm) · ionizacao: 1ª energia de ionização (eV) · fusao/ebulicao: K
// A: número de massa do isótopo mais abundante (isotopoNatural) ou do de vida mais longa.
export const ELEMENTOS_DADOS = [
${dados.map((d) => '  ' + JSON.stringify(d)).join(',\n')},
]
`)
console.log(`${dados.length} elementos gravados em src/lib/exactlab/elementos-dados.js`)
