// Banco de resumos: os do app e os do aluno.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { serieAlcanca } from '../lib/series.js'
import { Campo, Confirmar, ERRO_GENERICO, Estado, Icon, Janela, MateriaChip, PageHeader, avisar } from '../components/index.jsx'

const modelo = (materia) => `Modelo para montar o seu resumo de ${materia}.\n\nTema da aula:\n• \n\nIdeias principais (3 a 5):\n• \n• \n• \n\nPalavras-chave e definições:\n• \n\nExemplo ou exercício que fixou o conteúdo:\n• \n\nDúvidas para levar ao professor:\n• `

export default function Resumos() {
  const { perfil, materias, materiaPorId } = useEstudo()
  const [resumos, setResumos] = useState([])
  const [lidos, setLidos] = useState(new Set())
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [materia, setMateria] = useState('')
  const [busca, setBusca] = useState('')
  const [origem, setOrigem] = useState('Todos')
  const [soSugerido, setSoSugerido] = useState(perfil.so_sugerido !== false)
  const [aberto, setAberto] = useState(null)
  const [editando, setEditando] = useState(null)
  const [apagando, setApagando] = useState(null)

  useEffect(() => {
    Promise.all([dados.listarResumos(), dados.listarResumosLidos()]).then(([r, l]) => {
      if (r.erro || l.erro) setErro(r.erro || l.erro)
      else { setResumos(r.data); setLidos(new Set(l.data.map((x) => x.resumo_id))) }
      setCarregando(false)
    })
  }, [])

  const termo = busca.trim().toLowerCase()
  const base = resumos.filter((r) =>
    (origem === 'Todos' || (origem === 'Do app' ? r.user_id == null : r.user_id != null)) &&
    (!soSugerido || r.user_id != null || serieAlcanca(r.serie_minima, perfil.serie)) &&
    (!termo || (r.titulo + ' ' + r.texto).toLowerCase().includes(termo)))
  const lista = base.filter((r) => !materia || r.materia_id === materia).sort((a, b) => a.titulo.localeCompare(b.titulo))
  const contagem = (id) => base.filter((r) => r.materia_id === id).length

  async function alternarLido(r, lido) {
    const novo = new Set(lidos); lido ? novo.add(r.id) : novo.delete(r.id); setLidos(novo)
    const x = await dados.marcarResumoLido(r.id, lido)
    if (x.erro) { setLidos(lidos); avisar(ERRO_GENERICO, true) }
  }

  return (
    <div>
      <PageHeader titulo="Banco de resumos">
        <button className="btn primary" onClick={() => setEditando({ materia_id: materia || '' })}><Icon nome="mais_sinal" /> Meu resumo</button>
      </PageHeader>
      <div className="duas-colunas">
        <div className="materias-lista" role="group" aria-label="Matérias">
          <button aria-pressed={!materia} onClick={() => setMateria('')}>Todas <span>{base.length}</span></button>
          {materias.map((m) => (
            <button key={m.id} aria-pressed={materia === m.id} onClick={() => setMateria(m.id)}>{m.nome} <span>{contagem(m.id)}</span></button>
          ))}
        </div>
        <div className="stack">
          <div className="filtros">
            <input className="ipt" type="search" placeholder="Buscar no texto" aria-label="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <select className="ipt" aria-label="Origem" value={origem} onChange={(e) => setOrigem(e.target.value)}>
              <option>Todos</option><option>Do app</option><option>Meus</option>
            </select>
          </div>
          <label className="check"><input type="checkbox" checked={soSugerido} onChange={(e) => setSoSugerido(e.target.checked)} /> Só o que o app sugere para o {perfil.serie}</label>
          <Estado carregando={carregando} erro={erro} vazio={lista.length === 0} textoVazio="Nenhum resumo nesta matéria ainda. Que tal escrever o seu?">
            <div className="lista">
              {lista.map((r) => (
                <div key={r.id} className="item">
                  <div className="linha">
                    <MateriaChip materia={materiaPorId[r.materia_id]} />
                    <span className={'pill ' + (r.user_id ? 'info' : 'plain')}>{r.user_id ? 'Meu' : 'Do app'}</span>
                    {lidos.has(r.id) && <span className="pill ok">lido</span>}
                  </div>
                  <button className="link-btn" style={{ padding: '4px 0', textAlign: 'left', color: 'var(--ink)', fontSize: 16 }} onClick={() => setAberto(r)}>{r.titulo}</button>
                  <p className="trecho">{r.texto}</p>
                  <label className="check"><input type="checkbox" checked={lidos.has(r.id)} onChange={(e) => alternarLido(r, e.target.checked)} /> Lido</label>
                </div>
              ))}
            </div>
          </Estado>
        </div>
      </div>

      {aberto && (
        <Janela titulo={aberto.titulo} aoFechar={() => setAberto(null)}>
          <div className="stack">
            <div className="row"><MateriaChip materia={materiaPorId[aberto.materia_id]} /><span className="pill plain">{aberto.user_id ? 'Meu' : 'Do app'}</span></div>
            <p className="texto-longo">{aberto.texto}</p>
            {!aberto.user_id && <p className="small muted">Texto de apoio do app. Confira sempre com o caderno e com o professor.</p>}
            <div className="janela-acoes">
              {aberto.user_id && <>
                <button className="btn danger" onClick={() => { setApagando(aberto); setAberto(null) }}><Icon nome="lixo" /> Apagar</button>
                <button className="btn" onClick={() => { setEditando(aberto); setAberto(null) }}><Icon nome="lapis" /> Editar</button>
              </>}
              <button className="btn primary" onClick={() => { alternarLido(aberto, !lidos.has(aberto.id)); setAberto(null) }}>
                {lidos.has(aberto.id) ? 'Marcar como não lido' : 'Marcar como lido'}
              </button>
            </div>
          </div>
        </Janela>
      )}

      {editando && <FormResumo inicial={editando} materias={materias} aoFechar={() => setEditando(null)} aoSalvar={async (r) => {
        const x = await dados.salvarResumo(r)
        if (x.erro) { avisar(ERRO_GENERICO, true); return }
        setResumos(r.id ? resumos.map((y) => (y.id === r.id ? x.data : y)) : [...resumos, x.data])
        setEditando(null); avisar('Salvo.')
      }} />}
      {apagando && <Confirmar texto={`Apagar '${apagando.titulo}'? Isso não pode ser desfeito.`} aoCancelar={() => setApagando(null)}
        aoConfirmar={async () => {
          const x = await dados.apagarResumo(apagando.id)
          if (x.erro) avisar(ERRO_GENERICO, true); else setResumos(resumos.filter((y) => y.id !== apagando.id))
          setApagando(null)
        }} />}
    </div>
  )
}

function FormResumo({ inicial, materias, aoFechar, aoSalvar }) {
  const nomeDe = (id) => materias.find((m) => m.id === id)?.nome || 'esta matéria'
  const [r, setR] = useState({ titulo: '', texto: inicial.id ? '' : modelo(nomeDe(inicial.materia_id)), serie_minima: null, ...inicial })
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  const trocarMateria = (id) => {
    // Se o texto ainda é o modelo, troca o nome da matéria no modelo.
    const aindaModelo = !r.id && r.texto === modelo(nomeDe(r.materia_id))
    setR({ ...r, materia_id: id, texto: aindaModelo ? modelo(nomeDe(id)) : r.texto })
  }
  return (
    <Janela titulo={inicial.id ? 'Editar resumo' : 'Meu resumo'} aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        const v = {}
        if (!r.titulo.trim()) v.titulo = 'Escreva o título.'
        if (!r.materia_id) v.materia_id = 'Escolha a matéria.'
        if (!r.texto.trim()) v.texto = 'Escreva o texto.'
        setErros(v)
        if (Object.keys(v).length) return
        setSalvando(true); await aoSalvar({ ...r, titulo: r.titulo.trim() }); setSalvando(false)
      }}>
        <Campo rotulo="Título" erro={erros.titulo}><input className="ipt" value={r.titulo} onChange={(e) => setR({ ...r, titulo: e.target.value })} /></Campo>
        <Campo rotulo="Matéria" erro={erros.materia_id}>
          <select className="ipt" value={r.materia_id} onChange={(e) => trocarMateria(e.target.value)}><option value="">Escolha…</option>{materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
        </Campo>
        <Campo rotulo="Texto" erro={erros.texto}><textarea className="ipt" style={{ minHeight: 260 }} value={r.texto} onChange={(e) => setR({ ...r, texto: e.target.value })} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
