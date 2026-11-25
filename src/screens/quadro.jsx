// Quadro: a tela do dia a dia (Kanban).
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import {
  STATUS_TAREFA, PRIORIDADES, textoPrazo, urgencia, ordenarTarefas, visivelNoQuadro,
  comStatus, validarTarefa, prazoNestaSemana,
} from '../lib/tarefas.js'
import { dataCurta } from '../lib/datas.js'
import { Campo, Confirmar, ERRO_GENERICO, Icon, Janela, MateriaChip, PageHeader, avisar, useDesktop } from '../components/index.jsx'

const CLASSE = { atrasada: 'crit', perto: 'warn', concluida: 'done', normal: '' }
const PILL_PRIO = { Alta: 'crit', Média: 'warn', Baixa: 'plain' }

export default function Quadro({ goto, params }) {
  const { tarefas, setTarefas, materias, materiaPorId } = useEstudo()
  const desktop = useDesktop()
  const [filtroMateria, setFiltroMateria] = useState('')
  const [soSemana, setSoSemana] = useState(false)
  const [aba, setAba] = useState('A fazer')
  const [aberta, setAberta] = useState(null)       // tarefa na gaveta
  const [editando, setEditando] = useState(null)   // tarefa no formulário ({} = nova)
  const [apagando, setApagando] = useState(null)
  const [arrastoSobre, setArrastoSobre] = useState(null)

  useEffect(() => {
    if (params.abrir) {
      const t = tarefas.find((x) => x.id === params.abrir)
      if (t) { setAberta(t); setAba(t.status) }
    }
  }, [params])

  const visiveis = tarefas.filter((t) =>
    visivelNoQuadro(t) && (!filtroMateria || t.materia_id === filtroMateria) && (!soSemana || prazoNestaSemana(t)))

  // Atualiza na hora; se o salvamento falhar, desfaz e avisa.
  async function salvar(t) {
    const antes = tarefas
    if (t.id) setTarefas(tarefas.map((x) => (x.id === t.id ? t : x)))
    const r = await dados.salvarTarefa(t)
    if (r.erro) { setTarefas(antes); avisar(ERRO_GENERICO, true); return false }
    setTarefas((lista) => (t.id ? lista.map((x) => (x.id === r.data.id ? r.data : x)) : [...lista, r.data]))
    avisar('Salvo.')
    return true
  }
  const mover = (t, status) => { setAberta(null); return salvar(comStatus(t, status)) }

  async function apagar(t) {
    const antes = tarefas
    setTarefas(tarefas.filter((x) => x.id !== t.id))
    const r = await dados.apagarTarefa(t.id)
    if (r.erro) { setTarefas(antes); avisar(ERRO_GENERICO, true) }
    setApagando(null); setAberta(null)
  }

  const colunas = desktop ? STATUS_TAREFA : [aba]

  return (
    <div>
      <PageHeader titulo="Quadro">
        <button className="btn primary" onClick={() => setEditando({})}><Icon nome="mais_sinal" /> Nova tarefa</button>
      </PageHeader>
      <div className="toolbar">
        <label className="sr-only" htmlFor="q-materia">Matéria</label>
        <select id="q-materia" className="ipt" value={filtroMateria} onChange={(e) => setFiltroMateria(e.target.value)}>
          <option value="">Todas as matérias</option>
          {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
        </select>
        <label className="check"><input type="checkbox" checked={soSemana} onChange={(e) => setSoSemana(e.target.checked)} /> Só desta semana</label>
      </div>

      {!desktop && (
        <div className="abas" role="tablist">
          {STATUS_TAREFA.map((s) => (
            <button key={s} role="tab" aria-selected={aba === s} onClick={() => setAba(s)}>
              {s} <span className="n">{visiveis.filter((t) => t.status === s).length}</span>
            </button>
          ))}
        </div>
      )}

      {tarefas.length === 0 ? (
        <div className="panel empty">
          Nada por aqui. Crie sua primeira tarefa ou carregue a semana sugerida no Cronograma.
          <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
            <button className="btn primary" onClick={() => setEditando({})}>Nova tarefa</button>
            <button className="btn" onClick={() => goto('cronograma')}>Ir para o Cronograma</button>
          </div>
        </div>
      ) : (
        <div className="board" style={desktop ? null : { gridTemplateColumns: '1fr' }}>
          {colunas.map((status) => {
            const lista = ordenarTarefas(visiveis.filter((t) => t.status === status))
            return (
              <section key={status} className={'col' + (arrastoSobre === status ? ' over' : '')} aria-label={status}
                onDragOver={(e) => { e.preventDefault(); setArrastoSobre(status) }}
                onDragLeave={() => setArrastoSobre(null)}
                onDrop={(e) => {
                  e.preventDefault(); setArrastoSobre(null)
                  const t = tarefas.find((x) => x.id === e.dataTransfer.getData('text/plain'))
                  if (t && t.status !== status) mover(t, status)
                }}>
                {desktop && <div className="col-head"><h3>{status}</h3><span className="n">{lista.length}</span></div>}
                <div className="cards">
                  {lista.length === 0 && <div className="empty">Nenhuma tarefa aqui.</div>}
                  {lista.map((t) => (
                    <button key={t.id} className={'tcard ' + CLASSE[urgencia(t)]} draggable={desktop}
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', t.id)} onClick={() => setAberta(t)}>
                      <p className="titulo">{t.titulo}</p>
                      <div className="meta">
                        <MateriaChip materia={materiaPorId[t.materia_id]} />
                        {t.status !== 'Concluído' && <span>{textoPrazo(t.prazo)}</span>}
                        <span className={'pill ' + PILL_PRIO[t.prioridade]}>{t.prioridade}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {aberta && (
        <Janela titulo={aberta.titulo} aoFechar={() => setAberta(null)}>
          <div className="stack">
            <div className="row">
              <MateriaChip materia={materiaPorId[aberta.materia_id]} />
              <span className={'pill ' + PILL_PRIO[aberta.prioridade]}>{aberta.prioridade}</span>
              <span className="pill plain">{aberta.status}</span>
            </div>
            <p><b>Prazo:</b> {aberta.prazo ? `${dataCurta(aberta.prazo)} (${textoPrazo(aberta.prazo)})` : 'sem prazo'}</p>
            {aberta.concluida_em && <p><b>Concluída em:</b> {new Date(aberta.concluida_em).toLocaleDateString('pt-BR')}</p>}
            {aberta.observacao && <p className="texto-longo">{aberta.observacao}</p>}
            <div>
              <p className="small muted" style={{ marginBottom: 6 }}>Mover para</p>
              <div className="row">
                {STATUS_TAREFA.filter((s) => s !== aberta.status).map((s) => (
                  <button key={s} className="btn" onClick={() => mover(aberta, s)}>{s}</button>
                ))}
              </div>
            </div>
            {aberta.status !== 'Concluído' && (
              <button className="btn primary big" onClick={() => goto('foco', { materia_id: aberta.materia_id, tarefa_id: aberta.id })}>
                <Icon nome="foco" /> Começar foco nesta tarefa
              </button>
            )}
            <div className="janela-acoes">
              <button className="btn danger" onClick={() => setApagando(aberta)}><Icon nome="lixo" /> Apagar</button>
              <button className="btn" onClick={() => { setEditando(aberta); setAberta(null) }}><Icon nome="lapis" /> Editar</button>
            </div>
          </div>
        </Janela>
      )}

      {editando && <FormTarefa inicial={editando} materias={materias} aoFechar={() => setEditando(null)}
        aoSalvar={async (t) => { if (await salvar(t)) setEditando(null) }} />}

      {apagando && <Confirmar texto={`Apagar '${apagando.titulo}'? Isso não pode ser desfeito.`}
        aoCancelar={() => setApagando(null)} aoConfirmar={() => apagar(apagando)} />}
    </div>
  )
}

function FormTarefa({ inicial, materias, aoFechar, aoSalvar }) {
  const [t, setT] = useState({ titulo: '', materia_id: '', prazo: '', prioridade: 'Média', status: 'A fazer', observacao: '', ...inicial })
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  const set = (k) => (e) => setT({ ...t, [k]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    const v = validarTarefa(t)
    setErros(v)
    if (Object.keys(v).length) return
    setSalvando(true)
    // Mudou a situação pelo formulário? A mesma regra do arrastar cuida da data de conclusão.
    const base = inicial.id ? comStatus({ ...inicial, ...t, status: inicial.status }, t.status) : comStatus({ ...t, status: 'A fazer', concluida_em: null }, t.status)
    await aoSalvar({ ...base, titulo: t.titulo.trim(), prazo: t.prazo || null })
    setSalvando(false)
  }

  return (
    <Janela titulo={inicial.id ? 'Editar tarefa' : 'Nova tarefa'} aoFechar={aoFechar}>
      <form className="form-grid" onSubmit={enviar} noValidate>
        <Campo rotulo="Título" erro={erros.titulo}>
          <input className="ipt" value={t.titulo} onChange={set('titulo')} maxLength={120} autoFocus aria-invalid={!!erros.titulo} />
        </Campo>
        <Campo rotulo="Matéria" erro={erros.materia_id}>
          <select className="ipt" value={t.materia_id} onChange={set('materia_id')} aria-invalid={!!erros.materia_id}>
            <option value="">Escolha…</option>
            {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
          </select>
        </Campo>
        <div className="form-row">
          <Campo rotulo="Prazo (opcional)"><input className="ipt" type="date" value={t.prazo || ''} onChange={set('prazo')} /></Campo>
          <Campo rotulo="Prioridade" erro={erros.prioridade}>
            <select className="ipt" value={t.prioridade} onChange={set('prioridade')}>{PRIORIDADES.map((p) => <option key={p}>{p}</option>)}</select>
          </Campo>
          <Campo rotulo="Situação" erro={erros.status}>
            <select className="ipt" value={t.status} onChange={set('status')}>{STATUS_TAREFA.map((s) => <option key={s}>{s}</option>)}</select>
          </Campo>
        </div>
        <Campo rotulo="Observação (opcional)"><textarea className="ipt" value={t.observacao || ''} onChange={set('observacao')} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
