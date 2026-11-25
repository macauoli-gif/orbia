// Banco de resumos: só do aluno (decidido em 25/11/2026).
// Dois tipos: PDF (anotado com caneta e texto no editor) e Digitado.
import { useEffect, useRef, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { LIMITE_PDF_MB, tituloDoArquivo, validarPdf } from '../lib/anotacoes.js'
import { abrirPdf, fecharPdf } from '../components/pdf.js'
import { Campo, Confirmar, ERRO_GENERICO, Estado, Icon, Janela, MateriaChip, PageHeader, avisar } from '../components/index.jsx'

const modelo = (materia) => `Modelo para montar o seu resumo de ${materia}.\n\nTema da aula:\n• \n\nIdeias principais (3 a 5):\n• \n• \n• \n\nPalavras-chave e definições:\n• \n\nExemplo ou exercício que fixou o conteúdo:\n• \n\nDúvidas para levar ao professor:\n• `

export default function Resumos({ goto }) {
  const { materias, materiaPorId } = useEstudo()
  const [resumos, setResumos] = useState([])
  const [lidos, setLidos] = useState(new Set())
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [materia, setMateria] = useState('')
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('Todos')
  const [aberto, setAberto] = useState(null)
  const [editando, setEditando] = useState(null)
  const [enviando, setEnviando] = useState(null)   // { arquivo, paginas }
  const [apagando, setApagando] = useState(null)
  const [lendoArquivo, setLendoArquivo] = useState(false)
  const seletor = useRef(null)

  useEffect(() => {
    Promise.all([dados.listarResumos(), dados.listarResumosLidos()]).then(([r, l]) => {
      if (r.erro || l.erro) setErro(r.erro || l.erro)
      else { setResumos(r.data); setLidos(new Set(l.data.map((x) => x.resumo_id))) }
      setCarregando(false)
    })
  }, [])

  const termo = busca.trim().toLowerCase()
  const base = resumos.filter((r) =>
    (tipo === 'Todos' || (tipo === 'PDF' ? r.tipo === 'PDF' : r.tipo === 'Digitado')) &&
    (!termo || (r.titulo + ' ' + (r.texto || '') + ' ' + (r.arquivo_nome || '')).toLowerCase().includes(termo)))
  const lista = base.filter((r) => !materia || r.materia_id === materia).sort((a, b) => b.created_at.localeCompare(a.created_at))
  const contagem = (id) => base.filter((r) => r.materia_id === id).length

  async function alternarLido(r, lido) {
    const novo = new Set(lidos); lido ? novo.add(r.id) : novo.delete(r.id); setLidos(novo)
    const x = await dados.marcarResumoLido(r.id, lido)
    if (x.erro) { setLidos(lidos); avisar(ERRO_GENERICO, true) }
  }

  // Confere o arquivo antes de pedir título e matéria: tamanho, assinatura
  // de PDF, e se o pdf.js consegue de fato abrir (e quantas páginas tem).
  async function escolheuArquivo(e) {
    const arquivo = e.target.files?.[0]
    e.target.value = ''
    if (!arquivo) return
    setLendoArquivo(true)
    const bytes = new Uint8Array(await arquivo.arrayBuffer())
    const problema = validarPdf({ nome: arquivo.name, tamanho: arquivo.size, tipo: arquivo.type }, bytes.slice(0, 4))
    if (problema) { setLendoArquivo(false); avisar(problema, true); return }
    try {
      const doc = await abrirPdf(bytes)
      setEnviando({ arquivo, paginas: doc.numPages })
      fecharPdf(doc)
    } catch (_) {
      avisar('Não conseguimos abrir este PDF. Ele pode estar protegido por senha ou danificado.', true)
    }
    setLendoArquivo(false)
  }

  const abrir = (r) => (r.tipo === 'PDF' ? goto('resumo-pdf', { id: r.id }) : setAberto(r))

  return (
    <div>
      <PageHeader titulo="Banco de resumos">
        <button className="btn" onClick={() => setEditando({ materia_id: materia || '' })}><Icon nome="lapis" /> Resumo digitado</button>
        <button className="btn primary" disabled={lendoArquivo} onClick={() => seletor.current.click()}>
          <Icon nome="mais_sinal" /> {lendoArquivo ? 'Abrindo o PDF…' : 'Enviar PDF'}
        </button>
        <input ref={seletor} type="file" accept="application/pdf,.pdf" hidden onChange={escolheuArquivo} />
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
            <input className="ipt" type="search" placeholder="Buscar no título e no texto" aria-label="Buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <select className="ipt" aria-label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Todos</option><option value="PDF">PDF</option><option value="Digitado">Digitados</option>
            </select>
          </div>
          <Estado carregando={carregando} erro={erro} vazio={lista.length === 0}
            textoVazio="Nenhum resumo nesta matéria ainda. Envie o PDF do seu resumo ou escreva um.">
            <div className="lista">
              {lista.map((r) => (
                <div key={r.id} className="item">
                  <div className="linha">
                    <MateriaChip materia={materiaPorId[r.materia_id]} />
                    <span className={'pill ' + (r.tipo === 'PDF' ? 'info' : 'plain')}>{r.tipo === 'PDF' ? `PDF · ${r.paginas} ${r.paginas === 1 ? 'página' : 'páginas'}` : 'Digitado'}</span>
                    {lidos.has(r.id) && <span className="pill ok">lido</span>}
                  </div>
                  <button className="link-btn" style={{ padding: '4px 0', textAlign: 'left', color: 'var(--ink)', fontSize: 16 }} onClick={() => abrir(r)}>{r.titulo}</button>
                  {r.tipo === 'PDF' ? <p className="trecho">{r.arquivo_nome}</p> : <p className="trecho">{r.texto}</p>}
                  <div className="row">
                    {r.tipo === 'PDF' && <button className="btn primary" onClick={() => abrir(r)}><Icon nome="lapis" tamanho={18} /> Abrir e anotar</button>}
                    <label className="check"><input type="checkbox" checked={lidos.has(r.id)} onChange={(e) => alternarLido(r, e.target.checked)} /> Lido</label>
                  </div>
                </div>
              ))}
            </div>
          </Estado>
        </div>
      </div>

      {aberto && (
        <Janela titulo={aberto.titulo} aoFechar={() => setAberto(null)}>
          <div className="stack">
            <div className="row"><MateriaChip materia={materiaPorId[aberto.materia_id]} /><span className="pill plain">Digitado</span></div>
            <p className="texto-longo">{aberto.texto}</p>
            <div className="janela-acoes">
              <button className="btn danger" onClick={() => { setApagando(aberto); setAberto(null) }}><Icon nome="lixo" /> Apagar</button>
              <button className="btn" onClick={() => { setEditando(aberto); setAberto(null) }}><Icon nome="lapis" /> Editar</button>
              <button className="btn primary" onClick={() => { alternarLido(aberto, !lidos.has(aberto.id)); setAberto(null) }}>
                {lidos.has(aberto.id) ? 'Marcar como não lido' : 'Marcar como lido'}
              </button>
            </div>
          </div>
        </Janela>
      )}

      {editando && <FormResumo inicial={editando} materias={materias} aoFechar={() => setEditando(null)}
        aoApagar={editando.id ? () => { setApagando(editando); setEditando(null) } : null}
        aoSalvar={async (r) => {
          const x = await dados.salvarResumo(r)
          if (x.erro) { avisar(ERRO_GENERICO, true); return }
          setResumos(r.id ? resumos.map((y) => (y.id === r.id ? x.data : y)) : [...resumos, x.data])
          setEditando(null); avisar('Salvo.')
        }} />}

      {enviando && <FormPdf arquivo={enviando.arquivo} paginas={enviando.paginas} materias={materias} materiaInicial={materia}
        aoFechar={() => setEnviando(null)}
        aoSalvar={async (v) => {
          const x = await dados.enviarResumoPdf({ arquivo: enviando.arquivo, paginas: enviando.paginas, ...v })
          if (x.erro) { avisar(x.erro, true); return }
          setEnviando(null); avisar('PDF guardado.')
          goto('resumo-pdf', { id: x.data.id })
        }} />}

      {apagando && <Confirmar texto={`Apagar '${apagando.titulo}'?${apagando.tipo === 'PDF' ? ' O PDF e todas as anotações vão junto.' : ''} Isso não pode ser desfeito.`}
        aoCancelar={() => setApagando(null)}
        aoConfirmar={async () => {
          const x = await dados.apagarResumo(apagando.id)
          if (x.erro) avisar(ERRO_GENERICO, true); else setResumos(resumos.filter((y) => y.id !== apagando.id))
          setApagando(null)
        }} />}
    </div>
  )
}

export function FormPdf({ arquivo, paginas, materias, materiaInicial = '', inicial = null, aoFechar, aoSalvar, aoApagar }) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? tituloDoArquivo(arquivo?.name))
  const [materiaId, setMateriaId] = useState(inicial?.materia_id ?? materiaInicial)
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo={inicial ? 'Editar resumo em PDF' : 'Enviar PDF'} aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        const v = {}
        if (!titulo.trim()) v.titulo = 'Escreva o título.'
        if (!materiaId) v.materia_id = 'Escolha a matéria.'
        setErros(v)
        if (Object.keys(v).length) return
        setSalvando(true); await aoSalvar({ titulo: titulo.trim(), materia_id: materiaId }); setSalvando(false)
      }}>
        {arquivo && <p className="small muted">{arquivo.name} · {paginas} {paginas === 1 ? 'página' : 'páginas'} · {arquivo.size < 1024 * 1024 ? Math.max(1, Math.round(arquivo.size / 1024)) + ' KB' : (arquivo.size / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB'} (máximo {LIMITE_PDF_MB} MB)</p>}
        <Campo rotulo="Título" erro={erros.titulo}><input className="ipt" value={titulo} maxLength={120} onChange={(e) => setTitulo(e.target.value)} /></Campo>
        <Campo rotulo="Matéria" erro={erros.materia_id}>
          <select className="ipt" value={materiaId} onChange={(e) => setMateriaId(e.target.value)}><option value="">Escolha…</option>{materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
        </Campo>
        <div className="janela-acoes">
          {aoApagar && <button type="button" className="btn danger" style={{ marginRight: 'auto' }} onClick={aoApagar}><Icon nome="lixo" /> Apagar</button>}
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Guardando…' : inicial ? 'Salvar' : 'Guardar e abrir'}</button>
        </div>
      </form>
    </Janela>
  )
}

function FormResumo({ inicial, materias, aoFechar, aoSalvar, aoApagar }) {
  const nomeDe = (id) => materias.find((m) => m.id === id)?.nome || 'esta matéria'
  const [r, setR] = useState({ titulo: '', texto: inicial.id ? '' : modelo(nomeDe(inicial.materia_id)), tipo: 'Digitado', ...inicial })
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  const trocarMateria = (id) => {
    // Se o texto ainda é o modelo, troca o nome da matéria no modelo.
    const aindaModelo = !r.id && r.texto === modelo(nomeDe(r.materia_id))
    setR({ ...r, materia_id: id, texto: aindaModelo ? modelo(nomeDe(id)) : r.texto })
  }
  return (
    <Janela titulo={inicial.id ? 'Editar resumo' : 'Resumo digitado'} aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        const v = {}
        if (!r.titulo.trim()) v.titulo = 'Escreva o título.'
        if (!r.materia_id) v.materia_id = 'Escolha a matéria.'
        if (!r.texto?.trim()) v.texto = 'Escreva o texto.'
        setErros(v)
        if (Object.keys(v).length) return
        setSalvando(true); await aoSalvar({ ...r, titulo: r.titulo.trim() }); setSalvando(false)
      }}>
        <Campo rotulo="Título" erro={erros.titulo}><input className="ipt" value={r.titulo} onChange={(e) => setR({ ...r, titulo: e.target.value })} /></Campo>
        <Campo rotulo="Matéria" erro={erros.materia_id}>
          <select className="ipt" value={r.materia_id} onChange={(e) => trocarMateria(e.target.value)}><option value="">Escolha…</option>{materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
        </Campo>
        <Campo rotulo="Texto" erro={erros.texto}><textarea className="ipt" style={{ minHeight: 260 }} value={r.texto || ''} onChange={(e) => setR({ ...r, texto: e.target.value })} /></Campo>
        <div className="janela-acoes">
          {aoApagar && <button type="button" className="btn danger" style={{ marginRight: 'auto' }} onClick={aoApagar}><Icon nome="lixo" /> Apagar</button>}
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
