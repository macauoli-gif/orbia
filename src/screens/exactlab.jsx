// ExactLab: fórmulas de Matemática, Física e Química (9º EF ao 3º EM) e,
// na Química, a Tabela Periódica Interativa. Conteúdo e buscas em lib/exactlab/.
import { useState } from 'react'
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

function Formulas({ area }) {
  const { perfil } = useEstudo()
  const [serie, setSerie] = useState('')
  const [busca, setBusca] = useState('')
  const grupos = filtrarFormulas(area.grupos, { serie, busca })

  return (
    <section aria-label={`Fórmulas de ${area.nome}`}>
      <div className="toolbar">
        <label className="sr-only" htmlFor="f-busca">Buscar fórmula</label>
        <input id="f-busca" className="ipt" type="search" placeholder="Buscar: Bhaskara, Ohm, pH…" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <label className="sr-only" htmlFor="f-serie">Série</label>
        <select id="f-serie" className="ipt" value={serie} onChange={(e) => setSerie(e.target.value)}>
          <option value="">Todas as séries</option>
          {SERIES.map((s) => <option key={s} value={s}>{configSerie(s).nome}{s === perfil.serie ? ' (a sua)' : ''}</option>)}
        </select>
      </div>
      <p className="small muted">{contarFormulas(grupos)} fórmulas</p>
      {grupos.length === 0 && <p className="empty">Nenhuma fórmula com esse filtro. Tente outra palavra ou "Todas as séries".</p>}
      {grupos.map((g) => (
        <details key={g.assunto} className="formula-grupo" open={!!busca || grupos.length <= 3}>
          <summary><b>{g.assunto}</b> <span className="pill plain">{g.serie}</span> <span className="small muted">{g.formulas.length}</span></summary>
          <div className="formulas">
            {g.formulas.map(([nome, expr, vars, obs]) => (
              <article key={nome} className="formula">
                <h3>{nome}</h3>
                <p className="formula-expr">{expr}</p>
                <dl className="formula-vars">
                  {vars.map(([s, sig], i) => (s ? <div key={i}><dt>{s}</dt><dd>{sig}</dd></div> : <div key={i} className="nota-formula"><dd>{sig}</dd></div>))}
                </dl>
                {obs && <p className="small muted">{obs}</p>}
              </article>
            ))}
          </div>
        </details>
      ))}
    </section>
  )
}
