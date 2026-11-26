// Série: na primeira entrada e por "Alterar série" em Minha conta.
import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { Marca } from '../components/index.jsx'
import { SERIES, configSerie, metasSugeridas, semanaSugerida } from '../lib/series.js'

export default function Serie({ perfil, primeiraVez = false, aoTerminar, salvar = dados.salvarPerfil, aoCancelar }) {
  const [serie, setSerie] = useState(perfil.serie || '')
  const [etapa, setEtapa] = useState('escolher') // escolher | oferta
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  async function comecar() {
    if (!serie) { setErro('Escolha a sua série.'); return }
    setSalvando(true)
    const r = await salvar({ serie, ...metasSugeridas(serie) })
    setSalvando(false)
    if (r.erro) { setErro(r.erro); return }
    if (primeiraVez) setEtapa('oferta')
    else aoTerminar(serie)
  }

  async function carregarSemana() {
    setSalvando(true)
    const [m, t] = await Promise.all([dados.listarMaterias(), dados.listarTarefas()])
    const r = await dados.trocarSemana(semanaSugerida(serie, m.data || [], t.data || []))
    setSalvando(false)
    if (r.erro) { setErro(r.erro); return }
    aoTerminar(serie)
  }

  if (etapa === 'oferta') {
    return (
      <div className="entrada">
        <div className="caixa panel stack">
          <h1>Tudo pronto</h1>
          <p>Quer começar com a semana de estudos sugerida para o {serie}? Dá para mudar qualquer bloco depois.</p>
          {erro && <div className="msg-erro" role="alert">{erro}</div>}
          <button className="btn primary big" disabled={salvando} onClick={carregarSemana}>
            {salvando ? 'Carregando…' : 'Carregar a semana sugerida no Cronograma'}
          </button>
          <button className="btn big" onClick={() => aoTerminar(serie)}>Agora não</button>
        </div>
      </div>
    )
  }

  return (
    <div className={primeiraVez ? 'entrada' : ''}>
      <div className="caixa stack" style={primeiraVez ? null : { maxWidth: 560, paddingTop: 18 }}>
        {primeiraVez && <Marca como="h1" slogan />}
        <h2>Em que série você está?</h2>
        <p className="muted small">O app se adapta: metas, cronograma sugerido e as questões mudam conforme a série.</p>
        <fieldset className="series" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="sr-only">Série</legend>
          {SERIES.map((s) => (
            <label key={s} className="serie-card">
              <input type="radio" name="serie" value={s} checked={serie === s} onChange={() => { setSerie(s); setErro(null) }} />
              <div><b>{configSerie(s).nome}</b></div>
            </label>
          ))}
        </fieldset>
        {erro && <div className="msg-erro" role="alert">{erro}</div>}
        <div className="row">
          <button className="btn primary big grow" disabled={salvando} onClick={comecar}>
            {salvando ? 'Salvando…' : primeiraVez ? 'Começar' : 'Salvar'}
          </button>
          {aoCancelar && <button className="btn big" onClick={aoCancelar}>Cancelar</button>}
        </div>
      </div>
    </div>
  )
}
