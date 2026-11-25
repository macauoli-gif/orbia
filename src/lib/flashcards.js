// Regras do jogo de flashcards.

// 0 a 3 estrelas pela proporção de acertos da rodada.
export const estrelas = (acertos, total) => (total ? Math.round((acertos / total) * 3) : 0)
