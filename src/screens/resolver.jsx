// Resolver questão: responde, vê a correção e anota no caderno de erros.
import { useEffect, useRef, useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { MOTIVOS_ERRO, corrigir } from '../lib/questoes.js'
import { agoraMs } from '../lib/datas.js'
import { Campo, ERRO_GENERICO, Icon, Janela, MateriaChip, avisar } from '../components/index.jsx'

export default function Resolver({ goto, params }) {
  const { materiaPorId, recarregarRespostas } = useEstudo()
  const [q, setQ] = useState(null)
  const [erro, setErro] = useState(null)
  const [escolhida, setEscolhida] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [anotando, setAnotando] = useState(false)
  const [noCaderno, setNoCaderno] = useState(false)
  const inicio = useRef(0)

  useEffect(() => {
    Promise.all([dados.listarQuestoes(), dados.listarCaderno()]).then(([r, c]) => {
      if (r.erro) { setErro(r.erro); return }
      const achou = r.data.find((x) => x.id === params.id)
      if (!achou) setErro('Questão não encontrada.')
      setQ(achou || null)
      setNoCaderno(!!c.data?.some((x) => x.questao_id === params.id))
      inicio.current = agoraMs() // o tempo conta a partir de quando a questão aparece
    })
  }, [params.id])

  const lista = params.lista || []
  const proxima = lista[lista.indexOf(params.id) + 1]

  async function responder(letra) {
    if (escolhida || salvando) return
    setSalvando(true)
    const acertou = corrigir(q, letra)
    const r = await dados.registrarRespostaQuestao({ questao_id: q.id, escolhida: letra, acertou, tempo_seg: Math.round((agoraMs() - inicio.current) / 1000) })
    setSalvando(false)
    if (r.erro) { avisar(ERRO_GENERICO, true); return }
    setEscolhida(letra)
    recarregarRespostas()
  }

  async function salvarParaRevisar() {
    const r = await dados.anotarNoCaderno({ questao_id: q.id, revisar: true })
    if (r.erro) avisar(ERRO_GENERICO, true); else { setNoCaderno(true); avisar('Salvo para revisar.') }
  }

  if (erro) return <div className="stack" style={{ paddingTop: 18 }}><div className="msg-erro">{erro}</div><button className="btn" onClick={() => goto('questoes')}>Voltar</button></div>
  if (!q) return <div className="loading">Carregando…</div>

  const acertou = escolhida && corrigir(q, escolhida)

  return (
    <div className="stack" style={{ paddingTop: 12, maxWidth: 780 }}>
      <button className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={() => goto('questoes')}><Icon nome="voltar" tamanho={16} /> Questões</button>
      <div className="row">
        <MateriaChip materia={materiaPorId[q.materia_id]} />
        <span className="pill plain">{q.assunto}</span>
        <span className="pill plain">{q.nivel}</span>
        {q.instituicao && <span className="pill plain">{q.instituicao}{q.ano ? ` ${q.ano}` : ''}</span>}
        {q.user_id && <span className="pill info">minha</span>}
      </div>
      <p className="enunciado">{q.enunciado}</p>

      <div className="alts" role="group" aria-label="Alternativas">
        {q.alternativas.map((a) => {
          const classe = !escolhida ? '' : a.letra === q.correta ? ' certa' : a.letra === escolhida ? ' errada' : ''
          return (
            <button key={a.letra} className={'alt' + classe} disabled={!!escolhida || salvando} onClick={() => responder(a.letra)}>
              <span className="letra">{a.letra}</span>
              <span>{a.texto}{escolhida && a.explicacao && <span className="expl">{a.explicacao}</span>}</span>
            </button>
          )
        })}
      </div>

      {escolhida && (
        <>
          <div className={'faixa-resultado ' + (acertou ? 'ok' : 'crit')} role="status">
            {acertou ? 'Acertou' : `Errou — a correta é ${q.correta}`}
          </div>
          {q.resposta_comentada && <div className="panel"><h3 style={{ marginBottom: 6 }}>Resposta comentada</h3><p className="texto-longo">{q.resposta_comentada}</p></div>}
          <div className="row">
            <button className="btn" disabled={noCaderno} onClick={salvarParaRevisar}>{noCaderno ? 'Está no caderno' : 'Salvar para revisar'}</button>
            {!acertou && <button className="btn" onClick={() => setAnotando(true)}><Icon nome="caderno" /> Anotar no caderno de erros</button>}
            <button className="btn" onClick={() => goto('resolver', { ...params, n: (params.n || 0) + 1 })}>Refazer</button>
            {proxima && <button className="btn primary" onClick={() => goto('resolver', { id: proxima, lista })}>Próxima <Icon nome="avancar" tamanho={18} /></button>}
          </div>
        </>
      )}

      {anotando && <FormErro aoFechar={() => setAnotando(false)} aoSalvar={async (motivo, anotacao) => {
        const r = await dados.anotarNoCaderno({ questao_id: q.id, motivo, anotacao, revisar: true })
        if (r.erro) { avisar(ERRO_GENERICO, true); return }
        setNoCaderno(true); setAnotando(false); avisar('Anotado no caderno de erros.')
      }} />}
    </div>
  )
}

export function FormErro({ inicial = {}, aoFechar, aoSalvar }) {
  const [motivo, setMotivo] = useState(inicial.motivo || '')
  const [anotacao, setAnotacao] = useState(inicial.anotacao || '')
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo="Caderno de erros" aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        if (!motivo) { setErro('Escolha o motivo.'); return }
        setSalvando(true); await aoSalvar(motivo, anotacao.trim()); setSalvando(false)
      }}>
        <Campo rotulo="Por que errou?" erro={erro}>
          <select className="ipt" value={motivo} onChange={(e) => { setMotivo(e.target.value); setErro(null) }}>
            <option value="">Escolha…</option>
            {MOTIVOS_ERRO.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Campo>
        <Campo rotulo="Anotação (opcional)" dica="O que fazer para não errar de novo."><textarea className="ipt" value={anotacao} onChange={(e) => setAnotacao(e.target.value)} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
