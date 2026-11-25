import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { LINK_WHATSAPP, WHATSAPP_SUPORTE } from '../lib/licenca.js'
import { Icon } from '../components/index.jsx'

const TEXTOS = {
  'sem-licenca': {
    titulo: 'Licença não encontrada',
    texto: `Não encontramos uma licença para este email. Use o mesmo email da compra na Hotmart ou fale com o suporte: WhatsApp ${WHATSAPP_SUPORTE}.`,
  },
  'licenca-bloqueada': {
    titulo: 'Licença inativa',
    texto: `Sua licença não está ativa. Fale com o suporte: WhatsApp ${WHATSAPP_SUPORTE}.`,
  },
  'nao-confirmado': {
    titulo: 'Confirme seu email',
    texto: 'Enviamos um email para confirmar sua conta. Abra o link e volte aqui para entrar.',
  },
  erro: { titulo: 'Não conseguimos entrar', texto: '' },
}

export default function SemLicenca({ caso, email, mensagem, aoTentar }) {
  const t = TEXTOS[caso] || TEXTOS['sem-licenca']
  const [tentando, setTentando] = useState(false)
  return (
    <div className="entrada">
      <div className="caixa panel stack">
        <h1>{t.titulo}</h1>
        <p>{mensagem || t.texto}</p>
        <p className="muted small">Você entrou como <b>{email}</b>.</p>
        <a className="btn primary big" href={LINK_WHATSAPP} target="_blank" rel="noreferrer">
          <Icon nome="whatsapp" /> Falar no WhatsApp
        </a>
        <div className="row">
          <button className="btn grow" disabled={tentando}
            onClick={async () => { setTentando(true); await aoTentar(); setTentando(false) }}>
            {tentando ? 'Conferindo…' : 'Tentar de novo'}
          </button>
          <button className="btn grow" onClick={() => dados.sair()}><Icon nome="sair" /> Sair</button>
        </div>
      </div>
    </div>
  )
}
