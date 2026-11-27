// Gera o SQL das cargas do banco a partir dos MESMOS dados que o app usa
// (src/lib/fabrica.js e src/lib/mockData.js), para banco e mock nunca divergirem.
//
//   node scripts/gerar-seed.mjs fabrica  > supabase/migrations/..._conteudo_de_fabrica.sql
//     (o arquivo de 25/11/2026 é histórico: ainda tem os flashcards de fábrica,
//     que a migration 20261126160000 apaga. Não gere por cima dele.)
//   node scripts/gerar-seed.mjs exemplo  (imprime o SQL das pessoas de exemplo)
//   node scripts/gerar-seed.mjs questoes q2-  > supabase/migrations/..._questoes_q2.sql
//     (só as questões de fábrica cujo id começa com o prefixo: conteúdo novo
//     depois da primeira carga, sem reescrever a migration antiga. As de 27/11/2026
//     são as reais, prefixo qr-)
//
// Os ids do mock ('m-matematica', 't-m1') viram uuids fixos (md5 do id): rodar
// de novo dá os mesmos ids, e "on conflict do nothing" deixa repetir sem duplicar.
// A senha das contas de teste vem do .env.local (SENHA_CONTAS_TESTE), que não vai
// para o git: o SQL de exemplo não é salvo em arquivo por isso.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { MATERIAS, QUESTOES_APP } from '../src/lib/fabrica.js'
import { criarMock } from '../src/lib/mockData.js'

const uuid = (id) => {
  const h = createHash('md5').update('pauta:' + id).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`
}
const q = (v) => (v == null ? 'null' : typeof v === 'number' || typeof v === 'boolean' ? String(v) : `'${String(v).replace(/'/g, "''")}'`)
const j = (v) => `${q(JSON.stringify(v))}::jsonb`
const id = (v) => (v == null ? 'null' : q(uuid(v)))
const linhas = (tabela, colunas, regs) => regs.length
  ? `insert into public.${tabela} (${colunas.join(', ')}) values\n${regs.map((r) => '  (' + r.join(', ') + ')').join(',\n')}\non conflict do nothing;\n`
  : ''

function fabrica() {
  return `-- ============================================================
-- Pauta de Estudos — conteúdo de fábrica (igual para todos os alunos).
-- GERADO por scripts/gerar-seed.mjs a partir de src/lib/fabrica.js
-- (que veio de referencia/pauta-de-estudos-v1.html). Não edite à mão:
-- mude fabrica.js e gere de novo. (As questões de fábrica atuais entram pela
-- migration de questões reais, 27/11/2026; esta é só a carga inicial.)
-- ============================================================

${linhas('materias', ['id', 'nome', 'cor', 'ordem'], MATERIAS.map((m) => [id(m.id), q(m.nome), q(m.cor), q(m.ordem)]))}
${linhas('questoes', ['id', 'user_id', 'materia_id', 'assunto', 'nivel', 'instituicao', 'ano', 'enunciado', 'alternativas', 'correta', 'resposta_comentada', 'serie_minima'],
    QUESTOES_APP.map((x) => [id(x.id), 'null', id(x.materia_id), q(x.assunto), q(x.nivel), q(x.instituicao), q(x.ano), q(x.enunciado), j(x.alternativas), q(x.correta), q(x.resposta_comentada), q(x.serie_minima)]))}`
}

function questoesNovas(prefixo) {
  if (!prefixo) throw new Error("Diga o prefixo dos ids, ex.: q2-")
  const novas = QUESTOES_APP.filter((x) => x.id.startsWith(prefixo))
  return `-- ============================================================
-- Pauta de Estudos — questões de fábrica novas (ids ${prefixo}*).
-- GERADO por scripts/gerar-seed.mjs questoes ${prefixo} a partir de src/lib/fabrica.js.
-- Não edite à mão. De onde vêm as questões: comentário acima de QUESTOES_APP em fabrica.js.
-- ============================================================

${linhas("questoes", ["id", "user_id", "materia_id", "assunto", "nivel", "instituicao", "ano", "enunciado", "alternativas", "correta", "resposta_comentada", "serie_minima"],
    novas.map((x) => [id(x.id), "null", id(x.materia_id), q(x.assunto), q(x.nivel), q(x.instituicao), q(x.ano), q(x.enunciado), j(x.alternativas), q(x.correta), q(x.resposta_comentada), q(x.serie_minima)]))}`
}

function exemplo() {
  const env = readFileSync('.env.local', 'utf8')
  const senha = env.match(/^SENHA_CONTAS_TESTE=(.+)$/m)?.[1]?.trim()
  if (!senha) throw new Error('Falta SENHA_CONTAS_TESTE no .env.local')
  const db = criarMock()
  const doMock = (u) => db.profiles.find((p) => p.id === u.id)

  const contas = db.usuarios.map((u) => {
    const p = doMock(u)
    return `insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change)
values ('00000000-0000-0000-0000-000000000000', ${id(u.id)}, 'authenticated', 'authenticated', ${q(u.email)},
  extensions.crypt(${q(senha)}, extensions.gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}',
  ${j({ nome: p.nome })}, now(), now(), '', '', '', '')
on conflict (id) do nothing;
insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values (${id(u.id)}, ${id(u.id)}, ${q(uuid(u.id))}, ${j({ sub: uuid(u.id), email: u.email, email_verified: true })}, 'email', now(), now(), now())
on conflict do nothing;
update public.profiles set role = ${q(p.role)}, serie = ${q(p.serie)}, meta_questoes_semana = ${p.meta_questoes_semana},
  meta_foco_min_semana = ${p.meta_foco_min_semana}, meta_provas_mes = ${p.meta_provas_mes} where id = ${id(u.id)};`
  }).join('\n')

  return `-- Pessoas de exemplo (DEMO). Gerado por scripts/gerar-seed.mjs exemplo.
${contas}

${linhas('licencas', ['id', 'email', 'nome', 'status', 'origem', 'hotmart_transacao', 'comprado_em', 'bloqueada_em', 'motivo'],
    db.licencas.map((l) => [id(l.id), q(l.email), q(l.nome), q(l.status), q(l.origem), q(l.hotmart_transacao), q(l.comprado_em), q(l.bloqueada_em), q(l.motivo)]))}
${linhas('hotmart_eventos', ['id', 'evento', 'transacao', 'email', 'payload', 'processado', 'erro', 'created_at'],
    db.hotmart_eventos.map((e) => [id(e.id), q(e.evento), q(e.transacao), q(e.email), j(e.payload), q(e.processado), q(e.erro), q(e.created_at)]))}
${linhas('flashcards', ['id', 'user_id', 'materia_id', 'frente', 'verso', 'serie_minima'],
    db.flashcards.filter((f) => f.user_id).map((f) => [id(f.id), id(f.user_id), id(f.materia_id), q(f.frente), q(f.verso), 'null']))}
${linhas('questoes', ['id', 'user_id', 'materia_id', 'assunto', 'nivel', 'instituicao', 'ano', 'enunciado', 'alternativas', 'correta', 'resposta_comentada'],
    db.questoes.filter((x) => x.user_id).map((x) => [id(x.id), id(x.user_id), id(x.materia_id), q(x.assunto), q(x.nivel), q(x.instituicao), q(x.ano), q(x.enunciado), j(x.alternativas), q(x.correta), q(x.resposta_comentada)]))}
${linhas('tarefas', ['id', 'user_id', 'titulo', 'materia_id', 'prazo', 'prioridade', 'status', 'observacao', 'concluida_em', 'created_at'],
    db.tarefas.map((t) => [id(t.id), id(t.user_id), q(t.titulo), id(t.materia_id), q(t.prazo), q(t.prioridade), q(t.status), q(t.observacao || null), q(t.concluida_em), q(t.created_at)]))}
${linhas('cronograma_blocos', ['id', 'user_id', 'dia_semana', 'inicio', 'fim', 'materia_id', 'titulo', 'tipo', 'tarefa_id'],
    db.cronograma_blocos.map((b) => [id(b.id), id(b.user_id), b.dia_semana, q(b.inicio), q(b.fim), id(b.materia_id), q(b.titulo), q(b.tipo), id(b.tarefa_id)]))}
${linhas('respostas_questoes', ['id', 'user_id', 'questao_id', 'escolhida', 'acertou', 'tempo_seg', 'created_at'],
    db.respostas_questoes.map((r) => [id(r.id), id(r.user_id), id(r.questao_id), q(r.escolhida), q(r.acertou), q(r.tempo_seg), q(r.created_at)]))}
${linhas('caderno_erros', ['id', 'user_id', 'questao_id', 'motivo', 'anotacao', 'revisar', 'created_at'],
    db.caderno_erros.map((c) => [id(c.id), id(c.user_id), id(c.questao_id), q(c.motivo), q(c.anotacao), q(c.revisar), q(c.created_at)]))}
${linhas('flashcard_respostas', ['id', 'user_id', 'flashcard_id', 'acertou', 'created_at'],
    db.flashcard_respostas.map((r) => [id(r.id), id(r.user_id), id(r.flashcard_id), q(r.acertou), q(r.created_at)]))}
${linhas('sessoes_foco', ['id', 'user_id', 'materia_id', 'tarefa_id', 'inicio', 'minutos', 'saidas_aba', 'completou', 'created_at'],
    db.sessoes_foco.map((s) => [id(s.id), id(s.user_id), id(s.materia_id), id(s.tarefa_id), q(s.inicio), s.minutos, s.saidas_aba, q(s.completou), q(s.created_at)]))}`
}

const qual = process.argv[2]
if (qual === 'fabrica') process.stdout.write(fabrica())
else if (qual === 'exemplo') process.stdout.write(exemplo())
else if (qual === 'questoes') process.stdout.write(questoesNovas(process.argv[3]))
else { console.error('Use: node scripts/gerar-seed.mjs fabrica|exemplo|questoes <prefixo>'); process.exit(1) }
