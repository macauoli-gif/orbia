// A camada de dados tem dois miolos (banco e mock) e uma porta (dados.js).
// Se uma função existir num e faltar no outro, o app quebra só quando aquela
// tela for usada com o miolo que falta. Este teste pega isso antes, lendo os
// arquivos (não precisa de internet).
import { readFileSync } from 'node:fs'

const exportados = (arq) => new Set([...readFileSync(arq, 'utf8').matchAll(/export\s+(?:const|async\s+function|function)\s+([A-Za-z]+)/g)].map((m) => m[1]))
const porta = exportados('src/lib/dados.js')
const banco = exportados('src/lib/dados-supabase.js')
const mock = exportados('src/lib/dados-mock.js')

const problemas = []
for (const n of porta) {
  if (!banco.has(n)) problemas.push(`${n}: está em dados.js mas falta em dados-supabase.js`)
  if (!mock.has(n)) problemas.push(`${n}: está em dados.js mas falta em dados-mock.js`)
}
for (const n of banco) if (!porta.has(n)) problemas.push(`${n}: está no miolo do banco mas não passa pela porta (dados.js)`)
for (const n of mock) if (!porta.has(n)) problemas.push(`${n}: está no mock mas não passa pela porta (dados.js)`)

if (problemas.length) {
  console.log('✗ miolos da camada de dados divergem:')
  for (const p of problemas) console.log('  ' + p)
  process.exit(1)
}
console.log(`✓ miolos: ${porta.size} funções iguais na porta, no banco e no mock`)
