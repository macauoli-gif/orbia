// Simulados de vestibulares: escolher a prova (instituição e ano), marcar o
// cartão-resposta com cronômetro, ver a correção e a evolução a cada tentativa.
// As contas moram em lib/simulados.js; aqui só o desenho e o estado da tela.
import { Fragment, useEffect, useMemo, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import {
  INSTITUICOES, anosDisponiveis, filtrarProvas, idiomasDa, letrasDa, marcadas,
  evolucao, comparaAreas, tentativaAnterior, textoDuracao, validarTentativa, titulo,
} from '../lib/simulados.js'
import { agoraMs } from '../lib/datas.js'
import { PROVAS } from '../lib/simulados-provas.js'
import { Confirmar, ERRO_GENERICO, Icon, Janela, PageHeader, avisar } from '../components/index.jsx'


// Rascunho do cartão-resposta neste aparelho: sair da tela não perde as marcações.
const chaveRascunho = (userId, provaId) => `pauta-simulado:${userId}:${provaId}`
function lerRascunho(chave) {
  try { return JSON.parse(localStorage.getItem(chave)) || null } catch (_) { return null }
}
function gravarRascunho(chave, r) {
  try { r ? localStorage.setItem(chave, JSON.stringify(r)) : localStorage.removeItem(chave) } catch (_) { /* sem armazenamento: só perde o rascunho */ }
}

const dataHora = (iso) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })

export default function Simulados() {
  const { perfil, tentativas, setTentativas } = useEstudo()
  const provas = PROVAS
  const [f, setF] = useState({ instituicao: '', ano: '' })
  const [fazendo, setFazendo] = useState(null)      // prova em andamento
  const [vendo, setVendo] = useState(null)          // tentativa aberta no resultado
  const [apagando, setApagando] = useState(null)

  const lista = useMemo(() => evolucao(tentativas, provas), [provas, tentativas])

  async function apagar(t) {
    const r = await dados.apagarTentativa(t.id)
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setTentativas(tentativas.filter((x) => x.id !== t.id))
    setApagando(null); setVendo(null)
  }

  if (fazendo) {
    return <Fazer prova={fazendo} userId={perfil.id} provas={provas}
      aoSair={() => setFazendo(null)}
      aoTerminar={(t) => { setTentativas([...tentativas, t]); setFazendo(null); setVendo(t) }} />
  }
  if (vendo) {
    const item = lista.find((x) => x.tentativa.id === vendo.id)
    if (item) return <Resultado item={item} anterior={tentativaAnterior(lista, item.tentativa)}
      aoVoltar={() => setVendo(null)} aoRefazer={() => { setVendo(null); setFazendo(item.prova) }}
      aoApagar={() => setApagando(item.tentativa)} apagando={apagando}
      aoConfirmarApagar={() => apagar(apagando)} aoCancelarApagar={() => setApagando(null)} />
  }

  const anos = anosDisponiveis(provas, f.instituicao)
  const visiveis = filtrarProvas(provas, f)
  const vezes = (id) => tentativas.filter((t) => t.prova_id === id).length

  return (
    <div>
      <PageHeader titulo="Simulados" />
      <p className="small muted" style={{ marginTop: -6, marginBottom: 12 }}>
        Provas anteriores oficiais. Você abre a prova no site da instituição, marca as respostas aqui e o app corrige com o gabarito oficial.
      </p>
      <>
        <div className="toolbar">
          <label className="sr-only" htmlFor="s-inst">Instituição</label>
          <select id="s-inst" className="ipt" value={f.instituicao} onChange={(e) => setF({ instituicao: e.target.value, ano: '' })}>
            <option value="">Todas as instituições</option>
            {INSTITUICOES.map((i) => <option key={i}>{i}</option>)}
          </select>
          <label className="sr-only" htmlFor="s-ano">Ano</label>
          <select id="s-ano" className="ipt" value={f.ano} onChange={(e) => setF({ ...f, ano: e.target.value })}>
            <option value="">Todos os anos</option>
            {anos.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="lista provas">
          {visiveis.map((p) => (
            <button key={p.id} className="item prova-item" onClick={() => setFazendo(p)}>
              <span className="grow">
                <b>{p.instituicao} {p.ano}</b> · {p.nome}<br />
                <span className="small muted">{p.questoes.length} questões · {p.alternativas === 4 ? 'A a D' : 'A a E'} · {textoDuracao(p.tempo_min * 60)}{vezes(p.id) ? ` · feita ${vezes(p.id)} ${vezes(p.id) === 1 ? 'vez' : 'vezes'}` : ''}</span>
              </span>
              <Icon nome="avancar" />
            </button>
          ))}
        </div>

        <Evolucao lista={lista} aoAbrir={(t) => setVendo(t)} />
      </>
    </div>
  )
}

// ───────── Painel de evolução ─────────
function Evolucao({ lista, aoAbrir }) {
  const [foco, setFoco] = useState(null)
  if (!lista.length) return <section className="painel-evolucao"><h2>Sua evolução</h2><p className="empty">Você ainda não fez nenhum simulado. Escolha uma prova acima.</p></section>
  const areas = comparaAreas(lista)
  // Gráfico de barras: uma barra por tentativa (percentual de acerto), da mais antiga para a mais nova.
  const ultimas = lista.slice(-12)
  const L = 560, A = 180, base = A - 24, larg = Math.min(36, (L - 40) / ultimas.length - 8)
  const x = (i) => 36 + i * ((L - 40) / ultimas.length) + ((L - 40) / ultimas.length - larg) / 2
  const y = (pct) => base - (pct / 100) * (base - 12)
  return (
    <section className="painel-evolucao" aria-label="Sua evolução">
      <h2>Sua evolução</h2>
      <p className="small muted">Percentual de acerto em cada tentativa{lista.length > 12 ? ' (as 12 mais recentes)' : ''}.</p>
      <div className="grafico">
        <svg viewBox={`0 0 ${L} ${A}`} role="img" aria-label={`Acerto por tentativa: ${ultimas.map((e) => e.resultado.pct + '%').join(', ')}`}>
          {[0, 50, 100].map((v) => (
            <g key={v}>
              <line x1="32" x2={L - 4} y1={y(v)} y2={y(v)} className="grade" />
              <text x="28" y={y(v) + 4} textAnchor="end" className="eixo">{v}%</text>
            </g>
          ))}
          {ultimas.map((e, i) => {
            const alto = Math.max(2, base - y(e.resultado.pct))
            return (
              <g key={e.tentativa.id} onMouseEnter={() => setFoco(i)} onMouseLeave={() => setFoco(null)} onClick={() => aoAbrir(e.tentativa)} style={{ cursor: 'pointer' }}>
                {/* área de toque maior que a barra */}
                <rect x={x(i) - 4} y="0" width={larg + 8} height={A} fill="transparent" />
                <path className={'barra-svg' + (foco === i ? ' em-foco' : '')}
                  d={`M${x(i)},${base} v${-(alto - 4)} q0,-4 4,-4 h${larg - 8} q4,0 4,4 v${alto - 4} z`} />
                <text x={x(i) + larg / 2} y={y(e.resultado.pct) - 6} textAnchor="middle" className="valor">{e.resultado.pct}%</text>
                <text x={x(i) + larg / 2} y={A - 6} textAnchor="middle" className="eixo">{i + 1 + (lista.length - ultimas.length)}ª</text>
                <title>{`${titulo(e.prova)} — ${dataHora(e.tentativa.created_at)}: ${e.resultado.certas} de ${e.resultado.validas} (${e.resultado.pct}%)`}</title>
              </g>
            )
          })}
        </svg>
        {foco != null && (
          <div className="dica-grafico" role="status">
            <b>{ultimas[foco].resultado.pct}%</b> · {titulo(ultimas[foco].prova)}<br />
            <span className="small">{dataHora(ultimas[foco].tentativa.created_at)} · {ultimas[foco].resultado.certas} de {ultimas[foco].resultado.validas} certas</span>
          </div>
        )}
      </div>

      {areas.length > 0 && (
        <>
          <h3>Por área, na última vez</h3>
          <table className="tabela">
            <thead><tr><th>Área</th><th>Acerto</th><th>Antes</th><th>Mudou</th></tr></thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.area}>
                  <td data-rotulo="Área">{a.area}</td><td data-rotulo="Acerto">{a.pct}%</td><td data-rotulo="Antes">{a.anterior == null ? '—' : a.anterior + '%'}</td>
                  <td data-rotulo="Mudou">{a.diferenca == null ? 'primeira vez' : a.diferenca > 0 ? `▲ subiu ${a.diferenca} pontos` : a.diferenca < 0 ? `▼ caiu ${-a.diferenca} pontos` : '= igual'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <h3>Tentativas</h3>
      <table className="tabela">
        <thead><tr><th>Data</th><th>Prova</th><th>Acerto</th><th><span className="sr-only">Abrir</span></th></tr></thead>
        <tbody>
          {[...lista].reverse().map((e) => (
            <tr key={e.tentativa.id}>
              <td data-rotulo="Data">{dataHora(e.tentativa.created_at)}</td>
              <td data-rotulo="Prova">{titulo(e.prova)}</td>
              <td data-rotulo="Acerto">{e.resultado.certas}/{e.resultado.validas} ({e.resultado.pct}%)</td>
              <td><button className="btn" onClick={() => aoAbrir(e.tentativa)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

// ───────── Cartão-resposta ─────────
function Fazer({ prova, userId, provas, aoSair, aoTerminar }) {
  const chave = chaveRascunho(userId, prova.id)
  const [r, setR] = useState(() => lerRascunho(chave) || { inicio: agoraMs(), respostas: {}, idioma: idiomasDa(prova).length ? '' : null })
  const [agora, setAgora] = useState(() => agoraMs())
  const [confirmando, setConfirmando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const idiomas = idiomasDa(prova)
  const letras = letrasDa(prova)

  useEffect(() => { gravarRascunho(chave, r) }, [chave, r])
  useEffect(() => { const t = setInterval(() => setAgora(agoraMs()), 1000); return () => clearInterval(t) }, [])

  const passou = Math.round((agora - r.inicio) / 1000)
  const limite = prova.tempo_min * 60
  const total = prova.questoes.length
  const feitas = marcadas(r.respostas)

  const marcar = (n, l) => setR({ ...r, respostas: { ...r.respostas, [n]: r.respostas[n] === l ? undefined : l } })

  async function terminar() {
    const respostas = Object.fromEntries(Object.entries(r.respostas).filter(([, v]) => v))
    const t = { prova_id: prova.id, idioma: r.idioma || null, respostas, tempo_seg: passou }
    const problema = validarTentativa(t, provas)
    if (problema) { avisar(problema, true); setConfirmando(false); return }
    setSalvando(true)
    const res = await dados.salvarTentativa(t)
    setSalvando(false)
    if (res.erro) { avisar(ERRO_GENERICO, true); return }
    gravarRascunho(chave, null)
    aoTerminar(res.data)
  }

  return (
    <div className="simulado">
      <div className="page-head">
        <button className="link-btn" onClick={aoSair}><Icon nome="voltar" /> Simulados</button>
      </div>
      <h1 style={{ marginBottom: 4 }}>{prova.instituicao} {prova.ano}</h1>
      <p className="muted">{prova.nome} · {total} questões · tempo oficial {textoDuracao(limite)}</p>

      <div className="panel stack" style={{ margin: '12px 0' }}>
        <a className="btn primary big" href={prova.link_prova} target="_blank" rel="noopener noreferrer">Abrir a prova oficial (PDF)</a>
        <p className="small muted">Use exatamente este caderno: <b>{prova.nome}</b>. Outras cores ou versões têm as questões em outra ordem e o gabarito não bate.</p>
        {idiomas.length > 0 && (
          <label className="field">Língua estrangeira que você escolheu
            <select className="ipt" value={r.idioma || ''} onChange={(e) => setR({ ...r, idioma: e.target.value })}>
              <option value="">Escolha…</option>
              {idiomas.map((i) => <option key={i}>{i}</option>)}
            </select>
          </label>
        )}
      </div>

      <div className="cronometro" role="timer" aria-live="off">
        <span><b>{textoDuracao(passou)}</b> de {textoDuracao(limite)}</span>
        <span>{feitas} de {total} marcadas</span>
        {passou > limite && <span className="pill warn">Passou do tempo oficial</span>}
      </div>

      <ol className="cartao" aria-label="Cartão-resposta">
        {prova.questoes.map((q, i) => {
          const cabecalho = q.area && (i === 0 || prova.questoes[i - 1].area !== q.area) ? q.area : null
          return (
            <Fragment key={q.n}>
            {/* o nome da área ocupa a linha inteira da grade, para as colunas não desalinharem */}
            {cabecalho && <li className="cartao-area" aria-hidden="true">{cabecalho}</li>}
            <li className="cartao-linha">
              <span className="cartao-n">{q.n}</span>
              <span className="cartao-letras" role="radiogroup" aria-label={`Questão ${q.n}`}>
                {letras.map((l) => (
                  <button key={l} role="radio" aria-checked={r.respostas[q.n] === l} className={'letra' + (r.respostas[q.n] === l ? ' marcada' : '')}
                    onClick={() => marcar(q.n, l)}>{l}</button>
                ))}
              </span>
            </li>
            </Fragment>
          )
        })}
      </ol>

      <div className="simulado-fim">
        <button className="btn primary big" disabled={salvando} onClick={() => setConfirmando(true)}>Terminar e corrigir</button>
        <p className="small muted">As marcações ficam guardadas neste aparelho se você sair antes de terminar.</p>
      </div>

      {confirmando && (
        <Janela titulo="Terminar a prova?" aoFechar={() => setConfirmando(false)} centro>
          <p>{feitas < total ? `Você deixou ${total - feitas} ${total - feitas === 1 ? 'questão' : 'questões'} em branco. Elas contam como erro.` : 'Todas as questões estão marcadas.'} Depois de corrigir não dá para mudar as respostas.</p>
          <div className="janela-acoes">
            <button className="btn" onClick={() => setConfirmando(false)}>Continuar a prova</button>
            <button className="btn primary" disabled={salvando} onClick={terminar}>{salvando ? 'Corrigindo…' : 'Corrigir'}</button>
          </div>
        </Janela>
      )}
    </div>
  )
}

// ───────── Resultado ─────────
const SIMBOLO = { certa: '✓', errada: '✗', branca: '–', anulada: '∅' }
const NOME_SIT = { certa: 'certa', errada: 'errada', branca: 'em branco', anulada: 'anulada' }

function Resultado({ item, anterior, aoVoltar, aoRefazer, aoApagar, apagando, aoConfirmarApagar, aoCancelarApagar }) {
  const { prova, tentativa, resultado: res } = item
  return (
    <div className="simulado">
      <div className="page-head">
        <button className="link-btn" onClick={aoVoltar}><Icon nome="voltar" /> Simulados</button>
      </div>
      <h1 style={{ marginBottom: 4 }}>{prova.instituicao} {prova.ano}</h1>
      <p className="muted">{prova.nome}{tentativa.idioma ? ` · ${tentativa.idioma}` : ''} · feito em {dataHora(tentativa.created_at)}</p>

      <div className="contadores" style={{ margin: '14px 0' }}>
        <div className="contador ok"><b>{res.pct}%</b><span>de acerto ({res.certas} de {res.validas})</span></div>
        <div className="contador"><b>{res.erradas}</b><span>erradas</span></div>
        <div className="contador"><b>{res.brancas}</b><span>em branco</span></div>
        <div className="contador"><b>{textoDuracao(tentativa.tempo_seg)}</b><span>de prova{res.anuladas ? ` · ${res.anuladas} anulada${res.anuladas > 1 ? 's' : ''} (fora da conta)` : ''}</span></div>
      </div>
      {anterior && (
        <p className={'nota-meta' + (res.pct < anterior.resultado.pct ? ' warn' : '')}>
          Na vez anterior desta prova ({dataHora(anterior.tentativa.created_at)}) você fez {anterior.resultado.pct}%.{' '}
          {res.pct > anterior.resultado.pct ? `Subiu ${res.pct - anterior.resultado.pct} pontos.` : res.pct < anterior.resultado.pct ? `Caiu ${anterior.resultado.pct - res.pct} pontos.` : 'Ficou igual.'}
        </p>
      )}

      <h2>Por área</h2>
      {res.porArea.length ? (
        <table className="tabela">
          <thead><tr><th>Área</th><th>Certas</th><th>Erradas</th><th>Em branco</th><th>Acerto</th></tr></thead>
          <tbody>
            {res.porArea.map((a) => <tr key={a.area}><td data-rotulo="Área">{a.area}</td><td data-rotulo="Certas">{a.certas}</td><td data-rotulo="Erradas">{a.erradas}</td><td data-rotulo="Em branco">{a.brancas}</td><td data-rotulo="Acerto">{a.pct}%</td></tr>)}
          </tbody>
        </table>
      ) : <p className="small muted">O gabarito oficial da {prova.instituicao} não separa as questões por disciplina, então aqui só há o resultado geral.</p>}

      <h2>Mapa da prova</h2>
      <p className="small muted">✓ certa · ✗ errada (com a letra certa embaixo) · – em branco · ∅ anulada</p>
      <ol className="mapa" aria-label="Mapa da prova">
        {res.mapa.map((q) => (
          <li key={q.n} className={'mapa-q ' + q.situacao} title={`Questão ${q.n}: ${NOME_SIT[q.situacao]}${q.marcada ? `, você marcou ${q.marcada}` : ''}${q.gabarito && q.gabarito !== '*' ? `, gabarito ${q.gabarito}` : ''}`}>
            <span className="mapa-n">{q.n}</span>
            <span aria-hidden="true">{SIMBOLO[q.situacao]}{q.situacao === 'errada' ? q.marcada : ''}</span>
            {q.situacao === 'errada' && <span className="mapa-certa">{q.gabarito}</span>}
            <span className="sr-only">{NOME_SIT[q.situacao]}</span>
          </li>
        ))}
      </ol>

      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn primary" onClick={aoRefazer}>Refazer esta prova</button>
        <a className="btn" href={prova.link_gabarito} target="_blank" rel="noopener noreferrer">Gabarito oficial</a>
        <button className="btn danger" onClick={aoApagar}><Icon nome="lixo" /> Apagar tentativa</button>
      </div>

      {apagando && <Confirmar texto="Apagar esta tentativa? Ela sai da sua evolução e não pode ser desfeita." aoConfirmar={aoConfirmarApagar} aoCancelar={aoCancelarApagar} />}
    </div>
  )
}
