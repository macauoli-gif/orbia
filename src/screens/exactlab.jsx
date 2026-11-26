// ExactLab: fórmulas de Matemática, Física e Química (9º EF ao 3º EM) e,
// na Química, a Tabela Periódica Interativa. Conteúdo e buscas em lib/exactlab/.
import { useState } from 'react'
import { Janela } from '../components/index.jsx'
import { AREAS, filtrarFormulas, contarFormulas } from '../lib/exactlab/formulas.js'
import { SERIES, configSerie } from '../lib/series.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import TabelaPeriodica from './tabela-periodica.jsx'

const ICONE_AREA = { matematica: '∑', fisica: '⚛', quimica: '⚗' }

export default function ExactLab() {
  const [area, setArea] = useState('matematica')
  const [quimica, setQuimica] = useState('tabela') // tabela | formulas

  return (
    <div className="exactlab">
      <header className="exact-topo">
        <h1><span className="exact-marca">Exact<b>Lab</b></span></h1>
        <p className="muted small">Fórmulas do 9º ano ao 3º ano do ensino médio e a tabela periódica para explorar.</p>
      </header>

      <div className="exact-abas" role="tablist" aria-label="Áreas">
        {AREAS.map((a) => (
          <button key={a.id} role="tab" aria-selected={area === a.id} className={'exact-aba ' + a.id} onClick={() => setArea(a.id)}>
            <span aria-hidden="true" className="exact-aba-icone">{ICONE_AREA[a.id]}</span> {a.nome}
          </button>
        ))}
      </div>

      {area === 'quimica' && (
        <div className="segmentado" role="tablist" aria-label="Química">
          <button role="tab" aria-selected={quimica === 'tabela'} onClick={() => setQuimica('tabela')}>Tabela periódica</button>
          <button role="tab" aria-selected={quimica === 'formulas'} onClick={() => setQuimica('formulas')}>Fórmulas</button>
        </div>
      )}

      {area === 'quimica' && quimica === 'tabela'
        ? <TabelaPeriodica />
        : <Formulas key={area} area={AREAS.find((a) => a.id === area)} />}
    </div>
  )
}

// Quadro de fórmulas em estilo Kanban: uma coluna por série, um cartão por assunto.
// Tocar no cartão abre todas as fórmulas do assunto. A busca filtra os cartões.
function Formulas({ area }) {
  const { perfil } = useEstudo()
  const [busca, setBusca] = useState('')
  const [aberto, setAberto] = useState(null)
  const grupos = filtrarFormulas(area.grupos, { busca })

  return (
    <section aria-label={`Fórmulas de ${area.nome}`}>
      <div className="toolbar">
        <label className="sr-only" htmlFor="f-busca">Buscar fórmula</label>
        <input id="f-busca" className="ipt" type="search" placeholder="Buscar: Bhaskara, Ohm, pH…" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <span className="small muted">{contarFormulas(grupos)} fórmulas em {grupos.length} assuntos</span>
      </div>
      {grupos.length === 0 && <p className="empty">Nenhuma fórmula com essa busca. Tente outra palavra.</p>}
      <div className="kanban-formulas">
        {SERIES.filter((s) => grupos.some((g) => g.serie === s)).map((s, ci) => {
          const daSerie = grupos.filter((g) => g.serie === s)
          return (
            <section key={s} className={'kf-coluna kf-serie-' + ci + (s === perfil.serie ? ' sua' : '')} aria-label={configSerie(s).nome}>
              <header className="kf-cabeca">
                <h2>{configSerie(s).nome}</h2>
                <span className="kf-conta">{contarFormulas(daSerie)}</span>
                {s === perfil.serie && <span className="pill kf-sua">a sua série</span>}
              </header>
              <div className="kf-cartoes">
                {daSerie.map((g) => (
                  <button key={g.assunto} className="kf-cartao" style={{ '--h': matizDe(g.assunto) }} onClick={() => setAberto(g)}>
                    <span className="kf-titulo">{g.assunto}</span>
                    {g.formulas.slice(0, 2).map(([nome, expr]) => (
                      <span key={nome} className="kf-previa"><span className="kf-previa-nome">{nome}</span><span className="kf-previa-expr">{expr}</span></span>
                    ))}
                    <span className="kf-rodape">{g.formulas.length} fórmula{g.formulas.length > 1 ? 's' : ''} · ver todas</span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {aberto && (
        <Janela titulo={aberto.assunto} aoFechar={() => setAberto(null)}>
          <p className="small muted">{area.nome} · {configSerie(aberto.serie).nome}</p>
          <div className="formulas">
            {aberto.formulas.map(([nome, expr, vars, obs]) => (
              <article key={nome} className="formula" style={{ '--h': matizDe(aberto.assunto) }}>
                <h3>{nome}</h3>
                <p className="formula-expr">{expr}</p>
                <dl className="formula-vars">
                  {vars.map(([s, sig], i) => (s ? <div key={i}><dt>{s}</dt><dd>{sig}</dd></div> : <div key={i} className="nota-formula"><dd>{sig}</dd></div>))}
                </dl>
                {obs && <p className="small muted">{obs}</p>}
              </article>
            ))}
          </div>
        </Janela>
      )}
    </section>
  )
}

// Cor de cada assunto: sempre a mesma para o mesmo nome (não muda com a busca).
const MATIZES = [8, 22, 38, 150, 172, 190, 205, 222, 265, 290, 320, 345]
function matizDe(texto) {
  let h = 0
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return MATIZES[h % MATIZES.length]
}
