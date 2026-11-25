// Foco: Pomodoro com tela cheia e contagem de saídas da aba.
import { useEffect, useRef, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import {
  minutosFocados, valeGravar, sessoesDeHoje, minutosDaSemana, relogio,
  novoCronometro, pausarCronometro, retomarCronometro, decorridoSeg, restanteSeg,
} from '../lib/foco.js'
import { agoraMs } from '../lib/datas.js'
import { textoMinutos } from '../lib/metas.js'
import { Campo, ERRO_GENERICO, Icon, MateriaChip, PageHeader, avisar } from '../components/index.jsx'

export default function Foco({ params }) {
  const { materias, materiaPorId, tarefas, sessoes, recarregarSessoes } = useEstudo()
  const [cfg, setCfg] = useState({ materia_id: params.materia_id || '', tarefa_id: params.tarefa_id || '', foco: 25, pausa: 5 })
  const [fase, setFase] = useState(null)          // null | 'foco' | 'pausa'
  const [crono, setCrono] = useState(null)        // ver lib/foco.js
  const [agora, setAgora] = useState(0)           // atualizado pelo relógio abaixo
  const [saidas, setSaidas] = useState(0)
  const [resultado, setResultado] = useState(null)
  const inicio = useRef(null)
  const pausado = crono ? crono.rodandoDesde == null : false
  const restante = crono ? restanteSeg(crono, agora) : 0

  // Só redesenha a tela; o tempo vem do relógio real (lib/foco.js).
  useEffect(() => {
    if (!fase) return
    const t = setInterval(() => setAgora(agoraMs()), 500)
    return () => clearInterval(t)
  }, [fase])

  useEffect(() => {
    if (fase && crono && restante <= 0) {
      if (fase === 'foco') terminarFoco(true)
      else { setFase(null); setCrono(null); avisar('Pausa encerrada. Pronto para mais um?') }
    }
  }, [restante])

  const alternarPausa = () => {
    const t = agoraMs()
    setCrono(pausado ? retomarCronometro(crono, t) : pausarCronometro(crono, t))
    setAgora(t)
  }

  // Cada saída da aba durante o foco conta.
  useEffect(() => {
    if (fase !== 'foco') return
    const fn = () => { if (document.hidden) setSaidas((n) => n + 1) }
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [fase])

  function comecar() {
    const t = agoraMs()
    inicio.current = new Date(t).toISOString()
    setSaidas(0); setResultado(null)
    setCrono(novoCronometro(Math.max(1, Number(cfg.foco) || 25) * 60, t))
    setAgora(t)
    setFase('foco')
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  async function terminarFoco(completou) {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    const t = agoraMs()
    const seg = decorridoSeg(crono, t)
    setFase(completou ? 'pausa' : null)
    setCrono(completou ? novoCronometro(Math.max(1, Number(cfg.pausa) || 5) * 60, t) : null)
    setAgora(t)
    if (!valeGravar(seg)) { setResultado({ minutos: 0, saidas, completou }); return }
    const r = await dados.registrarSessaoFoco({
      materia_id: cfg.materia_id || null, tarefa_id: cfg.tarefa_id || null, inicio: inicio.current,
      minutos: minutosFocados(seg), saidas_aba: saidas, completou,
    })
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setResultado({ minutos: r.data.minutos, saidas, completou })
    recarregarSessoes()
  }

  const hoje = sessoesDeHoje(sessoes)
  const tarefasAbertas = tarefas.filter((t) => t.status !== 'Concluído' && (!cfg.materia_id || t.materia_id === cfg.materia_id))
  const materia = materiaPorId[cfg.materia_id]

  if (fase === 'foco') {
    return (
      <div className="tela-cheia" role="timer" aria-live="off">
        {materia && <MateriaChip materia={materia} />}
        {cfg.tarefa_id && <p className="muted">{tarefas.find((t) => t.id === cfg.tarefa_id)?.titulo}</p>}
        <div className="relogio">{relogio(Math.max(0, restante))}</div>
        <p className="muted small">{pausado ? 'Pausado' : 'Foco'} · saídas da aba: {saidas}</p>
        <div className="row">
          <button className="btn big" onClick={alternarPausa}><Icon nome={pausado ? 'play' : 'pausa'} /> {pausado ? 'Continuar' : 'Pausar'}</button>
          <button className="btn big danger" onClick={() => terminarFoco(false)}><Icon nome="parar" /> Encerrar</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader titulo="Foco" />
      <div className="duas-colunas" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
        <section className="panel stack">
          {fase === 'pausa' ? (
            <>
              <h2>Pausa</h2>
              <div className="relogio" style={{ fontSize: 72 }}>{relogio(Math.max(0, restante))}</div>
              <div className="row">
                <button className="btn" onClick={alternarPausa}>{pausado ? 'Continuar pausa' : 'Pausar'}</button>
                <button className="btn primary" onClick={comecar}>Pular pausa e focar</button>
                <button className="btn ghost" onClick={() => { setFase(null); setCrono(null) }}>Encerrar</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <Campo rotulo="Matéria (opcional)">
                  <select className="ipt" value={cfg.materia_id} onChange={(e) => setCfg({ ...cfg, materia_id: e.target.value, tarefa_id: '' })}>
                    <option value="">Sem matéria</option>
                    {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
                  </select>
                </Campo>
                <Campo rotulo="Tarefa (opcional)">
                  <select className="ipt" value={cfg.tarefa_id} onChange={(e) => setCfg({ ...cfg, tarefa_id: e.target.value })}>
                    <option value="">Sem tarefa</option>
                    {tarefasAbertas.map((t) => <option key={t.id} value={t.id}>{t.titulo}</option>)}
                  </select>
                </Campo>
              </div>
              <div className="form-row">
                <Campo rotulo="Foco (minutos)"><input className="ipt" type="number" min="1" max="180" value={cfg.foco} onChange={(e) => setCfg({ ...cfg, foco: e.target.value })} /></Campo>
                <Campo rotulo="Pausa (minutos)"><input className="ipt" type="number" min="1" max="60" value={cfg.pausa} onChange={(e) => setCfg({ ...cfg, pausa: e.target.value })} /></Campo>
              </div>
              <div className="relogio" style={{ fontSize: 72, textAlign: 'center' }}>{relogio((Math.max(1, Number(cfg.foco) || 25)) * 60)}</div>
              <button className="btn primary big" onClick={comecar}><Icon nome="play" /> Começar</button>
              <p className="small muted">O app não consegue bloquear outros aplicativos. Ele entra em tela cheia e conta cada vez que você sai da aba.</p>
            </>
          )}
          {resultado && (
            <div className="msg-ok" role="status">
              {resultado.minutos ? `Sessão gravada: ${resultado.minutos} min` : 'Sessão muito curta, não foi gravada'}
              {` · você saiu da aba ${resultado.saidas} ${resultado.saidas === 1 ? 'vez' : 'vezes'}.`}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="row-between" style={{ marginBottom: 8 }}>
            <h2>Sessões de hoje</h2>
            <span className="pill info">Semana: {textoMinutos(minutosDaSemana(sessoes))}</span>
          </div>
          {hoje.length === 0 ? <div className="empty">Nenhuma sessão hoje. 25 minutos de foco já fazem diferença.</div> : (
            <div className="lista">
              {hoje.map((s) => (
                <div key={s.id} className="row-between" style={{ borderBottom: '1px solid var(--line)', padding: '8px 0' }}>
                  <div className="row">
                    <b>{new Date(s.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</b>
                    {s.materia_id ? <MateriaChip materia={materiaPorId[s.materia_id]} /> : <span className="muted small">Sem matéria</span>}
                  </div>
                  <span className="small muted">{s.minutos} min · {s.saidas_aba} saídas{s.completou ? '' : ' · encerrada antes'}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
