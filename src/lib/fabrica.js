// ============================================================
// CONTEÚDO DE FÁBRICA — igual para todos os alunos.
// Gerado a partir de referencia/pauta-de-estudos-v1.html (a versão atual).
// Mesmos nomes de campo das tabelas do banco (PRD-BACKEND.md):
// na Etapa 7 isto vira o seed de materias e questoes. (Os flashcards do app saíram
// em 26/11/2026: cada aluno faz os próprios.)
// (Os resumos do app saíram em 25/11/2026: a aba Resumos é só do aluno.)
// O conteúdo é autoral e precisa ser conferido por um professor.
// ============================================================

export const MATERIAS = [
  {
    "id": "m-artes",
    "nome": "Artes",
    "cor": "33",
    "ordem": 1
  },
  {
    "id": "m-biologia",
    "nome": "Biologia",
    "cor": "148",
    "ordem": 2
  },
  {
    "id": "m-educacao-fisica",
    "nome": "Educação física",
    "cor": "100",
    "ordem": 3
  },
  {
    "id": "m-filosofia",
    "nome": "Filosofia",
    "cor": "356",
    "ordem": 4
  },
  {
    "id": "m-fisica",
    "nome": "Física",
    "cor": "35",
    "ordem": 5
  },
  {
    "id": "m-geografia",
    "nome": "Geografia",
    "cor": "33",
    "ordem": 6
  },
  {
    "id": "m-historia",
    "nome": "História",
    "cor": "9",
    "ordem": 7
  },
  {
    "id": "m-interioridade-e-projeto-de-vida",
    "nome": "Interioridade e projeto de vida",
    "cor": "30",
    "ordem": 8
  },
  {
    "id": "m-itinerario-de-ciencias-da-natureza",
    "nome": "Itinerário de ciências da natureza",
    "cor": "30",
    "ordem": 9
  },
  {
    "id": "m-itinerario-de-ciencias-humanas",
    "nome": "Itinerário de ciências humanas",
    "cor": "36",
    "ordem": 10
  },
  {
    "id": "m-itinerario-de-ciencias-exatas",
    "nome": "Itinerário de ciências exatas",
    "cor": "83",
    "ordem": 11
  },
  {
    "id": "m-itinerario-de-linguagens",
    "nome": "Itinerário de linguagens",
    "cor": "320",
    "ordem": 12
  },
  {
    "id": "m-lingua-inglesa",
    "nome": "Língua inglesa",
    "cor": "223",
    "ordem": 13
  },
  {
    "id": "m-lingua-portuguesa",
    "nome": "Língua portuguesa",
    "cor": "107",
    "ordem": 14
  },
  {
    "id": "m-literatura",
    "nome": "Literatura",
    "cor": "5",
    "ordem": 15
  },
  {
    "id": "m-matematica",
    "nome": "Matemática",
    "cor": "4",
    "ordem": 16
  },
  {
    "id": "m-producao-de-texto",
    "nome": "Produção de texto",
    "cor": "302",
    "ordem": 17
  },
  {
    "id": "m-quimica",
    "nome": "Química",
    "cor": "67",
    "ordem": 18
  },
  {
    "id": "m-sociologia",
    "nome": "Sociologia",
    "cor": "135",
    "ordem": 19
  }
]

// Questões de fábrica (27/11/2026): copiadas de provas oficiais, com o gabarito
// oficial. 9º ano: IFSC (exame de ingresso no ensino médio integrado); 1º a 3º EM:
// ENEM (2º dia, caderno 7 azul). Só entram questões sem figura e sem texto de
// outros autores (direito autoral). O comentário de cada uma é do app.
// A fonte exata (prova e número da questão) está no fim da resposta_comentada.
export const QUESTOES_APP = [
  {
    "id": "qr-ifsc2023-2-13",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2023,
    "enunciado": "Carlos, Fabiano e Bruna juntaram dinheiro para comprar uma barraca de acampamento. Fabiano contribuiu com 60% do valor total da barraca. Carlos contribuiu com 40% do que faltava pagar. Bruna, por fim, contribuiu com R$ 30,00. Sendo assim, o valor total da barraca foi:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "R$ 150,00"
      },
      {
        "letra": "B",
        "texto": "R$ 125,00"
      },
      {
        "letra": "C",
        "texto": "R$ 130,00"
      },
      {
        "letra": "D",
        "texto": "R$ 115,00"
      },
      {
        "letra": "E",
        "texto": "R$ 140,00"
      }
    ],
    "correta": "B",
    "resposta_comentada": "Fabiano pagou 60% do total; faltaram 40%. Carlos pagou 40% desses 40%, ou seja, 16% do total. Sobram 100% − 60% − 16% = 24% para Bruna. Se 24% valem R$ 30,00, o total é 30 ÷ 0,24 = R$ 125,00.\n\nFonte: IFSC, Exame de Classificação 2023.2 para os cursos técnicos integrados, questão 13. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2023-2-15",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Área e porcentagem",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2023,
    "enunciado": "Para pesquisar a produção de hortaliças no Curso Técnico em Agroecologia do IFSC, foi construída uma estufa com 30 metros de comprimento por 8 metros de largura. Considerando que em 15% da área da referida estufa foram plantadas alfaces e que cada unidade de alface ocupa o espaço de um quadrado de 25 centímetros de lado, podemos dizer que o número de unidades de alfaces nesta estufa é de:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "144"
      },
      {
        "letra": "B",
        "texto": "240"
      },
      {
        "letra": "C",
        "texto": "576"
      },
      {
        "letra": "D",
        "texto": "960"
      },
      {
        "letra": "E",
        "texto": "3600"
      }
    ],
    "correta": "C",
    "resposta_comentada": "Área da estufa: 30 × 8 = 240 m². Os alfaces ocupam 15% disso: 0,15 × 240 = 36 m². Cada alface ocupa um quadrado de 0,25 m × 0,25 m = 0,0625 m². Logo, 36 ÷ 0,0625 = 576 alfaces. Cuidado com a unidade: 25 cm = 0,25 m.\n\nFonte: IFSC, Exame de Classificação 2023.2 para os cursos técnicos integrados, questão 15. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2023-2-18",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Sistema de equações",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2023,
    "enunciado": "No dia do lançamento de um filme, uma sala de cinema com capacidade para 156 pessoas, ficou lotada. O valor da entrada inteira era de R$ 36,00 e a meia-entrada de R$ 18,00. Considerando que a arrecadação foi de R$ 3.726,00, podemos afirmar que o número de pessoas que pagou a entrada inteira foi de:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "48"
      },
      {
        "letra": "B",
        "texto": "49"
      },
      {
        "letra": "C",
        "texto": "50"
      },
      {
        "letra": "D",
        "texto": "51"
      },
      {
        "letra": "E",
        "texto": "52"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Sejam x as inteiras e y as meias: x + y = 156 e 36x + 18y = 3726. Trocando y por 156 − x: 36x + 18(156 − x) = 3726 → 18x + 2808 = 3726 → 18x = 918 → x = 51.\n\nFonte: IFSC, Exame de Classificação 2023.2 para os cursos técnicos integrados, questão 18. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2024-1-10",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Frações",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2024,
    "enunciado": "Preocupados com os animais abandonados em um câmpus do IFSC, um grupo de estudantes organizou uma ação para angariar fundos, com o objetivo de adquirir ração para alimentar os animais. Ao longo de uma semana, foram arrecadadas 180 cédulas de dinheiro (reais). As cédulas foram separadas por valor, resultando na composição a seguir:\n• R$ 2,00 que corresponde a 2/5 das cédulas;\n• R$ 5,00 que corresponde a 1/3 das cédulas;\n• R$ 10,00 que corresponde a 1/4 das cédulas;\n• R$ 20,00 que corresponde às cédulas restantes.\nO valor total, em reais, arrecadado ao longo da semana é igual a:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "R$ 101,00."
      },
      {
        "letra": "B",
        "texto": "R$ 535,00."
      },
      {
        "letra": "C",
        "texto": "R$ 954,00."
      },
      {
        "letra": "D",
        "texto": "R$ 963,00."
      },
      {
        "letra": "E",
        "texto": "R$ 1.190,00."
      }
    ],
    "correta": "C",
    "resposta_comentada": "De 180 cédulas: 2/5 são de R$ 2 (72 cédulas = R$ 144), 1/3 são de R$ 5 (60 cédulas = R$ 300), 1/4 são de R$ 10 (45 cédulas = R$ 450). Restam 180 − 72 − 60 − 45 = 3 cédulas de R$ 20 = R$ 60. Total: 144 + 300 + 450 + 60 = R$ 954,00.\n\nFonte: IFSC, Exame de Classificação 2024.1 para os cursos técnicos integrados, questão 10. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2025-1-10",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Proporcionalidade",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2025,
    "enunciado": "O número de casos de dengue tem crescido muito no Brasil sendo que, em Santa Catarina, a situação motivou as autoridades a decretarem Situação de Emergência, com ampla divulgação nos meios de comunicação. Para o controle do mosquito Aedes aegypti, que é o transmissor da doença, toda a sociedade precisa estar envolvida, especialmente na eliminação de água parada que é utilizada pelo mosquito na sua reprodução. Outra estratégia de combate à dengue, utilizada pelos governantes, é realizar a aplicação de inseticida por pulverização em regiões com alto índice de proliferação do mosquito. Considere que 3 pessoas, cada uma usando um reservatório com capacidade de 8 litros do produto, conseguem pulverizar 100 imóveis em um dia. Quantos imóveis podem ser pulverizados em um dia, se tivermos 5 pessoas aplicando o produto com reservatórios de 6 litros cada?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "45 imóveis."
      },
      {
        "letra": "B",
        "texto": "80 imóveis."
      },
      {
        "letra": "C",
        "texto": "125 imóveis."
      },
      {
        "letra": "D",
        "texto": "222 imóveis."
      },
      {
        "letra": "E",
        "texto": "320 imóveis."
      }
    ],
    "correta": "C",
    "resposta_comentada": "O que limita o trabalho é a quantidade de produto. Hoje: 3 pessoas × 8 L = 24 L pulverizam 100 imóveis. Depois: 5 pessoas × 6 L = 30 L. Regra de três: 24 L → 100 imóveis, 30 L → x. x = 100 × 30 ÷ 24 = 125 imóveis.\n\nFonte: IFSC, Exame de Classificação 2025.1 para os cursos técnicos integrados, questão 10. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2025-1-24",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Separação de misturas",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2025,
    "enunciado": "Durante uma aula experimental de química em um Instituto Federal, um aluno do curso técnico integrado estava distraído no laboratório, o que é inadequado e perigoso! O aluno se confundiu e leu o procedimento do roteiro de forma equivocada, misturando todos os reagentes que estavam sobre a bancada em um único béquer. Assim, nesse descuido não intencional, areia, sal, óleo e água foram combinados em um único recipiente. Para corrigir o erro, o aluno teve que executar as seguintes etapas para separar cada componente dessa mistura:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "filtração, destilação simples, catação."
      },
      {
        "letra": "B",
        "texto": "filtração, decantação e destilação simples."
      },
      {
        "letra": "C",
        "texto": "decantação, catação, filtração."
      },
      {
        "letra": "D",
        "texto": "destilação simples, centrifugação, sifonação."
      },
      {
        "letra": "E",
        "texto": "destilação simples, decantação e centrifugação."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Primeiro a filtração retira a areia (sólido que não se dissolve). Depois, a decantação (com funil de separação) separa o óleo da água salgada, porque não se misturam. Por fim, a destilação simples separa a água do sal dissolvido.\n\nFonte: IFSC, Exame de Classificação 2025.1 para os cursos técnicos integrados, questão 24. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2025-1-25",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Energia e atrito",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2025,
    "enunciado": "O uso de bicicletas como meio de transporte tem ganhado cada vez mais adeptos nas cidades brasileiras, trazendo benefícios para a saúde e o meio ambiente. Analise as seguintes afirmações.\nI. Ao pedalar, o ciclista transforma parte de sua energia química em energia mecânica para movimentar a bicicleta.\nII. Uma bicicleta em movimento possui energia cinética, que é inversamente proporcional à velocidade.\nIII. O uso de bicicletas como meio de transporte contribui para a redução da emissão de gases do efeito estufa e para a sustentabilidade urbana.\nIV. A força de atrito entre os pneus da bicicleta e o asfalto é essencial para que o ciclista possa fazer curvas com segurança.\nAssinale a alternativa CORRETA.",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Apenas os itens I e IV estão corretos."
      },
      {
        "letra": "B",
        "texto": "Apenas os itens I, II e III estão corretos."
      },
      {
        "letra": "C",
        "texto": "Apenas os itens I, III e IV estão corretos."
      },
      {
        "letra": "D",
        "texto": "Apenas os itens II, III e IV estão corretos."
      },
      {
        "letra": "E",
        "texto": "Todos os itens estão corretos."
      }
    ],
    "correta": "C",
    "resposta_comentada": "I, III e IV estão corretas. A II está errada: a energia cinética é Ec = m·v²/2, ou seja, cresce com o quadrado da velocidade; não é inversamente proporcional a ela.\n\nFonte: IFSC, Exame de Classificação 2025.1 para os cursos técnicos integrados, questão 25. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-9",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Sistema de equações",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Na cidade onde Manoela mora, os dias de feira são sempre nas terças e quartas-feiras, quando a maioria dos supermercados fazem promoções de frutas e verduras. Ela sempre se organiza e vai toda semana fazer a feira nesses dias. Numa terça-feira, ela comprou 3 kg de tomates e 2 pés de alface, pagando R$ 27,00. Como ela recebeu visitas, retornou ao mesmo supermercado no dia seguinte para reabastecer e aproveitar os preços dos dias de feira. Comprou 2 kg de tomates e 3 pés de alface, pagando R$ 25,50. Quanto custaria, nesses dias de feira, a compra de 1 kg de tomates e 1 pé de alface, nesse supermercado?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "R$ 11,25"
      },
      {
        "letra": "B",
        "texto": "R$ 11,00"
      },
      {
        "letra": "C",
        "texto": "R$ 10,75"
      },
      {
        "letra": "D",
        "texto": "R$ 10,50"
      },
      {
        "letra": "E",
        "texto": "R$ 10,25"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Com t = preço do kg de tomate e a = preço do pé de alface: 3t + 2a = 27,00 e 2t + 3a = 25,50. Somando as duas equações: 5t + 5a = 52,50, então t + a = 10,50. Não é preciso achar cada preço separado.\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 9. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-10",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Medidas de tempo",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Considerando que um dia equivale a 24 horas, 1 hora a 60 minutos e 1 minuto a 60 segundos. Então 2,9 dias equivalem a:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2 dias, 22 horas e 35 minutos."
      },
      {
        "letra": "B",
        "texto": "2 dias, 21 horas e 25 minutos."
      },
      {
        "letra": "C",
        "texto": "2 dias, 10 horas e 15 minutos."
      },
      {
        "letra": "D",
        "texto": "2 dias, 20 horas e 30 minutos."
      },
      {
        "letra": "E",
        "texto": "2 dias, 21 horas e 36 minutos."
      }
    ],
    "correta": "E",
    "resposta_comentada": "0,9 dia = 0,9 × 24 = 21,6 horas. 0,6 hora = 0,6 × 60 = 36 minutos. Logo, 2,9 dias = 2 dias, 21 horas e 36 minutos. Erro comum: ler 0,9 dia como 9 horas.\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 10. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-11",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Frações",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "A Serra do Rio do Rastro é um dos destinos turísticos mais visitados de Santa Catarina. Nos últimos anos, a região tem investido no turismo sustentável, incentivando o controle do número de visitantes e o consumo consciente de recursos naturais. Uma pousada da região oferece kits de lanche artesanal, preparados por produtores locais, com alimentos orgânicos. Cada kit contém:\n• 4/3 de um pão caseiro;\n• 2/3 de um queijo serrano;\n• 5/6 de um bolo de milho;\n• 1 jarra de suco natural.\nDurante um fim de semana, 18 kits foram vendidos a visitantes. Para planejar a produção da próxima semana, os responsáveis calcularam a quantidade consumida de cada item. Quantas unidades de cada alimento foram consumidas nesse fim de semana?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "24 pães, 12 queijos e 15 bolos"
      },
      {
        "letra": "B",
        "texto": "20 pães, 13 queijos e 16 bolos"
      },
      {
        "letra": "C",
        "texto": "24 pães, 12 queijos e 14 bolos"
      },
      {
        "letra": "D",
        "texto": "24 pães, 14 queijos e 15 bolos"
      },
      {
        "letra": "E",
        "texto": "20 pães, 12 queijos e 15 bolos"
      }
    ],
    "correta": "A",
    "resposta_comentada": "Multiplique cada fração por 18 kits: pães 18 × 4/3 = 24; queijos 18 × 2/3 = 12; bolos 18 × 5/6 = 15.\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 11. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-12",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Uma loja de eletrodomésticos está realizando uma promoção que oferece um desconto para pagamento à vista. Ana deseja comprar uma televisão, cujo preço de etiqueta é R$ 2.400,00. Porém, ela tem a opção de pagar à vista, com o desconto de 15% sobre o preço da etiqueta, ou parcelar em 8 vezes de R$ 300,00. Considerando somente essas opções de pagamento, do ponto de vista financeiro, podemos afirmar que:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "não é possível determinar a melhor opção de pagamento."
      },
      {
        "letra": "B",
        "texto": "comprar à vista é a opção mais vantajosa, pois o valor final será de R$ 2.400,00."
      },
      {
        "letra": "C",
        "texto": "ambas as opções resultam no mesmo valor final, independentemente da escolha de Ana."
      },
      {
        "letra": "D",
        "texto": "Ana deve optar por parcelar, pois o valor final será o mesmo da etiqueta."
      },
      {
        "letra": "E",
        "texto": "comprar à vista é a opção mais vantajosa, pois o valor final será de R$ 2.040,00."
      }
    ],
    "correta": "E",
    "resposta_comentada": "À vista: 15% de 2400 = 360, então 2400 − 360 = R$ 2.040,00. Parcelado: 8 × 300 = R$ 2.400,00. À vista sai R$ 360,00 mais barato.\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 12. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-14",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Unidades de medida",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "A estiagem é um problema recorrente em Santa Catarina, afetando tanto o abastecimento de água quanto a produção agrícola. No verão de 2024, diversas cidades do Oeste e do Sul do estado entraram em situação de emergência hídrica. De acordo com a CASAN (Companhia Catarinense de Águas e Saneamento), o consumo médio de água por habitante está acima do ideal e a empresa tem promovido campanhas de conscientização para o uso racional da água, incentivando mudanças simples na rotina doméstica. Um dos principais focos das campanhas é o tempo de banho. Um chuveiro elétrico convencional consome, em média, 9 litros de água por minuto. Uma pessoa que toma dois banhos de 15 minutos por dia acaba contribuindo significativamente para o desperdício de água, especialmente em tempos de escassez. Considere que uma pessoa mantenha essa rotina ao longo de 30 dias e que o valor cobrado pela CASAN por metro cúbico (m³) de água consumido é de R$ 6,50. Lembrando que 1 m³ corresponde a 1.000 L, o custo relacionado ao consumo de água nesses banhos será de:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "R$ 48,75."
      },
      {
        "letra": "B",
        "texto": "R$ 52,65."
      },
      {
        "letra": "C",
        "texto": "R$ 58,50."
      },
      {
        "letra": "D",
        "texto": "R$ 65,00."
      },
      {
        "letra": "E",
        "texto": "R$ 78,00."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Por dia: 2 banhos × 15 min × 9 L = 270 L. Em 30 dias: 8.100 L = 8,1 m³. Custo: 8,1 × 6,50 = R$ 52,65.\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 14. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-1-25",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Vírus",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Os vírus são parasitas intracelulares obrigatórios, acelulares e estudados em nível molecular. Em geral, apresentam uma cápsula proteica envolvendo seu material genético. Podem ser considerados seres vivos por apresentarem capacidade de replicação e sofrer mutações. Os vírus causam diversos tipos de doenças. Qual das alternativas abaixo apresenta, exclusivamente, doenças causadas por vírus?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Doença de Chagas; Difteria; Coqueluche; Rubéola."
      },
      {
        "letra": "B",
        "texto": "Esquistossomose; Herpes; Ascaridíase; Hepatite."
      },
      {
        "letra": "C",
        "texto": "Sarampo; Dengue; Febre amarela; Covid-19."
      },
      {
        "letra": "D",
        "texto": "Meningite; Sarna; Caxumba; Raiva."
      },
      {
        "letra": "E",
        "texto": "Balantidiose; Tétano; Pneumonia; Micose."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Sarampo, dengue, febre amarela e covid-19 são viroses. Nas outras alternativas há doenças causadas por bactérias (difteria, coqueluche, tétano), protozoários (doença de Chagas, balantidiose), vermes (esquistossomose, ascaridíase), ácaros (sarna) e fungos (micose).\n\nFonte: IFSC, Exame de Classificação 2026.1 para os cursos técnicos integrados, questão 25. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-2-10",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Probabilidade",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Em cada turno de uma partida de Pokémon TCG, o jogador começa comprando uma carta do seu baralho e colocando em sua mão. Em determinado momento da partida, Liko está sem energia na sua mão e torcendo para comprar uma carta de energia do seu baralho. Pelas suas contas, ela ainda tem 40 cartas no baralho, e dessas, 8 são cartas de energia. Quando Liko comprar uma carta do baralho para iniciar seu turno, qual é sua chance de comprar uma carta de energia como deseja?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "5%"
      },
      {
        "letra": "B",
        "texto": "8%"
      },
      {
        "letra": "C",
        "texto": "20%"
      },
      {
        "letra": "D",
        "texto": "32%"
      },
      {
        "letra": "E",
        "texto": "40%"
      }
    ],
    "correta": "C",
    "resposta_comentada": "São 8 cartas de energia em 40: 8/40 = 1/5 = 20%.\n\nFonte: IFSC, Exame de Classificação 2026.2 para os cursos técnicos integrados, questão 10. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-2-13",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Conjuntos numéricos",
    "nivel": "Médio",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Ana e Bia estão cansadas de jogar “Par ou Ímpar” e decidiram criar um novo jogo para resolver suas disputas. O jogo, que elas apelidaram de “Racional ou Irracional”, consiste primeiro em Ana escolher entre racional ou irracional, para então Bia escolher uma operação (Adição, Subtração ou Multiplicação). Em seguida, cada menina fala um número real, ao mesmo tempo, e efetuam a operação escolhida por Bia com esses números. Se o número resultante for do tipo que Ana escolheu, ela vence; caso contrário, Bia vence. É correto afirmar que, se Ana sempre escolher Racional e:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "falar o número 0, Ana vence independentemente da escolha de Bia."
      },
      {
        "letra": "B",
        "texto": "Bia escolher Adição, Ana sempre vai vencer, pois a soma de quaisquer dois números é sempre racional."
      },
      {
        "letra": "C",
        "texto": "Bia escolher Multiplicação, Bia sempre vai vencer, pois a multiplicação de quaisquer dois números é sempre irracional."
      },
      {
        "letra": "D",
        "texto": "ambas falarem apenas números inteiros, a vitória será de Ana."
      },
      {
        "letra": "E",
        "texto": "Bia escolher Subtração, Bia sempre vai vencer, pois a subtração de quaisquer dois números é sempre irracional."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Soma, subtração e multiplicação de inteiros dão sempre um inteiro, e todo inteiro é racional: Ana vence. As outras falham: falar 0 não garante nada na soma (0 + √2 é irracional); soma ou produto de reais pode dar racional ou irracional, dependendo dos números.\n\nFonte: IFSC, Exame de Classificação 2026.2 para os cursos técnicos integrados, questão 13. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-2-24",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Estrutura do átomo",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Os átomos são as unidades fundamentais que constituem toda a matéria. Cada átomo é caracterizado por valores como número atômico (Z) e número de massa (A), que permitem determinar a quantidade de partículas subatômicas presentes em sua estrutura. Essas partículas influenciam diretamente as propriedades dos elementos químicos. Considere um átomo hipotético X, cujo número atômico é 15 e cujo número de massa é 31. Analise as afirmações a seguir.\nI. O átomo X possui 15 prótons em seu núcleo.\nII. O átomo X possui 16 nêutrons em seu núcleo.\nIII. Se o átomo X estiver eletricamente neutro, ele possui 15 elétrons.\nIV. O número de massa corresponde à soma de prótons e elétrons do átomo.\nAssinale a alternativa CORRETA.",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Apenas os itens I e II estão corretos."
      },
      {
        "letra": "B",
        "texto": "Apenas os itens I, II e III estão corretos."
      },
      {
        "letra": "C",
        "texto": "Apenas os itens I, III e IV estão corretos."
      },
      {
        "letra": "D",
        "texto": "Apenas os itens II, III e IV estão corretos."
      },
      {
        "letra": "E",
        "texto": "Todos os itens estão corretos."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Z = 15 dá 15 prótons (I certa). Nêutrons = A − Z = 31 − 15 = 16 (II certa). Átomo neutro tem tantos elétrons quanto prótons: 15 (III certa). A IV está errada: o número de massa é a soma de prótons e nêutrons, não de elétrons.\n\nFonte: IFSC, Exame de Classificação 2026.2 para os cursos técnicos integrados, questão 24. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-ifsc2026-2-28",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Misturas homogêneas e heterogêneas",
    "nivel": "Fácil",
    "instituicao": "IFSC",
    "ano": 2026,
    "enunciado": "Uma turma do 9º ano realizou um experimento para observar o comportamento de diferentes líquidos do dia a dia, anotando os resultados no quadro abaixo.\n• 1) Água + álcool: logo após agitação, misturaram totalmente; 5 minutos após agitação, permaneceram misturados.\n• 2) Água + óleo de cozinha: logo após agitação, misturaram parcialmente; 5 minutos após agitação, separaram em duas camadas.\n• 3) Água + vinagre: logo após agitação, misturaram totalmente; 5 minutos após agitação, permaneceram misturados.\nCom base nas informações do quadro e nos conhecimentos sobre misturas, assinale a alternativa CORRETA.",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Água, álcool e vinagre formam misturas homogêneas entre si."
      },
      {
        "letra": "B",
        "texto": "Todas as misturas observadas são heterogêneas, pois envolvem líquidos diferentes."
      },
      {
        "letra": "C",
        "texto": "Água e óleo formam uma mistura homogênea porque são líquidos à temperatura ambiente."
      },
      {
        "letra": "D",
        "texto": "O óleo se separa da água apenas porque é menos denso."
      },
      {
        "letra": "E",
        "texto": "A separação do óleo indica que ocorreu uma transformação química."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Água, álcool e vinagre se misturam por completo e continuam misturados: formam uma só fase (misturas homogêneas). Água e óleo se separam em camadas: mistura heterogênea, sem reação química nenhuma.\n\nFonte: IFSC, Exame de Classificação 2026.2 para os cursos técnicos integrados, questão 28. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "qr-e24d2-102",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Enzimas",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma agricultora, com a intenção de comercializar o milho recém-colhido, testou uma forma de preservar o sabor adocicado do seu produto. O melhor resultado foi obtido quando ela imergiu as espigas em água fervente durante alguns minutos e, em seguida, em água gelada. Com esse procedimento, parte da glicose do milho não foi transformada em amido, mantendo o seu sabor adocicado. Utilizando esse procedimento, o sabor foi conservado porque houve",
    "alternativas": [
      {
        "letra": "A",
        "texto": "desnaturação enzimática pela alta temperatura."
      },
      {
        "letra": "B",
        "texto": "conversão de nutrientes pela redução de temperatura."
      },
      {
        "letra": "C",
        "texto": "degradação das reservas nutritivas pelo choque térmico."
      },
      {
        "letra": "D",
        "texto": "impedimento da entrada de oxigênio pela fervura da água."
      },
      {
        "letra": "E",
        "texto": "desidratação dos grãos por causa da alteração da temperatura."
      }
    ],
    "correta": "A",
    "resposta_comentada": "A transformação de glicose em amido é feita por enzimas. A água fervente desnatura essas enzimas (elas perdem a forma e param de agir), e a água gelada interrompe o cozimento. Sem enzima ativa, a glicose fica como está e o milho continua doce.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 102. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-116",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Separação de misturas",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "O magnésio metálico utilizado em ligas leves é produzido em um processo que envolve várias etapas e utiliza água do mar como matéria-prima. A primeira etapa desse processo consiste na reação entre o íon Mg²⁺ e hidróxido de cálcio, Ca(OH)₂, obtendo uma mistura que contém hidróxido de magnésio, pouco solúvel, e íons Ca²⁺, de acordo com a equação química:\nMg²⁺ (aq) + Ca(OH)₂ (aq) → Mg(OH)₂ (s) + Ca²⁺ (aq)\nO método adequado para separar o Mg(OH)₂ dessa mistura é a",
    "alternativas": [
      {
        "letra": "A",
        "texto": "filtração."
      },
      {
        "letra": "B",
        "texto": "catação."
      },
      {
        "letra": "C",
        "texto": "destilação."
      },
      {
        "letra": "D",
        "texto": "dissolução."
      },
      {
        "letra": "E",
        "texto": "evaporação."
      }
    ],
    "correta": "A",
    "resposta_comentada": "O Mg(OH)₂ é um sólido pouco solúvel misturado a um líquido. Sólido não dissolvido em líquido se separa por filtração.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 116. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-137",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Média aritmética",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Ao calcular a média de suas notas em 4 provas, um estudante dividiu, por engano, a soma das notas por 5. Com isso, a média obtida foi 1 unidade menor do que deveria ser, caso fosse calculada corretamente. O valor correto da média das notas desse estudante é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "4."
      },
      {
        "letra": "B",
        "texto": "5."
      },
      {
        "letra": "C",
        "texto": "6."
      },
      {
        "letra": "D",
        "texto": "19."
      },
      {
        "letra": "E",
        "texto": "21."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Seja S a soma das notas. Média certa: S/4. Média errada: S/5. A diferença é 1: S/4 − S/5 = 1 → S/20 = 1 → S = 20. Média correta: 20 ÷ 4 = 5.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 137. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-139",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Operações com decimais",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Um artesão utiliza dois tipos de componentes, X e Y, nos enfeites que produz. Ele sempre compra todos os componentes em uma mesma loja. O quadro apresenta os preços dos dois tipos de componentes nas lojas I e II.\nPreços dos componentes (R$):\n• Loja I: X = 3,00 e Y = 1,00;\n• Loja II: X = 2,00 e Y = 4,00.\nEle confeccionará enfeites formados por duas unidades do componente X e uma unidade do componente Y e efetuará a compra na loja que oferecer o menor valor total para a confecção de um enfeite.\nO artesão efetuará a compra na loja",
    "alternativas": [
      {
        "letra": "A",
        "texto": "I, pois o valor é R$ 7,00."
      },
      {
        "letra": "B",
        "texto": "I, pois o valor é R$ 4,00."
      },
      {
        "letra": "C",
        "texto": "II, pois o valor é R$ 6,00."
      },
      {
        "letra": "D",
        "texto": "I, pois anuncia o componente com o menor preço."
      },
      {
        "letra": "E",
        "texto": "II, pois o componente X, que é o mais utilizado, tem menor preço."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Cada enfeite usa 2 X e 1 Y. Loja I: 2 × 3,00 + 1,00 = R$ 7,00. Loja II: 2 × 2,00 + 4,00 = R$ 8,00. A loja I é mais barata. As alternativas D e E escolhem pelo preço de um componente só, o que não basta.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 139. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-140",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "João e Felipe participaram, na escola, de uma maratona de matemática na qual, durante uma semana, resolveram 200 questões cada. Nessa maratona, a porcentagem P de acertos de cada participante é convertida em um conceito:\n• insatisfatório: se 0 ≤ P < 50;\n• regular: se 50 ≤ P < 60;\n• bom: se 60 ≤ P < 75;\n• muito bom: se 75 ≤ P < 90;\n• excelente: se 90 ≤ P ≤ 100.\nJoão acertou 75% das questões da maratona e Felipe acertou 30% a menos que a quantidade de questões que João acertou.\nOs conceitos de João e Felipe foram, respectivamente,",
    "alternativas": [
      {
        "letra": "A",
        "texto": "muito bom e bom."
      },
      {
        "letra": "B",
        "texto": "muito bom e regular."
      },
      {
        "letra": "C",
        "texto": "muito bom e insatisfatório."
      },
      {
        "letra": "D",
        "texto": "bom e regular."
      },
      {
        "letra": "E",
        "texto": "bom e insatisfatório."
      }
    ],
    "correta": "B",
    "resposta_comentada": "João acertou 75% de 200 = 150 questões: muito bom (75 ≤ P < 90). Felipe acertou 30% a menos que 150: 150 × 0,7 = 105 questões, ou 105/200 = 52,5%: regular. Cuidado: \"30% a menos\" é sobre os acertos de João, não 75% − 30%.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 140. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-146",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função quadrática (máximo)",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Um fazendeiro pretende construir um galinheiro ocupando uma região plana de formato retangular, com lados de comprimentos L metro e C metro. Os lados serão cercados por telas de tipos diferentes. Nos lados de comprimento L metro, será utilizada uma tela cujo metro linear custa R$ 20,00, enquanto, nos outros dois lados, uma que custa R$ 15,00. O fazendeiro quer gastar, no máximo, R$ 6000,00 na compra de toda a tela necessária para o galinheiro, e deseja que o galinheiro tenha a maior área possível. Qual será a medida, em metro, do maior lado do galinheiro?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "85"
      },
      {
        "letra": "B",
        "texto": "100"
      },
      {
        "letra": "C",
        "texto": "175"
      },
      {
        "letra": "D",
        "texto": "200"
      },
      {
        "letra": "E",
        "texto": "350"
      }
    ],
    "correta": "B",
    "resposta_comentada": "Custo: 2L × 20 + 2C × 15 = 6000 → 40L + 30C = 6000. A área L·C é máxima quando as duas parcelas do custo são iguais: 40L = 30C = 3000. Então L = 75 m e C = 100 m. (Pela função quadrática: C = 200 − 4L/3, área = 200L − 4L²/3, máximo em L = 75.) O maior lado mede 100 m.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 146. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-156",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função afim",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "O uso de aplicativos de transporte tem sido uma alternativa à população que busca preços mais competitivos para se locomover, principalmente nas grandes cidades. As formas usadas para determinar o valor cobrado por cada viagem variam de um aplicativo para outro, mas, em geral, o valor V a ser pago, em real, varia em função de:\n• tarifa base F: valor fixo, em real, cobrado no início da viagem;\n• tempo T: tempo, em minuto, de duração da viagem;\n• distância D: distância percorrida, em quilômetro.\nUm desses aplicativos cobra R$ 2,00 de valor fixo, acrescido de R$ 0,26 por minuto de viagem e de R$ 1,40 por quilômetro rodado. Nessas condições, a expressão que fornece o valor V a ser pago por uma viagem desse aplicativo é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2,00F + 0,26T + 1,40D"
      },
      {
        "letra": "B",
        "texto": "2,00 + 0,26T + 1,40D"
      },
      {
        "letra": "C",
        "texto": "2,00 + 0,26T + D"
      },
      {
        "letra": "D",
        "texto": "0,26T + 1,40D"
      },
      {
        "letra": "E",
        "texto": "F + T + D"
      }
    ],
    "correta": "B",
    "resposta_comentada": "O valor fixo é 2,00 (não se multiplica por F), somado a 0,26 por minuto (0,26T) e a 1,40 por quilômetro (1,40D): V = 2,00 + 0,26T + 1,40D.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 156. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-157",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Equação do 1º grau",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma doceira vende e entrega, em seu bairro, porções de 100 g de docinhos de aniversário. Atualmente, a taxa única de entrega é R$ 10,00, e o valor cobrado por uma porção é R$ 25,00. Por uma estratégia de vendas, a partir da próxima semana, a taxa única de entrega será R$ 15,00, e um novo valor será cobrado por uma porção, de maneira que o valor total a ser pago por um cliente na compra de 5 porções permaneça o mesmo. A partir da próxima semana, qual será o novo valor cobrado, em real, por uma porção?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "12,50"
      },
      {
        "letra": "B",
        "texto": "20,00"
      },
      {
        "letra": "C",
        "texto": "24,00"
      },
      {
        "letra": "D",
        "texto": "30,00"
      },
      {
        "letra": "E",
        "texto": "37,50"
      }
    ],
    "correta": "C",
    "resposta_comentada": "Hoje, 5 porções custam 10 + 5 × 25 = R$ 135,00. Com a nova taxa: 15 + 5x = 135 → 5x = 120 → x = R$ 24,00.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 157. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-160",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Razão e proporção",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma piscina tem capacidade de 2 500 000 litros. Seu sistema de abastecimento foi regulado para ter uma vazão constante de 6000 litros de água por minuto. O mesmo sistema foi instalado em uma segunda piscina, com capacidade de 2750000 litros, e regulado para ter uma vazão, também constante, capaz de enchê-la em um tempo 20% maior que o gasto para encher a primeira piscina. A vazão do sistema de abastecimento da segunda piscina, em litro por minuto, é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "8250."
      },
      {
        "letra": "B",
        "texto": "7920."
      },
      {
        "letra": "C",
        "texto": "6545."
      },
      {
        "letra": "D",
        "texto": "5500."
      },
      {
        "letra": "E",
        "texto": "5280."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Primeira piscina: 2 500 000 ÷ 6000 ≈ 416,7 minutos. A segunda leva 20% a mais: 416,7 × 1,2 = 500 minutos. Vazão: 2 750 000 ÷ 500 = 5500 litros por minuto.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 160. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-95",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Respiração celular",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "As aves apresentam dois tipos de músculos em seus corpos: vermelhos e brancos. Aves migratórias como garças, gansos e patos selvagens têm os músculos vermelhos bem desenvolvidos, com ampla rede de vasos sanguíneos. Nas viagens por grandes distâncias, tais músculos são fundamentais, pois favorecem o(a)",
    "alternativas": [
      {
        "letra": "A",
        "texto": "execução de manobras."
      },
      {
        "letra": "B",
        "texto": "metabolismo corpóreo elevado."
      },
      {
        "letra": "C",
        "texto": "manutenção da aerodinâmica."
      },
      {
        "letra": "D",
        "texto": "deslocamento a grandes velocidades."
      },
      {
        "letra": "E",
        "texto": "capacidade de voo em grandes altitudes."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Músculos vermelhos têm muitas mitocôndrias, mioglobina e vasos sanguíneos: recebem muito oxigênio e fazem respiração aeróbica intensa. Esse metabolismo elevado dá a resistência que o voo longo exige.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 95. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-100",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Lançamento vertical",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Um professor lança uma esfera verticalmente para cima, a qual retorna, depois de alguns segundos, ao ponto de lançamento. Em seguida, lista em um quadro todas as possibilidades para as grandezas cinemáticas:\n• velocidade: v ≠ 0 (para cima ou para baixo) ou v = 0 (sentido indefinido*);\n• aceleração: a ≠ 0 (para cima ou para baixo) ou a = 0 (sentido indefinido*).\n*Grandezas com módulo nulo não têm sentido definido.\nEle solicita aos alunos que analisem as grandezas cinemáticas no instante em que a esfera atinge a altura máxima, escolhendo uma combinação para os módulos e sentidos da velocidade e da aceleração.\nA escolha que corresponde à combinação correta é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "v = 0 e a ≠ 0 para cima."
      },
      {
        "letra": "B",
        "texto": "v ≠ 0 para cima e a = 0."
      },
      {
        "letra": "C",
        "texto": "v = 0 e a ≠ 0 para baixo."
      },
      {
        "letra": "D",
        "texto": "v ≠ 0 para cima e a ≠ 0 para cima."
      },
      {
        "letra": "E",
        "texto": "v ≠ 0 para baixo e a ≠ 0 para baixo."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Na altura máxima a esfera para por um instante: v = 0. A aceleração continua sendo a da gravidade, diferente de zero e para baixo, durante todo o movimento, inclusive no ponto mais alto.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 100. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-107",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Fecundação",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Na fertilização in vitro, espermatozoides são adicionados aos gametas femininos retirados de uma mulher. Após o período de incubação, a fecundação é favorecida pela ação de enzimas. Em um procedimento realizado, observou-se que nenhum dos gametas femininos foi fertilizado e, posteriormente, verificou-se que havia sido adicionado, equivocadamente, um coquetel de inibidores das enzimas do acrossomo, no lugar de um dos nutrientes constituintes do meio de cultura. O coquetel de inibidores impediu o(a)",
    "alternativas": [
      {
        "letra": "A",
        "texto": "formação do pronúcleo masculino."
      },
      {
        "letra": "B",
        "texto": "início da divisão mitótica do zigoto."
      },
      {
        "letra": "C",
        "texto": "término da segunda divisão meiótica do ovócito."
      },
      {
        "letra": "D",
        "texto": "passagem do espermatozoide pela corona radiata e zona pelúcida."
      },
      {
        "letra": "E",
        "texto": "fusão das membranas plasmáticas do ovócito e do espermatozoide."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O acrossomo, na cabeça do espermatozoide, guarda enzimas que abrem caminho pela corona radiata e pela zona pelúcida até a membrana do ovócito. Com essas enzimas inibidas, o espermatozoide não atravessa essas camadas e não há fecundação.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 107. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-153",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Multiplicação e comparação",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Um supermercado conta com cinco caixas disponíveis para pagamento. Foram instaladas telas que apresentam o tempo médio gasto por cada caixa para iniciar e finalizar o atendimento de cada cliente, e o número de pessoas presentes na fila de cada caixa em tempo real. Um cliente, na hora de passar sua compra, sabendo que cada um dos cinco caixas iniciará um novo atendimento naquele momento, pretende gastar o menor tempo possível de espera na fila. Ele observa que as telas apresentavam as informações a seguir.\n• Caixa I: atendimento 12 minutos, 5 pessoas na fila.\n• Caixa II: atendimento 6 minutos, 9 pessoas na fila.\n• Caixa III: atendimento 5 minutos, 6 pessoas na fila.\n• Caixa IV: atendimento 15 minutos, 2 pessoas na fila.\n• Caixa V: atendimento 9 minutos, 3 pessoas na fila.\nPara alcançar seu objetivo, o cliente deverá escolher o caixa",
    "alternativas": [
      {
        "letra": "A",
        "texto": "I."
      },
      {
        "letra": "B",
        "texto": "II."
      },
      {
        "letra": "C",
        "texto": "III."
      },
      {
        "letra": "D",
        "texto": "IV."
      },
      {
        "letra": "E",
        "texto": "V."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Espera = tempo de atendimento × pessoas na fila. I: 12 × 5 = 60 min; II: 6 × 9 = 54; III: 5 × 6 = 30; IV: 15 × 2 = 30; V: 9 × 3 = 27. A menor espera é no caixa V.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 153. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-159",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função exponencial",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Um agricultor é informado sobre um método de proteção para sua lavoura que consiste em inserir larvas específicas, de rápida reprodução. A reprodução dessas larvas faz com que sua população multiplique-se por 10 a cada 3 dias e, para evitar eventuais desequilíbrios, é possível cessar essa reprodução aplicando-se um produto X. O agricultor decide iniciar esse método com 100 larvas e dispõe de 5 litros do produto X, cuja aplicação recomendada é de exatamente 1 litro para cada população de 200 000 larvas. A quantidade total do produto X de que ele dispõe deverá ser aplicada de uma única vez. Quantos dias após iniciado esse método o agricultor deverá aplicar o produto X?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2"
      },
      {
        "letra": "B",
        "texto": "4"
      },
      {
        "letra": "C",
        "texto": "6"
      },
      {
        "letra": "D",
        "texto": "12"
      },
      {
        "letra": "E",
        "texto": "18"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Os 5 litros servem para 5 × 200 000 = 1 000 000 larvas. A população é 100 × 10^(t/3). Então 100 × 10^(t/3) = 10⁶ → 10^(t/3) = 10⁴ → t/3 = 4 → t = 12 dias.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 159. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e23d2-162",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função afim",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Para concretar a laje de sua residência, uma pessoa contratou uma construtora. Tal empresa informa que o preço y do concreto bombeado é composto de duas partes: uma fixa, chamada de taxa de bombeamento, e uma variável, que depende do volume x de concreto utilizado. Sabe-se que a taxa de bombeamento custa R$ 500,00 e que o metro cúbico do concreto bombeado é de R$ 250,00. A expressão que representa o preço y em função do volume x, em metro cúbico, é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "y = 250x"
      },
      {
        "letra": "B",
        "texto": "y = 500x"
      },
      {
        "letra": "C",
        "texto": "y = 750x"
      },
      {
        "letra": "D",
        "texto": "y = 250x + 500"
      },
      {
        "letra": "E",
        "texto": "y = 500x + 250"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Parte fixa: 500. Parte variável: 250 por metro cúbico, ou 250x. Somando: y = 250x + 500.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 162. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e25d2-100",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Propriedades da água",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "Existe um processo de purificação de água em que são removidos os sais dissolvidos. A água que passa por esse processo é muito utilizada em laboratórios de química, em indústrias (como solvente), em baterias de carros etc. Entretanto, esse tipo de água não é adequado para ingestão, pois pode causar problemas de saúde, como carência iônica e diarreia. Essa água é chamada de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "dura."
      },
      {
        "letra": "B",
        "texto": "pesada."
      },
      {
        "letra": "C",
        "texto": "sanitária."
      },
      {
        "letra": "D",
        "texto": "destilada."
      },
      {
        "letra": "E",
        "texto": "oxigenada."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Na destilação a água evapora e é condensada, deixando os sais para trás. É a água destilada, usada em laboratório e em baterias. Por não ter sais minerais, não é adequada para beber.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 100. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e26d2-138",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Velocidade média",
    "nivel": "Fácil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "O deslocamento de carro entre duas cidades pode ser feito por dois trajetos, cujos comprimentos e velocidades médias nesses trajetos são:\n• I: 100 km e 50 km/h;\n• II: 120 km e 80 km/h.\nUma pessoa se deslocará de carro entre essas cidades e escolherá o trajeto que pode ser percorrido no menor tempo ao adotar a respectiva velocidade média. Essa pessoa escolherá o trajeto",
    "alternativas": [
      {
        "letra": "A",
        "texto": "I, pois é o trajeto que apresenta o menor comprimento."
      },
      {
        "letra": "B",
        "texto": "I, pois precisará de 30 minutos para realizar esse deslocamento."
      },
      {
        "letra": "C",
        "texto": "I, pois é o trajeto que apresenta a menor soma entre comprimento e velocidade."
      },
      {
        "letra": "D",
        "texto": "II, pois é o trajeto que apresenta a menor diferença entre comprimento e velocidade."
      },
      {
        "letra": "E",
        "texto": "II, pois precisará de 90 minutos para realizar esse deslocamento."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Tempo = distância ÷ velocidade. Trajeto I: 100 ÷ 50 = 2 h = 120 min. Trajeto II: 120 ÷ 80 = 1,5 h = 90 min. O II é mais rápido, mesmo sendo mais longo.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 138. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e26d2-152",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Sistema de equações",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Uma padaria vende pizzas de calabresa e de frango. Há 3 funcionários nessa padaria: Ana, Carla e José. No sábado, Ana vendeu 6 pizzas de calabresa e 15 de frango, tendo recebido 780 reais por essas vendas; Carla vendeu 5 pizzas de calabresa e 8 de frango, pelas quais recebeu 470 reais; e José vendeu 4 pizzas de calabresa, porém não anotou a quantidade de pizzas de frango que vendeu, mas sabe que recebeu um total de 520 reais pela venda de pizzas. Qual a quantidade total de pizzas que José vendeu nesse sábado?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "4"
      },
      {
        "letra": "B",
        "texto": "5"
      },
      {
        "letra": "C",
        "texto": "13"
      },
      {
        "letra": "D",
        "texto": "14"
      },
      {
        "letra": "E",
        "texto": "18"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Com c = preço da pizza de calabresa e f = de frango: 6c + 15f = 780 e 5c + 8f = 470. Dividindo a primeira por 3: 2c + 5f = 260. Resolvendo: f = 40 e c = 30. José: 4 × 30 = 120, e 520 − 120 = 400 em frango, ou seja, 10 pizzas. Total: 4 + 10 = 14.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 152. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "qr-e24d2-99",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Efeito Doppler",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma ambulância em alta velocidade com a sirene ligada desloca-se em direção a um radar operado por uma pessoa. O radar emite ondas de rádio com frequência f₀ que são refletidas pela dianteira da ambulância, retornando para o detector com frequência fᵣ. A percepção do operador do radar, em relação ao som emitido pela sirene, é de que este se altera à medida que a ambulância se aproxima ou se afasta.\nDurante a aproximação, como o operador percebe o som da sirene e qual é a relação entre as frequências fᵣ e f₀ medidas pelo radar?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Mais grave do que o som emitido e fᵣ < f₀."
      },
      {
        "letra": "B",
        "texto": "Mais agudo do que o som emitido e fᵣ < f₀."
      },
      {
        "letra": "C",
        "texto": "Mais agudo do que o som emitido e fᵣ = f₀."
      },
      {
        "letra": "D",
        "texto": "Mais agudo do que o som emitido e fᵣ > f₀."
      },
      {
        "letra": "E",
        "texto": "Mais grave do que o som emitido e fᵣ > f₀."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Quando a fonte se aproxima, as ondas chegam \"comprimidas\": a frequência percebida aumenta e o som fica mais agudo. O mesmo vale para a onda de rádio refletida por um objeto que se aproxima: ela volta com frequência maior, fᵣ > f₀. É assim que o radar mede velocidade.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 99. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-107",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Sistema digestório",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Com base em testes realizados em ratos, concluiu-se que os compostos nitrosos são substâncias mutagênicas, ou seja, produzem mutações nas células e possivelmente câncer. Esses compostos podem ser obtidos pela reação entre o nitrito de sódio, que é um conservante adicionado às carnes, e o ácido clorídrico. O ácido nitroso produzido irá reagir com compostos nitrogenados, como as aminas, dando origem aos compostos nitrosos. Em qual órgão esse processo será iniciado?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Rim."
      },
      {
        "letra": "B",
        "texto": "Fígado."
      },
      {
        "letra": "C",
        "texto": "Intestino."
      },
      {
        "letra": "D",
        "texto": "Pâncreas."
      },
      {
        "letra": "E",
        "texto": "Estômago."
      }
    ],
    "correta": "E",
    "resposta_comentada": "O ácido clorídrico faz parte do suco gástrico. O nitrito da carne encontra esse ácido no estômago, onde se forma o ácido nitroso que dá origem aos compostos nitrosos.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 107. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-111",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Artrópodes",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "O exoesqueleto dos crustáceos é formado por quitina e impregnações de sais calcários e, por isso, é mais duro quando comparado com o exoesqueleto de outros artrópodes. Esse revestimento externo confere proteção, mas, por ser duro, limita o crescimento desses animais. Para superar essa limitação, o exoesqueleto deve ser",
    "alternativas": [
      {
        "letra": "A",
        "texto": "formado somente na fase adulta do animal."
      },
      {
        "letra": "B",
        "texto": "fragmentado para expansão nas áreas de articulação."
      },
      {
        "letra": "C",
        "texto": "modelado continuamente para ajuste ao tamanho do corpo."
      },
      {
        "letra": "D",
        "texto": "substituído por meio de mudas que ocorrem periodicamente."
      },
      {
        "letra": "E",
        "texto": "impregnado por pequena quantidade de sais para sua distensão."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O exoesqueleto não cresce. Por isso os artrópodes fazem mudas (ecdise): trocam o exoesqueleto de tempos em tempos, crescem enquanto o novo ainda está mole e depois ele endurece.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 111. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-143",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem e lucro",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma casa de shows terá um evento cujo custo total de produção é de R$ 34 350,00, sendo que comporta 500 pessoas. O preço do ingresso será de R$ 130,00 e, normalmente, 60% das pessoas adquirem meia-entrada, pagando R$ 65,00 pelo ingresso. Além do faturamento proveniente da venda de ingressos, a casa de shows vende, com 60% de lucro, bebidas e petiscos ao público no dia do evento. Após ter vendido todos os 500 ingressos, constatou-se que a quantidade de meias-entradas vendidas superou em 50% o que estava previsto, impactando o faturamento estimado com a venda de ingressos. No dia do evento, decidiu-se manter o percentual de 60% de lucro sobre as bebidas e petiscos, pois todo o público que comprou ingresso compareceu ao show. Com isso, espera-se ter lucro de R$ 17000,00 nesse evento. Para que se alcance o lucro esperado, o gasto médio por pessoa com bebidas e petiscos, em real, deverá ser de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "19,50."
      },
      {
        "letra": "B",
        "texto": "28,80."
      },
      {
        "letra": "C",
        "texto": "34,00."
      },
      {
        "letra": "D",
        "texto": "52,00."
      },
      {
        "letra": "E",
        "texto": "68,70."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Previsto: 60% de 500 = 300 meias. Vendido: 50% a mais = 450 meias e 50 inteiras. Ingressos: 450 × 65 + 50 × 130 = R$ 35 750,00, um lucro de 35 750 − 34 350 = R$ 1 400,00. Faltam 17 000 − 1 400 = R$ 15 600,00, que são 60% do que se vende em bebidas e petiscos: vendas = 15 600 ÷ 0,6 = R$ 26 000,00. Por pessoa: 26 000 ÷ 500 = R$ 52,00.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 143. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-162",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Progressão geométrica",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma imobiliária iniciou uma campanha de divulgação para promover a venda de apartamentos que podem ser pagos em 100 parcelas mensais. O valor da primeira delas é fixado no momento da compra, com o pagamento dessa primeira parcela. A partir da segunda parcela, o valor é determinado pela aplicação de um acréscimo percentual fixo ao valor da parcela anterior. Como atrativo, a imobiliária fará o pagamento de todas as parcelas correspondentes ao mês de aniversário do comprador. Um cliente, que faz aniversário no mês de maio, decidiu comprar um desses apartamentos por meio do financiamento oferecido pela imobiliária, e pretende escolher o mês mais adequado para realizar essa compra, de modo que o valor total dos pagamentos seja o menor possível. Qual é o mês que esse cliente deverá escolher para realizar a compra do apartamento?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Fevereiro."
      },
      {
        "letra": "B",
        "texto": "Abril."
      },
      {
        "letra": "C",
        "texto": "Maio."
      },
      {
        "letra": "D",
        "texto": "Junho."
      },
      {
        "letra": "E",
        "texto": "Agosto."
      }
    ],
    "correta": "A",
    "resposta_comentada": "As parcelas crescem sempre (PG de razão maior que 1), e a imobiliária paga as de maio. O cliente quer que ela pague o máximo: o maior número de maios e os mais tardios. 100 parcelas são 8 anos e 4 meses, então dá para ter 9 maios se a compra for de fevereiro a maio. Comprando em fevereiro, a 4ª parcela cai em maio e a última, a 100ª (a maior de todas), também cai em maio.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 162. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-178",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Mediana",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "A umidade relativa do ar é um dos indicadores utilizados na meteorologia para fazer previsões sobre o clima. O quadro apresenta as médias mensais, em porcentagem, da umidade relativa do ar em um período de seis meses consecutivos em uma cidade.\nMédia mensal da umidade relativa do ar (%): maio, 66; junho, 64; julho, 54; agosto, 46; setembro, 60; outubro, 64.\nNessa cidade, a mediana desses dados, em porcentagem, da umidade relativa do ar no período considerado foi",
    "alternativas": [
      {
        "letra": "A",
        "texto": "56."
      },
      {
        "letra": "B",
        "texto": "58."
      },
      {
        "letra": "C",
        "texto": "59."
      },
      {
        "letra": "D",
        "texto": "60."
      },
      {
        "letra": "E",
        "texto": "62."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Em ordem: 46, 54, 60, 64, 64, 66. Com 6 valores, a mediana é a média dos dois do meio: (60 + 64) ÷ 2 = 62.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 178. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-179",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Divisão proporcional",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Uma empresa de engenharia foi contratada para realizar um serviço no valor de R$ 71250,00. Os sócios da empresa decidiram que 40% desse valor seria destinado ao pagamento de três engenheiros que gerenciaram o serviço. O pagamento para cada um deles será feito de forma diretamente proporcional ao total de horas trabalhadas. O número de dias e o número de horas diárias trabalhadas pelos engenheiros foram, respectivamente:\n• engenheiro I: 4 dias, numa jornada de 5 horas e meia por dia;\n• engenheiro II: 5 dias, numa jornada de 4 horas por dia;\n• engenheiro III: 6 dias, numa jornada de 2 horas e meia por dia.\nQual a maior diferença, em real, entre os valores recebidos por esse serviço entre dois desses engenheiros?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1000"
      },
      {
        "letra": "B",
        "texto": "1500"
      },
      {
        "letra": "C",
        "texto": "3500"
      },
      {
        "letra": "D",
        "texto": "3800"
      },
      {
        "letra": "E",
        "texto": "5250"
      }
    ],
    "correta": "C",
    "resposta_comentada": "Horas: I = 4 × 5,5 = 22; II = 5 × 4 = 20; III = 6 × 2,5 = 15; total 57 h. O valor a dividir é 40% de 71 250 = R$ 28 500,00, ou R$ 500,00 por hora. A maior diferença é entre I e III: (22 − 15) × 500 = R$ 3 500,00.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 179. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-94",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Dureza da água",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Em uma indústria, o controle da dureza da água é importante quando ela é utilizada em caldeiras, uma vez que sais pouco solúveis, formados a partir de sulfatos e carbonatos, podem acumular-se no interior das tubulações, causando obstruções. Para avaliar a água utilizada nessa indústria, foram realizados testes de qualidade que consideraram os seguintes parâmetros:\n• Teste 1: cálcio;\n• Teste 2: cloreto;\n• Teste 3: turbidez;\n• Teste 4: coliformes totais;\n• Teste 5: sólidos sedimentáveis.\nQual teste deve ser considerado para controlar a formação desse tipo de obstrução de tubulações?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1"
      },
      {
        "letra": "B",
        "texto": "2"
      },
      {
        "letra": "C",
        "texto": "3"
      },
      {
        "letra": "D",
        "texto": "4"
      },
      {
        "letra": "E",
        "texto": "5"
      }
    ],
    "correta": "A",
    "resposta_comentada": "Água dura tem muitos íons cálcio (e magnésio), que formam carbonatos e sulfatos pouco solúveis: são eles que entopem as tubulações. Por isso o teste que importa é o de cálcio.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 94. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-96",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Massa molar e porcentagem",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Existe no comércio um produto antimofo constituído por uma embalagem com tampa perfurada contendo cloreto de cálcio anidro, CaCl₂. Uma vez aberto o lacre, essa substância absorve a umidade ambiente, transformando-se em cloreto de cálcio di-hidratado, CaCl₂·2H₂O.\nConsidere a massa molar da água igual a 18 g mol⁻¹, e a massa molar do cloreto de cálcio anidro igual a 111 g mol⁻¹.\nNa hidratação da substância presente no antimofo, o ganho percentual, em massa, é mais próximo de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "14%"
      },
      {
        "letra": "B",
        "texto": "16%"
      },
      {
        "letra": "C",
        "texto": "24%"
      },
      {
        "letra": "D",
        "texto": "32%"
      },
      {
        "letra": "E",
        "texto": "75%"
      }
    ],
    "correta": "D",
    "resposta_comentada": "Cada CaCl₂ (111 g/mol) absorve 2 H₂O (2 × 18 = 36 g/mol). Ganho percentual: 36 ÷ 111 ≈ 0,32 = 32%.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 96. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-97",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Hormônios vegetais",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Um garoto comprou vários abacates na feira, mas descobriu que eles não estavam maduros o suficiente para serem consumidos. Sua mãe recomendou que ele colocasse os abacates em um recipiente fechado, pois isso aceleraria seu amadurecimento. Com certa dúvida, o garoto realizou esta experiência: colocou alguns abacates no recipiente e deixou os demais em uma fruteira aberta. Surpreendendo-se, ele percebeu que os frutos que estavam no recipiente fechado amadureceram mais rapidamente. A aceleração desse processo é causada por",
    "alternativas": [
      {
        "letra": "A",
        "texto": "acúmulo de gás etileno."
      },
      {
        "letra": "B",
        "texto": "redução da umidade do ar."
      },
      {
        "letra": "C",
        "texto": "aumento da concentração de CO₂."
      },
      {
        "letra": "D",
        "texto": "diminuição da intensidade luminosa."
      },
      {
        "letra": "E",
        "texto": "isolamento do contato com O₂ atmosférico."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Os frutos liberam etileno, um hormônio gasoso que acelera o amadurecimento. No recipiente fechado o gás se acumula e o amadurecimento fica mais rápido.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 97. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-99",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Parasitoses",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "A leishmaniose visceral é uma zoonose causada por um protozoário do gênero Leishmania que é encontrado em diversos tecidos. Ela é transmitida ao homem de forma indireta, por vetores do ambiente doméstico. O cão é considerado um importante hospedeiro desse protozoário, podendo ou não apresentar os sintomas da doença, como perda de peso, anemia, ferimentos na pele, diarreia, conjuntivite e insuficiência renal. Em uma região que sofre com alta incidência dessa doença, uma campanha do centro de zoonoses buscou verificar a presença desse protozoário nos cães para tentar controlar a doença. Em qual material biológico dos cães a presença desse protozoário representa risco de transmissão dessa zoonose?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Urina."
      },
      {
        "letra": "B",
        "texto": "Saliva."
      },
      {
        "letra": "C",
        "texto": "Fezes."
      },
      {
        "letra": "D",
        "texto": "Sangue."
      },
      {
        "letra": "E",
        "texto": "Secreção ocular."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A leishmaniose é transmitida pela picada do mosquito-palha, que se contamina ao sugar o sangue de um animal infectado. Por isso o que importa é o protozoário no sangue do cão.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 99. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-105",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Tecidos vegetais",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Barbatimão é o nome popular de uma árvore cuja casca é utilizada para fins medicinais. Essa casca é constituída principalmente de dois tecidos vegetais: periderme e floema. A extração da casca tem levado à morte muitos indivíduos dessa espécie, quando o corte retira um anel completo ao longo da circunferência do tronco. Aqueles que têm parte da casca retirada sem completar essa circunferência podem sobreviver. A morte desses indivíduos, decorrente da retirada do anel completo da casca, é provocada pela interrupção da",
    "alternativas": [
      {
        "letra": "A",
        "texto": "fotossíntese."
      },
      {
        "letra": "B",
        "texto": "transpiração."
      },
      {
        "letra": "C",
        "texto": "troca de gases."
      },
      {
        "letra": "D",
        "texto": "formação de brotos."
      },
      {
        "letra": "E",
        "texto": "nutrição das raízes."
      }
    ],
    "correta": "E",
    "resposta_comentada": "O floema leva a seiva elaborada (açúcares feitos na fotossíntese) das folhas para o resto da planta, inclusive as raízes. Tirando um anel completo de casca, o floema é cortado em toda a volta e as raízes param de receber alimento.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 105. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-128",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Ondas eletromagnéticas",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "É comum em viagens de avião sermos solicitados a desligar aparelhos cujo funcionamento envolva a emissão ou a recepção de ondas eletromagnéticas, como celulares. A justificativa dada para esse procedimento é, entre outras coisas, a necessidade de eliminar fontes de sinais eletromagnéticos que possam interferir nas comunicações, via rádio, dos pilotos com a torre de controle. Essa interferência poderá ocorrer somente se as ondas emitidas pelo celular e as recebidas pelo rádio do avião",
    "alternativas": [
      {
        "letra": "A",
        "texto": "forem ambas audíveis."
      },
      {
        "letra": "B",
        "texto": "tiverem a mesma potência."
      },
      {
        "letra": "C",
        "texto": "tiverem a mesma frequência."
      },
      {
        "letra": "D",
        "texto": "tiverem a mesma intensidade."
      },
      {
        "letra": "E",
        "texto": "propagarem-se com velocidades diferentes."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Um receptor de rádio é sintonizado numa frequência. Só um sinal de mesma frequência (ou muito próxima) atrapalha essa recepção.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 128. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-137",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Média ponderada",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Os 100 funcionários de uma empresa estão distribuídos em dois setores: Produção e Administração. Os funcionários de um mesmo setor recebem salários com valores iguais. O quadro apresenta a quantidade de funcionários por setor e seus respectivos salários.\n• Produção: 75 funcionários, salário de R$ 2 000,00;\n• Administração: 25 funcionários, salário de R$ 7 000,00.\nA média dos salários dos 100 funcionários dessa empresa, em real, é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2 000,00."
      },
      {
        "letra": "B",
        "texto": "2 500,00."
      },
      {
        "letra": "C",
        "texto": "3 250,00."
      },
      {
        "letra": "D",
        "texto": "4 500,00."
      },
      {
        "letra": "E",
        "texto": "9 000,00."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Média = (75 × 2000 + 25 × 7000) ÷ 100 = (150 000 + 175 000) ÷ 100 = R$ 3 250,00. Erro comum: fazer (2000 + 7000) ÷ 2 = 4500, ignorando quantas pessoas ganham cada salário.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 137. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-138",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Probabilidade",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Visando atrair mais clientes, o gerente de uma loja anunciou uma promoção em que cada cliente que realizar uma compra pode ganhar um voucher para ser usado em sua próxima compra. Para ganhar seu voucher, o cliente precisa retirar, ao acaso, uma bolinha de dentro de cada uma das duas urnas A e B disponibilizadas pelo gerente, nas quais há apenas bolinhas pretas e brancas. Atualmente, a probabilidade de se escolher, ao acaso, uma bolinha preta na urna A é igual a 20% e a probabilidade de se escolher uma bolinha preta na urna B é 25%. Ganha o voucher o cliente que retirar duas bolinhas pretas, uma de cada urna. Com o passar dos dias, o gerente percebeu que, para a promoção ser viável aos negócios, era preciso alterar a probabilidade de acerto do cliente sem alterar a regra da promoção. Para isso, resolveu alterar a quantidade de bolinhas brancas na urna B de forma que a probabilidade de um cliente ganhar o voucher passasse a ser menor ou igual a 1%. Sabe-se que a urna B tem 4 bolinhas pretas e que, em ambas as urnas, todas as bolinhas têm a mesma probabilidade de serem retiradas. Qual é o número mínimo de bolinhas brancas que o gerente deve adicionar à urna B?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "20"
      },
      {
        "letra": "B",
        "texto": "60"
      },
      {
        "letra": "C",
        "texto": "64"
      },
      {
        "letra": "D",
        "texto": "68"
      },
      {
        "letra": "E",
        "texto": "80"
      }
    ],
    "correta": "C",
    "resposta_comentada": "Ganhar = preta em A e preta em B: 0,20 × p(B) ≤ 0,01 → p(B) ≤ 0,05. Com 4 pretas: 4 ÷ (4 + brancas) ≤ 0,05 → 4 + brancas ≥ 80 → brancas ≥ 76. Hoje p(B) = 25%, ou seja, 4 pretas e 12 brancas. É preciso adicionar 76 − 12 = 64 brancas.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 138. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e23d2-160",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Análise combinatória",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Ao realizar o cadastro em um aplicativo de investimentos, foi solicitado ao usuário que criasse uma senha, sendo permitido o uso somente dos seguintes caracteres:\n• algarismos de 0 a 9;\n• 26 letras minúsculas do alfabeto;\n• 26 letras maiúsculas do alfabeto;\n• 6 caracteres especiais !, @, #, $, ★, &.\nTrês tipos de estruturas para senha foram apresentadas ao usuário:\n• tipo I: formada por quaisquer quatro caracteres distintos, escolhidos dentre os permitidos;\n• tipo II: formada por cinco caracteres distintos, iniciando por três letras, seguidas por um algarismo e, ao final, um caractere especial;\n• tipo III: formada por seis caracteres distintos, iniciando por duas letras, seguidas por dois algarismos e, ao final, dois caracteres especiais.\nConsidere p₁, p₂ e p₃ as probabilidades de se descobrirem ao acaso, na primeira tentativa, as senhas dos tipos I, II e III, respectivamente.\nNessas condições, o tipo de senha que apresenta a menor probabilidade de ser descoberta ao acaso, na primeira tentativa, é o",
    "alternativas": [
      {
        "letra": "A",
        "texto": "tipo I, pois p₁ < p₂ < p₃."
      },
      {
        "letra": "B",
        "texto": "tipo I, pois tem menor quantidade de caracteres."
      },
      {
        "letra": "C",
        "texto": "tipo II, pois tem maior quantidade de letras."
      },
      {
        "letra": "D",
        "texto": "tipo III, pois p₃ < p₂ < p₁."
      },
      {
        "letra": "E",
        "texto": "tipo III, pois tem maior quantidade de caracteres."
      }
    ],
    "correta": "A",
    "resposta_comentada": "São 10 + 26 + 26 + 6 = 68 caracteres. Tipo I: 68 × 67 × 66 × 65 ≈ 19,5 milhões de senhas. Tipo II: 52 × 51 × 50 × 10 × 6 ≈ 8 milhões. Tipo III: 52 × 51 × 10 × 9 × 6 × 5 ≈ 7,2 milhões. Quanto mais senhas possíveis, menor a chance de acertar: p₁ < p₂ < p₃. Ter mais caracteres não garante mais segurança.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 160. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e25d2-93",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Aves",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "Os funcionários de um zoológico observaram um aumento na taxa de mortalidade de aves aquáticas por afogamento. Um grupo de biólogos analisou o comportamento das aves por várias semanas e observou que elas apresentavam dificuldade de flutuação, por causa do encharcamento das penas com água. O aumento na taxa de mortalidade dessas aves estava associado a uma redução na",
    "alternativas": [
      {
        "letra": "A",
        "texto": "dilatação do papo."
      },
      {
        "letra": "B",
        "texto": "reposição de penas das asas."
      },
      {
        "letra": "C",
        "texto": "secreção da glândula uropigial."
      },
      {
        "letra": "D",
        "texto": "formação da membrana natatória."
      },
      {
        "letra": "E",
        "texto": "largura das cavidades de ossos pneumáticos."
      }
    ],
    "correta": "C",
    "resposta_comentada": "A glândula uropigial, perto da cauda, produz um óleo que a ave espalha nas penas com o bico, deixando-as impermeáveis. Com menos secreção, as penas encharcam e a ave perde a flutuação.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 93. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e26d2-96",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Répteis",
    "nivel": "Médio",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Ao longo do tempo evolutivo, surgiram características que permitiram que os répteis se tornassem o primeiro grupo de animais vertebrados tipicamente terrestres. Uma delas é a pele grossa e rica em queratina. Evolutivamente, essa adaptação do grupo contribuiu para a",
    "alternativas": [
      {
        "letra": "A",
        "texto": "melhoria da eficiência locomotora."
      },
      {
        "letra": "B",
        "texto": "manutenção da temperatura corporal."
      },
      {
        "letra": "C",
        "texto": "diminuição do risco de ressecamento."
      },
      {
        "letra": "D",
        "texto": "ampliação de trocas gasosas pela pele."
      },
      {
        "letra": "E",
        "texto": "excreção de compostos menos tóxicos."
      }
    ],
    "correta": "C",
    "resposta_comentada": "A pele grossa e com queratina é quase impermeável e reduz a perda de água. Isso permitiu aos répteis viver longe da água, em ambientes secos.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 96. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e26d2-100",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Concentração em mol/L",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Durante uma aula de química, o professor discorre sobre propriedades intensivas e cita como exemplo a concentração. Ele afirma que, para a água pura a 20 °C, a concentração, em mol/L, é a mesma em 25,0 mL e em 500,0 mL. Nessa condição, a densidade da água é igual a 1,0 g/mL, e as massas molares, em g/mol, do hidrogênio e do oxigênio são, respectivamente, iguais a 1 e 16. A concentração de água, em mol/L, em qualquer um desses exemplos, é mais próxima de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "0,055 mol/L."
      },
      {
        "letra": "B",
        "texto": "1,4 mol/L."
      },
      {
        "letra": "C",
        "texto": "18 mol/L."
      },
      {
        "letra": "D",
        "texto": "28 mol/L."
      },
      {
        "letra": "E",
        "texto": "56 mol/L."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Em 1 L de água há 1000 g (densidade 1 g/mL). Massa molar da água: 2 × 1 + 16 = 18 g/mol. Então 1000 ÷ 18 ≈ 55,6 mol em 1 L, ou cerca de 56 mol/L, seja qual for o volume da amostra (propriedade intensiva).\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 100. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "qr-e24d2-95",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Biotecnologia",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "O desenvolvimento da biotecnologia e da clonagem gênica em procariotos fez com que a produção de proteínas se tornasse mais intensa, rápida e econômica. Para a produção de hormônios, enzimas e proteínas de resistência a drogas, uma variação da técnica de reação em cadeia pela polimerase (PCR, na sigla em inglês) utiliza a enzima transcriptase reversa (RT-PCR), que sintetiza moléculas de DNA complementares a partir de fitas de RNA. Nesse contexto, essa técnica é importante para detectar genes",
    "alternativas": [
      {
        "letra": "A",
        "texto": "expressos."
      },
      {
        "letra": "B",
        "texto": "plasmidiais."
      },
      {
        "letra": "C",
        "texto": "bacterianos."
      },
      {
        "letra": "D",
        "texto": "dominantes."
      },
      {
        "letra": "E",
        "texto": "autossômicos."
      }
    ],
    "correta": "A",
    "resposta_comentada": "A RT-PCR começa pelo RNA mensageiro. Só existe RNA mensageiro de um gene quando ele está sendo transcrito, ou seja, expresso. Por isso a técnica detecta genes expressos.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 95. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e24d2-106",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Raios X",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2024,
    "enunciado": "Em aeroportos, por razões de segurança, os passageiros devem ter suas bagagens de mão examinadas antes do embarque, passando-as em esteiras para sua inspeção por aparelhos de raios X. Nessas inspeções, os passageiros são orientados a retirar seus computadores portáteis (notebooks ou laptops) de malas, mochilas ou bolsas para passá-los isoladamente pela esteira. Que explicação física justifica esse procedimento?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Os raios X não interagem com os componentes metálicos do computador, o que impede a formação de imagens."
      },
      {
        "letra": "B",
        "texto": "Os raios X desmagnetizam o disco rígido do computador, quando refratados pelos componentes metálicos das bagagens de mão."
      },
      {
        "letra": "C",
        "texto": "Os raios X aquecem os materiais metálicos encontrados em bagagens de mão, quando refletidos pelos componentes do computador."
      },
      {
        "letra": "D",
        "texto": "Os raios X não atravessam os componentes densos do computador, o que impede a visualização de objetos que estão à frente ou atrás deles."
      },
      {
        "letra": "E",
        "texto": "Os raios X ionizam os materiais metálicos normalmente encontrados em bagagens de mão, quando difratados pelos componentes do computador."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A imagem do raio X é a \"sombra\" do que absorve a radiação. Os componentes densos do notebook (bateria, placas) barram os raios X e escondem o que está atrás ou na frente deles. Separado, o computador não atrapalha a inspeção do resto da bagagem.\n\nFonte: ENEM 2024, 2º dia, caderno 7 (azul), questão 106. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e23d2-93",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Energia nuclear",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "A utilização de tecnologia nuclear é um tema bastante controverso, por causa do risco de acidentes graves, como aqueles ocorridos em Chernobyl (1986), em Goiânia (1987) e em Fukushima (2011). Apesar de muitas desvantagens, como a geração de resíduos tóxicos, a descontaminação ambiental dispendiosa em caso de acidentes e a utilização em armas nucleares, a geração de energia nuclear apresenta vantagens em comparação a outras fontes de energia. A geração dessa energia tem como característica:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Formar resíduos facilmente recicláveis."
      },
      {
        "letra": "B",
        "texto": "Promover o aumento do desmatamento."
      },
      {
        "letra": "C",
        "texto": "Contribuir para a produção de chuva ácida."
      },
      {
        "letra": "D",
        "texto": "Emitir gases tóxicos que são lançados no ambiente."
      },
      {
        "letra": "E",
        "texto": "Produzir calor sem o consumo de combustíveis fósseis."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Na usina nuclear o calor vem da fissão do urânio, não da queima de carvão, petróleo ou gás. Por isso ela não emite os gases da combustão que causam chuva ácida e efeito estufa. O lixo radioativo, porém, não é reciclável.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 93. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e23d2-102",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Oxidação de álcoois",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "As cetonas fazem parte de famílias olfativas encontradas em muitos alimentos. A molécula de hexan-3-ona é um exemplo desses compostos voláteis responsáveis pelo aroma, podendo ser obtida por processos energéticos realizados em meio ácido, na presença de oxidantes como o permanganato de potássio. Para se produzir esse composto volátil em laboratório, deve-se oxidar a molécula de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "hexanal."
      },
      {
        "letra": "B",
        "texto": "hexan-1-ol."
      },
      {
        "letra": "C",
        "texto": "hexan-3-ol."
      },
      {
        "letra": "D",
        "texto": "hex-1-en-1-ol."
      },
      {
        "letra": "E",
        "texto": "ácido hexanoico."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Oxidar um álcool secundário dá uma cetona, com o C=O no mesmo carbono que tinha o OH. A hexan-3-ona tem o C=O no carbono 3, então vem do hexan-3-ol. O hexan-1-ol (álcool primário) daria aldeído ou ácido.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 102. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e23d2-108",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Indução eletromagnética",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "O fogão por indução funciona a partir do surgimento de uma corrente elétrica induzida no fundo da panela, com consequente transformação de energia elétrica em calor por efeito Joule. A principal vantagem desses fogões é a eficiência energética, que é substancialmente maior que a dos fogões convencionais. A corrente elétrica mencionada é induzida por",
    "alternativas": [
      {
        "letra": "A",
        "texto": "radiação."
      },
      {
        "letra": "B",
        "texto": "condução."
      },
      {
        "letra": "C",
        "texto": "campo elétrico variável."
      },
      {
        "letra": "D",
        "texto": "campo magnético variável."
      },
      {
        "letra": "E",
        "texto": "ressonância eletromagnética."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Pela lei de Faraday, um campo magnético variável induz corrente elétrica num condutor. A bobina do fogão cria esse campo variável, a corrente induzida no fundo metálico da panela esquenta por efeito Joule.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 108. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e23d2-118",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Hidrocarbonetos",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "A gasolina é uma mistura de hidrocarbonetos de cadeias saturadas contendo de 8 a 12 átomos de carbono. Além disso, a gasolina de alto desempenho deve conter elevados teores de hidrocarbonetos de cadeias ramificadas, de forma a resistir à compressão e entrar em ignição apenas quando a vela aciona uma centelha elétrica no motor. No quadro, estão apresentados compostos que podem ser utilizados como combustíveis.\n• I: n-decano;\n• II: n-heptano;\n• III: 2,2,4-trimetilpentano;\n• IV: 3-etil-4-metilex-1-eno;\n• V: 3-etil-2-metilpentan-1-ol.\nEntre esses compostos, aquele que conferirá maior desempenho como combustível é o",
    "alternativas": [
      {
        "letra": "A",
        "texto": "I."
      },
      {
        "letra": "B",
        "texto": "II."
      },
      {
        "letra": "C",
        "texto": "III."
      },
      {
        "letra": "D",
        "texto": "IV."
      },
      {
        "letra": "E",
        "texto": "V."
      }
    ],
    "correta": "C",
    "resposta_comentada": "O texto pede hidrocarboneto saturado, com 8 a 12 carbonos e cadeia ramificada. O 2,2,4-trimetilpentano (isoctano) tem 8 carbonos, só ligações simples e três ramificações. O n-decano e o n-heptano não são ramificados, o IV tem dupla ligação e o V é um álcool.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 118. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e23d2-158",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função e lucro",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2023,
    "enunciado": "Um pescador tem um custo fixo diário de R$ 900,00 com combustível, iscas, manutenção de seu barco e outras pequenas despesas. Ele vende cada quilograma de peixe por R$ 5,00. Sua meta é obter um lucro mínimo de R$ 800,00 por dia. Sozinho, ele consegue, ao final de um dia de trabalho, pescar 180 kg de peixe, o que é suficiente apenas para cobrir o custo fixo diário. Portanto, precisa contratar ajudantes, pagando para cada um R$ 250,00 por dia de trabalho. Além desse valor, 4% da receita obtida pela venda de peixe é repartida igualmente entre os ajudantes. Considerando o tamanho de seu barco, ele pode contratar até 5 ajudantes. Ele sabe que com um ajudante a pesca diária é de 300 kg e que, a partir do segundo ajudante contratado, aumenta-se em 100 kg a quantidade de peixe pescada por ajudante em um dia de trabalho. A quantidade mínima de ajudantes que esse pescador precisa contratar para conseguir o lucro diário pretendido é",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1."
      },
      {
        "letra": "B",
        "texto": "2."
      },
      {
        "letra": "C",
        "texto": "3."
      },
      {
        "letra": "D",
        "texto": "4."
      },
      {
        "letra": "E",
        "texto": "5."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Com n ajudantes a pesca é 300 + 100(n − 1) kg. Receita: 5 por kg; 4% dela vai para os ajudantes; custo fixo 900; 250 por ajudante. Lucro = 4,8 × pesca − 900 − 250n. n = 3: 4,8 × 500 − 900 − 750 = 750 (não basta). n = 4: 4,8 × 600 − 900 − 1000 = 980 ≥ 800. São 4 ajudantes.\n\nFonte: ENEM 2023, 2º dia, caderno 7 (azul), questão 158. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e25d2-102",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Toxinas e saúde",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "O sashimi (filé de peixe cru) de baiacu é uma iguaria muito apreciada no Japão. Entretanto, sua ingestão pode causar a morte por parada respiratória, pois esse peixe contém uma potente neurotoxina termoestável, a tetrodotoxina, que é produzida e armazenada nas gônadas e vísceras. Que ação poderia evitar essa intoxicação?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Criar os peixes em cativeiro."
      },
      {
        "letra": "B",
        "texto": "Realizar a pesca com redes."
      },
      {
        "letra": "C",
        "texto": "Consumir peixes cozidos ou fritos."
      },
      {
        "letra": "D",
        "texto": "Preparar o peixe em condições adequadas de higiene."
      },
      {
        "letra": "E",
        "texto": "Manusear o peixe sem provocar o rompimento dos órgãos internos."
      }
    ],
    "correta": "E",
    "resposta_comentada": "A tetrodotoxina é termoestável: cozinhar ou fritar não a destrói. Ela fica nas gônadas e nas vísceras. O jeito de evitar a intoxicação é limpar o peixe sem romper esses órgãos, para a toxina não passar para a carne.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 102. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e25d2-105",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Solubilidade de gases",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "As usinas termonucleares são aquelas que produzem energia elétrica a partir da geração de energia térmica proveniente das reações nucleares. Normalmente, essas usinas funcionam por meio de dois circuitos, denominados circuito primário (vaso de pressão, pressurizador e bomba) e circuito secundário (gerador de vapor, turbina, condensador, tanque de alimentação e bombas), além de um sistema de água de refrigeração, formado por uma bomba ligada a uma fonte hídrica natural. Durante a operação da usina, se o sistema de água de refrigeração funcionar de forma ineficiente pode causar poluição térmica, comprometendo a vida no ecossistema aquático. Para o ecossistema aquático, a ineficiência do sistema de água de refrigeração tem como consequência a",
    "alternativas": [
      {
        "letra": "A",
        "texto": "diminuição do pH."
      },
      {
        "letra": "B",
        "texto": "liberação de gases poluentes."
      },
      {
        "letra": "C",
        "texto": "contaminação por combustíveis."
      },
      {
        "letra": "D",
        "texto": "liberação de elementos radioativos."
      },
      {
        "letra": "E",
        "texto": "diminuição da solubilidade do gás oxigênio."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Água de refrigeração mal resfriada volta quente para o rio. A solubilidade dos gases na água diminui quando a temperatura sobe: sobra menos oxigênio dissolvido para peixes e outros seres aquáticos.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 105. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e25d2-110",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Radioatividade (meia-vida)",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "A química nuclear é uma importante ferramenta na produção de substâncias utilizadas na área da saúde humana. A radiação emitida pelo cobalto-60 é utilizada na medicina como ferramenta de diagnóstico e no tratamento do câncer. No entanto, esse radioisótopo tem um tempo de armazenamento limitado, pois seu tempo de meia-vida é de 5,3 anos. Considere um frasco com uma amostra contendo 2,00 mg de cobalto-60, armazenado durante um período de 26,5 anos. A massa de cobalto-60, em miligrama, que restará ao final desse tempo é mais próxima de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2,00 mg."
      },
      {
        "letra": "B",
        "texto": "1,00 mg."
      },
      {
        "letra": "C",
        "texto": "0,40 mg."
      },
      {
        "letra": "D",
        "texto": "0,13 mg."
      },
      {
        "letra": "E",
        "texto": "0,06 mg."
      }
    ],
    "correta": "E",
    "resposta_comentada": "26,5 ÷ 5,3 = 5 meias-vidas. A cada meia-vida a massa cai pela metade: 2,00 → 1,00 → 0,50 → 0,25 → 0,125 → 0,0625 mg, ou cerca de 0,06 mg.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 110. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e25d2-121",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Funções orgânicas (aminas)",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2025,
    "enunciado": "A dimetilamina é uma substância de elevada toxidez que entra em ebulição a 7 °C. Na madrugada de um dia frio, essa substância se espalhou por uma rodovia após um acidente de trânsito envolvendo um caminhão que transportava esse produto. Para minimizar a agressão ao meio ambiente, bem como evitar a evaporação da dimetilamina com a elevação da temperatura ao longo do dia, um químico considerou o uso de algumas substâncias ou misturas como água, vinagre, óleo de soja, sal de cozinha e bicarbonato de sódio. Dentre as opções apresentadas, o tratamento correto para minimizar esse problema é usar",
    "alternativas": [
      {
        "letra": "A",
        "texto": "água."
      },
      {
        "letra": "B",
        "texto": "vinagre."
      },
      {
        "letra": "C",
        "texto": "óleo de soja."
      },
      {
        "letra": "D",
        "texto": "sal de cozinha."
      },
      {
        "letra": "E",
        "texto": "bicarbonato de sódio."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Aminas são bases. O vinagre (ácido acético) reage com a dimetilamina e forma um sal, que não evapora. Assim a substância não vira gás quando a temperatura passa de 7 °C.\n\nFonte: ENEM 2025, 2º dia, caderno 7 (azul), questão 121. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e26d2-107",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Bioindicadores",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Regiões de manguezal estão sujeitas ao acúmulo de poluentes, como metais pesados, resultantes de atividades industriais. Essas áreas são fonte de recursos pesqueiros, sendo a avaliação da qualidade ambiental importante para a manutenção da saúde dos consumidores e da renda das famílias de pescadores. Para realizar a avaliação citada, um pesquisador deve optar pelo uso do seguinte organismo como indicador ambiental:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Robalo, peixe predador de pequenos peixes."
      },
      {
        "letra": "B",
        "texto": "Viuvinha, ave predadora de pequenos animais."
      },
      {
        "letra": "C",
        "texto": "Sururu, molusco filtrador de partículas da água."
      },
      {
        "letra": "D",
        "texto": "Aratu, caranguejo que se alimenta de folhas e insetos."
      },
      {
        "letra": "E",
        "texto": "Jacaré-do-papo-amarelo, réptil predador de pequenas aves."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Um bom indicador vive fixo no local e acumula o poluente. O sururu filtra a água o tempo todo e concentra os metais pesados presentes nas partículas. Também é um alimento consumido, o que liga o resultado à saúde das pessoas.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 107. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e26d2-129",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Impactos ambientais",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Atualmente, muito se discute a respeito da necessidade crescente de produção de energia elétrica. As usinas hidrelétricas são consideradas fontes de energia limpa, sustentável e renovável. Entretanto, toda intervenção humana no ambiente gera impactos. O alagamento de grandes áreas devido à construção de usinas, entre outras consequências, pode interferir no equilíbrio da flora e da fauna locais. No caso de espécies endêmicas, o impacto pode ser ainda maior, levando até mesmo à sua extinção. Nesse contexto, para o manejo após o impacto, é importante que estudos prévios sejam feitos com o objetivo de",
    "alternativas": [
      {
        "letra": "A",
        "texto": "avaliar a potabilidade da água."
      },
      {
        "letra": "B",
        "texto": "monitorar a biodiversidade local."
      },
      {
        "letra": "C",
        "texto": "estimular a introdução de espécies exóticas."
      },
      {
        "letra": "D",
        "texto": "promover a variedade de espécies lacustres."
      },
      {
        "letra": "E",
        "texto": "favorecer a emigração das espécies silvestres."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Para planejar o manejo depois do alagamento é preciso saber quais espécies vivem ali, principalmente as endêmicas. Isso se faz monitorando a biodiversidade local antes e depois da obra.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 129. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "qr-e26d2-132",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Óptica (espalhamento da luz)",
    "nivel": "Difícil",
    "instituicao": "ENEM",
    "ano": 2026,
    "enunciado": "Ao trafegar à noite, é necessário manter os faróis dos veículos acesos. Quando a umidade relativa do ar é baixa, o motorista consegue ter boa visibilidade da pista. No entanto, em noites em que há neblina, essa visibilidade é reduzida. Nessa situação, a visibilidade reduzida deve-se à",
    "alternativas": [
      {
        "letra": "A",
        "texto": "dispersão da luz pelas gotículas de água suspensas no ar."
      },
      {
        "letra": "B",
        "texto": "polarização da luz pelas gotículas de água dispersas no ar."
      },
      {
        "letra": "C",
        "texto": "condensação das gotículas de água na superfície do farol."
      },
      {
        "letra": "D",
        "texto": "solubilização das gotículas de água presentes no ar."
      },
      {
        "letra": "E",
        "texto": "redução da potência da luz emitida pelo farol."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Na neblina há muitas gotículas de água no ar. A luz dos faróis bate nelas e é espalhada para todos os lados, inclusive de volta para o motorista. Por isso a visibilidade cai.\n\nFonte: ENEM 2026, 2º dia, caderno 7 (azul), questão 132. Gabarito oficial. Comentário escrito pelo app.",
    "serie_minima": "3º ano EM"
  }
]

export const SEMANA_BASE = [
  {
    "dia_semana": 1,
    "inicio": "14:00",
    "fim": "14:50",
    "materia": "Matemática"
  },
  {
    "dia_semana": 1,
    "inicio": "15:00",
    "fim": "15:50",
    "materia": "Língua portuguesa"
  },
  {
    "dia_semana": 1,
    "inicio": "16:10",
    "fim": "17:00",
    "materia": "Biologia"
  },
  {
    "dia_semana": 1,
    "inicio": "17:10",
    "fim": "18:00",
    "materia": "Artes"
  },
  {
    "dia_semana": 2,
    "inicio": "14:00",
    "fim": "14:50",
    "materia": "Física"
  },
  {
    "dia_semana": 2,
    "inicio": "15:00",
    "fim": "15:50",
    "materia": "Literatura"
  },
  {
    "dia_semana": 2,
    "inicio": "16:10",
    "fim": "17:00",
    "materia": "Geografia"
  },
  {
    "dia_semana": 2,
    "inicio": "17:10",
    "fim": "18:00",
    "materia": "Itinerário de ciências exatas"
  },
  {
    "dia_semana": 3,
    "inicio": "14:00",
    "fim": "14:50",
    "materia": "Química"
  },
  {
    "dia_semana": 3,
    "inicio": "15:00",
    "fim": "15:50",
    "materia": "Produção de texto"
  },
  {
    "dia_semana": 3,
    "inicio": "16:10",
    "fim": "17:00",
    "materia": "História"
  },
  {
    "dia_semana": 3,
    "inicio": "17:10",
    "fim": "18:00",
    "materia": "Educação física"
  },
  {
    "dia_semana": 4,
    "inicio": "14:00",
    "fim": "14:50",
    "materia": "Matemática"
  },
  {
    "dia_semana": 4,
    "inicio": "15:00",
    "fim": "15:50",
    "materia": "Língua inglesa"
  },
  {
    "dia_semana": 4,
    "inicio": "16:10",
    "fim": "17:00",
    "materia": "Sociologia"
  },
  {
    "dia_semana": 4,
    "inicio": "17:10",
    "fim": "18:00",
    "materia": "Itinerário de ciências da natureza"
  },
  {
    "dia_semana": 5,
    "inicio": "14:00",
    "fim": "14:50",
    "materia": "Filosofia"
  },
  {
    "dia_semana": 5,
    "inicio": "15:00",
    "fim": "15:50",
    "materia": "Itinerário de linguagens"
  },
  {
    "dia_semana": 5,
    "inicio": "16:10",
    "fim": "17:00",
    "materia": "Itinerário de ciências humanas"
  },
  {
    "dia_semana": 5,
    "inicio": "17:10",
    "fim": "18:00",
    "materia": "Interioridade e projeto de vida"
  }
]

export const TITULOS_BLOCO = {
  "Matemática": "Exercícios resolvidos",
  "Língua portuguesa": "Gramática e interpretação",
  "Literatura": "Leitura da obra do bimestre",
  "Produção de texto": "Treino de redação",
  "Língua inglesa": "Vocabulário e leitura",
  "Artes": "Pesquisa e criação",
  "Interioridade e projeto de vida": "Reflexão e metas da semana",
  "Educação física": "Registro e preparo das atividades"
}

export const SERIES_CONFIG = {
  "9º ano EF": {
    "rotulo": "9º ano EF",
    "nome": "9º ano do fundamental",
    "vestibular": 0,
    "meta_questoes_semana": 15,
    "meta_foco_min_semana": 180,
    "meta_provas_mes": 0,
    "descricao": "Base para o ensino médio: Matemática, Língua portuguesa, leitura e rotina de estudo. Resumos e questões mais básicos primeiro.",
    "foco": "Foco da série: consolidar a base de Matemática e Língua portuguesa e criar rotina de estudo.",
    "titulos": {
      "Matemática": "Exercícios do caderno e revisão da base",
      "Língua portuguesa": "Leitura, gramática e interpretação",
      "Produção de texto": "Parágrafos e textos curtos"
    },
    "extras": []
  },
  "1º ano EM": {
    "rotulo": "1º ano EM",
    "nome": "1º ano do ensino médio",
    "vestibular": 0,
    "meta_questoes_semana": 20,
    "meta_foco_min_semana": 240,
    "meta_provas_mes": 0,
    "descricao": "Consolidar a base e conhecer, sem pressão, o formato do ENEM e dos vestibulares. Resumos e questões fáceis e médias.",
    "foco": "Foco da série: base sólida em todas as áreas. As provas anteriores são opcionais, só para conhecer o formato.",
    "titulos": {
      "Matemática": "Exercícios e revisão do bimestre",
      "Produção de texto": "Primeiros textos dissertativos"
    },
    "extras": []
  },
  "2º ano EM": {
    "rotulo": "2º ano EM",
    "nome": "2º ano do ensino médio",
    "vestibular": 1,
    "meta_questoes_semana": 30,
    "meta_foco_min_semana": 300,
    "meta_provas_mes": 1,
    "descricao": "O foco começa a se voltar para o vestibular: questões de provas anteriores todo mês e redação com regularidade.",
    "foco": "Foco da série: começar a direcionar o estudo para o vestibular, com uma prova anterior por mês e redação regular.",
    "titulos": {
      "Matemática": "Exercícios e questões de provas anteriores",
      "Língua portuguesa": "Interpretação e questões de provas",
      "Produção de texto": "Redação dissertativo-argumentativa",
      "Literatura": "Leitura das obras e escolas literárias"
    },
    "extras": [
      {
        "dia_semana": 6,
        "inicio": "09:00",
        "fim": "10:30",
        "materia": null,
        "titulo": "Questões de uma prova anterior (uma área por semana)",
        "tipo": "Prova anterior"
      }
    ]
  },
  "3º ano EM": {
    "rotulo": "3º ano EM",
    "nome": "3º ano do ensino médio",
    "vestibular": 2,
    "meta_questoes_semana": 50,
    "meta_foco_min_semana": 480,
    "meta_provas_mes": 4,
    "descricao": "Foco em ENEM e vestibulares: provas anteriores com cartão-resposta toda semana, redação e caderno de erros.",
    "foco": "Foco da série: ENEM e vestibulares. Provas anteriores toda semana, redação e revisão dos erros.",
    "titulos": {
      "Matemática": "Questões de provas anteriores",
      "Língua portuguesa": "Interpretação e questões de provas anteriores",
      "Produção de texto": "Redação com proposta de intervenção",
      "Biologia": "Revisão e questões de provas anteriores",
      "Física": "Revisão e questões de provas anteriores",
      "Química": "Revisão e questões de provas anteriores",
      "História": "Revisão e questões de provas anteriores",
      "Geografia": "Revisão e questões de provas anteriores"
    },
    "extras": [
      {
        "dia_semana": 6,
        "inicio": "09:00",
        "fim": "12:00",
        "materia": null,
        "titulo": "Prova anterior com cartão-resposta e cronômetro",
        "tipo": "Prova anterior"
      },
      {
        "dia_semana": 6,
        "inicio": "14:00",
        "fim": "14:50",
        "materia": "Produção de texto",
        "titulo": "Redação completa com tema de prova anterior",
        "tipo": "Redação"
      },
      {
        "dia_semana": 7,
        "inicio": "10:00",
        "fim": "10:50",
        "materia": null,
        "titulo": "Revisar o caderno de erros",
        "tipo": "Revisão de erros"
      }
    ]
  }
}
