// Mais: o que não cabe na barra inferior do celular.
import { Icon, PageHeader } from '../components/index.jsx'

const ITENS = [
  ['resumos', 'Banco de resumos', 'Seus PDFs anotados e resumos digitados', 'resumos'],
  ['flashcards', 'Flashcards', 'Pergunta na frente, resposta no verso', 'flashcards'],
  ['conta', 'Minha conta', 'Nome, série, metas e sair', 'conta'],
]

export default function Mais({ goto }) {
  return (
    <div>
      <PageHeader titulo="Mais" />
      <div className="lista">
        {ITENS.map(([id, titulo, linha, icone]) => (
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
