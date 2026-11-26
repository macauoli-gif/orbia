// Peças reutilizáveis. Ícones em SVG (nada de emoji: muda de desenho em cada aparelho).
import { useEffect, useRef, useState } from 'react'

const CAMINHOS = {
  quadro: 'M4 4h5v16H4zM10.5 4h5v10h-5zM17 4h3v7h-3z',
  cronograma: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 12h3M8 16h3M14 12h2',
  questoes: 'M9 9a3 3 0 1 1 4 2.8c-.7.3-1 .9-1 1.6V14M12 17.5v.5M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z',
  foco: 'M12 8v4l3 2M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z',
  mais: 'M5 12h.01M12 12h.01M19 12h.01',
  flashcards: 'M4 7h12v12H4zM8 3h12v12',
  conta: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  licencas: 'M4 7h16v10H4zM8 11h4M8 14h8M16 10h1',
  mais_sinal: 'M12 5v14M5 12h14',
  fechar: 'M6 6l12 12M18 6L6 18',
  voltar: 'M15 5l-7 7 7 7',
  avancar: 'M9 5l7 7-7 7',
  lapis: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  lixo: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  sair: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  check: 'M5 12l5 5L20 7',
  play: 'M8 5l11 7-11 7z',
  pausa: 'M8 5v14M16 5v14',
  parar: 'M6 6h12v12H6z',
  whatsapp: 'M4 20l1.3-3.9A8 8 0 1 1 8 18.7zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z',
  caderno: 'M6 3h12v18H6zM9 3v18M12 8h4M12 12h4',
  simulados: 'M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M8.5 13l2.5 2.5L15.5 11',
  exactlab: 'M9 3h6M10 3v6.5L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9.5V3M7.5 15h9',
  estrela: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
}

export function Icon({ nome, tamanho = 22 }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={CAMINHOS[nome] || ''} />
    </svg>
  )
}

export function useDesktop() {
  const [desk, setDesk] = useState(() => window.innerWidth >= 900)
  useEffect(() => {
    const fn = () => setDesk(window.innerWidth >= 900)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return desk
}

// Etiqueta da matéria, com a cor dela (matiz guardado em materias.cor).
export function MateriaChip({ materia }) {
  if (!materia) return null
  return <span className="chip" style={{ '--h': materia.cor }}>{materia.nome}</span>
}

export function PageHeader({ titulo, children }) {
  return (
    <div className="page-head">
      <h1>{titulo}</h1>
      {children}
    </div>
  )
}

// Janela: gaveta que sobe no celular, caixa central no computador.
export function Janela({ titulo, aoFechar, children, centro = false }) {
  const caixa = useRef(null)
  // Ao abrir, o foco do teclado vai para dentro da janela (se nenhum campo
  // já pediu autoFocus); ao fechar, volta para onde estava.
  useEffect(() => {
    const antes = document.activeElement
    if (!caixa.current.contains(document.activeElement)) caixa.current.focus()
    return () => antes?.focus?.()
  }, [])
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') aoFechar() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [aoFechar])
  return (
    <div className={'veu' + (centro ? ' centro' : '')} onClick={(e) => { if (e.target === e.currentTarget) aoFechar() }}>
      <div className="janela" role="dialog" aria-modal="true" aria-label={titulo} tabIndex={-1} ref={caixa} style={{ outline: 'none' }}>
        <div className="janela-topo">
          <h2>{titulo}</h2>
          <button className="icon-btn" onClick={aoFechar} aria-label="Fechar"><Icon nome="fechar" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Confirmar({ texto, rotulo = 'Apagar', aoConfirmar, aoCancelar }) {
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo="Confirme" aoFechar={aoCancelar} centro>
      <p>{texto}</p>
      <div className="janela-acoes">
        <button className="btn" onClick={aoCancelar}>Cancelar</button>
        <button className="btn danger" disabled={salvando}
          onClick={async () => { setSalvando(true); await aoConfirmar(); setSalvando(false) }}>
          {salvando ? 'Apagando…' : rotulo}
        </button>
      </div>
    </Janela>
  )
}

export function Campo({ rotulo, erro, dica, children }) {
  return (
    <label className="field">
      {rotulo}
      {dica && <span className="hint">{dica}</span>}
      {children}
      {erro && <span className="err">{erro}</span>}
    </label>
  )
}

// Três estados de toda lista que busca dado.
export function Estado({ carregando, erro, vazio, textoVazio, children }) {
  if (carregando) return <div className="loading" aria-live="polite">Carregando…</div>
  if (erro) return <div className="msg-erro" role="alert">{erro}</div>
  if (vazio) return <div className="empty">{textoVazio}</div>
  return children
}

// Aviso rápido: avisar('Salvo.') de qualquer tela; <Avisos /> mora na shell.
const ouvintes = new Set()
export const ERRO_GENERICO = 'Algo deu errado e não salvamos. Confira sua internet e tente de novo.'
export function avisar(texto, erro = false) {
  ouvintes.forEach((fn) => fn({ texto, erro, id: Date.now() }))
}
export function Avisos() {
  const [atual, setAtual] = useState(null)
  useEffect(() => {
    const fn = (a) => setAtual(a)
    ouvintes.add(fn)
    return () => ouvintes.delete(fn)
  }, [])
  useEffect(() => {
    if (!atual) return
    const t = setTimeout(() => setAtual(null), atual.erro ? 5000 : 2200)
    return () => clearTimeout(t)
  }, [atual])
  if (!atual) return null
  return <div className={'toast' + (atual.erro ? ' erro' : '')} role="status">{atual.texto}</div>
}
