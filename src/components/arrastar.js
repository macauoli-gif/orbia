// Arrastar cartões entre colunas com caneta, mouse ou dedo (eventos de ponteiro,
// não o drag-and-drop do HTML, que não funciona com toque nem caneta no tablet).
// - Caneta e mouse: arrastam assim que o cartão anda alguns pixels.
// - Dedo: segurar ~0,35 s e então arrastar (sem isso, o dedo rola a página).
// Alvo = qualquer elemento com data-alvo="<status>" (colunas e, no celular, as abas).
// O movimento é ouvido na janela inteira: um movimento rápido que sai do cartão
// num passo só não pode perder o arrasto.
import { useEffect, useRef, useState } from 'react'

const LIMIAR = 6        // px até virar arrasto (caneta e mouse)
const SEGURAR_MS = 350  // dedo: tempo segurando antes de poder arrastar
const TREMOR = 10       // dedo: se andar mais que isso antes do tempo, é rolagem

function alvoEm(x, y) {
  for (const el of document.querySelectorAll('[data-alvo]')) {
    const r = el.getBoundingClientRect()
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return el.dataset.alvo
  }
  return null
}

export function useArrastar(aoSoltar) {
  const [arrastando, setArrastando] = useState(null) // { id, dx, dy }
  const [sobre, setSobre] = useState(null)
  const g = useRef(null)            // gesto em andamento
  const acabouDeArrastar = useRef(false)
  const soltar = useRef(aoSoltar)
  useEffect(() => { soltar.current = aoSoltar })

  // Enquanto o gesto está "armado", o toque não rola a página. Precisa ser um
  // listener nativo não passivo (o do React é passivo e não pode cancelar).
  useEffect(() => {
    const bloquear = (e) => { if (g.current?.armado) e.preventDefault() }
    document.addEventListener('touchmove', bloquear, { passive: false })
    return () => { document.removeEventListener('touchmove', bloquear); g.current?.parar() }
  }, [])

  function comecar(e, id) {
    if (e.button > 0 || e.target.closest('button, a, input, select, textarea')) return
    g.current?.parar()
    const s = { id, x0: e.clientX, y0: e.clientY, ponteiro: e.pointerId, armado: e.pointerType !== 'touch', ativo: false, timer: null }

    const mover = (ev) => {
      if (ev.pointerId !== s.ponteiro) return
      const dx = ev.clientX - s.x0, dy = ev.clientY - s.y0
      if (!s.armado) { if (Math.hypot(dx, dy) > TREMOR) parar(); return }
      if (!s.ativo) {
        if (Math.hypot(dx, dy) < LIMIAR) return
        s.ativo = true
      }
      setArrastando({ id, dx, dy })
      setSobre(alvoEm(ev.clientX, ev.clientY))
    }
    const largar = (ev) => {
      if (ev.pointerId !== s.ponteiro) return
      if (s.ativo) {
        acabouDeArrastar.current = true
        setTimeout(() => { acabouDeArrastar.current = false }, 0)
        const alvo = alvoEm(ev.clientX, ev.clientY)
        if (alvo) soltar.current(id, alvo)
      }
      parar()
    }
    function parar() {
      clearTimeout(s.timer)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', largar)
      window.removeEventListener('pointercancel', parar)
      if (g.current === s) g.current = null
      setArrastando(null)
      setSobre(null)
    }
    s.parar = parar

    if (e.pointerType === 'touch') {
      s.timer = setTimeout(() => {
        s.armado = true; s.ativo = true
        navigator.vibrate?.(15)
        setArrastando({ id, dx: 0, dy: 0 })
      }, SEGURAR_MS)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', largar)
    window.addEventListener('pointercancel', parar)
    g.current = s
  }

  const propsDoCartao = (id) => ({
    onPointerDown: (e) => comecar(e, id),
    // O toque que terminou um arrasto não abre o cartão.
    onClickCapture(e) {
      if (acabouDeArrastar.current) { e.stopPropagation(); e.preventDefault(); acabouDeArrastar.current = false }
    },
  })

  const estiloDoCartao = (id) => (arrastando?.id === id
    ? { transform: `translate(${arrastando.dx}px, ${arrastando.dy}px) rotate(1.5deg)`, zIndex: 20, position: 'relative', boxShadow: 'var(--shadow-pop)' }
    : null)

  return { propsDoCartao, estiloDoCartao, sobre, arrastandoId: arrastando?.id || null }
}
