// Licenças (só a administradora). Mostra só dados da compra — nunca estudos.
import { useEffect, useState } from 'react'
import * as dados from '../lib/dados.js'
import { resumoLicencas, filtrarLicencas } from '../lib/admin.js'
import { dataCurta } from '../lib/datas.js'
import { Campo, Confirmar, ERRO_GENERICO, Estado, Icon, Janela, PageHeader, avisar } from '../components/index.jsx'

export default function Licencas() {
  const [licencas, setLicencas] = useState([])
  const [avisosErro, setAvisosErro] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [f, setF] = useState({ busca: '', status: '', origem: '' })
  const [liberando, setLiberando] = useState(null)     // {} ou { email } vindo de um aviso
  const [bloqueando, setBloqueando] = useState(null)
  const [desbloqueando, setDesbloqueando] = useState(null)
  const [verAvisos, setVerAvisos] = useState(false)

  const carregar = async () => {
    const [l, a] = await Promise.all([dados.listarLicencas(), dados.listarAvisosComErro()])
    if (l.erro || a.erro) setErro(l.erro || a.erro)
    else { setLicencas(l.data); setAvisosErro(a.data) }
    setCarregando(false)
  }
  useEffect(() => { carregar() }, [])

  const n = resumoLicencas(licencas)
  const lista = filtrarLicencas(licencas, f)

  return (
    <div>
      <PageHeader titulo="Licenças">
        <button className="btn primary" onClick={() => setLiberando({})}><Icon nome="mais_sinal" /> Liberar email</button>
      </PageHeader>
      <div className="numeros">
        <div className="numero"><b>{n.ativas}</b><span>Licenças ativas</span></div>
        <div className="numero" style={{ borderLeftColor: 'var(--crit)' }}><b>{n.bloqueadas}</b><span>Bloqueadas</span></div>
        <div className="numero" style={{ borderLeftColor: 'var(--ok)' }}><b>{n.vendidasNoMes}</b><span>Vendidas neste mês</span></div>
      </div>
      {avisosErro.length > 0 && (
        <button className="aviso crit" style={{ marginBottom: 12 }} onClick={() => setVerAvisos(true)}>
          <span className="tag">Hotmart</span><span className="grow">{avisosErro.length} {avisosErro.length === 1 ? 'aviso da Hotmart com erro' : 'avisos da Hotmart com erro'} — ver e liberar à mão</span>
        </button>
      )}
      <div className="filtros">
        <input className="ipt" type="search" placeholder="Buscar por nome ou email" aria-label="Buscar" value={f.busca} onChange={(e) => setF({ ...f, busca: e.target.value })} />
        <select className="ipt" aria-label="Situação" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>
          <option value="">Todas as situações</option><option>Ativa</option><option>Bloqueada</option>
        </select>
        <select className="ipt" aria-label="Origem" value={f.origem} onChange={(e) => setF({ ...f, origem: e.target.value })}>
          <option value="">Todas as origens</option><option>Hotmart</option><option>Manual</option>
        </select>
      </div>

      <Estado carregando={carregando} erro={erro} vazio={licencas.length === 0 || lista.length === 0}
        textoVazio={licencas.length === 0 ? 'Nenhuma licença ainda. Quando a primeira venda for aprovada na Hotmart, ela aparece aqui.' : 'Nenhuma licença com estes filtros.'}>
        <div className="panel tabela-wrap" style={{ padding: 0 }}>
          <table className="tabela">
            <thead><tr><th>Nome</th><th>Email</th><th>Compra</th><th>Origem</th><th>Situação</th><th>Conta criada</th><th><span className="sr-only">Ações</span></th></tr></thead>
            <tbody>
              {lista.map((l) => (
                <tr key={l.id}>
                  <td><b>{l.nome || '—'}</b></td>
                  <td>{l.email}</td>
                  <td data-rotulo="Compra">{dataCurta(l.comprado_em.slice(0, 10))}</td>
                  <td data-rotulo="Origem">{l.origem}{l.motivo ? <div className="small muted">{l.motivo}</div> : null}</td>
                  <td><span className={'pill ' + (l.status === 'Ativa' ? 'ok' : 'crit')}>{l.status}</span></td>
                  <td data-rotulo="Conta criada">{l.conta_criada ? 'Sim' : 'Ainda não'}</td>
                  <td>{l.status === 'Ativa'
                    ? <button className="btn danger" onClick={() => setBloqueando(l)}>Bloquear</button>
                    : <button className="btn" onClick={() => setDesbloqueando(l)}>Desbloquear</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Estado>

      {liberando && <FormLiberar inicial={liberando} aoFechar={() => setLiberando(null)} aoSalvar={async (v) => {
        const r = await dados.liberarEmail(v)
        if (r.erro) return r.erro
        setLiberando(null); avisar('Licença liberada.'); carregar()
        return null
      }} />}
      {bloqueando && <FormBloquear licenca={bloqueando} aoFechar={() => setBloqueando(null)} aoSalvar={async (motivo) => {
        const r = await dados.bloquearLicenca(bloqueando.id, motivo)
        setBloqueando(null)
        if (r.erro) avisar(ERRO_GENERICO, true); else { avisar('Licença bloqueada.'); carregar() }
      }} />}
      {desbloqueando && <Confirmar texto={`Desbloquear a licença de ${desbloqueando.email}? A pessoa volta a ter acesso.`} rotulo="Desbloquear"
        aoCancelar={() => setDesbloqueando(null)} aoConfirmar={async () => {
          const r = await dados.desbloquearLicenca(desbloqueando.id)
          setDesbloqueando(null)
          if (r.erro) avisar(ERRO_GENERICO, true); else { avisar('Licença desbloqueada.'); carregar() }
        }} />}
      {verAvisos && (
        <Janela titulo="Avisos da Hotmart com erro" aoFechar={() => setVerAvisos(false)}>
          <div className="lista">
            {avisosErro.map((a) => (
              <div key={a.id} className="item">
                <p><b>{a.email || 'sem email'}</b> · {new Date(a.created_at).toLocaleString('pt-BR')}</p>
                <p className="small muted">{a.evento} · {a.erro}</p>
                <button className="btn" style={{ marginTop: 8 }} onClick={() => { setVerAvisos(false); setLiberando({ email: a.email || '' }) }}>Liberar este email</button>
              </div>
            ))}
          </div>
        </Janela>
      )}
    </div>
  )
}

function FormLiberar({ inicial, aoFechar, aoSalvar }) {
  const [v, setV] = useState({ email: '', nome: '', motivo: '', ...inicial })
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo="Liberar email" aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        setSalvando(true); const msg = await aoSalvar(v); setSalvando(false)
        if (msg) setErro(msg)
      }}>
        <Campo rotulo="Email" erro={erro}><input className="ipt" type="email" value={v.email} onChange={(e) => { setV({ ...v, email: e.target.value }); setErro(null) }} autoFocus /></Campo>
        <Campo rotulo="Nome (opcional)"><input className="ipt" value={v.nome} onChange={(e) => setV({ ...v, nome: e.target.value })} /></Campo>
        <Campo rotulo="Motivo (opcional)" dica='Ex.: "cortesia", "comprou com outro email"'><input className="ipt" value={v.motivo} onChange={(e) => setV({ ...v, motivo: e.target.value })} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Liberando…' : 'Liberar'}</button>
        </div>
      </form>
    </Janela>
  )
}

function FormBloquear({ licenca, aoFechar, aoSalvar }) {
  const [motivo, setMotivo] = useState('')
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo="Bloquear licença" aoFechar={aoFechar} centro>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        if (!motivo.trim()) { setErro('Escreva o motivo.'); return }
        setSalvando(true); await aoSalvar(motivo.trim()); setSalvando(false)
      }}>
        <p>Bloquear a licença de <b>{licenca.email}</b>? A pessoa perde o acesso a tudo na próxima vez que o app conferir.</p>
        <Campo rotulo="Motivo" erro={erro} dica='Ex.: "reembolso"'><input className="ipt" value={motivo} onChange={(e) => { setMotivo(e.target.value); setErro(null) }} autoFocus /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn danger" disabled={salvando}>{salvando ? 'Bloqueando…' : 'Bloquear'}</button>
        </div>
      </form>
    </Janela>
  )
}
