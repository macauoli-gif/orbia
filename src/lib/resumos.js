// Regras do banco de resumos (só do aluno, desde 25/11/2026).
// Dois tipos: PDF (anotado no editor) e Digitado.

// Idênticos ao CHECK de resumos.tipo.
export const RESUMO_PDF = 'PDF'
export const RESUMO_DIGITADO = 'Digitado'
export const TIPOS_RESUMO = [RESUMO_DIGITADO, RESUMO_PDF]
export const LIMITE_PDF_MB = 20

export function validarPdf({ nome, tamanho, tipo }, primeirosBytes) {
  if (tamanho > LIMITE_PDF_MB * 1024 * 1024) return `O arquivo passa de ${LIMITE_PDF_MB} MB. Escolha um PDF menor.`
  const pareceTipo = tipo === 'application/pdf' || /\.pdf$/i.test(nome || '')
  // Todo PDF começa com "%PDF". O nome do arquivo sozinho não prova nada.
  const assinatura = primeirosBytes ? String.fromCharCode(...primeirosBytes.slice(0, 4)) === '%PDF' : false
  if (!pareceTipo || !assinatura) return 'Este arquivo não é um PDF.'
  if (tamanho === 0) return 'O arquivo está vazio.'
  return null
}

// "Aula_3 - Química.pdf" -> "Aula 3 - Química"
export function tituloDoArquivo(nome) {
  return String(nome || '').replace(/\.pdf$/i, '').replace(/[_]+/g, ' ').trim().slice(0, 120) || 'Resumo em PDF'
}

// O mesmo que o CHECK do banco vai exigir.
export function validarResumo(r) {
  const erros = {}
  if (!r.titulo?.trim()) erros.titulo = 'Escreva o título.'
  else if (r.titulo.trim().length > 120) erros.titulo = 'Até 120 caracteres.'
  if (!r.materia_id) erros.materia_id = 'Escolha a matéria.'
  if (!TIPOS_RESUMO.includes(r.tipo)) erros.tipo = 'Tipo de resumo inválido.'
  if (r.tipo === RESUMO_DIGITADO && !r.texto?.trim()) erros.texto = 'Escreva o texto.'
  if (r.tipo === RESUMO_PDF) {
    if (r.texto) erros.texto = 'Resumo em PDF não tem texto digitado.'
    if (!(Number.isInteger(r.paginas) && r.paginas >= 1)) erros.paginas = 'Número de páginas inválido.'
  }
  return erros
}

// O que pode mudar depois de criado: título, matéria e (no digitado) o texto.
export function camposEditaveis(tipo) {
  return tipo === RESUMO_DIGITADO ? ['titulo', 'materia_id', 'texto'] : ['titulo', 'materia_id']
}

export function filtrarResumos(resumos, { tipo = 'Todos', busca = '', materia_id = '' }) {
  const termo = busca.trim().toLowerCase()
  return resumos
    .filter((r) => (tipo === 'Todos' || r.tipo === tipo) &&
      (!materia_id || r.materia_id === materia_id) &&
      (!termo || [r.titulo, r.texto, r.arquivo_nome].join(' ').toLowerCase().includes(termo)))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export const textoPaginas = (n) => `${n} ${n === 1 ? 'página' : 'páginas'}`

export function textoTamanho(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
}
