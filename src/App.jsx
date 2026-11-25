// Checa o login e a licença e mostra a tela certa.
// A decisão de quem entra onde mora em lib/licenca.js (com teste).
import { useEffect, useState } from 'react'
import * as dados from './lib/dados.js'
import { telaDeEntrada } from './lib/licenca.js'
import Login from './pages/Login.jsx'
import SemLicenca from './pages/SemLicenca.jsx'
import AppAluno from './pages/AppAluno.jsx'
import AppAdmin from './pages/AppAdmin.jsx'
import Serie from './screens/serie.jsx'
import NovaSenha from './pages/NovaSenha.jsx'

export default function App() {
  const [sessao, setSessao] = useState(undefined) // undefined = ainda conferindo
  const [entrada, setEntrada] = useState(null)
  const [erro, setErro] = useState(null)
  const [recuperando, setRecuperando] = useState(false) // voltou pelo link de "esqueci a senha"

  useEffect(() => {
    dados.sessaoAtual().then(({ data }) => setSessao(data))
    return dados.ouvirSessao((s, evento) => {
      setSessao(s)
      if (evento === 'PASSWORD_RECOVERY') setRecuperando(true)
    })
  }, [])

  const conferir = async () => {
    setErro(null)
    const r = await dados.carregarEntrada()
    if (r.erro) setErro(r.erro)
    else setEntrada(r.data)
  }

  useEffect(() => {
    setEntrada(null)
    if (sessao) conferir()
  }, [sessao?.id])

  if (sessao === undefined) return <div className="loading">Carregando…</div>
  if (!sessao) return <Login />
  if (recuperando) return <NovaSenha aoTerminar={() => setRecuperando(false)} />
  if (erro) return <SemLicenca caso="erro" email={sessao.email} mensagem={erro} aoTentar={conferir} />
  if (!entrada) return <div className="loading">Carregando…</div>

  const tela = telaDeEntrada(entrada)
  if (tela === 'admin') return <AppAdmin perfil={entrada.perfil} />
  if (tela === 'aluno') return <AppAluno key={entrada.perfil.id} perfil={entrada.perfil} />
  if (tela === 'serie') return <Serie perfil={entrada.perfil} primeiraVez aoTerminar={conferir} />
  return <SemLicenca caso={tela} email={sessao.email} aoTentar={conferir} />
}
