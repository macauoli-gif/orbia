// Shell do aluno: navegação por estado (sem endereço no navegador),
// barra inferior no celular e menu lateral no computador.
import { useState } from 'react'
import { EstudoProvider, useEstudo } from '../lib/EstudoContext.jsx'
import { Avisos, Icon, useDesktop } from '../components/index.jsx'
import FaixaMetas from '../screens/faixa-metas.jsx'
import Quadro from '../screens/quadro.jsx'
import Cronograma from '../screens/cronograma.jsx'
import Questoes from '../screens/questoes.jsx'
import Resolver from '../screens/resolver.jsx'
import Caderno from '../screens/caderno.jsx'
import Foco from '../screens/foco.jsx'
import Mais from '../screens/mais.jsx'
import Resumos from '../screens/resumos.jsx'
import Flashcards from '../screens/flashcards.jsx'
import Conta from '../screens/conta.jsx'

const INFERIOR = [
  ['quadro', 'Quadro', 'quadro'],
  ['cronograma', 'Cronograma', 'cronograma'],
  ['questoes', 'Questões', 'questoes'],
  ['foco', 'Foco', 'foco'],
  ['mais', 'Mais', 'mais'],
]
const LATERAL = [
  ...INFERIOR.slice(0, 4),
  ['resumos', 'Banco de resumos', 'resumos'],
  ['flashcards', 'Flashcards', 'flashcards'],
  ['conta', 'Minha conta', 'conta'],
]
// Qual item do menu fica aceso em cada tela.
const SECAO = { resolver: 'questoes', caderno: 'questoes', resumos: 'resumos', flashcards: 'flashcards', conta: 'conta' }

export default function AppAluno({ perfil }) {
  return (
    <EstudoProvider perfilInicial={perfil}>
      <Shell />
    </EstudoProvider>
  )
}

function Shell() {
  const desktop = useDesktop()
  const { carregando, erro } = useEstudo()
  const [rota, setRota] = useState({ tela: 'quadro', params: {} })
  const goto = (tela, params = {}) => { setRota({ tela, params }); window.scrollTo(0, 0) }

  const secao = SECAO[rota.tela] || rota.tela
  const secaoInferior = desktop ? secao : (['resumos', 'flashcards', 'conta'].includes(secao) ? 'mais' : secao)
  const props = { goto, params: rota.params }

  let corpo
  switch (rota.tela) {
    case 'cronograma': corpo = <Cronograma {...props} />; break
    case 'questoes': corpo = <Questoes {...props} />; break
    case 'resolver': corpo = <Resolver key={rota.params.id + (rota.params.n || '')} {...props} />; break
    case 'caderno': corpo = <Caderno {...props} />; break
    case 'foco': corpo = <Foco {...props} />; break
    case 'mais': corpo = <Mais {...props} />; break
    case 'resumos': corpo = <Resumos {...props} />; break
    case 'flashcards': corpo = <Flashcards {...props} />; break
    case 'conta': corpo = <Conta {...props} />; break
    default: corpo = <Quadro {...props} />
  }

  return (
    <div className="app" data-desktop={desktop ? '1' : '0'}>
      <nav className="sidebar" aria-label="Menu">
        <div className="marca">Pauta de Estudos</div>
        {LATERAL.map(([id, rotulo, icone]) => (
          <button key={id} aria-current={secao === id ? 'page' : undefined} onClick={() => goto(id)}>
            <Icon nome={icone} /> {rotulo}
          </button>
        ))}
      </nav>
      <main className="app-body">
        {carregando && <div className="loading">Carregando…</div>}
        {erro && <div className="msg-erro" role="alert" style={{ marginTop: 16 }}>{erro}</div>}
        {!carregando && !erro && <><FaixaMetas goto={goto} />{corpo}</>}
      </main>
      <nav className="bottom-nav" aria-label="Menu">
        {INFERIOR.map(([id, rotulo, icone]) => (
          <button key={id} aria-current={secaoInferior === id ? 'page' : undefined} onClick={() => goto(id)}>
            <Icon nome={icone} /> {rotulo}
          </button>
        ))}
      </nav>
      <Avisos />
    </div>
  )
}
