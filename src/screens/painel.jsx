// Painel geral (topo do Quadro, a tela inicial): avisos, lembretes e metas.
// As contas moram em lib/painel.js e lib/metas.js; aqui só o desenho.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { AVISOS_VISIVEIS, dataPorExtenso, painelDoDia } from '../lib/painel.js'
import { progressoDaSemana, porcentagem, textoMinutos } from '../lib/metas.js'
import { configSerie } from '../lib/series.js'

const CLASSE = { atrasada: 'crit', hoje: 'warn', breve: 'warn', 'sem-registro': 'warn', agora: 'info' }

function Contador({ n, rotulo, classe }) {
  return <div className={'contador ' + (n ? classe : 'ok')}><b>{n}</b><span>{rotulo}</span></div>
}

function Meta({ rotulo, feito, meta, texto }) {
  const p = porcentagem(feito, meta)
  return (
    <div className="meta-linha">
      <span>{rotulo}</span>
      <div className={'barra' + (p >= 100 ? ' cheia' : '')} role="progressbar" aria-label={rotulo} aria-valuemin={0} aria-valuemax={100} aria-valuenow={p}>
        <i style={{ width: p + '%' }} />
      </div>
      <b>{texto}</b>
    </div>
  )
}

export default function Painel({ goto }) {
  const { perfil, tarefas, respostas, sessoes, materiaPorId } = useEstudo()
  const [blocos, setBlocos] = useState([])
  const [todos, setTodos] = useState(false)

  // Sem os blocos o painel continua útil (só não mostra os de hoje).
  useEffect(() => { dados.listarBlocos().then((r) => { if (!r.erro) setBlocos(r.data) }) }, [])

  const p = painelDoDia({ tarefas, blocos, nomeMateria: (id) => materiaPorId[id]?.nome })
  const m = progressoDaSemana({ perfil, respostas, sessoes })
  const serie = configSerie(perfil.serie)
  const visiveis = todos ? p.avisos : p.avisos.slice(0, AVISOS_VISIVEIS)

  return (
    <section className="painel" aria-label="Painel do dia">
      <div className="painel-topo">
        <div>
          <p className="small muted primeira-maiuscula">{dataPorExtenso()}</p>
          <p>Olá, <b>{perfil.nome}</b> · {serie?.nome || perfil.serie}</p>
        </div>
        <button className="btn" onClick={() => goto('conta')}>Alterar nome ou série</button>
      </div>

      <div className="contadores">
        <Contador n={p.atrasadas} rotulo="Tarefas atrasadas" classe="crit" />
        <Contador n={p.vencem48h} rotulo="Vencem em até 48 h" classe="warn" />
        <Contador n={p.pendencias} rotulo="Pendências no total" classe="neutro" />
        <Contador n={p.semRegistro} rotulo="Blocos de hoje sem registro" classe="warn" />
      </div>

      {p.avisos.length === 0 ? <p className="tudo-em-dia">Tudo em dia. Nenhum aviso agora.</p> : (
        <>
          <ul className="avisos">
            {visiveis.map((a) => (
              <li key={a.tipo + (a.tarefaId || a.blocoId)}>
                <button className={'aviso ' + CLASSE[a.tipo]}
                  onClick={() => (a.tarefaId ? goto('quadro', { abrir: a.tarefaId }) : goto('cronograma'))}>
                  <span className="tag">{a.tag}</span><span className="grow">{a.texto}</span>
                </button>
              </li>
            ))}
          </ul>
          {p.avisos.length > AVISOS_VISIVEIS && (
            <button className="btn" style={{ justifySelf: 'start' }} onClick={() => setTodos(!todos)}>
              {todos ? 'Mostrar menos' : `Ver todos os ${p.avisos.length} avisos`}
            </button>
          )}
        </>
      )}

      <div className="metas-semana">
        <h2>Metas da semana · {perfil.serie}</h2>
        <Meta rotulo="Questões resolvidas" feito={m.questoes} meta={m.metaQ} texto={`${m.questoes} de ${m.metaQ}`} />
        <Meta rotulo="Tempo de foco" feito={m.focoMin} meta={m.metaFoco} texto={`${textoMinutos(m.focoMin)} de ${textoMinutos(m.metaFoco)}`} />
        {m.mostraProvas && (
          <div className="meta-linha">
            <span>Provas anteriores no mês</span>
            <span className="small muted">Chega em breve, com os Simulados.</span>
            <b>meta {m.metaProvas}</b>
          </div>
        )}
        {m.ritmoBaixo && <div className="nota-meta warn">{m.textoRitmo}</div>}
        {serie?.foco && <div className="nota-meta">{serie.foco} Metas sugeridas pelo app. Para mudar, use “Alterar nome ou série”.</div>}
      </div>
    </section>
  )
}
