// Regras do Pomodoro.
import { hojeISO, inicioDaSemana } from './datas.js'

// O banco exige minutos > 0: sessão de poucos segundos conta como 1 minuto.
export function minutosFocados(segundos) {
  return Math.max(1, Math.round(segundos / 60))
}

// Vale gravar? Menos de 30 segundos é clique sem querer.
export const valeGravar = (segundos) => segundos >= 30

export function sessoesDeHoje(sessoes, agora = new Date()) {
  const hoje = hojeISO(agora)
  return sessoes.filter((s) => hojeISO(new Date(s.inicio)) === hoje).sort((a, b) => b.inicio.localeCompare(a.inicio))
}

export function minutosDaSemana(sessoes, agora = new Date()) {
  const ini = inicioDaSemana(agora)
  return sessoes.filter((s) => new Date(s.inicio) >= ini).reduce((n, s) => n + s.minutos, 0)
}

// Cronômetro pelo relógio real, não por tiques: o navegador desacelera (ou para)
// os tiques quando o aluno sai da aba ou o celular apaga a tela, e o tempo
// gravado saía menor que o real. Todos os horários em milissegundos.
export function novoCronometro(totalSeg, agora) {
  return { totalMs: totalSeg * 1000, acumuladoMs: 0, rodandoDesde: agora }
}
export function pausarCronometro(c, agora) {
  if (c.rodandoDesde == null) return c
  return { ...c, acumuladoMs: c.acumuladoMs + (agora - c.rodandoDesde), rodandoDesde: null }
}
export function retomarCronometro(c, agora) {
  if (c.rodandoDesde != null) return c
  return { ...c, rodandoDesde: agora }
}
export function decorridoSeg(c, agora) {
  const ms = c.acumuladoMs + (c.rodandoDesde != null ? agora - c.rodandoDesde : 0)
  return Math.min(c.totalMs, Math.max(0, ms)) / 1000
}
export function restanteSeg(c, agora) {
  return Math.max(0, Math.ceil(c.totalMs / 1000 - decorridoSeg(c, agora)))
}

export function relogio(segundos) {
  const m = Math.floor(segundos / 60), s = segundos % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
