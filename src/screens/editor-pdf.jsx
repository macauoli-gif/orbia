// Editor de resumo em PDF: escrever à mão (caneta, dedo, mouse) e com caixas
// de texto por cima das páginas. O PDF original nunca muda; as anotações
// ficam em resumo_anotacoes (uma linha por página) e são salvas sozinhas.
import { useEffect, useRef, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import {
  CORES, ESPESSURAS, TAMANHO_TEXTO, larguraTraco, normalizarPonto, apagarTracosEm,
  paginaVazia, paginaTemAlgo, limparTextosVazios, empilhar, desfazer, posicaoNovoTexto, papelDoToque,
} from '../lib/anotacoes.js'
import { abrirPdf, desenharPagina, fecharPdf, foiCancelado, densidadeTela } from '../components/pdf.js'
import { Confirmar, Icon, MateriaChip, avisar } from '../components/index.jsx'
import { FormPdf } from './resumos.jsx'

const ESPERA_SALVAR_MS = 700
// Página na largura da tela; no computador largo, até 1200 px (folha maior que isso só cansa a vista).
const LARGURA_MAXIMA = 1200

const FERRAMENTAS = [
  ['mover', 'Mover', 'Rolar a página sem escrever'],
  ['caneta', 'Caneta', 'Escrever à mão'],
  ['borracha', 'Borracha', 'Apagar o traço em que tocar'],
  ['texto', 'Texto', 'Tocar no lugar e digitar'],
]

export default function EditorPdf({ goto, params }) {
  const { materias, materiaPorId } = useEstudo()
  const [resumo, setResumo] = useState(null)
  const [doc, setDoc] = useState(null)
  const [proporcoes, setProporcoes] = useState([])   // altura / largura de cada página
  const [erro, setErro] = useState(null)
  const [anotacoes, setAnotacoes] = useState({})     // { [pagina]: { tracos, textos } }
  const [historico, setHistorico] = useState([])
  const [ferramenta, setFerramenta] = useState('caneta')
  const [cor, setCor] = useState(CORES[0].valor)
  const [espessura, setEspessura] = useState(ESPESSURAS[1].valor)
  const [soCaneta, setSoCaneta] = useState(false)
  const [canetaVista, setCanetaVista] = useState(false)
  const [situacao, setSituacao] = useState('salvo') // salvo | salvando | erro
  const [largura, setLargura] = useState(0)
  const [limpando, setLimpando] = useState(null)
  const [editandoDados, setEditandoDados] = useState(false)
  const [apagando, setApagando] = useState(false)

  const area = useRef(null)
  const anotRef = useRef({})
  const pendentes = useRef(new Map())   // pagina -> timer
  anotRef.current = anotacoes

  // Abre o resumo, o arquivo e as anotações.
  useEffect(() => {
    let vivo = true
    let aberto = null
    ;(async () => {
      const [lista, bytes, anots] = await Promise.all([dados.listarResumos(), dados.lerPdfDoResumo(params.id), dados.listarAnotacoes(params.id)])
      if (!vivo) return
      const r = lista.data?.find((x) => x.id === params.id)
      if (!r || bytes.erro) { setErro(bytes.erro || 'Resumo não encontrado.'); return }
      try {
        aberto = await abrirPdf(bytes.data)
        if (!vivo) { fecharPdf(aberto); return } // saiu enquanto abria
        const tamanhos = await Promise.all(Array.from({ length: aberto.numPages }, async (_, i) => {
          const vp = (await aberto.getPage(i + 1)).getViewport({ scale: 1 })
          return vp.height / vp.width
        }))
        if (!vivo) return
        setResumo(r); setDoc(aberto); setProporcoes(tamanhos)
        setAnotacoes(Object.fromEntries((anots.data || []).map((a) => [a.pagina, { tracos: a.tracos, textos: a.textos }])))
      } catch (_) {
        if (vivo) setErro('Não conseguimos abrir este PDF. Envie de novo ou escolha outro arquivo.')
      }
    })()
    return () => { vivo = false; fecharPdf(aberto) }
  }, [params.id])

  // A largura das páginas acompanha a tela.
  useEffect(() => {
    if (!area.current) return
    const obs = new ResizeObserver(([e]) => setLargura(Math.floor(Math.min(e.contentRect.width, LARGURA_MAXIMA))))
    obs.observe(area.current)
    return () => obs.disconnect()
  }, [doc])

  // Ao sair do editor, salva o que ainda estiver esperando.
  useEffect(() => () => salvarPendentes(), [])

  function salvarAgora(pagina) {
    clearTimeout(pendentes.current.get(pagina))
    pendentes.current.delete(pagina)
    const conteudo = limparTextosVazios(anotRef.current[pagina] || paginaVazia())
    return dados.salvarAnotacao(params.id, pagina, conteudo).then((r) => {
      if (r.erro) { setSituacao('erro'); avisar('Não conseguimos salvar a anotação. Confira sua internet.', true) }
      else if (pendentes.current.size === 0) setSituacao('salvo')
    })
  }
  function salvarPendentes() {
    for (const p of [...pendentes.current.keys()]) salvarAgora(p)
  }
  function agendarSalvar(pagina) {
    setSituacao('salvando')
    clearTimeout(pendentes.current.get(pagina))
    pendentes.current.set(pagina, setTimeout(() => salvarAgora(pagina), ESPERA_SALVAR_MS))
  }

  // Toda mudança passa por aqui: guarda o "antes" para o desfazer e agenda o salvamento.
  function mudar(pagina, novo, { historico: comHistorico = true } = {}) {
    const antes = anotRef.current[pagina] || paginaVazia()
    if (comHistorico) setHistorico((h) => empilhar(h, pagina, antes))
    anotRef.current = { ...anotRef.current, [pagina]: novo }
    setAnotacoes(anotRef.current)
    agendarSalvar(pagina)
  }

  function voltar() {
    const r = desfazer(historico, anotRef.current)
    if (r.pagina == null) return
    setHistorico(r.historico)
    anotRef.current = r.anotacoes
    setAnotacoes(r.anotacoes)
    agendarSalvar(r.pagina)
  }

  const marcarCaneta = () => { if (!canetaVista) setCanetaVista(true) }
  const sair = () => { salvarPendentes(); goto('resumos') }

  if (erro) {
    return (
      <div className="stack" style={{ paddingTop: 18 }}>
        <div className="msg-erro" role="alert">{erro}</div>
        <button className="btn" style={{ alignSelf: 'flex-start' }} onClick={() => goto('resumos')}>Voltar aos resumos</button>
      </div>
    )
  }

  return (
    <div className="editor-pdf">
      <div className="editor-topo">
        <div className="row-between">
          <button className="link-btn" onClick={sair}><Icon nome="voltar" tamanho={16} /> Resumos</button>
          <span className={'pill ' + (situacao === 'erro' ? 'crit' : situacao === 'salvando' ? 'plain' : 'ok')} role="status">
            {situacao === 'erro' ? 'Não salvou' : situacao === 'salvando' ? 'Salvando…' : 'Salvo'}
          </span>
        </div>
        {resumo && (
          <div className="row">
            <h1 className="grow" style={{ fontSize: 20 }}>{resumo.titulo}</h1>
            <MateriaChip materia={materiaPorId[resumo.materia_id]} />
            <button className="icon-btn" aria-label="Editar título e matéria" onClick={() => setEditandoDados(true)}><Icon nome="lapis" tamanho={18} /></button>
          </div>
        )}
      </div>
      {/* Fora do bloco do título: só assim a barra fica presa no topo ao rolar. */}
      <div className="ferramentas" role="toolbar" aria-label="Ferramentas">
          <div className="grupo" role="radiogroup" aria-label="Ferramenta">
            {FERRAMENTAS.map(([id, rotulo, dica]) => (
              <button key={id} role="radio" aria-checked={ferramenta === id} title={dica} onClick={() => setFerramenta(id)}>{rotulo}</button>
            ))}
          </div>
          {/* Cor e espessura ficam sempre na barra (só desligadas quando não servem):
              se sumissem, a barra mudaria de altura e a página pularia. */}
          <div className="grupo" role="radiogroup" aria-label="Cor">
            {CORES.map((c) => (
              <button key={c.valor} role="radio" aria-checked={cor === c.valor} aria-label={c.nome} title={c.nome}
                disabled={ferramenta !== 'caneta' && ferramenta !== 'texto'} onClick={() => setCor(c.valor)}>
                <span className="bolinha" style={{ background: c.valor }} />
              </button>
            ))}
          </div>
          <div className="grupo" role="radiogroup" aria-label="Espessura">
            {ESPESSURAS.map((e, i) => (
              <button key={e.valor} role="radio" aria-checked={espessura === e.valor} aria-label={e.nome} title={e.nome}
                disabled={ferramenta !== 'caneta'} onClick={() => setEspessura(e.valor)}>
                <span className="risco" style={{ height: 2 + i * 3 }} />
              </button>
            ))}
          </div>
          <button className="btn" disabled={!historico.length} onClick={voltar}>Desfazer</button>
          <label className="check" title="Com a opção ligada, o dedo só rola a página e quem escreve é a caneta">
            <input type="checkbox" checked={soCaneta} onChange={(e) => setSoCaneta(e.target.checked)} /> Só caneta
          </label>
          {canetaVista && !soCaneta && <span className="pill info" title="O dedo agora rola a página; quem escreve é a caneta">Caneta detectada</span>}
      </div>

      <div ref={area} className="paginas">
        {!doc && <div className="loading">Abrindo o PDF…</div>}
        {doc && largura > 0 && proporcoes.map((prop, i) => (
          <Pagina key={i + 1} doc={doc} numero={i + 1} total={proporcoes.length} largura={largura} altura={Math.round(largura * prop)}
            anot={anotacoes[i + 1] || paginaVazia()} ferramenta={ferramenta} cor={cor} espessura={espessura}
            dedoRola={soCaneta || canetaVista} aoVerCaneta={marcarCaneta}
            aoMudar={(novo, opc) => mudar(i + 1, novo, opc)} aoLimpar={() => setLimpando(i + 1)} />
        ))}
      </div>

      {limpando && <Confirmar texto={`Apagar todas as anotações da página ${limpando}? Dá para desfazer logo depois.`} rotulo="Limpar página"
        aoCancelar={() => setLimpando(null)} aoConfirmar={() => { mudar(limpando, paginaVazia()); setLimpando(null) }} />}

      {editandoDados && resumo && <FormPdf inicial={resumo} materias={materias} aoFechar={() => setEditandoDados(false)}
        aoApagar={() => { setEditandoDados(false); setApagando(true) }}
        aoSalvar={async (v) => {
          const r = await dados.salvarResumo({ id: resumo.id, ...v })
          if (r.erro) { avisar(r.erro, true); return }
          setResumo(r.data); setEditandoDados(false); avisar('Salvo.')
        }} />}
      {apagando && <Confirmar texto={`Apagar '${resumo.titulo}'? O PDF e todas as anotações vão junto. Isso não pode ser desfeito.`}
        aoCancelar={() => setApagando(false)} aoConfirmar={async () => {
          for (const p of [...pendentes.current.keys()]) clearTimeout(pendentes.current.get(p))
          pendentes.current.clear()
          const r = await dados.apagarResumo(resumo.id)
          if (r.erro) { avisar(r.erro, true); setApagando(false); return }
          goto('resumos')
        }} />}
    </div>
  )
}

function desenharTracos(canvas, tracos, w, h, atual) {
  const dpr = densidadeTela()
  if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr) }
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  for (const t of atual ? [...tracos, atual] : tracos) desenharTraco(ctx, t, w, h)
}
function desenharTraco(ctx, t, w, h, desde = 1) {
  ctx.strokeStyle = t.cor
  ctx.fillStyle = t.cor
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  const pts = t.pontos
  if (pts.length === 1) {
    ctx.beginPath()
    ctx.arc(pts[0][0] * w, pts[0][1] * h, larguraTraco(t.espessura, pts[0][2], w) / 2, 0, Math.PI * 2)
    ctx.fill()
    return
  }
  for (let i = Math.max(1, desde); i < pts.length; i++) {
    const [ax, ay, ap] = pts[i - 1], [bx, by, bp] = pts[i]
    ctx.lineWidth = larguraTraco(t.espessura, (ap + bp) / 2, w)
    ctx.beginPath()
    ctx.moveTo(ax * w, ay * h)
    ctx.lineTo(bx * w, by * h)
    ctx.stroke()
  }
}

function Pagina({ doc, numero, total, largura, altura, anot, ferramenta, cor, espessura, dedoRola, aoVerCaneta, aoMudar, aoLimpar }) {
  const caixa = useRef(null)
  const telaPdf = useRef(null)
  const tinta = useRef(null)
  const gesto = useRef(null)       // o gesto em andamento: { id, tipo do ponteiro, ação }
  const [visivel, setVisivel] = useState(false)
  const [falhou, setFalhou] = useState(false)
  const [editandoTexto, setEditandoTexto] = useState(null)

  // Só desenha a página do PDF quando ela chega perto da tela.
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisivel(true) }, { rootMargin: '600px 0px' })
    obs.observe(caixa.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visivel) return
    let vivo = true
    let tarefa = null
    doc.getPage(numero)
      .then((p) => { if (!vivo) return; tarefa = desenharPagina(p, telaPdf.current, largura); return tarefa.promise })
      .catch((e) => { if (vivo && !foiCancelado(e)) setFalhou(true) })
    // Tablet girou ou saiu da tela: cancela o desenho em andamento.
    return () => { vivo = false; tarefa?.cancel() }
  }, [visivel, largura, doc, numero])

  useEffect(() => { desenharTracos(tinta.current, anot.tracos, largura, altura) }, [anot.tracos, largura, altura])

  const ponto = (e) => {
    const r = tinta.current.getBoundingClientRect()
    const pressao = e.pointerType === 'pen' ? e.pressure : 0.5
    return normalizarPonto(e.clientX - r.left, e.clientY - r.top, r.width, r.height, pressao)
  }

  function aoDescer(e) {
    if (e.pointerType === 'pen') aoVerCaneta()
    if (e.button > 0) return
    // Quem decide se este toque escreve, rola ou é a palma: lib/anotacoes.js.
    const papel = papelDoToque({ tipo: e.pointerType, ativo: gesto.current?.ponteiro || null, canetaVista: dedoRola, soCaneta: dedoRola })
    if (papel === 'ignorar') return
    e.preventDefault()
    if (papel === 'rolar') { gesto.current = { id: e.pointerId, ponteiro: e.pointerType, tipo: 'rolar', y: e.clientY }; return }
    if (papel === 'assumir') {
      // A caneta chegou: o que a palma fez antes dela é desfeito.
      const palma = gesto.current
      gesto.current = null
      if (palma?.tipo === 'borracha' && palma.tracos !== palma.original) aoMudar({ ...anot, tracos: palma.original }, { historico: false })
      else desenharTracos(tinta.current, anot.tracos, largura, altura) // descarta o traço da palma
    }
    try { tinta.current.setPointerCapture(e.pointerId) } catch (_) { /* ponteiro já saiu: segue sem captura */ }
    const p = ponto(e)
    const base = { id: e.pointerId, ponteiro: e.pointerType }
    if (ferramenta === 'caneta') {
      gesto.current = { ...base, tipo: 'caneta', traco: { cor, espessura, pontos: [p] } }
      desenharTracos(tinta.current, anot.tracos, largura, altura, gesto.current.traco)
    } else if (ferramenta === 'borracha') {
      // Cópia de trabalho: vários traços apagados no mesmo gesto, sem um "voltar" o outro.
      gesto.current = { ...base, tipo: 'borracha', primeiro: true, tracos: anot.tracos, original: anot.tracos }
      apagar(p)
    } else if (ferramenta === 'texto') {
      gesto.current = null
      const novo = { id: 't' + Date.now().toString(36), ...posicaoNovoTexto(p), texto: '', cor }
      aoMudar({ ...anot, textos: [...anot.textos, novo] })
      setEditandoTexto(novo.id)
    }
  }

  function apagar(p) {
    const g = gesto.current
    const restantes = apagarTracosEm(g.tracos, p)
    if (restantes.length === g.tracos.length) return
    g.tracos = restantes
    aoMudar({ ...anot, tracos: restantes }, { historico: g.primeiro })
    g.primeiro = false
  }

  function aoMover(e) {
    const g = gesto.current
    if (!g || g.id !== e.pointerId) return // outro dedo ou a palma: não mexe no gesto
    if (g.tipo === 'rolar') { window.scrollBy(0, g.y - e.clientY); g.y = e.clientY; return }
    // Pontos intermediários do movimento (traço mais liso). Alguns aparelhos devolvem a lista vazia.
    const juntos = e.nativeEvent.getCoalescedEvents?.() || []
    const eventos = juntos.length ? juntos : [e.nativeEvent]
    if (g.tipo === 'caneta') {
      const antes = g.traco.pontos.length
      for (const ev of eventos) g.traco.pontos.push(ponto(ev))
      const ctx = tinta.current.getContext('2d')
      desenharTraco(ctx, g.traco, largura, altura, antes)
    } else if (g.tipo === 'borracha') {
      for (const ev of eventos) apagar(ponto(ev))
    }
  }

  function aoSubir(e) {
    const g = gesto.current
    if (!g || g.id !== e.pointerId) return
    gesto.current = null
    if (g?.tipo === 'caneta') aoMudar({ ...anot, tracos: [...anot.tracos, g.traco] })
  }

  const mudarTexto = (id, texto) => aoMudar({ ...anot, textos: anot.textos.map((t) => (t.id === id ? { ...t, texto } : t)) }, { historico: false })
  const tirarTexto = (id) => aoMudar({ ...anot, textos: anot.textos.filter((t) => t.id !== id) })
  const fonte = Math.max(11, TAMANHO_TEXTO * largura)
  const escrevendo = ferramenta !== 'mover'

  return (
    <section className="pagina-pdf" aria-label={`Página ${numero} de ${total}`}>
      <div className="row-between pagina-topo">
        <span className="small muted">Página {numero} de {total}</span>
        {paginaTemAlgo(anot) && <button className="link-btn small" onClick={aoLimpar}>Limpar página</button>}
      </div>
      <div ref={caixa} className="folha" style={{ width: largura, height: altura }}>
        <canvas ref={telaPdf} aria-hidden="true" />
        {falhou && <div className="empty">Não conseguimos mostrar esta página.</div>}
        <canvas ref={tinta} className="tinta" style={{ width: largura, height: altura, touchAction: escrevendo ? 'none' : 'pan-y pinch-zoom', cursor: escrevendo ? (ferramenta === 'texto' ? 'text' : 'crosshair') : 'auto', pointerEvents: escrevendo ? 'auto' : 'none' }}
          onPointerDown={aoDescer} onPointerMove={aoMover} onPointerUp={aoSubir} onPointerCancel={aoSubir}
          aria-label={`Área de anotação da página ${numero}`} />
        {anot.textos.map((t) => (
          <div key={t.id} className="nota" style={{ left: t.x * largura, top: t.y * altura, color: t.cor, fontSize: fonte }}>
            {ferramenta === 'texto' ? (
              <>
                <textarea value={t.texto} autoFocus={editandoTexto === t.id} rows={Math.max(1, t.texto.split('\n').length)}
                  aria-label="Texto da anotação" placeholder="Digite aqui"
                  style={{ width: Math.max(4, Math.min(28, Math.max(...t.texto.split('\n').map((l) => l.length)) + 2)) + 'ch' }}
                  onFocus={() => { if (editandoTexto !== t.id) aoMudar(anot) }}
                  onChange={(e) => mudarTexto(t.id, e.target.value)}
                  onBlur={() => { setEditandoTexto(null); if (!t.texto.trim()) tirarTexto(t.id) }} />
                <button className="tirar" aria-label="Apagar esta caixa de texto" onMouseDown={(e) => e.preventDefault()} onClick={() => tirarTexto(t.id)}><Icon nome="fechar" tamanho={14} /></button>
              </>
            ) : <span>{t.texto}</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
