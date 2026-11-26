// Tabela Periódica Interativa e Didática do ExactLab.
// Regras e dados em lib/exactlab/ (tabela.js, glossario.js); aqui só o desenho e o estado da tela.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import {
  ELEMENTOS, elementoPorZ, FAMILIAS, CLASSIFICACOES, ESTADOS, PROPRIEDADES, CAMADAS,
  buscar, passaNosFiltros, escala, camadasDe, configAbreviada, configEnergetica, particulas,
  estadoPrevisto, alternarComparacao, MAX_COMPARAR, eVparaKJmol, kelvinParaCelsius,
} from '../lib/exactlab/tabela.js'
import { GLOSSARIO, COMO_LER, ATIVIDADES, corrigirAtividade } from '../lib/exactlab/glossario.js'
import { ERRO_GENERICO, Janela, avisar } from '../components/index.jsx'

const MODOS = [
  ['familias', 'Famílias'], ['classificacao', 'Classificação'], ['estados', 'Estados físicos'],
  ['distribuicao', 'Distribuição eletrônica'], ['propriedades', 'Propriedades periódicas'],
]
// Classe de cor de cada valor (as cores ficam no CSS, com versão clara e escura).
const classe = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z]+/g, '-')
const blocoDe = (el) => (el.z === 2 ? 's' : el.grupo == null ? 'f' : el.grupo <= 2 ? 's' : el.grupo <= 12 ? 'd' : 'p')
const BLOCOS = [['s', 'Bloco s'], ['p', 'Bloco p'], ['d', 'Bloco d'], ['f', 'Bloco f']]
const fmt = (v, casas = 2) => (v == null ? 'não determinado' : Number(v).toLocaleString('pt-BR', { maximumFractionDigits: casas }))

export default function TabelaPeriodica() {
  const [modo, setModo] = useState('familias')
  const [prop, setProp] = useState('eletronegatividade')
  const [termo, setTermo] = useState('')
  const [f, setF] = useState({ familia: '', periodo: '', classificacao: '' })
  const [aberto, setAberto] = useState(null)      // ficha do elemento
  const [comparando, setComparando] = useState(false)
  const [comparar, setComparar] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [painel, setPainel] = useState('ler')    // ler | glossario | atividades | favoritos
  const [atividade, setAtividade] = useState(null)
  const [marcados, setMarcados] = useState([])
  const [resultado, setResultado] = useState(null)

  useEffect(() => { dados.listarFavoritos().then((r) => { if (!r.erro) setFavoritos(r.data) }) }, [])

  const encontrados = new Set(buscar(ELEMENTOS, termo).map((e) => e.z))
  const temBusca = termo.trim() !== ''
  const aceso = (el) => (!temBusca || encontrados.has(el.z)) && passaNosFiltros(el, f)
  const corProp = escala(ELEMENTOS, PROPRIEDADES[prop].campo)

  function tocar(el) {
    if (atividade) {
      if (resultado) return
      setMarcados((m) => (m.includes(el.z) ? m.filter((z) => z !== el.z) : [...m, el.z].slice(-atividade.quantos)))
      return
    }
    if (comparando) { setComparar((c) => alternarComparacao(c, el.z)); return }
    setAberto(el)
  }

  async function alternarFavorito(z) {
    const era = favoritos.includes(z)
    setFavoritos(era ? favoritos.filter((x) => x !== z) : [...favoritos, z])
    const r = era ? await dados.desfavoritar(z) : await dados.favoritar(z)
    if (r.erro) { setFavoritos(favoritos); avisar(ERRO_GENERICO, true) }
  }

  function comecarAtividade(a) { setAtividade(a); setMarcados([]); setResultado(null); setComparando(false); setPainel('atividades') }

  const estiloCelula = (el) => {
    if (modo !== 'propriedades') return null
    const v = corProp(el)
    return v == null ? null : { '--forca': v.toFixed(2) }
  }
  const classeCelula = (el) => {
    const base = ['elemento']
    if (modo === 'familias') base.push('fam-' + classe(el.familia))
    if (modo === 'classificacao') base.push('cls-' + classe(el.classificacao))
    if (modo === 'estados') base.push('est-' + classe(el.estado))
    if (modo === 'distribuicao') base.push('blo-' + blocoDe(el))
    if (modo === 'propriedades') base.push(corProp(el) == null ? 'prop-sem' : 'prop')
    if (!aceso(el)) base.push('apagado')
    if (comparar.includes(el.z) && comparando) base.push('selecionado')
    if (marcados.includes(el.z)) base.push('marcado')
    if (resultado && atividade?.resposta.includes(el.z)) base.push('resposta')
    return base.join(' ')
  }

  return (
    <section className="tabela-periodica" aria-label="Tabela periódica interativa">
      <div className="tp-controles">
        <label className="sr-only" htmlFor="tp-busca">Buscar elemento</label>
        <input id="tp-busca" className="ipt" type="search" placeholder="Buscar: nome, símbolo ou número" value={termo} onChange={(e) => setTermo(e.target.value)} />
        <div className="tp-modos" role="radiogroup" aria-label="Modo de visualização">
          {MODOS.map(([id, nome]) => (
            <button key={id} role="radio" aria-checked={modo === id} className={'chip-btn' + (modo === id ? ' ativo' : '')} onClick={() => setModo(id)}>{nome}</button>
          ))}
        </div>
        <div className="tp-filtros">
          <select className="ipt" aria-label="Filtrar por família" value={f.familia} onChange={(e) => setF({ ...f, familia: e.target.value })}>
            <option value="">Todas as famílias</option>{FAMILIAS.map((x) => <option key={x}>{x}</option>)}
          </select>
          <select className="ipt" aria-label="Filtrar por período" value={f.periodo} onChange={(e) => setF({ ...f, periodo: e.target.value })}>
            <option value="">Todos os períodos</option>{[1, 2, 3, 4, 5, 6, 7].map((p) => <option key={p} value={p}>{p}º período</option>)}
          </select>
          <select className="ipt" aria-label="Filtrar por classificação" value={f.classificacao} onChange={(e) => setF({ ...f, classificacao: e.target.value })}>
            <option value="">Todas as classificações</option>{CLASSIFICACOES.map((x) => <option key={x}>{x}</option>)}
          </select>
          {(f.familia || f.periodo || f.classificacao || temBusca) && <button className="btn" onClick={() => { setF({ familia: '', periodo: '', classificacao: '' }); setTermo('') }}>Limpar</button>}
          <button className={'btn' + (comparando ? ' primary' : '')} aria-pressed={comparando} onClick={() => { setComparando(!comparando); setAtividade(null) }}>
            {comparando ? `Comparando (${comparar.length}/${MAX_COMPARAR})` : 'Comparar elementos'}
          </button>
        </div>
      </div>

      {modo === 'propriedades' && (
        <div className="tp-prop">
          <div className="segmentado" role="radiogroup" aria-label="Propriedade">
            {Object.entries(PROPRIEDADES).map(([id, p]) => <button key={id} role="radio" aria-checked={prop === id} onClick={() => setProp(id)}>{p.nome}</button>)}
          </div>
          <p><b>{PROPRIEDADES[prop].nome}</b> <span className="small muted">({PROPRIEDADES[prop].unidade})</span>: {PROPRIEDADES[prop].tendencia}</p>
          <p className="small muted"><b>Por quê?</b> {PROPRIEDADES[prop].porque}</p>
        </div>
      )}

      <Legenda modo={modo} prop={prop} />
      {atividade && (
        <div className={'tp-atividade' + (resultado ? (resultado.certo ? ' certo' : ' errado') : '')} role="status">
          <p><b>Atividade:</b> {atividade.pergunta} <span className="small muted">({marcados.length} de {atividade.quantos} marcado{atividade.quantos > 1 ? 's' : ''})</span></p>
          {resultado && <p>{resultado.certo ? '✓ Acertou! ' : '✗ Ainda não. '}{atividade.explicacao}</p>}
          <div className="row">
            {!resultado && <button className="btn primary" disabled={marcados.length !== atividade.quantos} onClick={() => setResultado(corrigirAtividade(atividade, marcados))}>Conferir</button>}
            {resultado && <button className="btn primary" onClick={() => { const i = ATIVIDADES.indexOf(atividade); comecarAtividade(ATIVIDADES[(i + 1) % ATIVIDADES.length]) }}>Próxima atividade</button>}
            {resultado && !resultado.certo && <button className="btn" onClick={() => { setMarcados([]); setResultado(null) }}>Tentar de novo</button>}
            <button className="btn" onClick={() => { setAtividade(null); setMarcados([]); setResultado(null) }}>Sair da atividade</button>
          </div>
        </div>
      )}

      <p className="small muted tp-dica">Toque em um elemento para ver a ficha completa.{' '}<span className="so-celular">Arraste a tabela para os lados para ver tudo.</span></p>
      <div className="tp-rolagem">
        <div className="tp-grade" role="grid" aria-label="Elementos químicos">
          {[[6, 'La–Lu', '57–71'], [7, 'Ac–Lr', '89–103']].map(([linha, rot, faixa]) => (
            <div key={linha} className="elemento marcador" style={{ gridRow: linha, gridColumn: 3 }} aria-hidden="true"><span className="z">{faixa}</span><span className="sim">{rot}</span></div>
          ))}
          {ELEMENTOS.map((el) => (
            <button key={el.z} className={classeCelula(el)} style={{ gridRow: el.linha, gridColumn: el.coluna, ...estiloCelula(el) }}
              onClick={() => tocar(el)} aria-label={`${el.nome}, ${el.simbolo}, número atômico ${el.z}`} aria-pressed={comparando || atividade ? comparar.includes(el.z) || marcados.includes(el.z) : undefined}>
              <span className="z">{el.z}{favoritos.includes(el.z) && <span className="estrela" aria-label="favorito"> ★</span>}</span>
              <span className="sim">{el.simbolo}</span>
              <span className="nome">
                {modo === 'distribuicao' ? camadasDe(el.config).map((c) => c.eletrons).join('·')
                  : modo === 'propriedades' ? fmt(el[PROPRIEDADES[prop].campo], prop === 'eletronegatividade' ? 2 : 1).replace('não determinado', '—')
                    : el.nome}
              </span>
            </button>
          ))}
        </div>
      </div>

      {comparando && <Comparador lista={comparar} aoTirar={(z) => setComparar(comparar.filter((x) => x !== z))} />}

      <div className="tp-paineis">
        <div className="segmentado" role="tablist" aria-label="Aprender">
          {[['ler', 'Como ler a tabela'], ['glossario', 'Glossário'], ['atividades', 'Atividades guiadas'], ['favoritos', `Favoritos (${favoritos.length})`]].map(([id, nome]) => (
            <button key={id} role="tab" aria-selected={painel === id} onClick={() => setPainel(id)}>{nome}</button>
          ))}
        </div>
        {painel === 'ler' && <dl className="tp-lista">{COMO_LER.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>}
        {painel === 'glossario' && <dl className="tp-lista">{GLOSSARIO.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>}
        {painel === 'atividades' && (
          <ol className="tp-atividades">
            {ATIVIDADES.map((a) => (
              <li key={a.id}><button className={'item' + (atividade?.id === a.id ? ' ativo' : '')} onClick={() => comecarAtividade(a)}>{a.pergunta}</button></li>
            ))}
          </ol>
        )}
        {painel === 'favoritos' && (favoritos.length === 0
          ? <p className="empty">Nenhum favorito ainda. Abra a ficha de um elemento e toque na estrela.</p>
          : <div className="row">{[...favoritos].sort((a, b) => a - b).map((z) => { const e = elementoPorZ(z); return <button key={z} className="btn" onClick={() => setAberto(e)}>{e.simbolo} · {e.nome}</button> })}</div>)}
      </div>

      {aberto && <Ficha el={aberto} favorito={favoritos.includes(aberto.z)} aoFavoritar={() => alternarFavorito(aberto.z)}
        aoComparar={() => { setComparando(true); setComparar(comparar.includes(aberto.z) ? comparar : alternarComparacao(comparar, aberto.z)); setAtividade(null); setAberto(null) }}
        aoFechar={() => setAberto(null)} />}
    </section>
  )
}

function Legenda({ modo, prop }) {
  let itens = []
  if (modo === 'familias') itens = FAMILIAS.map((x) => ['fam-' + classe(x), x])
  if (modo === 'classificacao') itens = CLASSIFICACOES.map((x) => ['cls-' + classe(x), x])
  if (modo === 'estados') itens = ESTADOS.map((x) => ['est-' + classe(x), x === 'Não determinado' ? 'Não determinado (superpesados)' : x + ' a 25 °C'])
  if (modo === 'distribuicao') itens = BLOCOS.map(([b, n]) => ['blo-' + b, n])
  if (modo === 'propriedades') {
    return (
      <div className="tp-legenda" aria-label="Legenda">
        <span className="small">Menor</span><span className="escala-barra" aria-hidden="true" /><span className="small">Maior {PROPRIEDADES[prop].nome.toLowerCase()}</span>
        <span className="legenda-item"><span className="amostra prop-sem" aria-hidden="true" /> sem medida</span>
      </div>
    )
  }
  return (
    <div className="tp-legenda" aria-label="Legenda">
      {itens.map(([c, n]) => <span key={c} className="legenda-item"><span className={'amostra ' + c} aria-hidden="true" />{n}</span>)}
      {modo === 'distribuicao' && <span className="small muted">Cada quadrado mostra os elétrons por camada (K·L·M·N·O·P·Q).</span>}
    </div>
  )
}

// Desenho das camadas (modelo de Bohr simplificado, só para visualizar quantos elétrons há em cada uma).
function Camadas({ config }) {
  const cs = camadasDe(config)
  const R = 14 + cs.length * 13
  return (
    <svg className="bohr" viewBox={`${-R - 4} ${-R - 4} ${2 * R + 8} ${2 * R + 8}`} role="img" aria-label={`Camadas: ${cs.map((c) => `${c.camada} ${c.eletrons}`).join(', ')}`}>
      <circle r="9" className="nucleo" />
      {cs.map((c, i) => {
        const r = 14 + (i + 1) * 13
        return (
          <g key={c.camada}>
            <circle r={r} className="orbita" />
            {Array.from({ length: c.eletrons }, (_, k) => {
              const a = (2 * Math.PI * k) / c.eletrons - Math.PI / 2
              return <circle key={k} r="2.6" cx={r * Math.cos(a)} cy={r * Math.sin(a)} className="eletron" />
            })}
            <text x={r * 0.74 + 3} y={-r * 0.74 - 3} className="rotulo-camada" textAnchor="start">{c.camada}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Ficha({ el, favorito, aoFavoritar, aoComparar, aoFechar }) {
  const p = particulas(el)
  const cs = camadasDe(el.config)
  return (
    <Janela titulo={`${el.nome} (${el.simbolo})`} aoFechar={aoFechar}>
      <div className="ficha">
        <div className="ficha-topo">
          <div className={'ficha-quadro fam-' + classe(el.familia)}>
            <span className="z">{el.z}</span><span className="sim">{el.simbolo}</span><span className="nome">{el.nome}</span>
            <span className="massa">{fmt(el.massa, 3)}</span>
          </div>
          <Camadas config={el.config} />
        </div>
        <div className="row">
          <button className={'btn' + (favorito ? ' primary' : '')} aria-pressed={favorito} onClick={aoFavoritar}>{favorito ? '★ Favorito' : '☆ Favoritar'}</button>
          <button className="btn" onClick={aoComparar}>Comparar</button>
        </div>

        <dl className="ficha-dados">
          <div><dt>Número atômico (Z)</dt><dd>{el.z}</dd></div>
          <div><dt>Massa atômica</dt><dd>{fmt(el.massa, 4)} u{el.isotopoNatural ? '' : ' (do isótopo de vida mais longa)'}</dd></div>
          <div><dt>Grupo</dt><dd>{el.grupo ?? `Nenhum (bloco f — ${el.familia.toLowerCase()})`}</dd></div>
          <div><dt>Período</dt><dd>{el.periodo}º</dd></div>
          <div><dt>Família</dt><dd>{el.familia}</dd></div>
          <div><dt>Classificação</dt><dd>{el.classificacao}{el.z >= 104 ? ' (prevista)' : ''}</dd></div>
          <div><dt>Estado a 25 °C</dt><dd>{el.estado}{estadoPrevisto(el) ? ' (previsto)' : ''}</dd></div>
          <div><dt>Descoberta</dt><dd>{el.ano === 'Ancient' ? 'Conhecido desde a Antiguidade' : el.ano}</dd></div>
          {el.fusao != null && <div><dt>Ponto de fusão</dt><dd>{fmt(kelvinParaCelsius(el.fusao), 1)} °C</dd></div>}
          {el.ebulicao != null && <div><dt>Ponto de ebulição</dt><dd>{fmt(kelvinParaCelsius(el.ebulicao), 1)} °C</dd></div>}
          <div><dt>Eletronegatividade</dt><dd>{fmt(el.eletronegatividade)}</dd></div>
          <div><dt>Raio atômico</dt><dd>{el.raio == null ? 'não determinado' : `${el.raio} pm (van der Waals)`}</dd></div>
          <div><dt>1ª energia de ionização</dt><dd>{el.ionizacao == null ? 'não determinada' : `${fmt(el.ionizacao, 3)} eV (${fmt(eVparaKJmol(el.ionizacao), 0)} kJ/mol)`}</dd></div>
        </dl>

        <h3>Distribuição eletrônica{el.configPrevista ? ' (prevista)' : ''}</h3>
        <p className="formula-expr">{configAbreviada(el.config)}</p>
        <p className="small"><b>Ordem de energia (Linus Pauling):</b> {configEnergetica(el.config)}</p>
        <p className="small"><b>Por camada:</b> {cs.map((c) => `${c.camada} ${c.eletrons}`).join(' · ')} — {cs.at(-1).eletrons} elétron{cs.at(-1).eletrons > 1 ? 's' : ''} na camada de valência ({cs.at(-1).camada}).</p>

        <h3>Partículas</h3>
        <div className="particulas">
          <div><b>{p.protons}</b><span>prótons</span></div>
          <div><b>{p.eletrons}</b><span>elétrons (átomo neutro)</span></div>
          <div><b>{p.neutrons}</b><span>nêutrons no {el.nome.toLowerCase()}-{p.A}</span></div>
        </div>
        <p className="small muted">O número de nêutrons depende do isótopo: N = A − Z. Aqui usamos o {el.isotopoNatural ? 'isótopo mais abundante na natureza' : 'isótopo de vida mais longa (o elemento não tem isótopo estável)'}, com A = {p.A}.</p>

        <h3>Origem do nome</h3><p>{el.origem}</p>
        <h3>Principais características</h3><p>{el.caracteristicas}</p>
        {el.classificacao === 'Semimetal' && <p className="small muted">"Semimetal" é um nome usado nas escolas; não é uma categoria oficial da IUPAC.</p>}
        <h3>Aplicações e onde é encontrado</h3><p>{el.aplicacoes}</p>
        <h3>Curiosidade</h3><p>{el.curiosidade}</p>
        <p className="small muted">Dados numéricos: PubChem (NIH). Camadas: {CAMADAS.slice(0, cs.length).join(', ')}.</p>
      </div>
    </Janela>
  )
}

function Comparador({ lista, aoTirar }) {
  if (!lista.length) return <p className="tp-comparador empty">Toque em 2 a {MAX_COMPARAR} elementos na tabela para comparar.</p>
  const els = lista.map(elementoPorZ)
  const linhas = [
    ['Número atômico', (e) => e.z],
    ['Massa atômica (u)', (e) => fmt(e.massa, 3)],
    ['Família', (e) => e.familia],
    ['Classificação', (e) => e.classificacao],
    ['Grupo / período', (e) => `${e.grupo ?? 'f'} / ${e.periodo}º`],
    ['Estado a 25 °C', (e) => e.estado],
    ['Camadas', (e) => camadasDe(e.config).map((c) => c.eletrons).join('·')],
    ['Eletronegatividade', (e) => fmt(e.eletronegatividade)],
    ['Raio (pm)', (e) => fmt(e.raio, 0)],
    ['1ª ionização (eV)', (e) => fmt(e.ionizacao, 3)],
    ['Fusão (°C)', (e) => fmt(kelvinParaCelsius(e.fusao), 1)],
  ]
  return (
    <div className="tp-comparador tabela-wrap">
      <table className="tabela comparar">
        <thead><tr><th>Propriedade</th>{els.map((e) => <th key={e.z}>{e.simbolo} <button className="link-btn" aria-label={`Tirar ${e.nome} da comparação`} onClick={() => aoTirar(e.z)}>✕</button></th>)}</tr></thead>
        <tbody>
          {linhas.map(([nome, f]) => <tr key={nome}><td>{nome}</td>{els.map((e) => <td key={e.z} data-rotulo={e.simbolo}>{f(e)}</td>)}</tr>)}
        </tbody>
      </table>
      {lista.length === 1 && <p className="small muted">Escolha mais um elemento para comparar.</p>}
    </div>
  )
}
