// Faixa de metas da semana e o aviso de ritmo.
import { diaDaSemana, inicioDaSemana } from './datas.js'
import { configSerie } from './series.js'

const naSemana = (iso, agora) => new Date(iso) >= inicioDaSemana(agora)

export function progressoDaSemana({ perfil, respostas = [], sessoes = [], agora = new Date() }) {
  const questoes = respostas.filter((r) => naSemana(r.created_at, agora)).length
  const focoMin = sessoes.filter((s) => naSemana(s.inicio, agora)).reduce((n, s) => n + (s.minutos || 0), 0)
  const metaQ = perfil.meta_questoes_semana || 0
  const metaFoco = perfil.meta_foco_min_semana || 0

  // A semana já andou X%; se as questões estão 25 pontos atrás, avisa.
  const andou = diaDaSemana(agora) / 7
  const ritmoBaixo = metaQ > 0 && questoes / metaQ < andou - 0.25

  return {
    questoes, metaQ, focoMin, metaFoco,
    mostraProvas: (configSerie(perfil.serie)?.vestibular || 0) > 0,
    metaProvas: perfil.meta_provas_mes || 0,
    ritmoBaixo,
    textoRitmo: ritmoBaixo ? `Ritmo abaixo da meta: ${questoes} de ${metaQ} questões e a semana já passou de ${Math.round(andou * 100)}%.` : '',
  }
}

export const porcentagem = (feito, meta) => (meta > 0 ? Math.min(100, Math.round((feito / meta) * 100)) : 0)

export function textoMinutos(min) {
  const h = Math.floor(min / 60), m = min % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${m} min` : `${h} h`
}
