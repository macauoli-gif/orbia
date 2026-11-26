// ============================================================
// CAMADA DE DADOS — a única porta do banco para as telas.
// Nenhuma tela fala com o Supabase (nem com o mock) direto: tudo passa
// por estas funções, que devolvem sempre { data, erro }.
//
// Dois miolos com as MESMAS funções:
//   dados-supabase.js — o banco de verdade (USAR_MOCK = false)
//   dados-mock.js     — dados de mentira que imitam a RLS (usado pelos testes)
// Função nova: escreva nos DOIS miolos e acrescente o nome aqui
// (tests/miolos.mjs confere que os três batem).
// ============================================================
import { USAR_MOCK } from './mockData.js'
import * as mock from './dados-mock.js'
import * as banco from './dados-supabase.js'

const m = USAR_MOCK ? mock : banco

export const sessaoAtual = (...a) => m.sessaoAtual(...a)
export const ouvirSessao = (...a) => m.ouvirSessao(...a)
export const entrar = (...a) => m.entrar(...a)
export const sair = (...a) => m.sair(...a)
export const criarConta = (...a) => m.criarConta(...a)
export const esqueciSenha = (...a) => m.esqueciSenha(...a)
export const trocarSenha = (...a) => m.trocarSenha(...a)
export const pessoasDeExemplo = (...a) => m.pessoasDeExemplo(...a)
export const recomecarMock = (...a) => m.recomecarMock(...a)
export const carregarEntrada = (...a) => m.carregarEntrada(...a)
export const salvarPerfil = (...a) => m.salvarPerfil(...a)
export const listarMaterias = (...a) => m.listarMaterias(...a)
export const listarTarefas = (...a) => m.listarTarefas(...a)
export const salvarTarefa = (...a) => m.salvarTarefa(...a)
export const apagarTarefa = (...a) => m.apagarTarefa(...a)
export const listarBlocos = (...a) => m.listarBlocos(...a)
export const salvarBloco = (...a) => m.salvarBloco(...a)
export const apagarBloco = (...a) => m.apagarBloco(...a)
export const trocarSemana = (...a) => m.trocarSemana(...a)
export const listarResumos = (...a) => m.listarResumos(...a)
export const salvarResumo = (...a) => m.salvarResumo(...a)
export const enviarResumoPdf = (...a) => m.enviarResumoPdf(...a)
export const lerPdfDoResumo = (...a) => m.lerPdfDoResumo(...a)
export const apagarResumo = (...a) => m.apagarResumo(...a)
export const listarAnotacoes = (...a) => m.listarAnotacoes(...a)
export const salvarAnotacao = (...a) => m.salvarAnotacao(...a)
export const listarResumosLidos = (...a) => m.listarResumosLidos(...a)
export const marcarResumoLido = (...a) => m.marcarResumoLido(...a)
export const listarFlashcards = (...a) => m.listarFlashcards(...a)
export const salvarFlashcard = (...a) => m.salvarFlashcard(...a)
export const apagarFlashcard = (...a) => m.apagarFlashcard(...a)
export const listarRespostasFlashcards = (...a) => m.listarRespostasFlashcards(...a)
export const registrarRespostaFlashcard = (...a) => m.registrarRespostaFlashcard(...a)
export const listarQuestoes = (...a) => m.listarQuestoes(...a)
export const salvarQuestao = (...a) => m.salvarQuestao(...a)
export const listarRespostasQuestoes = (...a) => m.listarRespostasQuestoes(...a)
export const registrarRespostaQuestao = (...a) => m.registrarRespostaQuestao(...a)
export const listarCaderno = (...a) => m.listarCaderno(...a)
export const anotarNoCaderno = (...a) => m.anotarNoCaderno(...a)
export const tirarDoCaderno = (...a) => m.tirarDoCaderno(...a)
export const listarSessoesFoco = (...a) => m.listarSessoesFoco(...a)
export const registrarSessaoFoco = (...a) => m.registrarSessaoFoco(...a)
export const listarTentativas = (...a) => m.listarTentativas(...a)
export const salvarTentativa = (...a) => m.salvarTentativa(...a)
export const apagarTentativa = (...a) => m.apagarTentativa(...a)
export const listarFavoritos = (...a) => m.listarFavoritos(...a)
export const favoritar = (...a) => m.favoritar(...a)
export const desfavoritar = (...a) => m.desfavoritar(...a)
export const listarLicencas = (...a) => m.listarLicencas(...a)
export const liberarEmail = (...a) => m.liberarEmail(...a)
export const bloquearLicenca = (...a) => m.bloquearLicenca(...a)
export const desbloquearLicenca = (...a) => m.desbloquearLicenca(...a)
export const listarAvisosComErro = (...a) => m.listarAvisosComErro(...a)
