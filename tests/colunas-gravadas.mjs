// O check-schema confere as colunas de busca e filtro, mas NÃO as que o app
// grava (insert/update). Coluna gravada com nome errado faz o salvamento
// falhar. Este teste lê as listas COL_... de src/lib/dados-supabase.js,
// descobre a tabela de cada uma pelo salvar('tabela', COL_...) e confere
// contra o retrato do banco (tests/_schema-snapshot.json).
// Depois de QUALQUER migration, regenere o retrato (ver AGENTS.md).
import { readFileSync } from 'node:fs'

const codigo = readFileSync('src/lib/dados-supabase.js', 'utf8')
const banco = JSON.parse(readFileSync('tests/_schema-snapshot.json', 'utf8'))

const listas = Object.fromEntries([...codigo.matchAll(/const (COL_[A-Z_]+) = \[([^\]]*)\]/g)]
  .map((m) => [m[1], [...m[2].matchAll(/'([a-z_]+)'/g)].map((x) => x[1])]))
const usos = [...codigo.matchAll(/\('([a-z_]+)', (COL_[A-Z_]+)/g)].map((m) => ({ tabela: m[1], lista: m[2] }))
// Listas usadas sem salvar(...) explícito (montam o insert à mão).
usos.push({ tabela: 'cronograma_blocos', lista: 'COL_BLOCO' })

const problemas = []
for (const { tabela, lista } of usos) {
  if (!banco[tabela]) { problemas.push(`tabela ${tabela} não existe no retrato do banco`); continue }
  if (!listas[lista]) { problemas.push(`lista ${lista} não encontrada no código`); continue }
  for (const col of listas[lista]) if (!banco[tabela].includes(col)) problemas.push(`${tabela}.${col} (${lista}) não existe no banco`)
}
const PERFIL = codigo.match(/const PERFIL_EDITAVEL = \[([^\]]*)\]/)
if (PERFIL) for (const col of [...PERFIL[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1])) {
  if (!banco.profiles.includes(col)) problemas.push(`profiles.${col} (PERFIL_EDITAVEL) não existe no banco`)
}

if (problemas.length) {
  console.log('✗ colunas gravadas que o banco não tem:')
  for (const p of problemas) console.log('  ' + p)
  process.exit(1)
}
console.log(`✓ colunas gravadas: ${usos.length} listas conferidas contra o banco`)
