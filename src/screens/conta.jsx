// Minha conta: aluno e administradora.
import { useState } from 'react'
import * as dados from '../lib/dados.js'
import { useEstudo } from '../lib/EstudoContext.jsx'
import { metasSugeridas } from '../lib/series.js'
import { Campo, ERRO_GENERICO, Icon, Janela, PageHeader, avisar } from '../components/index.jsx'
import Serie from './serie.jsx'

export default function ContaAluno() {
  const { perfil, atualizarPerfil } = useEstudo()
  return <Conta perfil={perfil} salvar={atualizarPerfil} aluno />
}

export function Conta({ perfil, salvar, aluno = false }) {
  const [nome, setNome] = useState(perfil.nome)
  const [metas, setMetas] = useState({ q: perfil.meta_questoes_semana, f: perfil.meta_foco_min_semana, p: perfil.meta_provas_mes })
  const [trocandoSerie, setTrocandoSerie] = useState(false)
  const [trocandoSenha, setTrocandoSenha] = useState(false)
  const [salvando, setSalvando] = useState(false)

  async function gravar(mudancas) {
    setSalvando(true)
    const r = await salvar(mudancas)
    setSalvando(false)
    avisar(r.erro ? ERRO_GENERICO : 'Salvo.', !!r.erro)
    return r
  }

  if (trocandoSerie) {
    return <Serie perfil={perfil} salvar={salvar} aoCancelar={() => setTrocandoSerie(false)}
      aoTerminar={(serie) => {
        const m = metasSugeridas(serie)
        setMetas({ q: m.meta_questoes_semana, f: m.meta_foco_min_semana, p: m.meta_provas_mes })
        setTrocandoSerie(false)
        avisar('Série alterada. Metas sugeridas aplicadas; para trocar a semana, use "Carregar semana sugerida" no Cronograma.')
      }} />
  }

  const num = (v) => Math.max(0, Math.round(Number(v) || 0))

  return (
    <div className="stack" style={{ maxWidth: 640 }}>
      <PageHeader titulo="Minha conta" />
      <section className="panel form-grid">
        <Campo rotulo="Nome"><input className="ipt" value={nome} maxLength={80} onChange={(e) => setNome(e.target.value)} /></Campo>
        <Campo rotulo="Email" dica="O email da compra. Não dá para trocar por aqui."><input className="ipt" value={perfil.email} readOnly /></Campo>
        <div><button className="btn primary" disabled={salvando || !nome.trim() || nome.trim() === perfil.nome} onClick={() => gravar({ nome: nome.trim() })}>Salvar nome</button></div>
      </section>

      {aluno && (
        <>
          <section className="panel stack">
            <div className="row-between">
              <div><h2>Série</h2><p className="muted">{perfil.serie}</p></div>
              <button className="btn" onClick={() => setTrocandoSerie(true)}>Alterar série</button>
            </div>
          </section>
          <section className="panel form-grid">
            <h2>Metas</h2>
            <p className="small muted">São sugestões do app para a sua série. Mude se quiser.</p>
            <div className="form-row">
              <Campo rotulo="Questões por semana"><input className="ipt" type="number" min="0" value={metas.q} onChange={(e) => setMetas({ ...metas, q: e.target.value })} /></Campo>
              <Campo rotulo="Minutos de foco por semana"><input className="ipt" type="number" min="0" step="30" value={metas.f} onChange={(e) => setMetas({ ...metas, f: e.target.value })} /></Campo>
              <Campo rotulo="Provas anteriores por mês"><input className="ipt" type="number" min="0" value={metas.p} onChange={(e) => setMetas({ ...metas, p: e.target.value })} /></Campo>
            </div>
            <div className="row">
              <button className="btn primary" disabled={salvando} onClick={() => gravar({ meta_questoes_semana: num(metas.q), meta_foco_min_semana: num(metas.f), meta_provas_mes: num(metas.p) })}>Salvar metas</button>
              <button className="btn" disabled={salvando} onClick={() => {
                const m = metasSugeridas(perfil.serie)
                setMetas({ q: m.meta_questoes_semana, f: m.meta_foco_min_semana, p: m.meta_provas_mes })
                gravar(m)
              }}>Restaurar metas sugeridas</button>
            </div>
            <label className="check"><input type="checkbox" checked={perfil.so_sugerido !== false} onChange={(e) => gravar({ so_sugerido: e.target.checked })} /> Mostrar primeiro só o que o app sugere para a minha série</label>
          </section>
        </>
      )}

      <section className="panel stack">
        <div className="row">
          <button className="btn" onClick={() => setTrocandoSenha(true)}>Trocar senha</button>
          <button className="btn danger" onClick={() => dados.sair()}><Icon nome="sair" /> Sair</button>
        </div>
        <p className="small muted">Termos de uso e política de privacidade: textos em preparação.</p>
      </section>

      {trocandoSenha && <TrocarSenha aoFechar={() => setTrocandoSenha(false)} />}
    </div>
  )
}

function TrocarSenha({ aoFechar }) {
  const [s, setS] = useState({ a: '', b: '' })
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)
  return (
    <Janela titulo="Trocar senha" aoFechar={aoFechar}>
      <form className="form-grid" noValidate onSubmit={async (e) => {
        e.preventDefault()
        if (s.a.length < 8) { setErro('A senha precisa ter pelo menos 8 caracteres.'); return }
        if (s.a !== s.b) { setErro('As senhas não são iguais.'); return }
        setSalvando(true)
        const r = await dados.trocarSenha(s.a)
        setSalvando(false)
        if (r.erro) { setErro(r.erro); return }
        avisar('Senha trocada.'); aoFechar()
      }}>
        <Campo rotulo="Senha nova" dica="Mínimo de 8 caracteres."><input className="ipt" type="password" autoComplete="new-password" value={s.a} onChange={(e) => setS({ ...s, a: e.target.value })} /></Campo>
        <Campo rotulo="Repetir senha nova" erro={erro}><input className="ipt" type="password" autoComplete="new-password" value={s.b} onChange={(e) => setS({ ...s, b: e.target.value })} /></Campo>
        <div className="janela-acoes">
          <button type="button" className="btn" onClick={aoFechar}>Cancelar</button>
          <button className="btn primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Janela>
  )
}
