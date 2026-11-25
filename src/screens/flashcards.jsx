// Flashcards: lista e o jogo em tela cheia.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { estrelas } from '../lib/flashcards.js'
import { Campo, Confirmar, ERRO_GENERICO, Estado, Icon, Janela, MateriaChip, PageHeader, avisar } from '../components/index.jsx'

export default function Flashcards() {
  const { materias, materiaPorId } = useEstudo()
  const [cards, setCards] = useState([])
  const [respostas, setRespostas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [materia, setMateria] = useState('')
  const [jogando, setJogando] = useState(null)
  const [editando, setEditando] = useState(null)
  const [apagando, setApagando] = useState(null)

  useEffect(() => {
    Promise.all([dados.listarFlashcards(), dados.listarRespostasFlashcards()]).then(([c, r]) => {
      if (c.erro || r.erro) setErro(c.erro || r.erro)
      else { setCards(c.data); setRespostas(r.data) }
      setCarregando(false)
    })
  }, [])

  const lista = cards.filter((c) => !materia || c.materia_id === materia)
  const placar = (id) => {
    const rs = respostas.filter((r) => r.flashcard_id === id)
    return { certo: rs.filter((r) => r.acertou).length, errado: rs.filter((r) => !r.acertou).length }
  }
  const usadas = materias.filter((m) => cards.some((c) => c.materia_id === m.id))

  return (
    <div>
      <PageHeader titulo="Flashcards">
        <button className="btn" onClick={() => setEditando({ materia_id: materia })}><Icon nome="mais_sinal" /> Meu flashcard</button>
        <button className="btn primary" disabled={!lista.length} onClick={() => setJogando([...lista].sort(() => Math.random() - 0.5))}><Icon nome="play" /> Jogar</button>
      </PageHeader>
      <div className="toolbar">
        <select className="ipt" aria-label="Matéria" value={materia} onChange={(e) => setMateria(e.target.value)}>
          <option value="">Todas as matérias</option>
          {usadas.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
        </select>
      </div>
      <Estado carregando={carregando} erro={erro} vazio={lista.length === 0} textoVazio="Nenhum flashcard nesta matéria. Crie o primeiro.">
        <div className="lista">
          {lista.map((c) => {
            const p = placar(c.id)
            return (
              <div key={c.id} className="item">
                <div className="linha">
                  <MateriaChip materia={materiaPorId[c.materia_id]} />
                  <span className={'pill ' + (c.user_id ? 'info' : 'plain')}>{c.user_id ? 'Meu' : 'Do app'}</span>
                  <span className="small muted">{p.certo} acertos · {p.errado} erros</span>
                </div>
                <p style={{ fontWeight: 700 }}>{c.frente}</p>
                <p className="trecho">{c.verso}</p>
                {c.user_id && (
                  <div className="row" style={{ marginTop: 6 }}>
                    <button className="btn" onClick={() => setEditando(c)}><Icon nome="lapis" tamanho={18} /> Editar</button>
                    <button className="btn ghost" onClick={() => setApagando(c)}><Icon nome="lixo" tamanho={18} /> Apagar</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Estado>

      {jogando && <Jogo cards={jogando} materiaPorId={materiaPorId} aoFechar={() => setJogando(null)}
        aoResponder={async (c, acertou) => {
          const r = await dados.registrarRespostaFlashcard(c.id, acertou)
          if (r.erro) avisar(ERRO_GENERICO, true); else setRespostas((x) => [...x, r.data])
        }} />}

      {editando && <FormFlashcard inicial={editando} materias={materias} aoFechar={() => setEditando(null)} aoSalvar={async (c) => {
        const r = await dados.salvarFlashcard(c)
        if (r.erro) { avisar(ERRO_GENERICO, true); return }
        setCards(c.id ? cards.map((x) => (x.id === c.id ? r.data : x)) : [...cards, r.data]); setEditando(null); avisar('Salvo.')
      }} />}
      {apagando && <Confirmar texto={`Apagar '${apagando.frente}'? Isso não pode ser desfeito.`} aoCancelar={() => setApagando(null)}
        aoConfirmar={async () => {
          const r = await dados.apagarFlashcard(apagando.id)
          if (r.erro) avisar(ERRO_GENERICO, true); else setCards(cards.filter((x) => x.id !== apagando.id))
          setApagando(null)
        }} />}
    </div>
  )
}

function Jogo({ cards, materiaPorId, aoFechar, aoResponder }) {
  const [i, setI] = useState(0)
  const [virado, setVirado] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const fim = i >= cards.length
  const c = cards[i]

  const responder = (acertou) => {
    if (!virado || fim) return
    aoResponder(c, acertou)
    if (acertou) setAcertos((n) => n + 1)
    setVirado(false); setI((n) => n + 1)
  }

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') aoFechar()
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setVirado((v) => !v) }
      else if (e.key === 'ArrowLeft') responder(false)
      else if (e.key === 'ArrowRight') responder(true)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  })

  return (
    <div className="tela-cheia" role="dialog" aria-modal="true" aria-label="Jogo de flashcards">
      <button className="icon-btn fechar" onClick={aoFechar} aria-label="Fechar"><Icon nome="fechar" /></button>
      {fim ? (
        <>
          <h1>Fim da rodada</h1>
          <div className="estrelas" aria-label={`${estrelas(acertos, cards.length)} de 3 estrelas`}>
            {'★'.repeat(estrelas(acertos, cards.length))}<span className="muted">{'☆'.repeat(3 - estrelas(acertos, cards.length))}</span>
          </div>
          <p>Você acertou {acertos} de {cards.length}.</p>
          <button className="btn primary big" onClick={aoFechar}>Voltar aos flashcards</button>
        </>
      ) : (
        <>
          <p className="muted small">{i + 1} de {cards.length}</p>
          <button className={'flash' + (virado ? ' verso' : '')} style={{ '--h': materiaPorId[c.materia_id]?.cor }} onClick={() => setVirado(!virado)}>
            <small>{virado ? 'Resposta' : materiaPorId[c.materia_id]?.nome}</small>
            <span>{virado ? c.verso : c.frente}</span>
            <span className="toque">{virado ? 'Toque para ver a pergunta' : 'Toque para virar'}</span>
          </button>
          <div className="row">
            <button className="btn big danger" disabled={!virado} onClick={() => responder(false)}><Icon nome="voltar" /> Errei</button>
            <button className="btn big primary" disabled={!virado} onClick={() => responder(true)}>Acertei <Icon nome="avancar" /></button>
          </div>
          <p className="small muted">Teclado: espaço vira, seta para a esquerda = errei, seta para a direita = acertei.</p>
        </>
      )}
    </div>
  )
}

function FormFlashcard({ inicial, materias, aoFechar, aoSalvar }) {
  const [c, setC] = useState({ frente: '', verso: '', materia_id: '', serie_minima: null, ...inicial })
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo={inicial.id ? 'Editar flashcard' : 'Meu flashcard'} aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        const v = {}
        if (!c.materia_id) v.materia_id = 'Escolha a matéria.'
        if (!c.frente.trim()) v.frente = 'Escreva a pergunta.'
        if (!c.verso.trim()) v.verso = 'Escreva a resposta.'
        setErros(v)
        if (Object.keys(v).length) return
        setSalvando(true); await aoSalvar({ ...c, frente: c.frente.trim(), verso: c.verso.trim() }); setSalvando(false)
      }}>
        <Campo rotulo="Matéria" erro={erros.materia_id}>
          <select className="ipt" value={c.materia_id} onChange={(e) => setC({ ...c, materia_id: e.target.value })}><option value="">Escolha…</option>{materias.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select>
        </Campo>
        <Campo rotulo="Pergunta (frente)" erro={erros.frente}><textarea className="ipt" value={c.frente} onChange={(e) => setC({ ...c, frente: e.target.value })} /></Campo>
        <Campo rotulo="Resposta (verso)" erro={erros.verso}><textarea className="ipt" value={c.verso} onChange={(e) => setC({ ...c, verso: e.target.value })} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
