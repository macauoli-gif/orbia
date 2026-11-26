// ============================================================
// MIOLO DE MENTIRA (mock) da camada de dados — ver dados.js.
// Em memória e guardado no navegador. Aplica as MESMAS regras que a RLS
// aplica no banco: cada aluno só vê o que é dele, a administradora não vê
// estudo nenhum, e sem licença ativa nada volta. Os testes (tests/) rodam
// com este miolo; o app, com o do banco (dados-supabase.js).
// O user_id é injetado aqui. As telas nunca passam o dono do registro.
// ============================================================
import { criarMock } from './mockData.js'
import { LETRAS } from './questoes.js'
import { IDIOMAS, TEMPO_MAXIMO_SEG } from './simulados.js'
import { licencaAtiva, normalizarEmail } from './licenca.js'
import { RESUMO_DIGITADO, RESUMO_PDF, camposEditaveis, validarPdf, validarResumo } from './resumos.js'

// v2: resumos só do aluno, com PDF e anotações (25/11/2026). Trocar a chave
// descarta os dados de exemplo antigos guardados no navegador.
const CHAVE = 'pauta-mock-v2'
const CHAVE_SESSAO = 'pauta-mock-sessao'

// PDFs do mock: no IndexedDB do navegador, que aguenta arquivos grandes
// (o localStorage não). No banco, isto é o bucket "resumos" do Storage.
const arquivosLocais = {
  conexao: null,
  abrir() {
    if (this.conexao) return this.conexao
    this.conexao = new Promise((ok_, erro) => {
      const req = indexedDB.open('pauta-mock-arquivos', 1)
      req.onupgradeneeded = () => req.result.createObjectStore('arquivos')
      req.onsuccess = () => ok_(req.result)
      req.onerror = () => { arquivosLocais.conexao = null; erro(req.error) }
    })
    return this.conexao
  },
  async operar(modo, fn) {
    const base = await this.abrir()
    return new Promise((ok_, erro) => {
      const tx = base.transaction('arquivos', modo)
      const req = fn(tx.objectStore('arquivos'))
      tx.oncomplete = () => ok_(req.result)
      tx.onerror = () => erro(tx.error)
    })
  },
  guardar: (caminho, blob) => arquivosLocais.operar('readwrite', (s) => s.put(blob, caminho)),
  ler: (caminho) => arquivosLocais.operar('readonly', (s) => s.get(caminho)),
  apagar: (caminho) => arquivosLocais.operar('readwrite', (s) => s.delete(caminho)),
  limpar: () => arquivosLocais.operar('readwrite', (s) => s.clear()),
}

let db = carregar()
let sessao = lerSessao()
const ouvintes = new Set()

// O conteúdo de fábrica (user_id vazio) vem sempre do código, não do que ficou
// salvo no navegador: senão questão nova de fábrica nunca aparece no mock.
function comFabricaAtual(salvo) {
  const novo = criarMock()
  for (const t of ['materias', 'questoes', 'flashcards']) {
    const fabrica = t === 'materias' ? novo[t] : novo[t].filter((r) => r.user_id == null)
    const doAluno = t === 'materias' ? [] : (salvo[t] || []).filter((r) => r.user_id != null)
    salvo[t] = [...fabrica, ...doAluno]
  }
  for (const t of Object.keys(novo)) if (!salvo[t]) salvo[t] = novo[t] // tabela nova
  return salvo
}

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo) return comFabricaAtual(JSON.parse(salvo))
  } catch (_) { /* navegador sem armazenamento: começa do zero */ }
  return criarMock()
}
// Devolve false se o navegador recusou (armazenamento cheio ou bloqueado):
// quem salva avisa a pessoa, em vez de mostrar "Salvo" sem ter salvo.
function gravar() {
  if (typeof localStorage === 'undefined') return true // sem navegador (testes): só memória
  try { localStorage.setItem(CHAVE, JSON.stringify(db)); return true } catch (_) { return false }
}
// Quem falha ao gravar desfaz a mudança na memória: o que a pessoa vê é o que ficou guardado.
const NAO_COUBE = 'O armazenamento deste navegador está cheio e a mudança não foi salva. Libere espaço e tente de novo.'
function lerSessao() {
  try { return JSON.parse(localStorage.getItem(CHAVE_SESSAO)) || null } catch (_) { return null }
}
function gravarSessao(s) {
  sessao = s
  try { s ? localStorage.setItem(CHAVE_SESSAO, JSON.stringify(s)) : localStorage.removeItem(CHAVE_SESSAO) } catch (_) { /* idem */ }
  ouvintes.forEach((fn) => fn(s))
}

const ok = (data) => Promise.resolve({ data: structuredClone(data), erro: null })
const falha = (erro) => Promise.resolve({ data: null, erro })
const novoId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()))
const agoraISO = () => new Date().toISOString()

// ---------- quem está logado (o equivalente das regras de RLS) ----------
function eu() {
  if (!sessao) return null
  const usuario = db.usuarios.find((u) => u.id === sessao.id)
  const perfil = db.profiles.find((p) => p.id === sessao.id)
  if (!usuario || !perfil) return null
  const licenca = db.licencas.find((l) => normalizarEmail(l.email) === normalizarEmail(perfil.email)) || null
  return { usuario, perfil, licenca, licenciado: licencaAtiva(licenca, usuario.confirmado) }
}
const ehAdmin = () => eu()?.perfil.role === 'admin'

// Tabela só do aluno: dono e licença ativa. Sem licença: nada. A administradora
// só vê os dela, e só se tiver licença de cortesia (igual à RLS).
function doAluno(tabela) {
  const e = eu()
  if (!e?.licenciado) return []
  return db[tabela].filter((r) => r.user_id === e.usuario.id)
}
// Conteúdo de fábrica (user_id vazio) + o do próprio aluno.
function fabricaEMeus(tabela) {
  const e = eu()
  if (!e) return []
  if (!e.licenciado) return ehAdmin() ? db[tabela].filter((r) => r.user_id == null) : []
  return db[tabela].filter((r) => r.user_id == null || r.user_id === e.usuario.id)
}
// O aluno só responde, lê ou anota o que ele pode ver.
const podeVer = (tabela, id) => fabricaEMeus(tabela).some((r) => r.id === id)

function salvarDoAluno(tabela, registro) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  const lista = db[tabela]
  if (registro.id) {
    const i = lista.findIndex((r) => r.id === registro.id && r.user_id === e.usuario.id)
    if (i < 0) return falha('Registro não encontrado.')
    const antes = lista[i]
    lista[i] = { ...antes, ...registro, user_id: e.usuario.id }
    if (gravar()) return ok(lista[i])
    lista[i] = antes // não coube: desfaz, para a memória não divergir do que foi guardado
    return falha(NAO_COUBE)
  }
  const novo = { ...registro, id: novoId(), user_id: e.usuario.id, created_at: agoraISO() }
  lista.push(novo)
  if (gravar()) return ok(novo)
  lista.pop() // não coube: tirar de novo evita registro duplicado ao tentar outra vez
  return falha(NAO_COUBE)
}
function apagarDoAluno(tabela, id) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  const antes = db[tabela].length
  db[tabela] = db[tabela].filter((r) => !(r.id === id && r.user_id === e.usuario.id))
  if (db[tabela].length === antes) return falha('Registro não encontrado.')
  gravar()
  return ok(null)
}

// ================= Login =================
export function sessaoAtual() {
  return ok(sessao)
}
export function ouvirSessao(fn) {
  ouvintes.add(fn)
  return () => ouvintes.delete(fn)
}
export function entrar(email, senha) {
  const u = db.usuarios.find((x) => x.email === normalizarEmail(email))
  if (!u || !senha) return falha('Email ou senha incorretos.')
  gravarSessao({ id: u.id, email: u.email })
  return ok({ id: u.id })
}
export function sair() {
  gravarSessao(null)
  return ok(null)
}
export function criarConta({ nome, email, senha }) {
  const e = normalizarEmail(email)
  if (!senha || senha.length < 8) return falha('A senha precisa ter pelo menos 8 caracteres.')
  if (db.usuarios.some((u) => u.email === e)) return falha('Já existe uma conta com este email. Use "Entrar".')
  const id = novoId()
  // No mock a conta nasce confirmada; no Supabase, só depois do link do email.
  db.usuarios.push({ id, email: e, confirmado: true })
  // O equivalente do gatilho do banco: perfil sempre como aluno.
  db.profiles.push({ id, nome: nome.trim(), email: e, role: 'aluno', serie: null, meta_questoes_semana: 0, meta_foco_min_semana: 0, meta_provas_mes: 0, so_sugerido: true, created_at: agoraISO() })
  gravar()
  return ok({ id })
}
export function esqueciSenha(_email) {
  return ok(null)
}
export function trocarSenha(nova) {
  if (!nova || nova.length < 8) return falha('A senha precisa ter pelo menos 8 caracteres.')
  return ok(null)
}
// Só para o mock: as pessoas de exemplo da tela de entrada (vazio quando o banco estiver ligado).
export function pessoasDeExemplo() {
  return db.profiles.map((p) => {
    const l = db.licencas.find((x) => normalizarEmail(x.email) === normalizarEmail(p.email))
    const situacao = p.role === 'admin' ? '' : !l ? ' (sem licença)' : l.status !== 'Ativa' ? ' (bloqueada)' : p.serie ? ` (${p.serie})` : ''
    return { email: p.email, rotulo: p.nome + situacao }
  })
}
// Só para o mock: apaga as mudanças e volta aos dados de exemplo.
export function recomecarMock() {
  if (typeof indexedDB !== 'undefined') arquivosLocais.limpar().catch(() => {})
  db = criarMock()
  gravar()
  gravarSessao(null)
  return ok(null)
}

// ================= Entrada e perfil =================
export function carregarEntrada() {
  const e = eu()
  if (!e) return falha('Sessão expirada. Entre de novo.')
  return ok({ perfil: e.perfil, licenca: e.licenca, emailConfirmado: e.usuario.confirmado })
}
// Só o que o aluno pode mudar: nunca role nem email.
export function salvarPerfil(mudancas) {
  const e = eu()
  if (!e) return falha('Sem permissão.')
  const permitidos = ['nome', 'serie', 'meta_questoes_semana', 'meta_foco_min_semana', 'meta_provas_mes', 'so_sugerido']
  const p = db.profiles.find((x) => x.id === e.usuario.id)
  for (const k of permitidos) if (k in mudancas) p[k] = mudancas[k]
  gravar()
  return ok(p)
}

// ================= Conteúdo =================
export function listarMaterias() {
  const e = eu()
  if (!e || (e.perfil.role === 'aluno' && !e.licenciado)) return ok([])
  return ok([...db.materias].sort((a, b) => a.ordem - b.ordem))
}

// ================= Tarefas =================
export const listarTarefas = () => ok(doAluno('tarefas'))
export function salvarTarefa(t) {
  // O mesmo CHECK que o banco vai ter: Concluído exige a data, os outros a recusam.
  if ((t.status === 'Concluído') !== !!t.concluida_em) return falha('Situação e data de conclusão não combinam.')
  return salvarDoAluno('tarefas', t)
}
export async function apagarTarefa(id) {
  const r = await apagarDoAluno('tarefas', id)
  if (r.erro) return r
  // No banco: on delete set null. Só nas linhas do próprio aluno.
  const dono = eu().usuario.id
  for (const tab of ['cronograma_blocos', 'sessoes_foco']) {
    db[tab].forEach((x) => { if (x.user_id === dono && x.tarefa_id === id) x.tarefa_id = null })
  }
  gravar()
  return r
}

// ================= Cronograma =================
export const listarBlocos = () => ok(doAluno('cronograma_blocos'))
export const salvarBloco = (b) => salvarDoAluno('cronograma_blocos', b)
export const apagarBloco = (id) => apagarDoAluno('cronograma_blocos', id)
export function trocarSemana(blocos) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  db.cronograma_blocos = db.cronograma_blocos.filter((b) => b.user_id !== e.usuario.id)
  for (const b of blocos) db.cronograma_blocos.push({ ...b, id: novoId(), user_id: e.usuario.id, created_at: agoraISO() })
  gravar()
  return ok(doAluno('cronograma_blocos'))
}

// ================= Resumos =================
// Só do aluno: não há resumos do app (decidido em 25/11/2026).
const meuResumo = (id) => doAluno('resumos').find((r) => r.id === id) || null

export const listarResumos = () => ok(doAluno('resumos'))
const primeiroErro = (erros) => Object.values(erros)[0] || null
const materiaExiste = (id) => db.materias.some((m) => m.id === id)

// Criar resumo digitado, ou editar qualquer resumo. O PDF entra por enviarResumoPdf.
export function salvarResumo(r) {
  if (!r.id) {
    if (r.tipo && r.tipo !== RESUMO_DIGITADO) return falha('Use "Enviar PDF" para resumo em PDF.')
    const novo = { titulo: r.titulo?.trim(), materia_id: r.materia_id, texto: r.texto, tipo: RESUMO_DIGITADO, arquivo_path: null, arquivo_nome: null, paginas: null }
    const erro = primeiroErro(validarResumo(novo)) || (materiaExiste(novo.materia_id) ? null : 'Matéria inválida.')
    return erro ? falha(erro) : salvarDoAluno('resumos', novo)
  }
  const atual = meuResumo(r.id)
  if (!atual) return falha('Resumo não encontrado.')
  // Só título, matéria e (no digitado) o texto mudam; tipo, arquivo e páginas, nunca.
  const mudancas = Object.fromEntries(camposEditaveis(atual.tipo).filter((k) => k in r).map((k) => [k, k === 'titulo' ? r.titulo?.trim() : r[k]]))
  const erro = primeiroErro(validarResumo({ ...atual, ...mudancas })) || (materiaExiste(mudancas.materia_id ?? atual.materia_id) ? null : 'Matéria inválida.')
  return erro ? falha(erro) : salvarDoAluno('resumos', { id: r.id, ...mudancas })
}
// O mesmo que o bucket do Storage vai exigir: só PDF, até 20 MB, do próprio aluno.
export async function enviarResumoPdf({ arquivo, titulo, materia_id, paginas }) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  if (!arquivo) return falha('Escolha um arquivo.')
  const inicio = new Uint8Array(await arquivo.slice(0, 4).arrayBuffer())
  const problemaArquivo = validarPdf({ nome: arquivo.name, tamanho: arquivo.size, tipo: arquivo.type }, inicio)
  if (problemaArquivo) return falha(problemaArquivo)
  const id = novoId()
  const caminho = `${e.usuario.id}/${id}.pdf` // o mesmo caminho do bucket no Storage
  const novo = { id, user_id: e.usuario.id, tipo: RESUMO_PDF, materia_id, titulo: titulo?.trim(), texto: null, arquivo_path: caminho, arquivo_nome: arquivo.name || null, paginas, created_at: agoraISO() }
  const erro = primeiroErro(validarResumo(novo)) || (materiaExiste(materia_id) ? null : 'Matéria inválida.')
  if (erro) return falha(erro)
  try { await arquivosLocais.guardar(caminho, arquivo) } catch (_) { return falha('Não conseguimos guardar o PDF neste navegador.') }
  db.resumos.push(novo)
  if (!gravar()) { db.resumos.pop(); arquivosLocais.apagar(caminho).catch(() => {}); return falha(NAO_COUBE) }
  return ok(novo)
}
// Devolve os bytes do PDF do próprio aluno.
export async function lerPdfDoResumo(resumoId) {
  const r = meuResumo(resumoId)
  if (!r || r.tipo !== RESUMO_PDF) return falha('Resumo não encontrado.')
  try {
    if (r.arquivo_path.startsWith('exemplo:')) {
      const resp = await fetch(r.arquivo_path.slice('exemplo:'.length))
      if (!resp.ok) throw new Error(String(resp.status))
      return { data: new Uint8Array(await resp.arrayBuffer()), erro: null }
    }
    const blob = await arquivosLocais.ler(r.arquivo_path)
    if (!blob) return falha('O arquivo deste resumo não está neste navegador.')
    return { data: new Uint8Array(await blob.arrayBuffer()), erro: null }
  } catch (_) {
    return falha('Não conseguimos abrir o arquivo.')
  }
}
// Apagar o resumo apaga as anotações, a marca de lido e o arquivo.
export async function apagarResumo(id) {
  const r = meuResumo(id)
  const res = await apagarDoAluno('resumos', id)
  if (res.erro) return res
  const dono = eu().usuario.id
  db.resumo_anotacoes = db.resumo_anotacoes.filter((a) => !(a.user_id === dono && a.resumo_id === id))
  db.resumos_lidos = db.resumos_lidos.filter((a) => !(a.user_id === dono && a.resumo_id === id))
  gravar()
  if (r?.arquivo_path && !r.arquivo_path.startsWith('exemplo:')) arquivosLocais.apagar(r.arquivo_path).catch(() => {})
  return res
}

export function listarAnotacoes(resumoId) {
  if (!meuResumo(resumoId)) return ok([])
  return ok(doAluno('resumo_anotacoes').filter((a) => a.resumo_id === resumoId))
}
// Uma linha por página (único por resumo_id + pagina): atualiza se já existe.
export function salvarAnotacao(resumoId, pagina, { tracos, textos }) {
  const r = meuResumo(resumoId)
  if (!r || r.tipo !== RESUMO_PDF) return falha('Resumo não encontrado.')
  if (!(pagina >= 1 && pagina <= (r.paginas || Infinity))) return falha('Página inválida.')
  const ja = doAluno('resumo_anotacoes').find((a) => a.resumo_id === resumoId && a.pagina === pagina)
  return salvarDoAluno('resumo_anotacoes', { ...(ja ? { id: ja.id } : {}), resumo_id: resumoId, pagina, tracos, textos, atualizado_em: agoraISO() })
}

export const listarResumosLidos = () => ok(doAluno('resumos_lidos'))
export function marcarResumoLido(resumoId, lido) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  if (!meuResumo(resumoId)) return falha('Resumo não encontrado.')
  const ja = db.resumos_lidos.find((r) => r.user_id === e.usuario.id && r.resumo_id === resumoId)
  if (lido && !ja) return salvarDoAluno('resumos_lidos', { resumo_id: resumoId })
  if (!lido && ja) return apagarDoAluno('resumos_lidos', ja.id)
  return ok(null)
}

// ================= Flashcards =================
export const listarFlashcards = () => ok(fabricaEMeus('flashcards'))
export const salvarFlashcard = (f) => salvarDoAluno('flashcards', f)
export const apagarFlashcard = (id) => apagarDoAluno('flashcards', id)
export const listarRespostasFlashcards = () => ok(doAluno('flashcard_respostas'))
export const registrarRespostaFlashcard = (flashcard_id, acertou) =>
  podeVer('flashcards', flashcard_id) ? salvarDoAluno('flashcard_respostas', { flashcard_id, acertou }) : falha('Flashcard não encontrado.')

// ================= Questões =================
export const listarQuestoes = () => ok(fabricaEMeus('questoes'))
export const salvarQuestao = (q) => salvarDoAluno('questoes', q)
export const listarRespostasQuestoes = () => ok(doAluno('respostas_questoes'))
export const registrarRespostaQuestao = ({ questao_id, escolhida, acertou, tempo_seg }) =>
  podeVer('questoes', questao_id) ? salvarDoAluno('respostas_questoes', { questao_id, escolhida, acertou, tempo_seg }) : falha('Questão não encontrada.')

export const listarCaderno = () => ok(doAluno('caderno_erros'))
// Uma linha por questão (único por user_id + questao_id): atualiza se já existe.
export function anotarNoCaderno({ questao_id, motivo, anotacao, revisar = true }) {
  const e = eu()
  if (!e?.licenciado) return falha('Sem permissão.')
  if (!podeVer('questoes', questao_id)) return falha('Questão não encontrada.')
  const ja = db.caderno_erros.find((c) => c.user_id === e.usuario.id && c.questao_id === questao_id)
  return salvarDoAluno('caderno_erros', { ...(ja || {}), questao_id, motivo: motivo ?? ja?.motivo ?? null, anotacao: anotacao ?? ja?.anotacao ?? '', revisar })
}
export const tirarDoCaderno = (id) => apagarDoAluno('caderno_erros', id)

// ================= Foco =================
export const listarSessoesFoco = () => ok(doAluno('sessoes_foco'))
export const registrarSessaoFoco = (s) => salvarDoAluno('sessoes_foco', s)

// ================= Simulados =================
// Imita o banco: sem edição, e o CHECK que aceita só letras de A a E.
export const listarTentativas = () => ok(doAluno('simulados_tentativas'))
export function salvarTentativa(t) {
  if (t.id) return falha('Uma tentativa terminada não pode ser mudada.')
  if (!/^[a-z0-9-]{3,40}$/.test(t.prova_id || '')) return falha('Prova inválida.')
  if (Object.values(t.respostas || {}).some((r) => !LETRAS.includes(r))) return falha('Resposta inválida.')
  if (t.idioma && !IDIOMAS.includes(t.idioma)) return falha('Língua inválida.')
  if (!(t.tempo_seg >= 0 && t.tempo_seg <= TEMPO_MAXIMO_SEG)) return falha('Tempo inválido.')
  return salvarDoAluno('simulados_tentativas', { prova_id: t.prova_id, idioma: t.idioma || null, respostas: t.respostas || {}, tempo_seg: t.tempo_seg })
}
export const apagarTentativa = (id) => apagarDoAluno('simulados_tentativas', id)

// ================= ExactLab: favoritos =================
// Imita o banco: número atômico de 1 a 118 e um favorito por elemento.
export const listarFavoritos = () => ok(doAluno('exactlab_favoritos').map((f) => f.numero_atomico))
export function favoritar(z) {
  if (!(Number.isInteger(z) && z >= 1 && z <= 118)) return falha('Elemento inválido.')
  if (doAluno('exactlab_favoritos').some((f) => f.numero_atomico === z)) return ok(z)
  const r = salvarDoAluno('exactlab_favoritos', { numero_atomico: z })
  return r.erro ? r : ok(z)
}
export function desfavoritar(z) {
  const f = doAluno('exactlab_favoritos').find((x) => x.numero_atomico === z)
  if (!f) return eu()?.licenciado ? ok(z) : falha('Sem permissão.')
  const r = apagarDoAluno('exactlab_favoritos', f.id)
  return r.erro ? r : ok(z)
}

// ================= Administradora =================
export function listarLicencas() {
  if (!ehAdmin()) return ok([])
  const comConta = new Set(db.usuarios.map((u) => normalizarEmail(u.email)))
  return ok(db.licencas.map((l) => ({ ...l, conta_criada: comConta.has(normalizarEmail(l.email)) })))
}
export function liberarEmail({ email, nome, motivo }) {
  if (!ehAdmin()) return falha('Sem permissão.')
  const e = normalizarEmail(email)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return falha('Email inválido.')
  const ja = db.licencas.find((l) => normalizarEmail(l.email) === e)
  if (ja) {
    if (ja.status === 'Ativa') return falha('Este email já tem licença ativa.')
    Object.assign(ja, { status: 'Ativa', bloqueada_em: null, motivo: motivo || ja.motivo })
  } else {
    db.licencas.push({ id: novoId(), email: e, nome: nome || null, status: 'Ativa', origem: 'Manual', hotmart_transacao: null, comprado_em: agoraISO(), bloqueada_em: null, motivo: motivo || null, created_at: agoraISO() })
  }
  gravar()
  return ok(null)
}
export function bloquearLicenca(id, motivo) {
  if (!ehAdmin()) return falha('Sem permissão.')
  const l = db.licencas.find((x) => x.id === id)
  if (!l) return falha('Licença não encontrada.')
  Object.assign(l, { status: 'Bloqueada', bloqueada_em: agoraISO(), motivo: motivo || null })
  gravar()
  return ok(l)
}
export function desbloquearLicenca(id) {
  if (!ehAdmin()) return falha('Sem permissão.')
  const l = db.licencas.find((x) => x.id === id)
  if (!l) return falha('Licença não encontrada.')
  Object.assign(l, { status: 'Ativa', bloqueada_em: null })
  gravar()
  return ok(l)
}
export function listarAvisosComErro() {
  if (!ehAdmin()) return ok([])
  return ok(db.hotmart_eventos.filter((e) => e.erro && !e.processado))
}
