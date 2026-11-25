// ============================================================
// CONTEÚDO DE FÁBRICA — igual para todos os alunos.
// Gerado a partir de referencia/pauta-de-estudos-v1.html (a versão atual).
// Mesmos nomes de campo das tabelas do banco (PRD-BACKEND.md):
// na Etapa 7 isto vira o seed de materias, flashcards e questoes.
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

export const FLASHCARDS_APP = [
  {
    "id": "f-1",
    "user_id": null,
    "materia_id": "m-quimica",
    "frente": "O que é a regra do octeto?",
    "verso": "Átomos tendem a ganhar, perder ou compartilhar elétrons até ficar com 8 elétrons na camada de valência.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "f-2",
    "user_id": null,
    "materia_id": "m-quimica",
    "frente": "Qual a diferença entre ligação iônica e covalente?",
    "verso": "Iônica: transferência de elétrons (metal e ametal). Covalente: compartilhamento de pares de elétrons (ametais).",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "f-3",
    "user_id": null,
    "materia_id": "m-matematica",
    "frente": "Qual a fórmula de Bhaskara?",
    "verso": "x = (−b ± √Δ) / 2a, com Δ = b² − 4ac.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "f-4",
    "user_id": null,
    "materia_id": "m-matematica",
    "frente": "O que o sinal de Δ indica numa equação do 2º grau?",
    "verso": "Δ > 0: duas raízes reais diferentes. Δ = 0: uma raiz real. Δ < 0: nenhuma raiz real.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "f-5",
    "user_id": null,
    "materia_id": "m-fisica",
    "frente": "Qual a primeira lei de Ohm?",
    "verso": "U = R · i. A tensão é igual à resistência vezes a corrente.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "f-6",
    "user_id": null,
    "materia_id": "m-historia",
    "frente": "Onde e quando começou a Revolução Industrial?",
    "verso": "Na Inglaterra, na segunda metade do século XVIII.",
    "serie_minima": "9º ano EF"
  }
]

export const QUESTOES_APP = [
  {
    "id": "q-mat-01",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função do 2º grau",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Quais são as raízes da equação x² − 5x + 6 = 0?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1 e 6",
        "explicacao": "Soma 7 e produto 6. A soma precisa ser 5."
      },
      {
        "letra": "B",
        "texto": "2 e 3",
        "explicacao": "Correta. Soma 5 e produto 6."
      },
      {
        "letra": "C",
        "texto": "−2 e −3",
        "explicacao": "Soma −5. O sinal está trocado, pois a soma das raízes é −b/a = 5."
      },
      {
        "letra": "D",
        "texto": "5 e 6",
        "explicacao": "Produto 30. O produto precisa ser 6."
      },
      {
        "letra": "E",
        "texto": "−1 e −6",
        "explicacao": "Soma −7 e produto 6. A soma precisa ser 5."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Procure dois números com soma 5 (que é −b/a) e produto 6 (que é c/a): são 2 e 3. Conferindo por Bhaskara: Δ = 25 − 24 = 1 e x = (5 ± 1) / 2, ou seja, 3 e 2.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-mat-02",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função do 2º grau",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Qual é o vértice da parábola y = x² − 6x + 5?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "(−3, −4)",
        "explicacao": "O sinal de x está invertido: xv = −(−6) / 2 = 3."
      },
      {
        "letra": "B",
        "texto": "(6, 5)",
        "explicacao": "Usa −b e c como se fossem as coordenadas do vértice."
      },
      {
        "letra": "C",
        "texto": "(3, 4)",
        "explicacao": "xv está certo, mas f(3) = −4, não 4."
      },
      {
        "letra": "D",
        "texto": "(3, −4)",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "(−6, 5)",
        "explicacao": "Troca o sinal de b e usa c como ordenada."
      }
    ],
    "correta": "D",
    "resposta_comentada": "xv = −b / 2a = 6 / 2 = 3. yv = f(3) = 9 − 18 + 5 = −4. O vértice é (3, −4). Como a > 0, é o ponto de mínimo.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-mat-03",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Progressão aritmética",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Em uma PA, o primeiro termo é 3 e a razão é 4. Qual é a soma dos 10 primeiros termos?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "150",
        "explicacao": "Menor que o valor correto. Confira que a₁₀ = 39."
      },
      {
        "letra": "B",
        "texto": "180",
        "explicacao": "Não vem de (3 + 39) · 10 / 2."
      },
      {
        "letra": "C",
        "texto": "210",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "240",
        "explicacao": "Maior que o valor correto. Provavelmente há erro em a₁₀ ou em n."
      },
      {
        "letra": "E",
        "texto": "420",
        "explicacao": "420 é (3 + 39) · 10, sem dividir por 2."
      }
    ],
    "correta": "C",
    "resposta_comentada": "a₁₀ = 3 + 9 · 4 = 39. S₁₀ = (a₁ + a₁₀) · n / 2 = (3 + 39) · 10 / 2 = 210.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-mat-04",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Um produto de R$ 200,00 sofre aumento de 20% e, em seguida, desconto de 20%. Qual é o preço final?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "R$ 200,00",
        "explicacao": "Supõe que +20% e −20% se anulam, mas a base mudou."
      },
      {
        "letra": "B",
        "texto": "R$ 192,00",
        "explicacao": "Correta."
      },
      {
        "letra": "C",
        "texto": "R$ 196,00",
        "explicacao": "Não vem de nenhum caminho correto. Refaça 240 · 0,8."
      },
      {
        "letra": "D",
        "texto": "R$ 180,00",
        "explicacao": "Desconta R$ 60 de R$ 240, que seria 25%. O desconto é 20%."
      },
      {
        "letra": "E",
        "texto": "R$ 240,00",
        "explicacao": "É o preço depois do aumento. Falta aplicar o desconto."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Após o aumento: 200 · 1,2 = 240. Após o desconto: 240 · 0,8 = 192. Os percentuais incidem sobre bases diferentes, por isso não se anulam.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-mat-05",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Probabilidade",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Ao lançar um dado comum de 6 faces, qual é a probabilidade de sair um número maior que 4?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1/2",
        "explicacao": "Inclui o 4, o que seria “maior ou igual a 4”."
      },
      {
        "letra": "B",
        "texto": "1/6",
        "explicacao": "Considera só um resultado favorável."
      },
      {
        "letra": "C",
        "texto": "2/3",
        "explicacao": "É a probabilidade de sair 4 ou menos."
      },
      {
        "letra": "D",
        "texto": "1/3",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "5/6",
        "explicacao": "Seria a probabilidade de NÃO sair o 6."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Os resultados favoráveis são 5 e 6, ou seja, 2 em 6 possíveis. P = 2/6 = 1/3.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-por-01",
    "user_id": null,
    "materia_id": "m-lingua-portuguesa",
    "assunto": "Classes de palavras",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Em “Ela chegou muito cedo”, as palavras “muito” e “cedo” classificam-se, respectivamente, como:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "adjetivo e substantivo",
        "explicacao": "Adjetivo e substantivo variam em gênero e número. Aqui nenhuma das palavras varia."
      },
      {
        "letra": "B",
        "texto": "pronome indefinido e advérbio de tempo",
        "explicacao": "“Muito” não acompanha substantivo, então não é pronome indefinido."
      },
      {
        "letra": "C",
        "texto": "numeral e advérbio de lugar",
        "explicacao": "“Muito” não é numeral, e “cedo” não indica lugar."
      },
      {
        "letra": "D",
        "texto": "advérbio de modo e adjetivo",
        "explicacao": "“Cedo” não é adjetivo, pois não caracteriza um substantivo."
      },
      {
        "letra": "E",
        "texto": "advérbio de intensidade e advérbio de tempo",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "“Cedo” indica o momento da chegada: advérbio de tempo. “Muito” intensifica “cedo” e não varia: advérbio de intensidade. Só seria pronome ou adjetivo se acompanhasse um substantivo (muitos alunos).",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-por-02",
    "user_id": null,
    "materia_id": "m-lingua-portuguesa",
    "assunto": "Concordância verbal",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Assinale a frase em que a concordância verbal está de acordo com a norma-padrão.",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Fazem dois anos que moro aqui.",
        "explicacao": "Fazer indicando tempo é impessoal. Não vai para o plural."
      },
      {
        "letra": "B",
        "texto": "Houveram muitos problemas na reunião.",
        "explicacao": "Haver no sentido de existir é impessoal: Houve muitos problemas."
      },
      {
        "letra": "C",
        "texto": "Haviam muitos alunos na sala.",
        "explicacao": "Haver impessoal: Havia muitos alunos."
      },
      {
        "letra": "D",
        "texto": "Faz dois anos que moro aqui.",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "Devem haver soluções para esse problema.",
        "explicacao": "O auxiliar acompanha o haver impessoal: Deve haver soluções."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O verbo fazer, indicando tempo decorrido, é impessoal e fica na 3ª pessoa do singular. Haver, no sentido de existir, também é impessoal: houve, havia, deve haver.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-lit-01",
    "user_id": null,
    "materia_id": "m-literatura",
    "assunto": "Escolas literárias",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "A publicação de Memórias Póstumas de Brás Cubas, de Machado de Assis, em 1881, é considerada o marco inicial de qual escola literária no Brasil?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Romantismo",
        "explicacao": "O Romantismo é anterior e idealiza personagens e amores."
      },
      {
        "letra": "B",
        "texto": "Naturalismo",
        "explicacao": "O Naturalismo é contemporâneo, mas o marco da obra de Machado é o Realismo."
      },
      {
        "letra": "C",
        "texto": "Parnasianismo",
        "explicacao": "O Parnasianismo é uma escola da poesia, com foco na forma."
      },
      {
        "letra": "D",
        "texto": "Realismo",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "Modernismo",
        "explicacao": "O Modernismo só vem no século XX, com a Semana de 1922."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A obra inaugura o Realismo brasileiro, com análise psicológica, ironia e crítica social. O Naturalismo é outra escola da mesma época, mais ligada ao determinismo do meio e da biologia.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-fis-01",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Leis de Newton",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Um corpo de massa 4 kg sofre a ação de uma força resultante de 20 N. Qual é a aceleração que ele adquire?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "80 m/s²",
        "explicacao": "Multiplicou força por massa."
      },
      {
        "letra": "B",
        "texto": "24 m/s²",
        "explicacao": "Somou força e massa."
      },
      {
        "letra": "C",
        "texto": "5 m/s²",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "16 m/s²",
        "explicacao": "Subtraiu a massa da força."
      },
      {
        "letra": "E",
        "texto": "0,2 m/s²",
        "explicacao": "Dividiu a massa pela força, ao contrário."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Pela 2ª lei de Newton, F = m · a. Logo a = F / m = 20 / 4 = 5 m/s².",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-fis-02",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Eletricidade",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Um resistor de 10 Ω é percorrido por uma corrente de 2 A. Quais são a tensão entre seus terminais e a potência dissipada?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "20 V e 20 W",
        "explicacao": "A tensão está certa, mas a potência é U · i = 40 W."
      },
      {
        "letra": "B",
        "texto": "5 V e 10 W",
        "explicacao": "Dividiu a resistência pela corrente."
      },
      {
        "letra": "C",
        "texto": "12 V e 24 W",
        "explicacao": "Somou resistência e corrente."
      },
      {
        "letra": "D",
        "texto": "40 V e 80 W",
        "explicacao": "Usou U = R · i², mas a 1ª lei de Ohm é U = R · i."
      },
      {
        "letra": "E",
        "texto": "20 V e 40 W",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "U = R · i = 10 · 2 = 20 V. P = U · i = 20 · 2 = 40 W. Também dá para usar P = R · i² = 10 · 4 = 40 W.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-fis-03",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Cinemática",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Um carro parte do repouso com aceleração constante de 2 m/s². Após 5 s, qual é a sua velocidade e qual a distância percorrida nesse intervalo?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "10 m/s e 50 m",
        "explicacao": "A velocidade está certa, mas 50 m é a · t² sem dividir por 2."
      },
      {
        "letra": "B",
        "texto": "5 m/s e 25 m",
        "explicacao": "A velocidade correta é a · t = 10 m/s."
      },
      {
        "letra": "C",
        "texto": "10 m/s e 25 m",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "25 m/s e 10 m",
        "explicacao": "Trocou as duas grandezas."
      },
      {
        "letra": "E",
        "texto": "10 m/s e 10 m",
        "explicacao": "A velocidade está certa, mas a distância não é 10 m."
      }
    ],
    "correta": "C",
    "resposta_comentada": "v = a · t = 2 · 5 = 10 m/s. Δs = a · t² / 2 = 2 · 25 / 2 = 25 m.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-qui-01",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Ligações químicas",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "O cloreto de sódio (NaCl), o sal de cozinha, é formado por qual tipo de ligação química?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Covalente apolar",
        "explicacao": "Haveria compartilhamento de elétrons entre ametais iguais, o que não ocorre."
      },
      {
        "letra": "B",
        "texto": "Metálica",
        "explicacao": "Ocorre entre átomos de metais, e aqui só o sódio é metal."
      },
      {
        "letra": "C",
        "texto": "Iônica",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "Covalente polar",
        "explicacao": "É compartilhamento entre ametais diferentes. No NaCl há transferência de elétrons."
      },
      {
        "letra": "E",
        "texto": "Ligação de hidrogênio",
        "explicacao": "É uma interação entre moléculas, não a ligação que forma o NaCl."
      }
    ],
    "correta": "C",
    "resposta_comentada": "O sódio (metal) transfere um elétron ao cloro (ametal). Surgem os íons Na⁺ e Cl⁻, que se atraem: é uma ligação iônica.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-qui-02",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Mol e massa molar",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Quantos mols de moléculas há em 36 g de água (H₂O)? Dados: H = 1 g/mol e O = 16 g/mol.",
    "alternativas": [
      {
        "letra": "A",
        "texto": "4 mol",
        "explicacao": "Dividiu por 9, que não é a massa molar da água."
      },
      {
        "letra": "B",
        "texto": "0,5 mol",
        "explicacao": "Inverteu a divisão: 18 / 36."
      },
      {
        "letra": "C",
        "texto": "1 mol",
        "explicacao": "1 mol de água tem 18 g, e não 36 g."
      },
      {
        "letra": "D",
        "texto": "36 mol",
        "explicacao": "Tratou a massa em gramas como se fosse a quantidade em mols."
      },
      {
        "letra": "E",
        "texto": "2 mol",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "M(H₂O) = 2 · 1 + 16 = 18 g/mol. n = m / M = 36 / 18 = 2 mol.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-qui-03",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "pH e acidez",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Uma solução aquosa a 25 °C tem concentração de íons H⁺ igual a 10⁻³ mol/L. Qual é o seu pH e o seu caráter?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "pH 11, ácido",
        "explicacao": "pH 11 seria o pOH, e uma solução com pH 11 seria básica."
      },
      {
        "letra": "B",
        "texto": "pH 3, básico",
        "explicacao": "O pH está certo, mas abaixo de 7 a solução é ácida."
      },
      {
        "letra": "C",
        "texto": "pH 7, neutro",
        "explicacao": "pH 7 exigiria [H⁺] = 10⁻⁷ mol/L."
      },
      {
        "letra": "D",
        "texto": "pH 3, ácido",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "pH −3, ácido",
        "explicacao": "Esqueceu o sinal negativo da definição pH = −log[H⁺]."
      }
    ],
    "correta": "D",
    "resposta_comentada": "pH = −log[H⁺] = −log 10⁻³ = 3. A 25 °C, pH menor que 7 indica solução ácida.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-bio-01",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Citologia",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Qual organela é a principal responsável pela produção de ATP na respiração celular?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Ribossomo",
        "explicacao": "O ribossomo produz proteínas."
      },
      {
        "letra": "B",
        "texto": "Lisossomo",
        "explicacao": "O lisossomo faz digestão intracelular."
      },
      {
        "letra": "C",
        "texto": "Complexo golgiense",
        "explicacao": "O complexo golgiense modifica e empacota substâncias."
      },
      {
        "letra": "D",
        "texto": "Cloroplasto",
        "explicacao": "O cloroplasto faz fotossíntese e existe em plantas e algas."
      },
      {
        "letra": "E",
        "texto": "Mitocôndria",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "A mitocôndria realiza as etapas finais da respiração celular aeróbia e produz a maior parte do ATP. O cloroplasto atua na fotossíntese.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-bio-02",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Genética",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Do cruzamento entre dois indivíduos heterozigotos (Aa × Aa), qual é a probabilidade de nascer um descendente com genótipo aa?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1/2",
        "explicacao": "1/2 é a probabilidade de Aa."
      },
      {
        "letra": "B",
        "texto": "3/4",
        "explicacao": "3/4 é a probabilidade do fenótipo dominante."
      },
      {
        "letra": "C",
        "texto": "1/4",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "0",
        "explicacao": "Seria impossível apenas se um dos pais não tivesse o alelo a."
      },
      {
        "letra": "E",
        "texto": "1",
        "explicacao": "Só ocorreria se os dois pais fossem aa."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Aa × Aa gera 1/4 AA, 2/4 Aa e 1/4 aa. A probabilidade de aa é 1/4.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-bio-03",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Ecologia",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Em uma cadeia alimentar, os produtores são os organismos que:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "alimentam-se de outros animais",
        "explicacao": "Isso descreve os consumidores carnívoros."
      },
      {
        "letra": "B",
        "texto": "decompõem a matéria orgânica de seres mortos",
        "explicacao": "Isso descreve os decompositores."
      },
      {
        "letra": "C",
        "texto": "produzem o próprio alimento, em geral por fotossíntese",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "dependem exclusivamente dos herbívoros",
        "explicacao": "Os produtores não dependem de outros seres para obter alimento."
      },
      {
        "letra": "E",
        "texto": "alimentam-se somente de plantas",
        "explicacao": "Isso descreve os herbívoros."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Produtores são autótrofos: transformam substâncias inorgânicas em matéria orgânica, em geral pela fotossíntese. Plantas, algas e algumas bactérias são exemplos.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-his-01",
    "user_id": null,
    "materia_id": "m-historia",
    "assunto": "Revolução Industrial",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "A Revolução Industrial teve início em qual país e em qual século?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Estados Unidos, século XIX",
        "explicacao": "Os Estados Unidos se industrializaram com mais força no século XIX."
      },
      {
        "letra": "B",
        "texto": "França, século XVII",
        "explicacao": "A França não foi o ponto de partida do processo."
      },
      {
        "letra": "C",
        "texto": "Alemanha, século XIX",
        "explicacao": "A Alemanha industrializou-se mais tarde, no século XIX."
      },
      {
        "letra": "D",
        "texto": "Inglaterra, século XVIII",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "Inglaterra, século XVI",
        "explicacao": "O século XVI é anterior ao processo, que começou no XVIII."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A Revolução Industrial começou na Inglaterra, na segunda metade do século XVIII, com a mecanização da produção têxtil e o uso da máquina a vapor.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-his-02",
    "user_id": null,
    "materia_id": "m-historia",
    "assunto": "Brasil Império",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1822",
        "explicacao": "1822 é o ano da Independência."
      },
      {
        "letra": "B",
        "texto": "1850",
        "explicacao": "1850 é o ano da Lei Eusébio de Queirós, que proibiu o tráfico de africanos escravizados."
      },
      {
        "letra": "C",
        "texto": "1871",
        "explicacao": "1871 é o ano da Lei do Ventre Livre."
      },
      {
        "letra": "D",
        "texto": "1888",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "1889",
        "explicacao": "1889 é o ano da Proclamação da República."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A Lei Áurea é de 13 de maio de 1888. Antes dela vieram a Lei Eusébio de Queirós (1850), que acabou com o tráfico, e a Lei do Ventre Livre (1871).",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-geo-01",
    "user_id": null,
    "materia_id": "m-geografia",
    "assunto": "Biomas brasileiros",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Qual bioma brasileiro é marcado por clima semiárido e vegetação adaptada à seca?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Pampa",
        "explicacao": "O Pampa tem campos e clima mais frio no sul."
      },
      {
        "letra": "B",
        "texto": "Caatinga",
        "explicacao": "Correta."
      },
      {
        "letra": "C",
        "texto": "Pantanal",
        "explicacao": "O Pantanal é uma planície alagável."
      },
      {
        "letra": "D",
        "texto": "Amazônia",
        "explicacao": "A Amazônia tem clima equatorial quente e úmido."
      },
      {
        "letra": "E",
        "texto": "Mata Atlântica",
        "explicacao": "A Mata Atlântica é mais úmida e ocupa o litoral."
      }
    ],
    "correta": "B",
    "resposta_comentada": "A Caatinga predomina no sertão nordestino, com chuvas escassas e irregulares e plantas adaptadas à seca, como cactos e arbustos de galhos retorcidos.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-geo-02",
    "user_id": null,
    "materia_id": "m-geografia",
    "assunto": "População e urbanização",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "O deslocamento de população do campo para a cidade, intensificado no Brasil a partir da segunda metade do século XX, é chamado de:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "migração pendular",
        "explicacao": "Migração pendular é o deslocamento diário entre casa e trabalho ou escola."
      },
      {
        "letra": "B",
        "texto": "imigração",
        "explicacao": "Imigração é a entrada de pessoas em outro país."
      },
      {
        "letra": "C",
        "texto": "transumância",
        "explicacao": "Transumância é o deslocamento sazonal de rebanhos."
      },
      {
        "letra": "D",
        "texto": "emigração",
        "explicacao": "Emigração é a saída de pessoas do próprio país."
      },
      {
        "letra": "E",
        "texto": "êxodo rural",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Êxodo rural é a saída de pessoas do campo em direção às cidades. No Brasil ele acompanhou a industrialização e a mecanização do campo.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-fil-01",
    "user_id": null,
    "materia_id": "m-filosofia",
    "assunto": "Filosofia antiga",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "O método de Sócrates, que usa perguntas para levar o interlocutor a refletir e a “dar à luz” as próprias ideias, é conhecido como:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "dúvida metódica",
        "explicacao": "A dúvida metódica é o procedimento de Descartes."
      },
      {
        "letra": "B",
        "texto": "empirismo",
        "explicacao": "Empirismo defende que o conhecimento vem da experiência."
      },
      {
        "letra": "C",
        "texto": "dialética marxista",
        "explicacao": "Dialética marxista é uma teoria sobre as contradições da sociedade."
      },
      {
        "letra": "D",
        "texto": "maiêutica",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "cogito",
        "explicacao": "O cogito é o “penso, logo existo” de Descartes."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Maiêutica significa “arte de partejar”: por meio de perguntas, Sócrates conduzia o interlocutor a descobrir o conhecimento por conta própria.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-soc-01",
    "user_id": null,
    "materia_id": "m-sociologia",
    "assunto": "Clássicos da Sociologia",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Para o sociólogo Émile Durkheim, “fato social” é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "qualquer ação realizada por um indivíduo isolado",
        "explicacao": "Uma ação individual isolada não é fato social."
      },
      {
        "letra": "B",
        "texto": "uma opinião pessoal sem influência coletiva",
        "explicacao": "O fato social é coletivo e vai além da opinião pessoal."
      },
      {
        "letra": "C",
        "texto": "uma maneira de agir, pensar e sentir exterior ao indivíduo, que exerce sobre ele uma força de coerção",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "apenas aquilo que está previsto em lei",
        "explicacao": "Nem todo fato social está em lei. Costumes também são fatos sociais."
      },
      {
        "letra": "E",
        "texto": "um fenômeno natural, sem relação com a sociedade",
        "explicacao": "O fato social é próprio da vida em sociedade."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Para Durkheim, fatos sociais são exteriores aos indivíduos, são gerais na sociedade e exercem coerção sobre eles. Exemplos: costumes, regras morais e religiosas.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-ing-01",
    "user_id": null,
    "materia_id": "m-lingua-inglesa",
    "assunto": "Simple present",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Choose the correct option: “She ___ to school every day.”",
    "alternativas": [
      {
        "letra": "A",
        "texto": "go",
        "explicacao": "Com she, o verbo precisa da terminação -s."
      },
      {
        "letra": "B",
        "texto": "going",
        "explicacao": "“Going” exigiria o auxiliar: she is going."
      },
      {
        "letra": "C",
        "texto": "gone",
        "explicacao": "“Gone” é o particípio passado: she has gone."
      },
      {
        "letra": "D",
        "texto": "is go",
        "explicacao": "Mistura o auxiliar is com o verbo no infinitivo."
      },
      {
        "letra": "E",
        "texto": "goes",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Para hábitos usamos o simple present. Na 3ª pessoa do singular (she, he, it), o verbo ganha -s ou -es: she goes.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-ing-02",
    "user_id": null,
    "materia_id": "m-lingua-inglesa",
    "assunto": "Present perfect",
    "nivel": "Médio",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Complete the sentence: “They ___ studying English since 2022.”",
    "alternativas": [
      {
        "letra": "A",
        "texto": "are",
        "explicacao": "O present continuous não se combina com since."
      },
      {
        "letra": "B",
        "texto": "were",
        "explicacao": "O past continuous indica ação encerrada no passado."
      },
      {
        "letra": "C",
        "texto": "has been",
        "explicacao": "Has been é para he, she e it. Com they, usa-se have."
      },
      {
        "letra": "D",
        "texto": "did",
        "explicacao": "O passado simples não se combina com a forma -ing."
      },
      {
        "letra": "E",
        "texto": "have been",
        "explicacao": "Correta."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Since + ponto no passado, com ação que continua até agora, pede o present perfect continuous: have/has been + verbo com -ing. Com “they”, usa-se have.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q-art-01",
    "user_id": null,
    "materia_id": "m-artes",
    "assunto": "Movimentos artísticos",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Qual movimento artístico, associado a Pablo Picasso e Georges Braque, representa os objetos por vários ângulos ao mesmo tempo, com formas geométricas?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Barroco",
        "explicacao": "O Barroco destaca contrastes de luz e sombra e a dramaticidade."
      },
      {
        "letra": "B",
        "texto": "Surrealismo",
        "explicacao": "O Surrealismo explora o sonho e o inconsciente."
      },
      {
        "letra": "C",
        "texto": "Impressionismo",
        "explicacao": "O Impressionismo captura a impressão da luz e da cor."
      },
      {
        "letra": "D",
        "texto": "Cubismo",
        "explicacao": "Correta."
      },
      {
        "letra": "E",
        "texto": "Renascimento",
        "explicacao": "O Renascimento valoriza perspectiva, proporção e realismo."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O Cubismo decompõe os objetos em formas geométricas e os mostra de vários pontos de vista ao mesmo tempo.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q-pro-01",
    "user_id": null,
    "materia_id": "m-producao-de-texto",
    "assunto": "Estrutura da redação",
    "nivel": "Fácil",
    "instituicao": "Autoral",
    "ano": null,
    "enunciado": "Em uma redação dissertativo-argumentativa, onde normalmente se apresenta a proposta de intervenção?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "Na introdução, junto com a tese",
        "explicacao": "A introdução apresenta o tema e a tese."
      },
      {
        "letra": "B",
        "texto": "No título do texto",
        "explicacao": "O título não comporta uma proposta completa."
      },
      {
        "letra": "C",
        "texto": "Na conclusão",
        "explicacao": "Correta."
      },
      {
        "letra": "D",
        "texto": "Em uma nota de rodapé",
        "explicacao": "A redação não usa notas de rodapé."
      },
      {
        "letra": "E",
        "texto": "No primeiro parágrafo de desenvolvimento",
        "explicacao": "O desenvolvimento aprofunda os argumentos."
      }
    ],
    "correta": "C",
    "resposta_comentada": "A proposta de intervenção fecha o texto: retoma a tese e indica agente, ação, meio, finalidade e detalhamento. Em provas como a redação do Enem, ela faz parte de uma das competências avaliadas.",
    "serie_minima": "9º ano EF"
  }
]

// Semana sugerida (fica no código, não no banco — PRD-BACKEND, cronograma_blocos).
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
