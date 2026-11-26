// Mais: o que não cabe na barra inferior do celular.
import { Icon, PageHeader } from '../components/index.jsx'

const ITENS = [
  ['simulados', 'Simulados', 'Provas anteriores do ENEM e vestibulares, com correção', 'simulados'],
  ['exactlab', 'ExactLab', 'Fórmulas e tabela periódica interativa', 'exactlab'],
  ['flashcards', 'Flashcards', 'Pergunta na frente, resposta no verso', 'flashcards'],
  ['conta', 'Minha conta', 'Nome, série, metas e sair', 'conta'],
]

const LICENCAS = ['licencas', 'Licenças', 'Liberar, bloquear e acompanhar as compras', 'licencas']

export default function Mais({ goto, admin }) {
  const itens = admin ? [...ITENS, LICENCAS] : ITENS
  return (
    <div>
      <PageHeader titulo="Mais" />
      <div className="lista">
        {itens.map(([id, titulo, linha, icone]) => (
          <button key={id} className="item row" style={{ flexWrap: 'nowrap' }} onClick={() => goto(id)}>
            <Icon nome={icone} />
            <span className="grow"><b>{titulo}</b><br /><span className="small muted">{linha}</span></span>
            <Icon nome="avancar" />
          </button>
        ))}
      </div>
    </div>
  )
}
