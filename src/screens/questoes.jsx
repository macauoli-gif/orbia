// Questões: banco com filtros, cadastro de questão própria.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { NIVEIS, LETRAS, SITUACOES, filtrarQuestoes, ultimaResposta, validarQuestao } from '../lib/questoes.js'
import { Campo, ERRO_GENERICO, Estado, Icon, Janela, MateriaChip, PageHeader, avisar } from '../components/index.jsx'

// Guardado fora da tela para os filtros continuarem ao voltar de uma questão.
let filtroGuardado = null

export default function Questoes({ goto }) {
  const { perfil, materias, materiaPorId, respostas } = useEstudo()
  const [questoes, setQuestoes] = useState([])
  const [caderno, setCaderno] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [f, setF] = useState(filtroGuardado || { materia_id: '', assunto: '', nivel: '', instituicao: '', ano: '', situacao: 'Todas', soSugerido: perfil.so_sugerido !== false })
  const [cadastrando, setCadastrando] = useState(false)

  useEffect(() => {
    Promise.all([dados.listarQuestoes(), dados.listarCaderno()]).then(([q, c]) => {
      if (q.erro || c.erro) setErro(q.erro || c.erro)
      else { setQuestoes(q.data); setCaderno(c.data) }
      setCarregando(false)
    })
  }, [])
  useEffect(() => { filtroGuardado = f }, [f])

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value, ...(k === 'materia_id' ? { assunto: '' } : {}) })
  const doFiltroMateria = questoes.filter((q) => !f.materia_id || q.materia_id === f.materia_id)
  const assuntos = [...new Set(doFiltroMateria.map((q) => q.assunto))].sort()
  const instituicoes = [...new Set(questoes.map((q) => q.instituicao).filter(Boolean))].sort()
  const anos = [...new Set(questoes.map((q) => q.ano).filter(Boolean))].sort((a, b) => b - a)
  const lista = filtrarQuestoes(questoes, f, { serie: perfil.serie, respostas, caderno })

  return (
    <div>
      <PageHeader titulo="Questões">
        <button className="btn" onClick={() => goto('caderno')}><Icon nome="caderno" /> Caderno de erros</button>
        <button className="btn primary" onClick={() => setCadastrando(true)}><Icon nome="mais_sinal" /> Cadastrar questão</button>
      </PageHeader>
      <div className="filtros">
        <select className="ipt" aria-label="Matéria" value={f.materia_id} onChange={set('materia_id')}>
          <option value="">Todas as matérias</option>
          {materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
        </select>
        <select className="ipt" aria-label="Assunto" value={f.assunto} onChange={set('assunto')}>
          <option value="">Todos os assuntos</option>
          {assuntos.map((a) => <option key={a}>{a}</option>)}
        </select>
        <select className="ipt" aria-label="Nível" value={f.nivel} onChange={set('nivel')}>
          <option value="">Todos os níveis</option>
          {NIVEIS.map((n) => <option key={n}>{n}</option>)}
        </select>
        <select className="ipt" aria-label="Instituição" value={f.instituicao} onChange={set('instituicao')}>
          <option value="">Todas as instituições</option>
          {instituicoes.map((i) => <option key={i}>{i}</option>)}
        </select>
        <select className="ipt" aria-label="Ano" value={f.ano} onChange={set('ano')}>
          <option value="">Todos os anos</option>
          {anos.map((a) => <option key={a}>{a}</option>)}
        </select>
        <select className="ipt" aria-label="Situação" value={f.situacao} onChange={set('situacao')}>
          {SITUACOES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <label className="check"><input type="checkbox" checked={f.soSugerido} onChange={set('soSugerido')} /> Mostrar só o que o app sugere para o {perfil.serie}</label>

      <Estado carregando={carregando} erro={erro} vazio={lista.length === 0}
        textoVazio="Nenhuma questão com estes filtros. Tente tirar um filtro ou desmarcar 'só o que o app sugere'.">
        <p className="small muted" style={{ margin: '4px 0 8px' }}>{lista.length} {lista.length === 1 ? 'questão' : 'questões'}</p>
        <div className="lista">
          {lista.map((q) => {
            const r = ultimaResposta(q.id, respostas)
            return (
              <button key={q.id} className="item" onClick={() => goto('resolver', { id: q.id, lista: lista.map((x) => x.id) })}>
                <div className="linha">
                  <MateriaChip materia={materiaPorId[q.materia_id]} />
                  <span className="small muted">{q.assunto} · {q.nivel}{q.instituicao ? ` · ${q.instituicao}` : ''}{q.ano ? ` ${q.ano}` : ''}</span>
                  {q.user_id && <span className="pill info">minha</span>}
                  {r && <span className={'pill ' + (r.acertou ? 'ok' : 'crit')}>{r.acertou ? 'acertou' : 'errou'}</span>}
                </div>
                <p className="trecho">{q.enunciado}</p>
              </button>
            )
          })}
        </div>
      </Estado>

      {cadastrando && <FormQuestao materias={materias} aoFechar={() => setCadastrando(false)}
        aoSalvar={async (q) => {
          const r = await dados.salvarQuestao(q)
          if (r.erro) { avisar(ERRO_GENERICO, true); return }
          setQuestoes([...questoes, r.data]); setCadastrando(false); avisar('Salvo.')
        }} />}
    </div>
  )
}

function FormQuestao({ materias, aoFechar, aoSalvar }) {
  const [q, setQ] = useState({ materia_id: '', assunto: '', nivel: 'Médio', instituicao: '', ano: '', enunciado: '', correta: '', resposta_comentada: '' })
  const [qtd, setQtd] = useState(5)
  const [alts, setAlts] = useState(LETRAS.map((letra) => ({ letra, texto: '', explicacao: '' })))
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  const set = (k) => (e) => setQ({ ...q, [k]: e.target.value })
  const setAlt = (i, k) => (e) => setAlts(alts.map((a, j) => (j === i ? { ...a, [k]: e.target.value } : a)))

  async function enviar(e) {
    e.preventDefault()
    const pronta = { ...q, assunto: q.assunto.trim(), instituicao: q.instituicao.trim() || null, ano: q.ano ? Number(q.ano) : null,
      alternativas: alts.slice(0, qtd), serie_minima: null, correta: LETRAS.slice(0, qtd).includes(q.correta) ? q.correta : '' }
    const v = validarQuestao(pronta)
    setErros(v)
    if (Object.keys(v).length) return
    setSalvando(true)
    await aoSalvar(pronta)
    setSalvando(false)
  }

  return (
    <Janela titulo="Cadastrar questão" aoFechar={aoFechar}>
      <form className="form-grid" onSubmit={enviar} noValidate>
        <div className="form-row">
          <Campo rotulo="Matéria" erro={erros.materia_id}>
            <select className="ipt" value={q.materia_id} onChange={set('materia_id')}><option value="">Escolha…</option>{materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
          </Campo>
          <Campo rotulo="Assunto" erro={erros.assunto}><input className="ipt" value={q.assunto} onChange={set('assunto')} /></Campo>
        </div>
        <div className="form-row">
          <Campo rotulo="Nível"><select className="ipt" value={q.nivel} onChange={set('nivel')}>{NIVEIS.map((n) => <option key={n}>{n}</option>)}</select></Campo>
          <Campo rotulo="Instituição (opcional)"><input className="ipt" value={q.instituicao} onChange={set('instituicao')} placeholder="ENEM, Fuvest…" /></Campo>
          <Campo rotulo="Ano (opcional)"><input className="ipt" type="number" min="1990" max="2100" value={q.ano} onChange={set('ano')} /></Campo>
        </div>
        <Campo rotulo="Enunciado" erro={erros.enunciado}><textarea className="ipt" value={q.enunciado} onChange={set('enunciado')} /></Campo>
        <Campo rotulo="Alternativas">
          <select className="ipt" value={qtd} onChange={(e) => setQtd(Number(e.target.value))}><option value={5}>A a E</option><option value={4}>A a D</option></select>
        </Campo>
        {alts.slice(0, qtd).map((a, i) => (
          <div key={a.letra} className="panel form-grid" style={{ boxShadow: 'none', padding: 10 }}>
            <Campo rotulo={`Alternativa ${a.letra}`}><input className="ipt" value={a.texto} onChange={setAlt(i, 'texto')} /></Campo>
            <Campo rotulo="Por que está certa ou errada (opcional)"><input className="ipt" value={a.explicacao} onChange={setAlt(i, 'explicacao')} /></Campo>
          </div>
        ))}
        {erros.alternativas && <span className="field"><span className="err">{erros.alternativas}</span></span>}
        <Campo rotulo="Alternativa correta" erro={erros.correta}>
          <select className="ipt" value={q.correta} onChange={set('correta')}><option value="">Escolha…</option>{LETRAS.slice(0, qtd).map((l) => <option key={l}>{l}</option>)}</select>
        </Campo>
        <Campo rotulo="Resposta comentada (opcional)"><textarea className="ipt" value={q.resposta_comentada} onChange={set('resposta_comentada')} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
