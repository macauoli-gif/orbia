// Regras das anotações por cima dos resumos em PDF (o arquivo em si: lib/resumos.js).
// Coordenadas sempre de 0 a 1, relativas à página: a mesma anotação cai no
// mesmo lugar no celular, no tablet e no computador.

export const CORES = [
  { nome: 'Azul-escuro', valor: '#1b3a8a' },
  { nome: 'Vermelho', valor: '#c4321f' },
  { nome: 'Verde', valor: '#1f7a4d' },
]
// Espessura como fração da largura da página.
export const ESPESSURAS = [
  { nome: 'Fina', valor: 0.0025 },
  { nome: 'Média', valor: 0.005 },
  { nome: 'Grossa', valor: 0.01 },
]
// Tamanho da letra das caixas de texto, como fração da largura da página.
export const TAMANHO_TEXTO = 0.026

// Pressão da caneta (0 a 1) engrossa ou afina o traço; mouse e dedo mandam 0,5.
export function larguraTraco(espessura, pressao, larguraPagina) {
  const p = pressao > 0 ? pressao : 0.5
  return Math.max(0.6, espessura * larguraPagina * (0.45 + p * 1.1))
}

const ate1 = (n) => Math.min(1, Math.max(0, n))
export const normalizarPonto = (x, y, largura, altura, pressao = 0.5) => [ate1(x / largura), ate1(y / altura), Math.round(pressao * 100) / 100]

// Distância de um ponto até um segmento (tudo em coordenadas de 0 a 1).
function distSegmento([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax, dy = by - ay
  const t = dx || dy ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy))) : 0
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

export function tocaTraco(traco, ponto, raio) {
  const pts = traco.pontos
  if (pts.length === 1) return Math.hypot(ponto[0] - pts[0][0], ponto[1] - pts[0][1]) <= raio
  for (let i = 1; i < pts.length; i++) if (distSegmento(ponto, pts[i - 1], pts[i]) <= raio) return true
  return false
}

// Borracha: apaga o traço inteiro em que tocar.
export function apagarTracosEm(tracos, ponto, raio = 0.015) {
  return tracos.filter((t) => !tocaTraco(t, ponto, raio))
}

export const paginaVazia = () => ({ tracos: [], textos: [] })
export const paginaTemAlgo = (p) => !!p && (p.tracos.length > 0 || p.textos.some((t) => t.texto.trim()))

// Caixa de texto vazia ao sair dela não vale ser guardada.
export const limparTextosVazios = (pagina) => ({ ...pagina, textos: pagina.textos.filter((t) => t.texto.trim()) })

// Histórico para o "desfazer": guarda o estado da página antes de cada mudança.
export function empilhar(historico, pagina, antes, limite = 50) {
  return [...historico, { pagina, antes }].slice(-limite)
}
export function desfazer(historico, anotacoes) {
  if (!historico.length) return { historico, anotacoes, pagina: null }
  const { pagina, antes } = historico[historico.length - 1]
  return { historico: historico.slice(0, -1), anotacoes: { ...anotacoes, [pagina]: antes }, pagina }
}

// Onde nasce uma caixa de texto: no ponto tocado, sem sair da página.
export const posicaoNovoTexto = ([x, y]) => ({ x: Math.min(x, 0.85), y: Math.min(y, 0.95) })

// Rejeição da palma: o que fazer com um novo toque na página?
// Devolve 'escrever' | 'rolar' | 'ignorar' | 'assumir' (a caneta toma o lugar
// de um traço de dedo em andamento — quase sempre era a palma encostando antes).
//   tipo: 'pen' | 'touch' | 'mouse'   ativo: tipo do gesto em andamento (ou null)
export function papelDoToque({ tipo, ativo, canetaVista, soCaneta }) {
  if (tipo === 'pen') {
    if (!ativo) return 'escrever'
    return ativo === 'touch' ? 'assumir' : 'ignorar'
  }
  if (tipo === 'touch') {
    // Com caneta por perto (ou "Só caneta"), o dedo só rola; durante um traço, a palma é ignorada.
    if (canetaVista || soCaneta) return ativo ? 'ignorar' : 'rolar'
    return ativo ? 'ignorar' : 'escrever' // segundo dedo ou palma não entram no traço
  }
  return ativo ? 'ignorar' : 'escrever'
}
