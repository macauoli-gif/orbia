// Quem entra onde. É esta decisão que separa quem pagou de quem não pagou,
// então ela mora aqui (com teste) e não espalhada nas telas.
// No banco a mesma regra é a RLS; aqui ela só escolhe a tela.

export const WHATSAPP_SUPORTE = '(71) 90078-6252'
export const LINK_WHATSAPP = 'https://wa.me/5571900786252'

export function licencaAtiva(licenca, emailConfirmado) {
  return !!(emailConfirmado && licenca && licenca.status === 'Ativa')
}

// Devolve: 'admin' | 'sem-licenca' | 'licenca-bloqueada' | 'nao-confirmado' | 'serie' | 'aluno'
export function telaDeEntrada({ perfil, licenca, emailConfirmado }) {
  if (!perfil) return 'sem-licenca'
  if (perfil.role === 'admin') return 'admin'
  if (!emailConfirmado) return 'nao-confirmado'
  if (!licenca) return 'sem-licenca'
  if (licenca.status !== 'Ativa') return 'licenca-bloqueada'
  if (!perfil.serie) return 'serie'
  return 'aluno'
}

export function normalizarEmail(email) {
  return String(email || '').trim().toLowerCase()
}
