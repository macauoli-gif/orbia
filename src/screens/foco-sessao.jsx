// Sessão de foco que vive acima das telas: o aluno escolhe ficar só com o tempo
// (tela cheia) ou usar o app junto, com um relógio pequeno flutuando em todas as telas.
// A sessão continua ao trocar de tela; o tempo vem do relógio real (lib/foco.js).
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { minutosFocados, valeGravar, relogio, novoCronometro, pausarCronometro, retomarCronometro, decorridoSeg, restanteSeg } from '../lib/foco.js'
import { agoraMs } from '../lib/datas.js'
import { ERRO_GENERICO, Icon, MateriaChip, avisar } from '../components/index.jsx'

const Ctx = createContext(null)
export const useFocoSessao = () => useContext(Ctx)

const entrarTelaCheia = () => document.documentElement.requestFullscreen?.().catch(() => {})
const sairTelaCheia = () => { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}) }

// Redesenha quem mostra o relógio, a cada meio segundo, só enquanto há sessão.
export function useAgora(ativo) {
  const [agora, setAgora] = useState(() => agoraMs())
  useEffect(() => {
    if (!ativo) return
    const t = setInterval(() => setAgora(agoraMs()), 500)
    return () => clearInterval(t)
  }, [ativo])
  return agora
}

export function FocoSessaoProvider({ children }) {
  const { recarregarSessoes } = useEstudo()
  const [sessao, setSessao] = useState(null)      // { materia_id, tarefa_id, foco, pausa } da sessão em curso
  const [fase, setFase] = useState(null)          // null | 'foco' | 'pausa'
  const [modo, setModo] = useState('tela')        // 'tela' (só o tempo) | 'junto' (usar o app)
  const [crono, setCrono] = useState(null)
  const [saidas, setSaidas] = useState(0)
  const [resultado, setResultado] = useState(null)
  const inicio = useRef(null)
  const aoAcabar = useRef(null)

  // Cada saída da aba (ou do app, no celular) durante o foco conta.
  useEffect(() => {
    if (fase !== 'foco') return
    const fn = () => { if (document.hidden) setSaidas((n) => n + 1) }
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [fase])

  function comecar(cfg, novoModo = modo) {
    const t = agoraMs()
    inicio.current = new Date(t).toISOString()
    setSessao(cfg)
    setModo(novoModo)
    setSaidas(0)
    setResultado(null)
    setCrono(novoCronometro(Math.max(1, Number(cfg.foco) || 25) * 60, t))
    setFase('foco')
    if (novoModo === 'tela') entrarTelaCheia()
  }

  function trocarModo(novo) {
    setModo(novo)
    if (novo === 'tela') entrarTelaCheia(); else sairTelaCheia()
  }

  function alternarPausa() {
    const t = agoraMs()
    setCrono((c) => (c.rodandoDesde == null ? retomarCronometro(c, t) : pausarCronometro(c, t)))
  }

  function encerrarPausa() { setFase(null); setCrono(null) }

  async function terminarFoco(completou) {
    sairTelaCheia()
    const t = agoraMs()
    const seg = decorridoSeg(crono, t)
    setFase(completou ? 'pausa' : null)
    setCrono(completou ? novoCronometro(Math.max(1, Number(sessao.pausa) || 5) * 60, t) : null)
    if (!valeGravar(seg)) { setResultado({ minutos: 0, saidas, completou }); return }
    const r = await dados.registrarSessaoFoco({
      materia_id: sessao.materia_id || null, tarefa_id: sessao.tarefa_id || null, inicio: inicio.current,
      minutos: minutosFocados(seg), saidas_aba: saidas, completou,
    })
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setResultado({ minutos: r.data.minutos, saidas, completou })
    avisar(completou ? `Foco concluído: ${r.data.minutos} min. Hora da pausa.` : `Sessão gravada: ${r.data.minutos} min.`)
    recarregarSessoes()
  }

  // O fim do tempo é um alarme marcado para o instante certo, não um tique contínuo.
  useEffect(() => {
    aoAcabar.current = () => {
      if (fase === 'foco') terminarFoco(true)
      else { encerrarPausa(); avisar('Pausa encerrada. Pronto para mais um?') }
    }
  })
  useEffect(() => {
    if (!fase || !crono || crono.rodandoDesde == null) return
    const falta = crono.totalMs - decorridoSeg(crono, agoraMs()) * 1000
    const t = setTimeout(() => aoAcabar.current(), Math.max(0, falta))
    return () => clearTimeout(t)
  }, [fase, crono])

  const valor = { sessao, fase, modo, crono, saidas, resultado, comecar, trocarModo, alternarPausa, encerrarPausa, terminarFoco }
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

// Mostrado pelo shell em cima de qualquer tela: a tela cheia (modo "só o tempo")
// ou o relógio pequeno (modo "usar o app"; na aba Foco o relógio já aparece grande).
export function FocoFlutuante({ tela, goto }) {
  const s = useFocoSessao()
  const { materiaPorId, tarefas } = useEstudo()
  const agora = useAgora(!!s.fase)
  if (!s.fase) return null
  const restante = Math.max(0, restanteSeg(s.crono, agora))
  const pausado = s.crono.rodandoDesde == null

  if (s.fase === 'foco' && s.modo === 'tela') {
    const materia = materiaPorId[s.sessao.materia_id]
    return (
      <div className="tela-cheia" role="timer" aria-live="off">
        {materia && <MateriaChip materia={materia} />}
        {s.sessao.tarefa_id && <p className="muted">{tarefas.find((t) => t.id === s.sessao.tarefa_id)?.titulo}</p>}
        <div className="relogio">{relogio(restante)}</div>
        <p className="muted small">{pausado ? 'Pausado' : 'Foco'} · saídas da aba: {s.saidas}</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="btn big" onClick={s.alternarPausa}><Icon nome={pausado ? 'play' : 'pausa'} /> {pausado ? 'Continuar' : 'Pausar'}</button>
          <button className="btn big danger" onClick={() => s.terminarFoco(false)}><Icon nome="parar" /> Encerrar</button>
        </div>
        <button className="btn ghost" onClick={() => s.trocarModo('junto')}><Icon nome="janela" /> Usar o app com o tempo rodando</button>
      </div>
    )
  }
  if (tela === 'foco') return null

  const rotulo = s.fase === 'pausa' ? 'Pausa' : pausado ? 'Pausado' : 'Foco'
  return (
    <div className="mini-foco" role="timer" aria-label={`${rotulo}: ${relogio(restante)}`}>
      <button className="mini-foco-tempo" onClick={() => goto('foco')} aria-label="Abrir o Foco">
        <span>{rotulo}</span><b>{relogio(restante)}</b>
      </button>
      <button className="icon-btn" onClick={s.alternarPausa} aria-label={pausado ? 'Continuar' : 'Pausar'}><Icon nome={pausado ? 'play' : 'pausa'} /></button>
      {s.fase === 'foco' && <button className="icon-btn" onClick={() => s.trocarModo('tela')} aria-label="Ficar só com o tempo, em tela cheia"><Icon nome="telacheia" /></button>}
      <button className="icon-btn" onClick={() => (s.fase === 'foco' ? s.terminarFoco(false) : s.encerrarPausa())} aria-label="Encerrar"><Icon nome="parar" /></button>
    </div>
  )
}
