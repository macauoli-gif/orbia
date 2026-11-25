// Faixa de metas e avisos: topo de todas as telas do aluno.
import { useState } from 'react'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { progressoDaSemana, porcentagem, textoMinutos } from '../lib/metas.js'
import { avisosDeTarefas } from '../lib/tarefas.js'

function Medidor({ rotulo, feito, meta, texto }) {
  const p = porcentagem(feito, meta)
  return (
    <div className="medidor">
      <div className="topo"><span>{rotulo}</span><b>{texto}</b></div>
      <div className={'barra' + (p >= 100 ? ' cheia' : '')} role="progressbar" aria-label={rotulo} aria-valuemin={0} aria-valuemax={100} aria-valuenow={p}>
        <i style={{ width: p + '%' }} />
      </div>
    </div>
  )
}

export default function FaixaMetas({ goto }) {
  const { perfil, tarefas, respostas, sessoes } = useEstudo()
  const [todos, setTodos] = useState(false)
  const p = progressoDaSemana({ perfil, respostas, sessoes })

  const avisos = avisosDeTarefas(tarefas).map((a) => ({
    chave: a.tarefa.id, classe: a.tipo === 'atrasada' ? 'crit' : 'warn', tag: a.tipo === 'atrasada' ? 'Atrasada' : 'Prazo',
    texto: a.texto, abrir: () => goto('quadro', { abrir: a.tarefa.id }),
  }))
  if (p.ritmoBaixo) avisos.push({ chave: 'ritmo', classe: 'warn', tag: 'Ritmo', texto: p.textoRitmo, abrir: () => goto('questoes') })
  const visiveis = todos ? avisos : avisos.slice(0, 3)

  return (
    <section className="faixa" aria-label="Metas e avisos">
      <div className="quem">
        <b>{perfil.nome}</b><span className="pill plain">{perfil.serie}</span>
      </div>
      <div className="medidores">
        <Medidor rotulo="Questões da semana" feito={p.questoes} meta={p.metaQ} texto={`${p.questoes} de ${p.metaQ}`} />
        <Medidor rotulo="Foco da semana" feito={p.focoMin} meta={p.metaFoco} texto={`${textoMinutos(p.focoMin)} de ${textoMinutos(p.metaFoco)}`} />
        {p.mostraProvas && (
          <div className="medidor">
            <div className="topo"><span>Provas anteriores no mês</span><b>meta {p.metaProvas}</b></div>
            <p className="small muted" style={{ marginTop: 4 }}>Chega em breve, com os Simulados.</p>
          </div>
        )}
      </div>
      {avisos.length === 0 ? <p className="tudo-em-dia">Tudo em dia. Bom estudo!</p> : (
        <>
          <ul className="avisos">
            {visiveis.map((a) => (
              <li key={a.chave}>
                <button className={'aviso ' + a.classe} onClick={a.abrir}><span className="tag">{a.tag}</span><span className="grow">{a.texto}</span></button>
              </li>
            ))}
          </ul>
          {avisos.length > 3 && (
            <button className="link-btn" style={{ justifySelf: 'start' }} onClick={() => setTodos(!todos)}>
              {todos ? 'Ver menos' : `Ver todos (${avisos.length})`}
            </button>
          )}
        </>
      )}
    </section>
  )
}
