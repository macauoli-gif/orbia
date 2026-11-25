// Datas no fuso de quem usa. Nunca use toISOString().split('T')[0] para "hoje":
// ele converte para UTC e, no Brasil, depois das 21h vira o dia seguinte.

const dois = (n) => String(n).padStart(2, '0')

export function hojeISO(d = new Date()) {
  return `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`
}

export function paraData(iso) {
  const [a, m, d] = String(iso).slice(0, 10).split('-').map(Number)
  return new Date(a, m - 1, d)
}

// Quantos dias de `de` até `ate` (positivo = no futuro).
export function diasEntre(de, ate) {
  return Math.round((paraData(ate) - paraData(de)) / 864e5)
}

export function somarDias(iso, n) {
  const d = paraData(iso)
  d.setDate(d.getDate() + n)
  return hojeISO(d)
}

// 1 = segunda ... 7 = domingo (o mesmo de cronograma_blocos.dia_semana).
export function diaDaSemana(d = new Date()) {
  return ((d.getDay() + 6) % 7) + 1
}

export function inicioDaSemana(d = new Date()) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() - (diaDaSemana(d) - 1))
  return x
}

export function inicioDoMes(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function dataCurta(iso) {
  if (!iso) return ''
  return paraData(iso).toLocaleDateString('pt-BR')
}

export function minutosDoDia(hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number)
  return h * 60 + m
}

export const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

// Relógio em milissegundos (fora das telas, para a medição não rodar durante o desenho da tela).
export const agoraMs = () => Date.now()
