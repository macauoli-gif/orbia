// Caderno de erros: questões erradas ou salvas para revisar.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { MOTIVOS_ERRO } from '../lib/questoes.js'
import { Confirmar, ERRO_GENERICO, Estado, Icon, MateriaChip, PageHeader, avisar } from '../components/index.jsx'
import { FormErro } from './resolver.jsx'

export default function Caderno({ goto }) {
  const { materias, materiaPorId } = useEstudo()
  const [itens, setItens] = useState([])
  const [questoes, setQuestoes] = useState({})
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [fMateria, setFMateria] = useState('')
  const [fMotivo, setFMotivo] = useState('')
  const [editando, setEditando] = useState(null)
  const [tirando, setTirando] = useState(null)

  useEffect(() => {
    Promise.all([dados.listarCaderno(), dados.listarQuestoes()]).then(([c, q]) => {
      if (c.erro || q.erro) setErro(c.erro || q.erro)
      else { setItens(c.data); setQuestoes(Object.fromEntries(q.data.map((x) => [x.id, x]))) }
      setCarregando(false)
    })
  }, [])

  const lista = itens
    .filter((i) => questoes[i.questao_id])
    .filter((i) => (!fMateria || questoes[i.questao_id].materia_id === fMateria) && (!fMotivo || i.motivo === fMotivo))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))

  return (
    <div>
      <button className="link-btn" style={{ marginTop: 12 }} onClick={() => goto('questoes')}><Icon nome="voltar" tamanho={16} /> Questões</button>
      <PageHeader titulo="Caderno de erros" />
      <div className="filtros">
        <select className="ipt" aria-label="Matéria" value={fMateria} onChange={(e) => setFMateria(e.target.value)}>
          <option value="">Todas as matérias</option>
          {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
        </select>
        <select className="ipt" aria-label="Motivo" value={fMotivo} onChange={(e) => setFMotivo(e.target.value)}>
          <option value="">Todos os motivos</option>
          {MOTIVOS_ERRO.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <Estado carregando={carregando} erro={erro} vazio={lista.length === 0}
        textoVazio={itens.length === 0 ? 'Nenhum erro anotado ainda. Quando errar uma questão, anote aqui o motivo para não errar de novo.' : 'Nada com estes filtros.'}>
        <div className="lista">
          {lista.map((i) => {
            const q = questoes[i.questao_id]
            return (
              <div key={i.id} className="item">
                <div className="linha">
                  <MateriaChip materia={materiaPorId[q.materia_id]} />
                  <span className="small muted">{q.assunto}</span>
                  {i.motivo ? <span className="pill crit">{i.motivo}</span> : <span className="pill info">Para revisar</span>}
                </div>
                <p className="trecho">{q.enunciado}</p>
                {i.anotacao && <p className="small" style={{ marginTop: 6 }}><b>Anotação:</b> {i.anotacao}</p>}
                <div className="row" style={{ marginTop: 8 }}>
                  <button className="btn primary" onClick={() => goto('resolver', { id: q.id, lista: lista.map((x) => x.questao_id) })}>Refazer</button>
                  <button className="btn" onClick={() => setEditando(i)}><Icon nome="lapis" tamanho={18} /> Editar anotação</button>
                  <button className="btn ghost" onClick={() => setTirando(i)}>Tirar do caderno</button>
                </div>
              </div>
            )
          })}
        </div>
      </Estado>

      {editando && <FormErro inicial={editando} aoFechar={() => setEditando(null)} aoSalvar={async (motivo, anotacao) => {
        const r = await dados.anotarNoCaderno({ questao_id: editando.questao_id, motivo, anotacao, revisar: editando.revisar })
        if (r.erro) { avisar(ERRO_GENERICO, true); return }
        setItens(itens.map((x) => (x.id === r.data.id ? r.data : x))); setEditando(null); avisar('Salvo.')
      }} />}
      {tirando && <Confirmar texto="Tirar esta questão do caderno de erros?" rotulo="Tirar" aoCancelar={() => setTirando(null)}
        aoConfirmar={async () => {
          const r = await dados.tirarDoCaderno(tirando.id)
          if (r.erro) avisar(ERRO_GENERICO, true); else setItens(itens.filter((x) => x.id !== tirando.id))
          setTirando(null)
        }} />}
    </div>
  )
}
