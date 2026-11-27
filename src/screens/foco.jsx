// Foco: Pomodoro. O aluno escolhe ficar só com o tempo (tela cheia) ou usar o app
// junto; a sessão em si mora em foco-sessao.jsx e continua ao trocar de tela.
import { useState } from 'react'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { sessoesDeHoje, minutosDaSemana, relogio, restanteSeg } from '../lib/foco.js'
import { textoMinutos } from '../lib/metas.js'
import { Campo, Icon, MateriaChip, PageHeader } from '../components/index.jsx'
import { useAgora, useFocoSessao } from './foco-sessao.jsx'

export default function Foco({ params }) {
  const { materias, materiaPorId, tarefas, sessoes } = useEstudo()
  const s = useFocoSessao()
  const agora = useAgora(!!s.fase)
  const [cfg, setCfg] = useState({ materia_id: params.materia_id || '', tarefa_id: params.tarefa_id || '', foco: 25, pausa: 5 })
  const restante = s.fase ? Math.max(0, restanteSeg(s.crono, agora)) : 0
  const pausado = s.crono ? s.crono.rodandoDesde == null : false

  const hoje = sessoesDeHoje(sessoes)
  const tarefasAbertas = tarefas.filter((t) => t.status !== 'Concluído' && (!cfg.materia_id || t.materia_id === cfg.materia_id))
  const materiaDaSessao = s.sessao && materiaPorId[s.sessao.materia_id]

  return (
    <div>
      <PageHeader titulo="Foco" />
      <div className="duas-colunas" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
        <section className="panel stack">
          {s.fase === 'pausa' && (
            <>
              <h2>Pausa</h2>
              <div className="relogio" style={{ fontSize: 72 }}>{relogio(restante)}</div>
              <div className="row">
                <button className="btn" onClick={s.alternarPausa}>{pausado ? 'Continuar pausa' : 'Pausar'}</button>
                <button className="btn primary" onClick={() => s.comecar(s.sessao)}>Pular pausa e focar</button>
                <button className="btn ghost" onClick={s.encerrarPausa}>Encerrar</button>
              </div>
            </>
          )}
          {s.fase === 'foco' && (
            <>
              <div className="row">
                <h2>{pausado ? 'Pausado' : 'Em foco'}</h2>
                {materiaDaSessao && <MateriaChip materia={materiaDaSessao} />}
              </div>
              <div className="relogio" style={{ fontSize: 72 }}>{relogio(restante)}</div>
              <p className="small muted">Saídas da aba: {s.saidas}. O tempo continua rodando nas outras telas do app.</p>
              <div className="row">
                <button className="btn" onClick={s.alternarPausa}><Icon nome={pausado ? 'play' : 'pausa'} /> {pausado ? 'Continuar' : 'Pausar'}</button>
                <button className="btn" onClick={() => s.trocarModo('tela')}><Icon nome="telacheia" /> Só o tempo (tela cheia)</button>
                <button className="btn danger" onClick={() => s.terminarFoco(false)}><Icon nome="parar" /> Encerrar</button>
              </div>
            </>
          )}
          {!s.fase && (
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
              <div className="foco-modos">
                <button className="btn primary big" onClick={() => s.comecar(cfg, 'tela')}><Icon nome="telacheia" /> Só o tempo</button>
                <button className="btn big" onClick={() => s.comecar(cfg, 'junto')}><Icon nome="janela" /> Usar o app junto</button>
              </div>
              <p className="small muted">
                <b>Só o tempo:</b> tela cheia com o relógio, sem distração. <b>Usar o app junto:</b> um relógio pequeno
                fica no canto de todas as telas, para resolver questões ou ver o cronograma enquanto o tempo corre.
                Dá para trocar durante a sessão. O app não bloqueia outros aplicativos; ele conta cada vez que você sai da aba.
              </p>
            </>
          )}
          {s.resultado && !s.fase && (
            <div className="msg-ok" role="status">
              {s.resultado.minutos ? `Sessão gravada: ${s.resultado.minutos} min` : 'Sessão muito curta, não foi gravada'}
              {` · você saiu da aba ${s.resultado.saidas} ${s.resultado.saidas === 1 ? 'vez' : 'vezes'}.`}
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
              {hoje.map((x) => (
                <div key={x.id} className="row-between" style={{ borderBottom: '1px solid var(--line)', padding: '8px 0' }}>
                  <div className="row">
                    <b>{new Date(x.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</b>
                    {x.materia_id ? <MateriaChip materia={materiaPorId[x.materia_id]} /> : <span className="muted small">Sem matéria</span>}
                  </div>
                  <span className="small muted">{x.minutos} min · {x.saidas_aba} saídas{x.completou ? '' : ' · encerrada antes'}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
