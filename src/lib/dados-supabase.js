// ============================================================
// MIOLO DO BANCO (Supabase) da camada de dados.
// As telas não importam este arquivo: elas usam src/lib/dados.js, que
// escolhe entre este miolo e o mock (dados-mock.js). Mesmas funções,
// mesmas respostas { data, erro }.
//
// Quem decide o que cada pessoa vê é a RLS do banco (supabase/migrations).
// As conferências daqui (comStatus, validarTentativa…) só dão mensagem clara
// antes de o banco recusar; não substituem a RLS.
// ============================================================
import { supabase } from './supabase.js'
import { normalizarEmail } from './licenca.js'

const ERRO_REDE = 'Sem conexão com o servidor. Confira sua internet e tente de novo.'

// Mensagens do Supabase em inglês viram frases para quem usa o app.
function traduzir(erro) {
  const m = erro?.message || String(erro || '')
  if (/Invalid login credentials/i.test(m)) return 'Email ou senha incorretos.'
  if (/Email not confirmed/i.test(m)) return 'Confirme seu email: abra o link que enviamos e volte aqui.'
  if (/User already registered/i.test(m)) return 'Já existe uma conta com este email. Use "Entrar".'
  if (/Password should be at least/i.test(m)) return 'A senha precisa ter pelo menos 8 caracteres.'
  if (/rate limit|too many/i.test(m)) return 'Muitas tentativas seguidas. Espere alguns minutos e tente de novo.'
  if (/Failed to fetch|NetworkError|network/i.test(m)) return ERRO_REDE
  if (/row-level security|permission denied/i.test(m)) return 'Sem permissão.'
  if (/violates check constraint/i.test(m)) return 'Algum campo tem um valor que o app não aceita.'
  return m || 'Algo deu errado.'
}
async function q(promessa) {
  try {
    const { data, error } = await promessa
    if (error) return { data: null, erro: traduzir(error) }
    return { data, erro: null }
  } catch (e) {
    return { data: null, erro: traduzir(e) }
  }
}
const ok = (data) => ({ data, erro: null })
const falha = (erro) => ({ data: null, erro })

// Só as colunas da tabela vão para o banco (a tela pode carregar campos extras).
const so = (obj, colunas) => Object.fromEntries(colunas.filter((c) => c in obj).map((c) => [c, obj[c]]))

// ---------- sessão ----------
let sessao = null
const deSessao = (s) => (s?.user ? { id: s.user.id, email: s.user.email } : null)
const eu = () => sessao?.id || null

export async function sessaoAtual() {
  const { data } = await supabase.auth.getSession()
  sessao = deSessao(data.session)
  return ok(sessao)
}
// fn(sessao, evento). O evento 'PASSWORD_RECOVERY' é a pessoa voltando pelo link de "esqueci a senha".
export function ouvirSessao(fn) {
  const { data } = supabase.auth.onAuthStateChange((evento, s) => {
    sessao = deSessao(s)
    fn(sessao, evento)
  })
  return () => data.subscription.unsubscribe()
}
export const entrar = (email, senha) => q(supabase.auth.signInWithPassword({ email: normalizarEmail(email), password: senha }))
export const sair = () => q(supabase.auth.signOut())
export async function criarConta({ nome, email, senha }) {
  const r = await q(supabase.auth.signUp({
    email: normalizarEmail(email),
    password: senha,
    options: { data: { nome: nome.trim() }, emailRedirectTo: window.location.origin },
  }))
  // Com confirmação de email ligada, o Supabase NÃO dá erro para email que já
  // tem conta: devolve um usuário "de fachada" sem identidades e não manda email.
  if (!r.erro && r.data?.user && r.data.user.identities?.length === 0) {
    return falha('Já existe uma conta com este email. Use "Entrar" ou "Esqueci a senha".')
  }
  return r
}
export const esqueciSenha = (email) => q(supabase.auth.resetPasswordForEmail(normalizarEmail(email), { redirectTo: window.location.origin }))
export const trocarSenha = (nova) => q(supabase.auth.updateUser({ password: nova }))
// Só existem no mock.
export const pessoasDeExemplo = () => []
export const recomecarMock = async () => ok(null)

// ---------- entrada e perfil ----------
export async function carregarEntrada() {
  const { data: u, error } = await supabase.auth.getUser()
  if (error || !u?.user) return falha('Sessão expirada. Entre de novo.')
  const perfil = await q(supabase.from('profiles').select('*').eq('id', u.user.id).maybeSingle())
  if (perfil.erro) return perfil
  // A RLS só devolve a licença do próprio email, e só com o email confirmado
  // (a administradora vê todas, por isso o filtro pelo email dela). Ela também
  // pode ter licença de cortesia e estudar.
  const licenca = perfil.data
    ? await q(supabase.from('licencas').select('*').eq('email', normalizarEmail(u.user.email)).maybeSingle())
    : ok(null)
  if (licenca.erro) return licenca
  return ok({ perfil: perfil.data, licenca: licenca.data, emailConfirmado: !!u.user.email_confirmed_at })
}
const PERFIL_EDITAVEL = ['nome', 'serie', 'meta_questoes_semana', 'meta_foco_min_semana', 'meta_provas_mes', 'so_sugerido']
export const salvarPerfil = (mudancas) =>
  q(supabase.from('profiles').update(so(mudancas, PERFIL_EDITAVEL)).eq('id', eu()).select().single())

// ---------- genéricos ----------
// O Supabase entrega no máximo 1000 linhas por pedido. Sem paginar, a lista
// parava calada na linha 1000 (ex.: a 1001ª resposta de questão nunca aparecia
// nas metas). Aqui pede de 1000 em 1000 até acabar, na ordem pedida.
const PAGINA = 1000
// `consulta`: o nome da tabela, ou uma função que monta a consulta com filtro
// (escrita com supabase.from('tabela') visível, para o check-schema conferir).
async function listar(consulta, ordem = 'created_at') {
  const montar = typeof consulta === 'string' ? () => supabase.from(consulta).select('*') : consulta
  const todas = []
  for (let de = 0; ; de += PAGINA) {
    const r = await q(montar().order(ordem, { ascending: true }).order('id').range(de, de + PAGINA - 1))
    if (r.erro) return r
    todas.push(...r.data)
    if (r.data.length < PAGINA) return ok(todas)
  }
}
function salvar(tabela, colunas, registro) {
  const dados = so(registro, colunas)
  if (registro.id) return q(supabase.from(tabela).update(dados).eq('id', registro.id).select().single())
  return q(supabase.from(tabela).insert({ ...dados, user_id: eu() }).select().single())
}
async function apagar(tabela, id) {
  const r = await q(supabase.from(tabela).delete().eq('id', id).select('id'))
  if (r.erro) return r
  return r.data.length ? ok(null) : falha('Registro não encontrado.')
}

// ---------- conteúdo ----------
export const listarMaterias = () => listar('materias', 'ordem')

// ---------- tarefas ----------
const COL_TAREFA = ['titulo', 'materia_id', 'prazo', 'prioridade', 'status', 'observacao', 'concluida_em']
export const listarTarefas = () => listar('tarefas')
export async function salvarTarefa(t) {
  if ((t.status === 'Concluído') !== !!t.concluida_em) return falha('Situação e data de conclusão não combinam.')
  return salvar('tarefas', COL_TAREFA, t)
}
// No banco, blocos e sessões ligados à tarefa ficam sem tarefa sozinhos (on delete set null).
export const apagarTarefa = (id) => apagar('tarefas', id)

// ---------- cronograma ----------
const COL_BLOCO = ['dia_semana', 'inicio', 'fim', 'materia_id', 'titulo', 'tipo', 'tarefa_id', 'feito_em']
// O banco devolve hora como "14:00:00"; o app usa "14:00".
const hhmm = (b) => ({ ...b, inicio: b.inicio?.slice(0, 5), fim: b.fim?.slice(0, 5) })
export async function listarBlocos() {
  const r = await listar('cronograma_blocos')
  return r.erro ? r : ok(r.data.map(hhmm))
}
export async function salvarBloco(b) {
  const r = await salvar('cronograma_blocos', COL_BLOCO, b)
  return r.erro ? r : ok(hhmm(r.data))
}
export const apagarBloco = (id) => apagar('cronograma_blocos', id)
// Grava a semana nova ANTES de apagar a antiga: se algo falhar no meio, a
// pessoa fica com blocos a mais, nunca com a semana vazia.
export async function trocarSemana(blocos) {
  const antigos = await q(supabase.from('cronograma_blocos').select('id'))
  if (antigos.erro) return antigos
  const novos = await q(supabase.from('cronograma_blocos').insert(blocos.map((b) => ({ ...so(b, COL_BLOCO), user_id: eu() }))).select())
  if (novos.erro) return novos
  const ids = antigos.data.map((x) => x.id)
  if (ids.length) {
    const apagou = await q(supabase.from('cronograma_blocos').delete().in('id', ids))
    if (apagou.erro) return apagou
  }
  return ok(novos.data.map(hhmm))
}

// ---------- flashcards ----------
const COL_FLASHCARD = ['materia_id', 'frente', 'verso']
export const listarFlashcards = () => listar('flashcards')
export const salvarFlashcard = (f) => salvar('flashcards', COL_FLASHCARD, f)
export const apagarFlashcard = (id) => apagar('flashcards', id)
export const listarRespostasFlashcards = () => listar('flashcard_respostas')
export const registrarRespostaFlashcard = (flashcard_id, acertou) =>
  q(supabase.from('flashcard_respostas').insert({ user_id: eu(), flashcard_id, acertou }).select().single())

// ---------- questões ----------
const COL_QUESTAO = ['materia_id', 'assunto', 'nivel', 'instituicao', 'ano', 'enunciado', 'alternativas', 'correta', 'resposta_comentada']
export const listarQuestoes = () => listar('questoes')
export const salvarQuestao = (x) => salvar('questoes', COL_QUESTAO, x)
export const listarRespostasQuestoes = () => listar('respostas_questoes')
export const registrarRespostaQuestao = ({ questao_id, escolhida, acertou, tempo_seg }) =>
  q(supabase.from('respostas_questoes').insert({ user_id: eu(), questao_id, escolhida, acertou, tempo_seg }).select().single())

export const listarCaderno = () => listar('caderno_erros')
// Uma linha por questão (único por user_id + questao_id): atualiza se já existe.
export async function anotarNoCaderno({ questao_id, motivo, anotacao, revisar = true }) {
  const ja = await q(supabase.from('caderno_erros').select('*').eq('questao_id', questao_id).maybeSingle())
  if (ja.erro) return ja
  const linha = { user_id: eu(), questao_id, motivo: motivo ?? ja.data?.motivo ?? null, anotacao: anotacao ?? ja.data?.anotacao ?? '', revisar }
  return q(supabase.from('caderno_erros').upsert(linha, { onConflict: 'user_id,questao_id' }).select().single())
}
export const tirarDoCaderno = (id) => apagar('caderno_erros', id)

// ---------- foco ----------
const COL_SESSAO = ['materia_id', 'tarefa_id', 'inicio', 'minutos', 'saidas_aba', 'completou']
export const listarSessoesFoco = () => listar('sessoes_foco', 'inicio')
export const registrarSessaoFoco = (s) => salvar('sessoes_foco', COL_SESSAO, s)

// ---------- simulados ----------
// Tentativa terminada não se edita (o banco nem dá permissão de update).
const COL_TENTATIVA = ['prova_id', 'idioma', 'respostas', 'tempo_seg']
export const listarTentativas = () => listar('simulados_tentativas')
export const salvarTentativa = async (t) =>
  t.id ? falha('Uma tentativa terminada não pode ser mudada.') : salvar('simulados_tentativas', COL_TENTATIVA, { ...t, idioma: t.idioma || null })
export const apagarTentativa = (id) => apagar('simulados_tentativas', id)

// ---------- ExactLab: elementos favoritos ----------
// Devolve só os números atômicos. Marcar de novo o mesmo elemento não é erro.
export async function listarFavoritos() {
  const r = await listar('exactlab_favoritos')
  return r.erro ? r : ok(r.data.map((f) => f.numero_atomico))
}
export async function favoritar(z) {
  const r = await q(supabase.from('exactlab_favoritos').upsert({ user_id: eu(), numero_atomico: z }, { onConflict: 'user_id,numero_atomico', ignoreDuplicates: true }).select())
  return r.erro ? r : ok(z)
}
export async function desfavoritar(z) {
  const r = await q(supabase.from('exactlab_favoritos').delete().eq('numero_atomico', z).select('id'))
  return r.erro ? r : ok(z)
}

// ---------- administradora ----------
export async function listarLicencas() {
  const [l, contas] = await Promise.all([
    q(supabase.from('licencas').select('*').order('comprado_em', { ascending: false })),
    q(supabase.rpc('emails_com_conta')),
  ])
  if (l.erro || contas.erro) return l.erro ? l : contas
  const comConta = new Set((contas.data || []).map((x) => (typeof x === 'string' ? x : x.emails_com_conta)))
  return ok(l.data.map((x) => ({ ...x, conta_criada: comConta.has(x.email) })))
}
export async function liberarEmail({ email, nome, motivo }) {
  const e = normalizarEmail(email)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return falha('Email inválido.')
  const ja = await q(supabase.from('licencas').select('*').eq('email', e).maybeSingle())
  if (ja.erro) return ja
  if (ja.data?.status === 'Ativa') return falha('Este email já tem licença ativa.')
  if (ja.data) {
    return q(supabase.from('licencas').update({ status: 'Ativa', bloqueada_em: null, motivo: motivo || ja.data.motivo }).eq('id', ja.data.id))
  }
  return q(supabase.from('licencas').insert({ email: e, nome: nome || null, status: 'Ativa', origem: 'Manual', motivo: motivo || null }))
}
export const bloquearLicenca = (id, motivo) =>
  q(supabase.from('licencas').update({ status: 'Bloqueada', bloqueada_em: new Date().toISOString(), motivo: motivo || null }).eq('id', id).select().single())
export const desbloquearLicenca = (id) =>
  q(supabase.from('licencas').update({ status: 'Ativa', bloqueada_em: null }).eq('id', id).select().single())
export const listarAvisosComErro = () =>
  q(supabase.from('hotmart_eventos').select('*').not('erro', 'is', null).eq('processado', false).order('created_at', { ascending: false }))
