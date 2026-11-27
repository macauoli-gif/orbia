// Confere se as questões de fábrica do banco são idênticas às do código.
//   node scripts/conferir-questoes.mjs
// Imprime a "digital" (md5) de QUESTOES_APP e o SQL que calcula a mesma digital
// no banco (rode no Supabase). As duas têm de bater; se não, algo ficou diferente.
import { createHash } from 'node:crypto'
import { QUESTOES_APP } from '../src/lib/fabrica.js'

const md5 = (s) => createHash('md5').update(s).digest('hex')
// mesmo uuid que scripts/gerar-seed.mjs dá a cada id
const uuid = (id) => { const h = md5('pauta:' + id); return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}` }
const linhas = QUESTOES_APP.map((q) => uuid(q.id) + ' ' + md5([
  uuid(q.materia_id), q.assunto, q.nivel, q.instituicao, String(q.ano), q.enunciado,
  q.alternativas.map((a) => a.letra + ':' + a.texto).join('|'), q.correta, q.resposta_comentada, q.serie_minima,
].join('#')))
console.log(`Código: ${md5(linhas.sort().join('\n'))} (${linhas.length} questões)\n`)
console.log(`SQL para o banco:
select md5(string_agg(l, E'\\n' order by l)) as digital, count(*) from (
  select q.id::text || ' ' || md5(concat_ws('#', q.materia_id::text, q.assunto, q.nivel, q.instituicao, q.ano::text, q.enunciado,
    (select string_agg((a->>'letra') || ':' || (a->>'texto'), '|' order by ord) from jsonb_array_elements(q.alternativas) with ordinality t(a, ord)),
    q.correta, q.resposta_comentada, q.serie_minima)) as l
  from public.questoes q where q.user_id is null) x;`)
