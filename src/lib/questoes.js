// Filtros, correção e situação das questões.

export const NIVEIS = ['Fácil', 'Médio', 'Difícil']
export const LETRAS = ['A', 'B', 'C', 'D', 'E']
// Idênticos ao CHECK de caderno_erros.motivo.
export const MOTIVOS_ERRO = ['Não sabia o conteúdo', 'Falta de atenção', 'Interpretação', 'Conta errada', 'Faltou tempo']
export const SITUACOES = ['Todas', 'Pendentes', 'Resolvidas', 'Para revisar']

export const corrigir = (questao, letra) => questao.correta === letra

// A última tentativa vale para a marca "acertou/errou" do cartão.
export function ultimaResposta(questaoId, respostas) {
  let ultima = null
  for (const r of respostas) if (r.questao_id === questaoId && (!ultima || r.created_at > ultima.created_at)) ultima = r
  return ultima
}

// Questão de fábrica sugerida para a série: a da PRÓPRIA série (decidido em
// 25/11/2026: cada série com o seu nível). Nas questões, serie_minima funciona
// como "série da questão"; vazia = vale para todas. Flashcards e resumos
// continuam com a regra de série mínima (serieAlcanca).
export const questaoDaSerie = (q, serie) => !q.serie_minima || q.serie_minima === serie

export function filtrarQuestoes(questoes, f, { serie, respostas = [], caderno = [] }) {
  const revisar = new Set(caderno.filter((c) => c.revisar).map((c) => c.questao_id))
  return questoes.filter((q) => {
    if (f.materia_id && q.materia_id !== f.materia_id) return false
    if (f.assunto && q.assunto !== f.assunto) return false
    if (f.nivel && q.nivel !== f.nivel) return false
    if (f.instituicao && q.instituicao !== f.instituicao) return false
    if (f.ano && String(q.ano || '') !== String(f.ano)) return false
    if (f.soSugerido && q.user_id == null && !questaoDaSerie(q, serie)) return false
    const r = ultimaResposta(q.id, respostas)
    if (f.situacao === 'Pendentes' && r) return false
    if (f.situacao === 'Resolvidas' && !r) return false
    if (f.situacao === 'Para revisar' && !revisar.has(q.id)) return false
    return true
  })
}

export function validarQuestao(q) {
  const erros = {}
  if (!q.materia_id) erros.materia_id = 'Escolha a matéria.'
  if (!q.assunto?.trim()) erros.assunto = 'Escreva o assunto.'
  if (!q.enunciado?.trim()) erros.enunciado = 'Escreva o enunciado.'
  const alts = q.alternativas || []
  if (alts.length < 4 || alts.length > 5) erros.alternativas = 'De 4 a 5 alternativas.'
  else if (alts.some((a) => !a.texto?.trim())) erros.alternativas = 'Preencha o texto de todas as alternativas.'
  if (!alts.some((a) => a.letra === q.correta)) erros.correta = 'Marque a alternativa correta.'
  return erros
}
