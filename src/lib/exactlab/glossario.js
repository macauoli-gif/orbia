// Glossário, "como ler a tabela" e atividades guiadas da Tabela Periódica.
// As respostas das atividades são números atômicos; a conferência mora em corrigirAtividade.

export const GLOSSARIO = [
  ['Átomo', 'A menor parte de um elemento que mantém suas propriedades químicas. Tem um núcleo (prótons e nêutrons) e elétrons ao redor.'],
  ['Elemento químico', 'Conjunto de átomos com o mesmo número de prótons (o mesmo número atômico).'],
  ['Número atômico (Z)', 'Quantidade de prótons no núcleo. Identifica o elemento: Z = 6 é sempre carbono.'],
  ['Número de massa (A)', 'Soma de prótons e nêutrons do núcleo: A = Z + N. Varia de um isótopo para outro.'],
  ['Massa atômica', 'Média das massas dos isótopos de um elemento, ponderada pela abundância de cada um na natureza, em unidades de massa atômica (u).'],
  ['Isótopos', 'Átomos do mesmo elemento (mesmo Z) com números de nêutrons diferentes. Ex.: carbono-12 e carbono-14.'],
  ['Íon', 'Átomo que ganhou elétrons (ânion, carga negativa) ou perdeu elétrons (cátion, carga positiva).'],
  ['Período', 'Linha horizontal da tabela (são 7). O número do período indica quantas camadas eletrônicas o átomo tem.'],
  ['Grupo ou família', 'Coluna vertical (são 18). Elementos do mesmo grupo costumam ter propriedades químicas parecidas, porque têm o mesmo número de elétrons na última camada (nos grupos 1, 2 e 13 a 18; o hélio é a exceção: tem 2, e não 8, e fica no grupo 18 por ser gás nobre).'],
  ['Camada de valência', 'A camada eletrônica mais externa do átomo. É ela que participa das ligações químicas.'],
  ['Distribuição eletrônica', 'Maneira como os elétrons se organizam em camadas (K, L, M, N, O, P, Q) e subníveis (s, p, d, f).'],
  ['Subnível', 'Divisão de uma camada: s (até 2 elétrons), p (até 6), d (até 10) e f (até 14).'],
  ['Diagrama de Linus Pauling', 'Esquema que mostra a ordem crescente de energia dos subníveis: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p.'],
  ['Eletronegatividade', 'Tendência de um átomo atrair os elétrons de uma ligação química. O flúor é o mais eletronegativo.'],
  ['Energia de ionização', 'Energia necessária para retirar o elétron mais externo de um átomo isolado, no estado gasoso.'],
  ['Raio atômico', 'Medida do tamanho do átomo. Há várias formas de medir; esta tabela usa o raio de van der Waals, em picômetros (1 pm = 10⁻¹² m).'],
  ['Metal', 'Elemento que costuma ter brilho, conduzir bem calor e eletricidade, ser maleável e perder elétrons, formando cátions.'],
  ['Ametal', 'Elemento que, em geral, não conduz bem eletricidade e tende a ganhar ou compartilhar elétrons.'],
  ['Semimetal', 'Nome usado nas escolas para elementos com propriedades intermediárias entre metais e ametais (como boro, silício e germânio). Não é uma categoria oficial da IUPAC, e alguns livros já não a usam.'],
  ['Gás nobre', 'Elemento do grupo 18. Tem a última camada completa e por isso quase não forma ligações.'],
  ['Elementos de transição', 'Elementos dos grupos 3 a 12, que preenchem o subnível d. Os lantanídeos e actinídeos (subnível f) são chamados de transição interna.'],
  ['Elemento sintético', 'Elemento produzido artificialmente em laboratório ou reator, que não existe (ou quase não existe) na natureza.'],
  ['Radioatividade', 'Emissão espontânea de partículas ou energia por núcleos instáveis.'],
  ['IUPAC', 'União Internacional de Química Pura e Aplicada: a organização que oficializa nomes, símbolos e regras da Química.'],
]

export const COMO_LER = [
  ['Cada quadrado é um elemento', 'Em cima, o número atômico (quantos prótons). No meio, o símbolo (uma ou duas letras; a primeira sempre maiúscula). Embaixo, o nome.'],
  ['As linhas são os períodos', 'São 7. Elementos do 3º período, como o sódio, têm 3 camadas eletrônicas ocupadas.'],
  ['As colunas são os grupos', 'São 18. Na mesma coluna, os elementos têm propriedades químicas parecidas: por exemplo, todos os metais alcalinos (grupo 1) reagem com a água.'],
  ['A ordem é pelo número atômico', 'Da esquerda para a direita e de cima para baixo, o número atômico aumenta de 1 em 1.'],
  ['Lantanídeos e actinídeos ficam embaixo', 'As duas linhas separadas pertencem aos períodos 6 e 7. Ficam fora só para a tabela não ficar larga demais.'],
  ['Metais à esquerda, ametais à direita', 'A maioria dos elementos é metal. Os ametais ficam no canto superior direito, e os gases nobres na última coluna.'],
]

// Atividades guiadas: o aluno toca no(s) elemento(s) da resposta.
// resposta: números atômicos aceitos; quantos: quantos o aluno precisa marcar.
export const ATIVIDADES = [
  { id: 'a1', pergunta: 'Toque no elemento com número atômico 8.', resposta: [8], quantos: 1, explicacao: 'O número atômico 8 é o oxigênio (O): 8 prótons no núcleo.' },
  { id: 'a2', pergunta: 'Encontre o halogênio do 3º período.', resposta: [17], quantos: 1, explicacao: 'Os halogênios estão no grupo 17. No 3º período, o halogênio é o cloro (Cl).' },
  { id: 'a3', pergunta: 'Toque no metal alcalino do 4º período.', resposta: [19], quantos: 1, explicacao: 'Os metais alcalinos ficam no grupo 1 (sem o hidrogênio). No 4º período, é o potássio (K).' },
  { id: 'a4', pergunta: 'Toque nos dois elementos que são líquidos a 25 °C.', resposta: [35, 80], quantos: 2, explicacao: 'Só o bromo (Br, um ametal) e o mercúrio (Hg, um metal) são líquidos em temperatura ambiente.' },
  { id: 'a5', pergunta: 'Qual é o elemento mais eletronegativo?', resposta: [9], quantos: 1, explicacao: 'O flúor (F): fica no alto e à direita da tabela (sem contar os gases nobres), onde a eletronegatividade é maior.' },
  { id: 'a6', pergunta: 'Toque no gás nobre do 2º período.', resposta: [10], quantos: 1, explicacao: 'Os gases nobres estão no grupo 18. No 2º período, é o neônio (Ne).' },
  { id: 'a7', pergunta: 'Encontre um elemento com 2 elétrons na camada de valência e 3 camadas.', resposta: [12], quantos: 1, explicacao: 'Três camadas = 3º período; 2 elétrons na última camada = grupo 2. É o magnésio (Mg): K2 L8 M2.' },
  { id: 'a8', pergunta: 'Toque no elemento de símbolo Na.', resposta: [11], quantos: 1, explicacao: 'Na é o sódio: o símbolo vem do latim natrium.' },
  { id: 'a9', pergunta: 'Qual elemento do grupo 14 é a base da química orgânica?', resposta: [6], quantos: 1, explicacao: 'O carbono (C) forma quatro ligações e longas cadeias, base das moléculas dos seres vivos.' },
  { id: 'a10', pergunta: 'Toque no metal de símbolo Fe.', resposta: [26], quantos: 1, explicacao: 'Fe é o ferro (do latim ferrum), um metal de transição do 4º período e grupo 8.' },
]

// Confere a resposta: certo só se marcou exatamente os elementos esperados.
export function corrigirAtividade(atividade, marcados) {
  const esperado = new Set(atividade.resposta)
  const certos = marcados.filter((z) => esperado.has(z))
  const certo = certos.length === esperado.size && marcados.length === esperado.size
  return { certo, faltam: esperado.size - certos.length, errados: marcados.filter((z) => !esperado.has(z)) }
}
