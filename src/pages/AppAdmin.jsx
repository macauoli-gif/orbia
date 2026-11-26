// Shell da administradora SEM licença: Licenças e Minha conta, nenhum caminho
// para telas de estudo. Com licença de cortesia ela entra pelo AppAluno.
import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { Avisos, Icon, useDesktop } from '../components/index.jsx'
import Licencas from '../screens/licencas.jsx'
import { Conta } from '../screens/conta.jsx'

const MENU = [['licencas', 'Licenças', 'licencas'], ['conta', 'Minha conta', 'conta']]

export default function AppAdmin({ perfil: inicial }) {
  const desktop = useDesktop()
  const [perfil, setPerfil] = useState(inicial)
  const [tela, setTela] = useState('licencas')

  const salvar = async (m) => {
    const r = await dados.salvarPerfil(m)
    if (!r.erro) setPerfil(r.data)
    return r
  }

  return (
    <div className="app" data-desktop={desktop ? '1' : '0'}>
      <nav className="sidebar" aria-label="Menu">
        <div className="marca">Pauta de Estudos</div>
        {MENU.map(([id, rotulo, icone]) => (
          <button key={id} aria-current={tela === id ? 'page' : undefined} onClick={() => setTela(id)}><Icon nome={icone} /> {rotulo}</button>
        ))}
      </nav>
      <main className="app-body">
        {tela === 'conta' ? <Conta perfil={perfil} salvar={salvar} /> : <Licencas />}
      </main>
      <nav className="bottom-nav" aria-label="Menu">
        {MENU.map(([id, rotulo, icone]) => (
          <button key={id} aria-current={tela === id ? 'page' : undefined} onClick={() => setTela(id)}><Icon nome={icone} /> {rotulo}</button>
        ))}
      </nav>
      <Avisos />
    </div>
  )
}
