// Quem clicou no link de "Esqueci a senha" volta para cá para criar a senha nova.
import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { Campo } from '../components/index.jsx'

export default function NovaSenha({ aoTerminar }) {
  const [s, setS] = useState({ a: '', b: '' })
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    if (s.a.length < 8) { setErro('A senha precisa ter pelo menos 8 caracteres.'); return }
    if (s.a !== s.b) { setErro('As senhas não são iguais.'); return }
    setSalvando(true)
    const r = await dados.trocarSenha(s.a)
    setSalvando(false)
    if (r.erro) { setErro(r.erro); return }
    aoTerminar()
  }

  return (
    <div className="entrada">
      <form className="caixa panel form-grid" onSubmit={enviar} noValidate>
        <h1>Criar senha nova</h1>
        <Campo rotulo="Senha nova" dica="Mínimo de 8 caracteres.">
          <input className="ipt" type="password" autoComplete="new-password" value={s.a} onChange={(e) => setS({ ...s, a: e.target.value })} autoFocus />
        </Campo>
        <Campo rotulo="Repetir senha nova" erro={erro}>
          <input className="ipt" type="password" autoComplete="new-password" value={s.b} onChange={(e) => setS({ ...s, b: e.target.value })} />
        </Campo>
        <button className="btn primary big block" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar senha nova'}</button>
      </form>
    </div>
  )
}
