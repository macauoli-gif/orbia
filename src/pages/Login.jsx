// Entrar · Criar conta · Esqueci a senha
import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { Campo, Marca } from '../components/index.jsx'

export default function Login() {
  const [modo, setModo] = useState('entrar') // entrar | criar | esqueci
  const [f, setF] = useState({ nome: '', email: '', senha: '', senha2: '' })
  const [erros, setErros] = useState({})
  const [msg, setMsg] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const trocar = (m) => { setModo(m); setErros({}); setMsg(null) }

  function validar() {
    const e = {}
    if (modo === 'criar' && !f.nome.trim()) e.nome = 'Escreva seu nome.'
    if (modo === 'criar' && f.nome.trim().length > 80) e.nome = 'Até 80 caracteres.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) e.email = 'Confira o email.'
    if (modo !== 'esqueci' && f.senha.length < 8) e.senha = 'A senha tem pelo menos 8 caracteres.'
    if (modo === 'criar' && f.senha !== f.senha2) e.senha2 = 'As senhas não são iguais.'
    setErros(e)
    return Object.keys(e).length === 0
  }

  async function enviar(ev) {
    ev.preventDefault()
    setMsg(null)
    if (!validar()) return
    setEnviando(true)
    if (modo === 'entrar') {
      const r = await dados.entrar(f.email, f.senha)
      if (r.erro) setMsg({ erro: true, texto: r.erro })
    } else if (modo === 'criar') {
      const r = await dados.criarConta(f)
      if (r.erro) setMsg({ erro: true, texto: r.erro })
      else { setMsg({ texto: 'Enviamos um email para confirmar sua conta. Abra o link e volte aqui para entrar.' }); setModo('entrar') }
    } else {
      await dados.esqueciSenha(f.email)
      setMsg({ texto: 'Se este email tiver conta, enviamos um link para criar uma senha nova.' })
    }
    setEnviando(false)
  }

  const titulo = { entrar: 'Entrar', criar: 'Criar conta', esqueci: 'Esqueci a senha' }[modo]

  return (
    <div className="entrada">
      <div className="caixa stack">
        <div>
          <Marca como="h1" />
          <p className="muted">Seu plano de estudos, do 9º ano ao vestibular</p>
        </div>
        <form className="panel form-grid" onSubmit={enviar} noValidate>
          <h2>{titulo}</h2>
          {modo === 'criar' && (
            <Campo rotulo="Nome" erro={erros.nome}>
              <input className="ipt" value={f.nome} onChange={set('nome')} maxLength={80} autoComplete="name" aria-invalid={!!erros.nome} />
            </Campo>
          )}
          <Campo rotulo="Email" erro={erros.email} dica={modo === 'criar' ? 'Use o mesmo email da compra na Hotmart.' : null}>
            <input className="ipt" type="email" value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={!!erros.email} />
          </Campo>
          {modo !== 'esqueci' && (
            <Campo rotulo="Senha" erro={erros.senha} dica={modo === 'criar' ? 'Mínimo de 8 caracteres.' : null}>
              <input className="ipt" type="password" value={f.senha} onChange={set('senha')}
                autoComplete={modo === 'criar' ? 'new-password' : 'current-password'} aria-invalid={!!erros.senha} />
            </Campo>
          )}
          {modo === 'criar' && (
            <Campo rotulo="Repetir senha" erro={erros.senha2}>
              <input className="ipt" type="password" value={f.senha2} onChange={set('senha2')} autoComplete="new-password" aria-invalid={!!erros.senha2} />
            </Campo>
          )}
          {msg && <div className={msg.erro ? 'msg-erro' : 'msg-ok'} role="alert">{msg.texto}</div>}
          <button className="btn primary big block" disabled={enviando}>
            {enviando ? 'Aguarde…' : { entrar: 'Entrar', criar: 'Criar conta', esqueci: 'Enviar link' }[modo]}
          </button>
          <div className="row-between">
            {modo === 'entrar'
              ? <><button type="button" className="link-btn" onClick={() => trocar('criar')}>Criar conta</button>
                <button type="button" className="link-btn" onClick={() => trocar('esqueci')}>Esqueci a senha</button></>
              : <button type="button" className="link-btn" onClick={() => trocar('entrar')}>Voltar para Entrar</button>}
          </div>
          {modo === 'criar' && <p className="small muted">Ao criar a conta você aceita os termos de uso e a política de privacidade (textos em preparação).</p>}
        </form>

        <EntrarComoExemplo />
      </div>
    </div>
  )
}

// Só enquanto o app usa dados de mentira: entra direto como cada pessoa de exemplo.
function EntrarComoExemplo() {
  const pessoas = dados.pessoasDeExemplo()
  if (!pessoas.length) return null
  return (
    <div className="demo stack">
      <p className="small muted"><b>Modo de teste.</b> Ainda não há banco: entre como uma das pessoas de exemplo.</p>
      <div className="row">
        {pessoas.map((u) => (
          <button key={u.email} type="button" className="btn" onClick={() => dados.entrar(u.email, 'exemplo123')}>{u.rotulo}</button>
        ))}
      </div>
      <button type="button" className="link-btn" onClick={() => dados.recomecarMock()}>Voltar os dados de exemplo ao início</button>
    </div>
  )
}
