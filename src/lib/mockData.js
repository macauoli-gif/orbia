// ============================================================
// DADOS MOCK (de mentira) para ver e clicar no app sem banco.
// Mesmos nomes de campo das tabelas do PRD-BACKEND: na Etapa 7
// isto vira o seed do banco.
//
// DOIS ALUNOS, de propósito (Maria Claudia e Pedro): é o que prova
// que um não vê nada do outro. A camada de dados (dados.js) aplica
// no mock as mesmas regras que a RLS vai aplicar no banco.
// ============================================================
import { MATERIAS, RESUMOS_APP, FLASHCARDS_APP, QUESTOES_APP } from './fabrica.js'
import { semanaSugerida, metasSugeridas } from './series.js'

// Vire para false na Etapa 7 (ler do Supabase).
export const USAR_MOCK = true

const m = (nome) => MATERIAS.find((x) => x.nome === nome).id

export const MOCK_USUARIOS = [
  { id: 'u-admin', email: 'admin@exemplo.com', confirmado: true },
  { id: 'u-maria', email: 'maria@exemplo.com', confirmado: true },
  { id: 'u-pedro', email: 'pedro@exemplo.com', confirmado: true },
  { id: 'u-ana', email: 'ana@exemplo.com', confirmado: true },
  { id: 'u-lucas', email: 'lucas@exemplo.com', confirmado: true },
]

const perfil = (id, nome, email, role, serie) => ({
  id, nome, email, role, serie, so_sugerido: true, created_at: '2026-11-03T10:00:00-03:00',
  ...metasSugeridas(serie),
})

function tarefa(id, user_id, titulo, materia, prazo, prioridade, status, concluida_em = null) {
  return { id, user_id, titulo, materia_id: m(materia), prazo, prioridade, status, observacao: '', concluida_em, created_at: '2026-11-15T10:00:00-03:00' }
}

function blocosDe(user_id, serie, tarefas) {
  return semanaSugerida(serie, MATERIAS, tarefas.filter((t) => t.user_id === user_id))
    .map((b, i) => ({ ...b, id: `${user_id}-b${i + 1}`, user_id, created_at: '2026-11-03T10:00:00-03:00' }))
}

export function criarMock() {
  const tarefas = [
    tarefa('t-m1', 'u-maria', 'Lista de função do 2º grau', 'Matemática', '2026-11-21', 'Alta', 'A fazer'),
    tarefa('t-m2', 'u-maria', 'Resumo de Revolução Industrial', 'História', '2026-11-26', 'Média', 'A fazer'),
    tarefa('t-m3', 'u-maria', 'Redação: tema da semana', 'Produção de texto', '2026-11-28', 'Alta', 'Em andamento'),
    tarefa('t-m4', 'u-maria', 'Exercícios de leis de Newton', 'Física', '2026-12-02', 'Média', 'A fazer'),
    tarefa('t-m5', 'u-maria', 'Ler capítulo 3 da obra do bimestre', 'Literatura', null, 'Baixa', 'A fazer'),
    tarefa('t-m6', 'u-maria', 'Revisar células e organelas', 'Biologia', '2026-11-18', 'Média', 'Concluído', '2026-11-17T18:00:00-03:00'),
    tarefa('t-m7', 'u-maria', 'Vocabulário unidade 4', 'Língua inglesa', '2026-11-20', 'Baixa', 'Concluído', '2026-11-20T17:00:00-03:00'),
    tarefa('t-m8', 'u-maria', 'Prova anterior Fuvest 2024', 'Matemática', '2026-11-30', 'Alta', 'A fazer'),
    tarefa('t-p1', 'u-pedro', 'Classes de palavras', 'Língua portuguesa', '2026-11-27', 'Média', 'A fazer'),
    tarefa('t-p2', 'u-pedro', 'Mapa dos biomas', 'Geografia', '2026-11-24', 'Alta', 'Em andamento'),
  ]

  return {
    usuarios: MOCK_USUARIOS,
    profiles: [
      perfil('u-admin', 'Administradora', 'admin@exemplo.com', 'admin', null),
      perfil('u-maria', 'Maria Claudia', 'maria@exemplo.com', 'aluno', '2º ano EM'),
      perfil('u-pedro', 'Pedro Souza', 'pedro@exemplo.com', 'aluno', '9º ano EF'),
      perfil('u-ana', 'Ana', 'ana@exemplo.com', 'aluno', null),
      perfil('u-lucas', 'Lucas', 'lucas@exemplo.com', 'aluno', '1º ano EM'),
    ],
    licencas: [
      { id: 'l-maria', email: 'maria@exemplo.com', nome: 'Maria Claudia', status: 'Ativa', origem: 'Hotmart', hotmart_transacao: 'HP0000001', comprado_em: '2026-11-03T10:00:00-03:00', bloqueada_em: null, motivo: null, created_at: '2026-11-03T10:00:00-03:00' },
      { id: 'l-pedro', email: 'pedro@exemplo.com', nome: 'Pedro Souza', status: 'Ativa', origem: 'Manual', hotmart_transacao: null, comprado_em: '2026-11-18T09:00:00-03:00', bloqueada_em: null, motivo: 'cortesia', created_at: '2026-11-18T09:00:00-03:00' },
      { id: 'l-lucas', email: 'lucas@exemplo.com', nome: 'Lucas', status: 'Bloqueada', origem: 'Hotmart', hotmart_transacao: 'HP0000002', comprado_em: '2026-11-10T10:00:00-03:00', bloqueada_em: '2026-11-15T10:00:00-03:00', motivo: 'reembolso', created_at: '2026-11-10T10:00:00-03:00' },
      { id: 'l-bia', email: 'bia@exemplo.com', nome: 'Beatriz Lima', status: 'Ativa', origem: 'Hotmart', hotmart_transacao: 'HP0000003', comprado_em: '2026-11-24T20:00:00-03:00', bloqueada_em: null, motivo: null, created_at: '2026-11-24T20:00:00-03:00' },
    ],
    hotmart_eventos: [
      { id: 'e-1', evento: 'PURCHASE_APPROVED', transacao: 'HP0000004', email: 'joao@exemplo', payload: {}, processado: false, erro: 'Email do comprador inválido', created_at: '2026-11-23T14:00:00-03:00' },
    ],
    materias: MATERIAS,
    resumos: [
      ...RESUMOS_APP,
      { id: 'r-m1', user_id: 'u-maria', materia_id: m('Química'), titulo: 'Ligações químicas (meu resumo)', texto: 'Ligação iônica: transferência de elétrons entre metal e ametal.\nLigação covalente: compartilhamento de pares de elétrons entre ametais.\nLigação metálica: cátions em um mar de elétrons livres.', serie_minima: null, created_at: '2026-11-22T10:00:00-03:00' },
      { id: 'r-p1', user_id: 'u-pedro', materia_id: m('Geografia'), titulo: 'Biomas (anotações do Pedro)', texto: 'Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa e Pantanal.', serie_minima: null, created_at: '2026-11-21T10:00:00-03:00' },
    ],
    resumos_lidos: [
      { id: 'rl-1', user_id: 'u-maria', resumo_id: 'b-bio-1', created_at: '2026-11-17T10:00:00-03:00' },
    ],
    flashcards: [
      ...FLASHCARDS_APP,
      { id: 'f-m1', user_id: 'u-maria', materia_id: m('Biologia'), frente: 'Qual organela faz a respiração celular?', verso: 'A mitocôndria.', serie_minima: null, created_at: '2026-11-17T10:00:00-03:00' },
      { id: 'f-p1', user_id: 'u-pedro', materia_id: m('Geografia'), frente: 'Quantos biomas continentais o Brasil tem?', verso: 'Seis.', serie_minima: null, created_at: '2026-11-21T10:00:00-03:00' },
    ],
    flashcard_respostas: [
      { id: 'fr-1', user_id: 'u-maria', flashcard_id: 'f-1', acertou: true, created_at: '2026-11-24T15:00:00-03:00' },
      { id: 'fr-2', user_id: 'u-maria', flashcard_id: 'f-3', acertou: false, created_at: '2026-11-24T15:01:00-03:00' },
    ],
    questoes: [
      ...QUESTOES_APP,
      { id: 'q-m1', user_id: 'u-maria', materia_id: m('Matemática'), assunto: 'Porcentagem', nivel: 'Fácil', instituicao: 'Outra', ano: 2025, enunciado: 'Uma camiseta de R$ 80,00 teve 25% de desconto. Qual o preço final?', alternativas: [{ letra: 'A', texto: 'R$ 55,00', explicacao: '' }, { letra: 'B', texto: 'R$ 60,00', explicacao: '25% de 80 é 20; 80 − 20 = 60.' }, { letra: 'C', texto: 'R$ 64,00', explicacao: '' }, { letra: 'D', texto: 'R$ 70,00', explicacao: '' }], correta: 'B', resposta_comentada: '25% = 1/4. Um quarto de 80 é 20.', serie_minima: null, created_at: '2026-11-20T10:00:00-03:00' },
    ],
    respostas_questoes: [
      { id: 'rq-1', user_id: 'u-maria', questao_id: 'q-mat-01', escolhida: 'B', acertou: true, tempo_seg: 70, created_at: '2026-11-24T16:00:00-03:00' },
      { id: 'rq-2', user_id: 'u-maria', questao_id: QUESTOES_APP[1].id, escolhida: 'A', acertou: QUESTOES_APP[1].correta === 'A', tempo_seg: 95, created_at: '2026-11-24T16:05:00-03:00' },
      { id: 'rq-3', user_id: 'u-maria', questao_id: QUESTOES_APP[5].id, escolhida: 'E', acertou: QUESTOES_APP[5].correta === 'E', tempo_seg: 120, created_at: '2026-11-25T09:00:00-03:00' },
      { id: 'rq-4', user_id: 'u-pedro', questao_id: 'q-mat-01', escolhida: 'C', acertou: false, tempo_seg: 40, created_at: '2026-11-24T10:00:00-03:00' },
    ],
    caderno_erros: [
      { id: 'ce-1', user_id: 'u-maria', questao_id: QUESTOES_APP[5].id, motivo: 'Falta de atenção', anotacao: 'Li rápido demais o enunciado.', revisar: true, created_at: '2026-11-25T09:02:00-03:00' },
      { id: 'ce-2', user_id: 'u-pedro', questao_id: 'q-mat-01', motivo: 'Não sabia o conteúdo', anotacao: 'Rever soma e produto.', revisar: true, created_at: '2026-11-24T10:01:00-03:00' },
    ],
    tarefas,
    cronograma_blocos: [...blocosDe('u-maria', '2º ano EM', tarefas), ...blocosDe('u-pedro', '9º ano EF', tarefas)],
    sessoes_foco: [
      { id: 's-1', user_id: 'u-maria', materia_id: m('Matemática'), tarefa_id: 't-m1', inicio: '2026-11-24T14:00:00-03:00', minutos: 25, saidas_aba: 1, completou: true, created_at: '2026-11-24T14:25:00-03:00' },
      { id: 's-2', user_id: 'u-maria', materia_id: m('História'), tarefa_id: null, inicio: '2026-11-25T14:00:00-03:00', minutos: 25, saidas_aba: 0, completou: true, created_at: '2026-11-25T14:25:00-03:00' },
      { id: 's-3', user_id: 'u-pedro', materia_id: m('Geografia'), tarefa_id: 't-p2', inicio: '2026-11-24T15:00:00-03:00', minutos: 15, saidas_aba: 3, completou: false, created_at: '2026-11-24T15:15:00-03:00' },
    ],
  }
}
