// Estado compartilhado do aluno: o que várias telas usam ao mesmo tempo
// (matérias, tarefas, respostas e sessões de foco alimentam a faixa de metas).
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as dados from './dados.js'

const Ctx = createContext(null)

export function EstudoProvider({ perfilInicial, children }) {
  const [perfil, setPerfil] = useState(perfilInicial)
  const [materias, setMaterias] = useState([])
  const [tarefas, setTarefas] = useState([])
  const [respostas, setRespostas] = useState([])
  const [sessoes, setSessoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const recarregarTarefas = async () => { const r = await dados.listarTarefas(); if (!r.erro) setTarefas(r.data); return r }
  const recarregarRespostas = async () => { const r = await dados.listarRespostasQuestoes(); if (!r.erro) setRespostas(r.data); return r }
  const recarregarSessoes = async () => { const r = await dados.listarSessoesFoco(); if (!r.erro) setSessoes(r.data); return r }

  useEffect(() => {
    let vivo = true
    Promise.all([dados.listarMaterias(), dados.listarTarefas(), dados.listarRespostasQuestoes(), dados.listarSessoesFoco()])
      .then(([m, t, r, s]) => {
        if (!vivo) return
        const e = [m, t, r, s].find((x) => x.erro)
        if (e) setErro(e.erro)
        else { setMaterias(m.data); setTarefas(t.data); setRespostas(r.data); setSessoes(s.data) }
        setCarregando(false)
      })
    return () => { vivo = false }
  }, [perfilInicial.id])

  const atualizarPerfil = async (mudancas) => {
    const antes = perfil
    setPerfil({ ...perfil, ...mudancas })
    const r = await dados.salvarPerfil(mudancas)
    if (r.erro) setPerfil(antes)
    return r
  }

  const valor = useMemo(() => ({
    perfil, atualizarPerfil, materias, carregando, erro,
    materiaPorId: Object.fromEntries(materias.map((m) => [m.id, m])),
    tarefas, setTarefas, recarregarTarefas,
    respostas, recarregarRespostas,
    sessoes, recarregarSessoes,
  }), [perfil, materias, tarefas, respostas, sessoes, carregando, erro])

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export const useEstudo = () => useContext(Ctx)
