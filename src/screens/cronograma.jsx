// Cronograma: a semana em blocos.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { DIAS_SEMANA, diaDaSemana, hojeISO } from '../lib/datas.js'
import { TIPOS_BLOCO, situacaoBloco, ordenarBlocos, validarBloco } from '../lib/cronograma.js'
import { semanaSugerida, temFimDeSemana } from '../lib/series.js'
import { Campo, Confirmar, ERRO_GENERICO, Estado, Icon, Janela, PageHeader, avisar, useDesktop } from '../components/index.jsx'

const CLASSE = { feito: 'feito', agora: 'now', perdido: 'missed', futuro: '' }

export default function Cronograma() {
  const { perfil, materias, materiaPorId, tarefas } = useEstudo()
  const desktop = useDesktop()
  const [blocos, setBlocos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [dia, setDia] = useState(diaDaSemana())
  const [editando, setEditando] = useState(null)
  const [apagando, setApagando] = useState(null)
  const [trocando, setTrocando] = useState(false)

  const carregar = async () => {
    const r = await dados.listarBlocos()
    if (r.erro) setErro(r.erro); else setBlocos(r.data)
    setCarregando(false)
  }
  useEffect(() => { carregar() }, [])

  const fimDeSemana = temFimDeSemana(perfil.serie) || blocos.some((b) => b.dia_semana > 5)
  const dias = fimDeSemana ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5]
  const hoje = diaDaSemana()
  const diaVisivel = dias.includes(dia) ? dia : 1

  async function marcar(b, feito) {
    const novo = { ...b, feito_em: feito ? hojeISO() : null }
    setBlocos(blocos.map((x) => (x.id === b.id ? novo : x)))
    const r = await dados.salvarBloco(novo)
    if (r.erro) { setBlocos(blocos); avisar(ERRO_GENERICO, true) }
  }

  async function salvar(b) {
    const r = await dados.salvarBloco(b)
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setBlocos(b.id ? blocos.map((x) => (x.id === b.id ? r.data : x)) : [...blocos, r.data])
    setEditando(null)
    avisar('Salvo.')
  }

  async function apagar(b) {
    const r = await dados.apagarBloco(b.id)
    if (r.erro) avisar(ERRO_GENERICO, true); else setBlocos(blocos.filter((x) => x.id !== b.id))
    setApagando(null)
  }

  async function carregarSugerida() {
    const r = await dados.trocarSemana(semanaSugerida(perfil.serie, materias, tarefas))
    setTrocando(false)
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setBlocos(r.data)
    avisar('Semana sugerida carregada.')
  }

  const renderDia = (d) => {
    const lista = ordenarBlocos(blocos.filter((b) => b.dia_semana === d))
    return (
      <section key={d} className={'day' + (d === hoje ? ' today' : '')} aria-label={DIAS_SEMANA[d - 1]}>
        <div className="day-head">
          <h3>{DIAS_SEMANA[d - 1]}</h3>
          {d === hoje && <span className="pill info">Hoje</span>}
        </div>
        <div className="blocks">
          {lista.length === 0 && <div className="empty small">Nenhum bloco.</div>}
          {lista.map((b) => {
            const sit = situacaoBloco(b)
            const m = materiaPorId[b.materia_id]
            const t = tarefas.find((x) => x.id === b.tarefa_id)
            return (
              <div key={b.id} className={'bloco ' + CLASSE[sit]} style={{ '--h': m ? m.cor : 200 }}>
                <div className="row-between">
                  <span className="hora">{b.inicio}–{b.fim}</span>
                  <button className="icon-btn" aria-label={`Editar bloco das ${b.inicio}`} onClick={() => setEditando(b)}><Icon nome="lapis" tamanho={18} /></button>
                </div>
                <div className="small"><b>{m ? m.nome : b.tipo}</b>{m && b.tipo !== 'Estudo' ? ` · ${b.tipo}` : ''}</div>
                <p className="oque">{b.titulo}</p>
                {t && <p className="small muted">Tarefa: {t.titulo}</p>}
                <label className="check">
                  <input type="checkbox" checked={sit === 'feito'} onChange={(e) => marcar(b, e.target.checked)} />
                  {sit === 'agora' ? 'Agora · feito' : sit === 'perdido' ? 'Sem registro · feito' : 'Feito'}
                </label>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div>
      <PageHeader titulo="Cronograma">
        <button className="btn" onClick={() => setTrocando(true)}>Carregar semana sugerida</button>
        <button className="btn primary" onClick={() => setEditando({ dia_semana: diaVisivel })}><Icon nome="mais_sinal" /> Bloco</button>
      </PageHeader>
      <Estado carregando={carregando} erro={erro} vazio={blocos.length === 0}
        textoVazio="Sua semana está vazia. Carregue a semana sugerida para o seu ano ou crie seus próprios blocos.">
        {desktop ? (
          <div className="week">{dias.map(renderDia)}</div>
        ) : (
          <>
            <div className="dia-nav">
              <button className="icon-btn" aria-label="Dia anterior" disabled={diaVisivel === dias[0]} onClick={() => setDia(diaVisivel - 1)}><Icon nome="voltar" /></button>
              <b>{DIAS_SEMANA[diaVisivel - 1]}{diaVisivel === hoje ? ' (hoje)' : ''}</b>
              <button className="icon-btn" aria-label="Próximo dia" disabled={diaVisivel === dias[dias.length - 1]} onClick={() => setDia(diaVisivel + 1)}><Icon nome="avancar" /></button>
            </div>
            {renderDia(diaVisivel)}
          </>
        )}
      </Estado>

      {editando && <FormBloco inicial={editando} materias={materias} tarefas={tarefas.filter((t) => t.status !== 'Concluído')}
        aoFechar={() => setEditando(null)} aoSalvar={salvar}
        aoApagar={editando.id ? () => { setApagando(editando); setEditando(null) } : null} />}
      {apagando && <Confirmar texto={`Apagar '${apagando.titulo}'? Isso não pode ser desfeito.`} aoCancelar={() => setApagando(null)} aoConfirmar={() => apagar(apagando)} />}
      {trocando && <Confirmar texto="Isso troca a sua semana atual pela sugerida da sua série. Continuar?" rotulo="Continuar"
        aoCancelar={() => setTrocando(false)} aoConfirmar={carregarSugerida} />}
    </div>
  )
}

function FormBloco({ inicial, materias, tarefas, aoFechar, aoSalvar, aoApagar }) {
  const [b, setB] = useState({ dia_semana: 1, inicio: '14:00', fim: '14:50', materia_id: '', titulo: '', tipo: 'Estudo', tarefa_id: '', feito_em: null, ...inicial })
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  const set = (k) => (e) => setB({ ...b, [k]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    const pronto = { ...b, dia_semana: Number(b.dia_semana), materia_id: b.materia_id || null, tarefa_id: b.tarefa_id || null, titulo: (b.titulo || '').trim() }
    const v = validarBloco(pronto)
    setErros(v)
    if (Object.keys(v).length) return
    setSalvando(true)
    await aoSalvar(pronto)
    setSalvando(false)
  }

  return (
    <Janela titulo={inicial.id ? 'Editar bloco' : 'Novo bloco'} aoFechar={aoFechar}>
      <form className="form-grid" onSubmit={enviar} noValidate>
        <div className="form-row">
          <Campo rotulo="Dia" erro={erros.dia_semana}>
            <select className="ipt" value={b.dia_semana} onChange={set('dia_semana')}>{DIAS_SEMANA.map((d, i) => <option key={d} value={i + 1}>{d}</option>)}</select>
          </Campo>
          <Campo rotulo="Início" erro={erros.inicio}><input className="ipt" type="time" value={b.inicio} onChange={set('inicio')} /></Campo>
          <Campo rotulo="Fim" erro={erros.fim}><input className="ipt" type="time" value={b.fim} onChange={set('fim')} aria-invalid={!!erros.fim} /></Campo>
        </div>
        <div className="form-row">
          <Campo rotulo="Tipo" erro={erros.tipo}>
            <select className="ipt" value={b.tipo} onChange={set('tipo')}>{TIPOS_BLOCO.map((t) => <option key={t}>{t}</option>)}</select>
          </Campo>
          <Campo rotulo={b.tipo === 'Estudo' ? 'Matéria' : 'Matéria (opcional)'} erro={erros.materia_id}>
            <select className="ipt" value={b.materia_id || ''} onChange={set('materia_id')} aria-invalid={!!erros.materia_id}>
              <option value="">Escolha…</option>
              {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </select>
          </Campo>
        </div>
        <Campo rotulo="O que fazer" erro={erros.titulo}>
          <input className="ipt" value={b.titulo} onChange={set('titulo')} maxLength={80} placeholder="Ex.: Exercícios resolvidos" aria-invalid={!!erros.titulo} />
        </Campo>
        <Campo rotulo="Tarefa ligada (opcional)">
          <select className="ipt" value={b.tarefa_id || ''} onChange={set('tarefa_id')}>
            <option value="">Nenhuma</option>
            {tarefas.map((t) => <option key={t.id} value={t.id}>{t.titulo}</option>)}
          </select>
        </Campo>
        <div className="janela-acoes">
          {aoApagar && <button type="button" className="btn danger" onClick={aoApagar} style={{ marginRight: 'auto' }}><Icon nome="lixo" /> Apagar</button>}
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
