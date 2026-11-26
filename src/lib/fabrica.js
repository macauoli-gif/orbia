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
  },
  // Questões mais difíceis, por série (25/11/2026): autorais, no estilo e no nível
  // de provas de instituições reconhecidas pelo MEC. Não copiam questões reais.
  {
    "id": "q2-9-01",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Porcentagem",
    "nivel": "Difícil",
    "instituicao": "Nível Colégio Pedro II",
    "ano": null,
    "enunciado": "Uma loja aumentou o preço de um produto em 20% e, um mês depois, deu um desconto de 20% sobre o novo preço. Em relação ao preço original, o preço final ficou:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "igual ao original",
        "explicacao": "O aumento e o desconto têm o mesmo percentual, mas incidem sobre bases diferentes: o desconto é calculado sobre um valor maior."
      },
      {
        "letra": "B",
        "texto": "4% menor",
        "explicacao": "Correta. 1,20 × 0,80 = 0,96: o preço final é 96% do original."
      },
      {
        "letra": "C",
        "texto": "4% maior",
        "explicacao": "O sinal está trocado: 0,96 é menor que 1."
      },
      {
        "letra": "D",
        "texto": "2% menor",
        "explicacao": "O efeito combinado é 1,20 × 0,80 = 0,96, ou seja, 4%, não 2%."
      },
      {
        "letra": "E",
        "texto": "20% menor",
        "explicacao": "Isso ignoraria o aumento que veio antes do desconto."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Chame o preço original de 100. Com o aumento de 20%, vira 120. O desconto de 20% sobre 120 é 24, e o preço fica 96: 4% abaixo do original. Atalho: multiplique os fatores, 1,20 × 0,80 = 0,96.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-9-02",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Teorema de Pitágoras",
    "nivel": "Difícil",
    "instituicao": "Nível IF (ingresso)",
    "ano": null,
    "enunciado": "Uma escada de 5 m está apoiada numa parede vertical, com o pé a 3 m da parede. Se o pé da escada for afastado mais 1 m da parede, com o topo ainda encostado nela, quanto o topo da escada desce?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "0,5 m",
        "explicacao": "Calcule a altura nas duas posições: 4 m e depois 3 m. A diferença é 1 m."
      },
      {
        "letra": "B",
        "texto": "0,8 m",
        "explicacao": "A descida não é proporcional ao afastamento; use Pitágoras nas duas posições."
      },
      {
        "letra": "C",
        "texto": "1 m",
        "explicacao": "Correta. Antes: 5² = 3² + h², h = 4 m. Depois: 5² = 4² + h², h = 3 m. Desceu 4 − 3 = 1 m."
      },
      {
        "letra": "D",
        "texto": "2 m",
        "explicacao": "Confira as alturas: 4 m e 3 m. A diferença é 1 m, não 2 m."
      },
      {
        "letra": "E",
        "texto": "3 m",
        "explicacao": "3 m é a nova altura do topo, não quanto ele desceu."
      }
    ],
    "correta": "C",
    "resposta_comentada": "A escada, a parede e o chão formam um triângulo retângulo com hipotenusa 5 m. Com o pé a 3 m, a altura é √(25 − 9) = 4 m. Com o pé a 4 m, a altura é √(25 − 16) = 3 m. O topo desceu 1 m.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-9-03",
    "user_id": null,
    "materia_id": "m-lingua-portuguesa",
    "assunto": "Interpretação e comparação",
    "nivel": "Médio",
    "instituicao": "Nível Colégio Pedro II",
    "ano": null,
    "enunciado": "Leia: \"Quando a cidade dorme, o padeiro já está acordado. Antes do primeiro ônibus, o pão quente espera na vitrine, como quem guarda um segredo que todos vão descobrir ao mesmo tempo.\" A comparação final sugere que o pão:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "é feito às escondidas, sem que ninguém saiba como.",
        "explicacao": "É uma leitura literal demais: o \"segredo\" é uma imagem, não uma receita escondida."
      },
      {
        "letra": "B",
        "texto": "será encontrado por muitas pessoas logo cedo, quase ao mesmo tempo.",
        "explicacao": "Correta. O \"segredo que todos vão descobrir ao mesmo tempo\" é o pão pronto que a cidade inteira encontra de manhã."
      },
      {
        "letra": "C",
        "texto": "é vendido apenas para poucos clientes escolhidos.",
        "explicacao": "O texto diz \"todos\", o contrário de poucos."
      },
      {
        "letra": "D",
        "texto": "estraga se não for comido rapidamente.",
        "explicacao": "O texto não fala em o pão estragar."
      },
      {
        "letra": "E",
        "texto": "custa mais caro de manhã do que à tarde.",
        "explicacao": "Não há nenhuma informação sobre preço."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Comparação é aproximar duas ideias com \"como\". Aqui, o pão quente na vitrine é comparado a um segredo prestes a ser revelado a todos: logo cedo, a cidade acorda e \"descobre\" o pão ao mesmo tempo.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-9-04",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Velocidade média",
    "nivel": "Médio",
    "instituicao": "Nível IF (ingresso)",
    "ano": null,
    "enunciado": "Um ciclista percorre 12 km em 30 minutos e, depois, mais 12 km em 1 hora. Qual foi a velocidade média no percurso todo?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "12 km/h",
        "explicacao": "Essa é a velocidade só do segundo trecho."
      },
      {
        "letra": "B",
        "texto": "24 km/h",
        "explicacao": "Essa é a velocidade só do primeiro trecho (12 km em meia hora)."
      },
      {
        "letra": "C",
        "texto": "18 km/h",
        "explicacao": "É a média das duas velocidades (24 e 12), que só valeria se os tempos fossem iguais."
      },
      {
        "letra": "D",
        "texto": "16 km/h",
        "explicacao": "Correta. Distância total 24 km dividida pelo tempo total 1,5 h dá 16 km/h."
      },
      {
        "letra": "E",
        "texto": "8 km/h",
        "explicacao": "Dividiu 12 km por 1,5 h; use a distância total, 24 km."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Velocidade média é sempre distância total dividida pelo tempo total: (12 + 12) km ÷ (0,5 + 1) h = 24 ÷ 1,5 = 16 km/h. Não se tira a média das velocidades quando os tempos são diferentes.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-9-05",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Separação de misturas",
    "nivel": "Médio",
    "instituicao": "Nível Colégio Pedro II",
    "ano": null,
    "enunciado": "Para separar uma mistura de água, sal de cozinha dissolvido e areia, recuperando a areia e o sal, a sequência mais adequada é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "filtração e, depois, evaporação da água",
        "explicacao": "Correta. O filtro retém a areia; o sal, dissolvido, passa com a água e fica no recipiente quando a água evapora."
      },
      {
        "letra": "B",
        "texto": "decantação e, depois, filtração",
        "explicacao": "A decantação separa a areia, mas a filtração não separa o sal, que está dissolvido."
      },
      {
        "letra": "C",
        "texto": "apenas destilação simples",
        "explicacao": "O sal e a areia ficariam juntos no fundo do balão."
      },
      {
        "letra": "D",
        "texto": "catação e peneiração",
        "explicacao": "Os grãos são pequenos demais para catar, e o sal dissolvido não fica na peneira."
      },
      {
        "letra": "E",
        "texto": "separação magnética",
        "explicacao": "Nem a areia nem o sal são atraídos por ímã."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Primeiro separe o sólido que não dissolve (areia) por filtração. Depois, para recuperar o sal dissolvido, evapore a água (ou destile, se quiser recuperar a água também).",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-9-06",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Hereditariedade",
    "nivel": "Difícil",
    "instituicao": "Nível IF (ingresso)",
    "ano": null,
    "enunciado": "Numa planta, a flor vermelha (V) é dominante sobre a branca (v). Cruzando duas plantas heterozigotas (Vv × Vv), qual a proporção esperada de descendentes com flor branca?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "3/4",
        "explicacao": "3/4 é a proporção de flores vermelhas (VV + Vv)."
      },
      {
        "letra": "B",
        "texto": "1/2",
        "explicacao": "1/2 é a chance de o descendente ser heterozigoto (Vv)."
      },
      {
        "letra": "C",
        "texto": "1/4",
        "explicacao": "Correta. Só o genótipo vv tem flor branca: 1 dos 4 quadros do cruzamento."
      },
      {
        "letra": "D",
        "texto": "0",
        "explicacao": "É possível nascer vv: cada planta-mãe pode passar o alelo v."
      },
      {
        "letra": "E",
        "texto": "1",
        "explicacao": "Nem todos os descendentes recebem dois alelos v."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Monte o quadro: Vv × Vv dá VV, Vv, Vv e vv. A cor branca só aparece com os dois alelos recessivos (vv): 1 em 4, ou 1/4.",
    "serie_minima": "9º ano EF"
  },
  {
    "id": "q2-1-01",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função afim",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Um táxi cobra R$ 5,00 de bandeirada mais R$ 2,50 por quilômetro. Outro cobra R$ 11,00 de bandeirada mais R$ 2,00 por quilômetro. Para uma corrida de quantos quilômetros os dois cobram exatamente o mesmo valor?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "6 km",
        "explicacao": "6 é a diferença das bandeiradas; falta dividir pela diferença do preço por quilômetro (0,50)."
      },
      {
        "letra": "B",
        "texto": "10 km",
        "explicacao": "Em 10 km o primeiro cobra R$ 30,00 e o segundo R$ 31,00: ainda não são iguais."
      },
      {
        "letra": "C",
        "texto": "12 km",
        "explicacao": "Correta. 5 + 2,5x = 11 + 2x dá 0,5x = 6, ou x = 12. Os dois cobram R$ 35,00."
      },
      {
        "letra": "D",
        "texto": "14 km",
        "explicacao": "Em 14 km o primeiro cobra R$ 40,00 e o segundo R$ 39,00."
      },
      {
        "letra": "E",
        "texto": "16 km",
        "explicacao": "Em 16 km o primeiro cobra R$ 45,00 e o segundo R$ 43,00."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Escreva o preço de cada um em função de x (km): P1 = 5 + 2,5x e P2 = 11 + 2x. Igualando, 0,5x = 6 e x = 12 km. Acima de 12 km, o segundo táxi fica mais barato.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-1-02",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Função exponencial",
    "nivel": "Difícil",
    "instituicao": "Nível UFRGS",
    "ano": null,
    "enunciado": "Uma cultura tem 500 bactérias e a população dobra a cada 3 horas. Depois de 12 horas, a população será de:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2.000",
        "explicacao": "Isso são 2 duplicações (6 horas)."
      },
      {
        "letra": "B",
        "texto": "4.000",
        "explicacao": "Isso são 3 duplicações (9 horas)."
      },
      {
        "letra": "C",
        "texto": "6.000",
        "explicacao": "Multiplicou 500 por 12, como se o crescimento fosse linear."
      },
      {
        "letra": "D",
        "texto": "8.000",
        "explicacao": "Correta. 12 h ÷ 3 h = 4 duplicações: 500 × 2⁴ = 500 × 16 = 8.000."
      },
      {
        "letra": "E",
        "texto": "16.000",
        "explicacao": "Isso são 5 duplicações (15 horas)."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Em 12 horas há 12 ÷ 3 = 4 duplicações. A população é P = 500 · 2⁴ = 8.000. Crescimento exponencial multiplica por um fator fixo a cada intervalo, em vez de somar.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-1-03",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Movimento uniformemente variado",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Um carro a 72 km/h freia com desaceleração constante de 5 m/s² até parar. Qual a distância percorrida durante a frenagem?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "4 m",
        "explicacao": "4 é o tempo da frenagem em segundos (20 ÷ 5), não a distância."
      },
      {
        "letra": "B",
        "texto": "40 m",
        "explicacao": "Correta. 72 km/h = 20 m/s. Por Torricelli: 0 = 20² − 2 · 5 · d, então d = 40 m."
      },
      {
        "letra": "C",
        "texto": "20 m",
        "explicacao": "20 é a velocidade inicial em m/s, não a distância."
      },
      {
        "letra": "D",
        "texto": "80 m",
        "explicacao": "Faltou o fator 2 da equação de Torricelli: 400 ÷ 5 = 80."
      },
      {
        "letra": "E",
        "texto": "518,4 m",
        "explicacao": "Usou 72 sem converter para m/s."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Converta: 72 km/h ÷ 3,6 = 20 m/s. Use v² = v₀² − 2·a·d com v = 0: 0 = 400 − 10d, d = 40 m.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-1-04",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Estequiometria",
    "nivel": "Difícil",
    "instituicao": "Nível UFRGS",
    "ano": null,
    "enunciado": "Na combustão completa do metano, CH₄ + 2 O₂ → CO₂ + 2 H₂O, quantos gramas de água se formam a partir de 32 g de metano? (Massas molares: CH₄ = 16 g/mol; H₂O = 18 g/mol)",
    "alternativas": [
      {
        "letra": "A",
        "texto": "18 g",
        "explicacao": "18 g é 1 mol de água; 32 g de metano formam 4 mol."
      },
      {
        "letra": "B",
        "texto": "36 g",
        "explicacao": "Considerou 1 mol de metano formando 2 mol de água; mas 32 g são 2 mol de metano."
      },
      {
        "letra": "C",
        "texto": "54 g",
        "explicacao": "54 g são 3 mol de água: a proporção está errada."
      },
      {
        "letra": "D",
        "texto": "64 g",
        "explicacao": "64 g é a massa de O₂ gasta por 1 mol de metano, não a água formada."
      },
      {
        "letra": "E",
        "texto": "72 g",
        "explicacao": "Correta. 32 g ÷ 16 g/mol = 2 mol de CH₄, que formam 4 mol de H₂O: 4 × 18 = 72 g."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Passe a massa para mol: 32 ÷ 16 = 2 mol de CH₄. A equação diz 1 CH₄ : 2 H₂O, então formam-se 4 mol de água. Em massa: 4 × 18 = 72 g.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-1-05",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Divisão celular",
    "nivel": "Médio",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Uma célula humana com 46 cromossomos passa por meiose. Ao final do processo:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "formam-se 4 células, cada uma com 23 cromossomos.",
        "explicacao": "Correta. A meiose tem duas divisões e reduz o número de cromossomos pela metade."
      },
      {
        "letra": "B",
        "texto": "formam-se 2 células, cada uma com 46 cromossomos.",
        "explicacao": "Isso descreve a mitose."
      },
      {
        "letra": "C",
        "texto": "formam-se 2 células, cada uma com 23 cromossomos.",
        "explicacao": "Isso é só o fim da primeira divisão (meiose I); ainda há a meiose II."
      },
      {
        "letra": "D",
        "texto": "formam-se 4 células, cada uma com 92 cromossomos.",
        "explicacao": "O DNA duplica antes da divisão, mas as células formadas têm menos cromossomos, não mais."
      },
      {
        "letra": "E",
        "texto": "formam-se 4 células, cada uma com 46 cromossomos.",
        "explicacao": "A meiose reduz o número de cromossomos pela metade."
      }
    ],
    "correta": "A",
    "resposta_comentada": "A meiose forma gametas: duas divisões seguidas geram 4 células haploides (n = 23). Na fecundação, os dois gametas se juntam e o número volta a 46.",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-1-06",
    "user_id": null,
    "materia_id": "m-geografia",
    "assunto": "Climatologia",
    "nivel": "Médio",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Em cidades litorâneas, durante o dia, a brisa costuma soprar do mar para a terra. Isso acontece porque:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "a água se aquece mais rápido que a terra.",
        "explicacao": "É o contrário: a água tem calor específico alto e esquenta mais devagar."
      },
      {
        "letra": "B",
        "texto": "as correntes marítimas empurram o ar para o continente.",
        "explicacao": "Correntes marítimas não explicam a brisa diária."
      },
      {
        "letra": "C",
        "texto": "a rotação da Terra desvia o vento para a costa.",
        "explicacao": "A rotação influencia ventos de grande escala, não a brisa local do dia."
      },
      {
        "letra": "D",
        "texto": "a terra se aquece mais rápido, o ar sobre ela sobe e forma baixa pressão, atraindo o ar mais frio do mar.",
        "explicacao": "Correta. O ar vai da alta pressão (mar, mais frio) para a baixa pressão (terra, mais quente)."
      },
      {
        "letra": "E",
        "texto": "o mar esfria mais rápido que a terra.",
        "explicacao": "À noite é a terra que esfria mais rápido, e a brisa inverte (terra → mar)."
      }
    ],
    "correta": "D",
    "resposta_comentada": "A terra esquenta e esfria mais rápido que a água. De dia, o ar sobre a terra fica mais quente, sobe e cria baixa pressão; o ar do mar ocupa esse espaço (brisa marítima). À noite, ocorre o inverso (brisa terrestre).",
    "serie_minima": "1º ano EM"
  },
  {
    "id": "q2-2-01",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Análise combinatória",
    "nivel": "Difícil",
    "instituicao": "Nível UERJ",
    "ano": null,
    "enunciado": "Quantos anagramas da palavra PROVA começam com vogal?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "24",
        "explicacao": "24 = 4! conta só os que começam com uma das vogais."
      },
      {
        "letra": "B",
        "texto": "48",
        "explicacao": "Correta. 2 vogais para a primeira posição e 4! = 24 jeitos para as outras letras: 2 × 24 = 48."
      },
      {
        "letra": "C",
        "texto": "60",
        "explicacao": "60 = 5! ÷ 2 não tem relação com a restrição dada."
      },
      {
        "letra": "D",
        "texto": "96",
        "explicacao": "Contou as vogais duas vezes."
      },
      {
        "letra": "E",
        "texto": "120",
        "explicacao": "120 = 5! é o total de anagramas, sem a restrição."
      }
    ],
    "correta": "B",
    "resposta_comentada": "PROVA tem 5 letras diferentes, duas vogais (O, A). Escolha a primeira letra entre 2 vogais e permute as 4 restantes: 2 × 4! = 2 × 24 = 48.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-02",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Trigonometria no triângulo retângulo",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Uma rampa de 8 m de comprimento forma um ângulo de 30° com o chão. A que altura do chão está o topo da rampa?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "2 m",
        "explicacao": "Seria 8 × 0,25; o seno de 30° é 0,5."
      },
      {
        "letra": "B",
        "texto": "4√3 m",
        "explicacao": "Usou o cosseno: isso é a distância no chão, não a altura."
      },
      {
        "letra": "C",
        "texto": "16 m",
        "explicacao": "Dividiu 8 por sen 30° em vez de multiplicar."
      },
      {
        "letra": "D",
        "texto": "8√3/3 m",
        "explicacao": "Usou a tangente; a rampa é a hipotenusa, então vale o seno."
      },
      {
        "letra": "E",
        "texto": "4 m",
        "explicacao": "Correta. Altura = 8 × sen 30° = 8 × 0,5 = 4 m."
      }
    ],
    "correta": "E",
    "resposta_comentada": "A rampa é a hipotenusa (8 m) e a altura é o cateto oposto ao ângulo de 30°. Seno = oposto ÷ hipotenusa, então altura = 8 · sen 30° = 8 · 1/2 = 4 m.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-03",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Progressão geométrica",
    "nivel": "Difícil",
    "instituicao": "Nível UnB",
    "ano": null,
    "enunciado": "Numa progressão geométrica, o 2º termo é 6 e o 5º termo é 162. Qual é o 1º termo?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "3",
        "explicacao": "3 é a razão da PG, não o primeiro termo."
      },
      {
        "letra": "B",
        "texto": "1",
        "explicacao": "Com a₁ = 1 e q = 3, o 2º termo seria 3, não 6."
      },
      {
        "letra": "C",
        "texto": "18",
        "explicacao": "18 é o 3º termo."
      },
      {
        "letra": "D",
        "texto": "2",
        "explicacao": "Correta. a₅ ÷ a₂ = q³ = 162 ÷ 6 = 27, então q = 3 e a₁ = 6 ÷ 3 = 2."
      },
      {
        "letra": "E",
        "texto": "54",
        "explicacao": "54 é o 4º termo."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Do 2º ao 5º termo há 3 multiplicações pela razão: q³ = 162 ÷ 6 = 27, q = 3. Voltando um termo a partir do 2º: a₁ = 6 ÷ 3 = 2. A PG é 2, 6, 18, 54, 162.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-04",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Calorimetria",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Misturam-se 200 g de água a 80 °C com 300 g de água a 20 °C, num recipiente isolado. Desprezando perdas, a temperatura de equilíbrio é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "44 °C",
        "explicacao": "Correta. (200 × 80 + 300 × 20) ÷ 500 = 22.000 ÷ 500 = 44 °C."
      },
      {
        "letra": "B",
        "texto": "50 °C",
        "explicacao": "50 °C é a média simples, que valeria só com massas iguais."
      },
      {
        "letra": "C",
        "texto": "56 °C",
        "explicacao": "Trocou as massas: deu mais peso à água quente, que é a menor quantidade."
      },
      {
        "letra": "D",
        "texto": "36 °C",
        "explicacao": "Confira a conta: o calor cedido pela água quente é igual ao recebido pela fria."
      },
      {
        "letra": "E",
        "texto": "100 °C",
        "explicacao": "A temperatura final fica entre 20 °C e 80 °C."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Calor cedido = calor recebido: 200 · c · (80 − T) = 300 · c · (T − 20). Daí 16.000 − 200T = 300T − 6.000, 500T = 22.000, T = 44 °C. Fica mais perto de 20 °C porque há mais água fria.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-05",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Espelhos esféricos",
    "nivel": "Difícil",
    "instituicao": "Nível Unicamp",
    "ano": null,
    "enunciado": "Um objeto está a 30 cm de um espelho côncavo de distância focal 10 cm. A imagem se forma:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "a 7,5 cm, real e invertida.",
        "explicacao": "Somou 1/10 + 1/30; o correto é 1/p' = 1/10 − 1/30."
      },
      {
        "letra": "B",
        "texto": "a 15 cm, virtual e direita.",
        "explicacao": "A distância está certa, mas com p' positivo a imagem é real e invertida."
      },
      {
        "letra": "C",
        "texto": "a 15 cm, real, invertida e menor que o objeto.",
        "explicacao": "Correta. 1/p' = 1/10 − 1/30 = 2/30, p' = 15 cm. Aumento = −15/30 = −0,5: invertida e com metade do tamanho."
      },
      {
        "letra": "D",
        "texto": "a 30 cm, real, invertida e do mesmo tamanho.",
        "explicacao": "Isso aconteceria com o objeto no centro de curvatura (20 cm)."
      },
      {
        "letra": "E",
        "texto": "a 20 cm, real, invertida e maior.",
        "explicacao": "Imagem maior só ocorre com o objeto entre o foco e o centro de curvatura."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Equação de Gauss: 1/f = 1/p + 1/p'. 1/10 = 1/30 + 1/p', 1/p' = 2/30, p' = 15 cm. Aumento A = −p'/p = −0,5: imagem real, invertida e menor. Faz sentido: o objeto está além do centro de curvatura (20 cm).",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-06",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Diluição de soluções",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Um técnico tem 200 mL de solução de NaOH a 2 mol/L e quer obter uma solução a 0,5 mol/L. Quanto de água ele deve acrescentar?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "200 mL",
        "explicacao": "Com 200 mL de água o volume final seria 400 mL e a concentração 1 mol/L."
      },
      {
        "letra": "B",
        "texto": "400 mL",
        "explicacao": "O volume final seria 600 mL e a concentração cerca de 0,67 mol/L."
      },
      {
        "letra": "C",
        "texto": "600 mL",
        "explicacao": "Correta. C₁V₁ = C₂V₂: 2 × 200 = 0,5 × V₂, V₂ = 800 mL. Acrescentam-se 800 − 200 = 600 mL."
      },
      {
        "letra": "D",
        "texto": "800 mL",
        "explicacao": "800 mL é o volume final, não a água a acrescentar."
      },
      {
        "letra": "E",
        "texto": "1.000 mL",
        "explicacao": "O volume final seria 1.200 mL e a concentração cerca de 0,33 mol/L."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Na diluição, a quantidade de soluto não muda: C₁V₁ = C₂V₂. 2 · 200 = 0,5 · V₂, V₂ = 800 mL. Como já havia 200 mL, é preciso acrescentar 600 mL de água.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-07",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Termoquímica",
    "nivel": "Difícil",
    "instituicao": "Nível UERJ",
    "ano": null,
    "enunciado": "Considere: C(grafite) + O₂(g) → CO₂(g), ΔH = −394 kJ/mol. A energia liberada na queima completa de 36 g de grafite (C = 12 g/mol) é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "131 kJ",
        "explicacao": "Dividiu 394 por 3; o certo é multiplicar."
      },
      {
        "letra": "B",
        "texto": "394 kJ",
        "explicacao": "Isso é a energia de 1 mol (12 g), não de 36 g."
      },
      {
        "letra": "C",
        "texto": "788 kJ",
        "explicacao": "Isso corresponde a 2 mol (24 g)."
      },
      {
        "letra": "D",
        "texto": "1.182 kJ",
        "explicacao": "Correta. 36 g ÷ 12 g/mol = 3 mol; 3 × 394 = 1.182 kJ."
      },
      {
        "letra": "E",
        "texto": "14.184 kJ",
        "explicacao": "Multiplicou a massa em gramas (36) por 394, sem passar para mol."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O ΔH vale por mol. 36 g de carbono são 36 ÷ 12 = 3 mol, então a energia liberada é 3 × 394 = 1.182 kJ (o sinal negativo indica que a reação libera calor).",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-08",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Segunda lei de Mendel",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "No cruzamento AaBb × AaBb, com os dois genes em cromossomos diferentes, qual a proporção esperada de descendentes com genótipo aabb?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "1/4",
        "explicacao": "1/4 é a chance de ser só aa (ou só bb), não os dois juntos."
      },
      {
        "letra": "B",
        "texto": "1/16",
        "explicacao": "Correta. P(aa) × P(bb) = 1/4 × 1/4 = 1/16."
      },
      {
        "letra": "C",
        "texto": "1/8",
        "explicacao": "Não há combinação que dê 1/8 aqui: multiplique 1/4 por 1/4."
      },
      {
        "letra": "D",
        "texto": "3/16",
        "explicacao": "3/16 é a proporção de um dos fenótipos \"um dominante e um recessivo\"."
      },
      {
        "letra": "E",
        "texto": "9/16",
        "explicacao": "9/16 é a proporção do fenótipo com as duas características dominantes."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Genes em cromossomos diferentes se separam de forma independente. Calcule cada um: Aa × Aa dá aa com 1/4; Bb × Bb dá bb com 1/4. Juntos: 1/4 × 1/4 = 1/16.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-09",
    "user_id": null,
    "materia_id": "m-historia",
    "assunto": "Independência do Brasil",
    "nivel": "Difícil",
    "instituicao": "Nível Fuvest",
    "ano": null,
    "enunciado": "Sobre o processo de independência do Brasil (1822), é correto afirmar que:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "resultou de uma revolução popular que aboliu a escravidão.",
        "explicacao": "A escravidão só foi abolida em 1888."
      },
      {
        "letra": "B",
        "texto": "instaurou imediatamente a república.",
        "explicacao": "O Brasil virou império; a república veio em 1889."
      },
      {
        "letra": "C",
        "texto": "foi reconhecida por Portugal sem nenhuma compensação.",
        "explicacao": "Em 1825, o Brasil aceitou pagar uma indenização a Portugal, com mediação inglesa."
      },
      {
        "letra": "D",
        "texto": "ocorreu sem nenhum conflito armado.",
        "explicacao": "Houve guerras de independência, como na Bahia, no Maranhão, no Pará e na Cisplatina."
      },
      {
        "letra": "E",
        "texto": "foi conduzida por setores da elite e manteve a monarquia, a escravidão e a unidade territorial.",
        "explicacao": "Correta. A independência mudou o vínculo com Portugal, mas preservou a estrutura social e econômica."
      }
    ],
    "correta": "E",
    "resposta_comentada": "A independência foi liderada por D. Pedro e pelas elites agrárias, interessadas em manter seus privilégios. O resultado foi um império unificado, monárquico e escravista. Houve conflitos em várias províncias e o reconhecimento português custou uma indenização.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-10",
    "user_id": null,
    "materia_id": "m-literatura",
    "assunto": "Realismo",
    "nivel": "Médio",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Em \"Memórias Póstumas de Brás Cubas\" (1881), de Machado de Assis, o narrador conta sua vida depois de morto. Esse recurso contribui principalmente para:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "idealizar o amor romântico e os heróis nacionais.",
        "explicacao": "Idealização é marca do Romantismo, que Machado critica."
      },
      {
        "letra": "B",
        "texto": "exaltar a natureza brasileira.",
        "explicacao": "A exaltação da natureza é típica do Romantismo, não deste romance."
      },
      {
        "letra": "C",
        "texto": "aplicar o determinismo científico, como no Naturalismo.",
        "explicacao": "O determinismo marca o Naturalismo (por exemplo, Aluísio Azevedo)."
      },
      {
        "letra": "D",
        "texto": "dar ao narrador liberdade para ironizar a sociedade e a si mesmo, sem se preocupar com as aparências.",
        "explicacao": "Correta. Morto, Brás Cubas já não tem nada a perder e expõe com ironia as vaidades da elite."
      },
      {
        "letra": "E",
        "texto": "narrar de modo totalmente objetivo e imparcial.",
        "explicacao": "O narrador é parcial, irônico e cheio de digressões."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O \"defunto autor\" fala sem medo do julgamento alheio. Isso permite a ironia e a crítica à hipocrisia da elite do século XIX, marcas do Realismo machadiano.",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-2-11",
    "user_id": null,
    "materia_id": "m-sociologia",
    "assunto": "Fato social (Durkheim)",
    "nivel": "Médio",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Para Émile Durkheim, o fato social tem três características. Qual alternativa as apresenta corretamente?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "individual, voluntário e passageiro",
        "explicacao": "É o oposto: o fato social é coletivo e se impõe ao indivíduo."
      },
      {
        "letra": "B",
        "texto": "econômico, político e religioso",
        "explicacao": "Essas são áreas da vida social, não as características do fato social."
      },
      {
        "letra": "C",
        "texto": "coercitivo, exterior ao indivíduo e geral",
        "explicacao": "Correta. Coercitividade, exterioridade e generalidade são as três características."
      },
      {
        "letra": "D",
        "texto": "subjetivo, interior e particular",
        "explicacao": "É o oposto da definição de Durkheim."
      },
      {
        "letra": "E",
        "texto": "racional, burocrático e legal",
        "explicacao": "Isso lembra a dominação racional-legal de Max Weber."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Para Durkheim, fatos sociais (como regras, costumes e leis) existem antes do indivíduo (exterioridade), se impõem a ele (coercitividade) e valem para o grupo todo (generalidade).",
    "serie_minima": "2º ano EM"
  },
  {
    "id": "q2-3-01",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Probabilidade condicional",
    "nivel": "Difícil",
    "instituicao": "Nível Fuvest",
    "ano": null,
    "enunciado": "Numa turma, 60% dos alunos são meninas. Entre as meninas, 30% usam óculos; entre os meninos, 20%. Sorteando-se um aluno que usa óculos, a probabilidade de ser menina é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "30%",
        "explicacao": "30% é a chance de uma menina usar óculos; a pergunta é a inversa."
      },
      {
        "letra": "B",
        "texto": "18%",
        "explicacao": "18% é a chance de ser menina E usar óculos; falta dividir por todos que usam óculos."
      },
      {
        "letra": "C",
        "texto": "9/13 (cerca de 69%)",
        "explicacao": "Correta. Meninas com óculos: 0,6 × 0,3 = 0,18. Meninos com óculos: 0,4 × 0,2 = 0,08. 0,18 ÷ 0,26 = 9/13."
      },
      {
        "letra": "D",
        "texto": "60%",
        "explicacao": "60% é a proporção de meninas na turma toda; a informação dos óculos muda isso."
      },
      {
        "letra": "E",
        "texto": "26%",
        "explicacao": "26% é a chance de um aluno qualquer usar óculos."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Pense em 100 alunos: 60 meninas (18 de óculos) e 40 meninos (8 de óculos). Entre os 26 de óculos, 18 são meninas: 18/26 = 9/13 ≈ 69%.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-02",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Geometria espacial",
    "nivel": "Difícil",
    "instituicao": "Nível Unicamp",
    "ano": null,
    "enunciado": "Um reservatório cilíndrico tem 2 m de diâmetro e 3 m de altura. Quantos litros cabem nele, aproximadamente? (Use π = 3,14)",
    "alternativas": [
      {
        "letra": "A",
        "texto": "942 L",
        "explicacao": "Erro na conversão: 1 m³ = 1.000 L."
      },
      {
        "letra": "B",
        "texto": "9.420 L",
        "explicacao": "Correta. V = π · 1² · 3 = 9,42 m³ = 9.420 L."
      },
      {
        "letra": "C",
        "texto": "37.680 L",
        "explicacao": "Usou o diâmetro (2 m) como raio."
      },
      {
        "letra": "D",
        "texto": "18.840 L",
        "explicacao": "Isso parte da área lateral (2πrh), não do volume."
      },
      {
        "letra": "E",
        "texto": "94.200 L",
        "explicacao": "Erro na conversão: 1 m³ = 1.000 L, não 10.000 L."
      }
    ],
    "correta": "B",
    "resposta_comentada": "O raio é metade do diâmetro: 1 m. Volume do cilindro = π · r² · h = 3,14 · 1 · 3 = 9,42 m³. Como 1 m³ = 1.000 L, cabem cerca de 9.420 L.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-03",
    "user_id": null,
    "materia_id": "m-matematica",
    "assunto": "Logaritmos e juros compostos",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Um investimento rende 10% ao ano, a juros compostos. Em quantos anos, aproximadamente, o valor dobra? (Use log 2 = 0,30 e log 1,1 = 0,04)",
    "alternativas": [
      {
        "letra": "A",
        "texto": "3 anos",
        "explicacao": "Em 3 anos o valor cresce só cerca de 33%."
      },
      {
        "letra": "B",
        "texto": "5 anos",
        "explicacao": "Em 5 anos o valor cresce cerca de 61%, ainda longe de dobrar."
      },
      {
        "letra": "C",
        "texto": "10 anos",
        "explicacao": "Com juros simples de 10% ao ano dobraria em 10 anos; nos compostos, os juros rendem juros e dobra antes."
      },
      {
        "letra": "D",
        "texto": "7,5 anos",
        "explicacao": "Correta. 1,1ⁿ = 2, então n = log 2 ÷ log 1,1 = 0,30 ÷ 0,04 = 7,5."
      },
      {
        "letra": "E",
        "texto": "20 anos",
        "explicacao": "Em 20 anos o valor fica cerca de 6,7 vezes maior."
      }
    ],
    "correta": "D",
    "resposta_comentada": "Juros compostos: M = C · 1,1ⁿ. Para dobrar, 1,1ⁿ = 2. Aplicando log: n · log 1,1 = log 2, n = 0,30 ÷ 0,04 = 7,5 anos.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-04",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Associação de resistores",
    "nivel": "Difícil",
    "instituicao": "Nível Fuvest",
    "ano": null,
    "enunciado": "Dois resistores, de 6 Ω e 3 Ω, são ligados em paralelo a uma bateria ideal de 12 V. A corrente total fornecida pela bateria é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "6 A",
        "explicacao": "Correta. Em paralelo, R = (6 × 3) ÷ (6 + 3) = 2 Ω; I = 12 ÷ 2 = 6 A."
      },
      {
        "letra": "B",
        "texto": "1,33 A",
        "explicacao": "Calculou como se estivessem em série (9 Ω)."
      },
      {
        "letra": "C",
        "texto": "2 A",
        "explicacao": "2 A passa só pelo resistor de 6 Ω."
      },
      {
        "letra": "D",
        "texto": "4 A",
        "explicacao": "4 A passa só pelo resistor de 3 Ω."
      },
      {
        "letra": "E",
        "texto": "9 A",
        "explicacao": "9 é a soma das resistências em ohms, não uma corrente."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Em paralelo, cada resistor recebe os 12 V: pelo de 6 Ω passam 2 A e pelo de 3 Ω passam 4 A. A bateria fornece a soma, 6 A. O mesmo resultado sai da resistência equivalente de 2 Ω.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-05",
    "user_id": null,
    "materia_id": "m-fisica",
    "assunto": "Ondas",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Uma rádio FM transmite em 100 MHz. As ondas de rádio se propagam a 3 × 10⁸ m/s. O comprimento de onda dessa transmissão é:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "0,3 m",
        "explicacao": "Erro de potência de 10: 100 MHz = 10⁸ Hz."
      },
      {
        "letra": "B",
        "texto": "3 m",
        "explicacao": "Correta. λ = v ÷ f = 3 × 10⁸ ÷ 10⁸ = 3 m."
      },
      {
        "letra": "C",
        "texto": "30 m",
        "explicacao": "Erro de potência de 10: 100 MHz = 10⁸ Hz, não 10⁷ Hz."
      },
      {
        "letra": "D",
        "texto": "300 m",
        "explicacao": "Considerou 1 MHz em vez de 100 MHz."
      },
      {
        "letra": "E",
        "texto": "3 × 10¹⁶ m",
        "explicacao": "Multiplicou velocidade e frequência; o certo é dividir."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Equação da onda: v = λ · f, logo λ = v ÷ f. Com 100 MHz = 100 × 10⁶ = 10⁸ Hz, λ = 3 × 10⁸ ÷ 10⁸ = 3 m.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-06",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Isomeria óptica",
    "nivel": "Difícil",
    "instituicao": "Nível Unicamp",
    "ano": null,
    "enunciado": "Qual dos compostos a seguir apresenta isomeria óptica, ou seja, tem carbono quiral?",
    "alternativas": [
      {
        "letra": "A",
        "texto": "CH₃–CH₂–OH (etanol)",
        "explicacao": "Nenhum carbono tem quatro ligantes diferentes."
      },
      {
        "letra": "B",
        "texto": "CH₃–CH(OH)–CH₃ (propan-2-ol)",
        "explicacao": "O carbono central tem dois ligantes iguais (dois CH₃)."
      },
      {
        "letra": "C",
        "texto": "CH₃–CO–CH₃ (propanona)",
        "explicacao": "O carbono central tem ligação dupla; não é quiral."
      },
      {
        "letra": "D",
        "texto": "CH₂Cl–CH₂Cl (1,2-dicloroetano)",
        "explicacao": "Cada carbono tem dois hidrogênios iguais."
      },
      {
        "letra": "E",
        "texto": "CH₃–CH(OH)–CH₂–CH₃ (butan-2-ol)",
        "explicacao": "Correta. O carbono 2 tem quatro ligantes diferentes: H, OH, CH₃ e CH₂CH₃."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Carbono quiral é o que se liga a quatro grupos diferentes. No butan-2-ol, o carbono 2 está ligado a H, OH, CH₃ e C₂H₅, por isso existem dois isômeros ópticos (imagens no espelho que não se sobrepõem).",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-07",
    "user_id": null,
    "materia_id": "m-quimica",
    "assunto": "Eletroquímica (pilhas)",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Numa pilha de Daniell (E° Zn²⁺/Zn = −0,76 V; E° Cu²⁺/Cu = +0,34 V), é correto afirmar que:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "o cobre se oxida e é o ânodo.",
        "explicacao": "O cobre tem o maior potencial de redução: ele se reduz (cátodo)."
      },
      {
        "letra": "B",
        "texto": "a diferença de potencial da pilha é 0,42 V.",
        "explicacao": "Calculou 0,76 − 0,34; o correto é 0,34 − (−0,76) = 1,10 V."
      },
      {
        "letra": "C",
        "texto": "o zinco se oxida e é o ânodo, e a diferença de potencial é 1,10 V.",
        "explicacao": "Correta. O zinco tem o menor potencial de redução, então se oxida. ddp = 0,34 − (−0,76) = 1,10 V."
      },
      {
        "letra": "D",
        "texto": "os elétrons vão do cobre para o zinco.",
        "explicacao": "Os elétrons saem do ânodo (zinco) e vão para o cátodo (cobre)."
      },
      {
        "letra": "E",
        "texto": "a massa da placa de zinco aumenta.",
        "explicacao": "A placa de zinco se desgasta; é a de cobre que recebe cobre metálico."
      }
    ],
    "correta": "C",
    "resposta_comentada": "Quem tem o maior E° de redução se reduz: o cobre (cátodo). O zinco se oxida (ânodo), perde massa e manda elétrons pelo fio até o cobre. A ddp é E°cátodo − E°ânodo = 0,34 − (−0,76) = 1,10 V.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-08",
    "user_id": null,
    "materia_id": "m-biologia",
    "assunto": "Evolução",
    "nivel": "Difícil",
    "instituicao": "Nível Fuvest",
    "ano": null,
    "enunciado": "Bactérias expostas repetidamente a um antibiótico tendem a se tornar resistentes. Segundo a teoria sintética da evolução, isso ocorre porque:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "o antibiótico provoca nas bactérias as mutações de que elas precisam.",
        "explicacao": "Mutações são aleatórias: o antibiótico não as direciona."
      },
      {
        "letra": "B",
        "texto": "as bactérias que já tinham variantes resistentes sobrevivem e se reproduzem mais, e essas variantes ficam mais frequentes.",
        "explicacao": "Correta. É a seleção natural agindo sobre uma variação que já existia."
      },
      {
        "letra": "C",
        "texto": "as bactérias se esforçam para se adaptar e passam essa adaptação adiante.",
        "explicacao": "Essa é a ideia de Lamarck (uso e herança do adquirido), não aceita hoje."
      },
      {
        "letra": "D",
        "texto": "o antibiótico perde a força com o tempo de uso.",
        "explicacao": "O remédio não muda; o que muda é a população de bactérias."
      },
      {
        "letra": "E",
        "texto": "todas as bactérias passam a produzir a mesma enzima ao mesmo tempo.",
        "explicacao": "A resistência aparece em algumas e se espalha pela reprodução, não em todas de uma vez."
      }
    ],
    "correta": "B",
    "resposta_comentada": "Numa população grande, algumas bactérias já têm, por mutação ao acaso, genes de resistência. O antibiótico mata as sensíveis e as resistentes se multiplicam. Por isso não se deve interromper o tratamento antes do tempo.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-09",
    "user_id": null,
    "materia_id": "m-historia",
    "assunto": "Ditadura civil-militar",
    "nivel": "Difícil",
    "instituicao": "Nível Unicamp",
    "ano": null,
    "enunciado": "O Ato Institucional nº 5 (AI-5), de dezembro de 1968, é visto como um marco do endurecimento da ditadura no Brasil porque:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "restabeleceu as eleições diretas para presidente.",
        "explicacao": "As diretas só voltaram em 1989."
      },
      {
        "letra": "B",
        "texto": "concedeu anistia aos presos e exilados políticos.",
        "explicacao": "A Lei da Anistia é de 1979."
      },
      {
        "letra": "C",
        "texto": "criou o bipartidarismo, com ARENA e MDB.",
        "explicacao": "O bipartidarismo veio com o AI-2, em 1965."
      },
      {
        "letra": "D",
        "texto": "permitiu fechar o Congresso, cassar mandatos e suspendeu o habeas corpus para crimes políticos.",
        "explicacao": "Correta. O AI-5 deu ao presidente poderes quase sem limites e abriu caminho para a censura e a repressão."
      },
      {
        "letra": "E",
        "texto": "promulgou a chamada Constituição Cidadã.",
        "explicacao": "A Constituição Cidadã é de 1988, já na redemocratização."
      }
    ],
    "correta": "D",
    "resposta_comentada": "O AI-5 permitiu ao presidente fechar o Congresso, intervir em estados e municípios, cassar mandatos e suspender direitos políticos, além de suspender o habeas corpus para crimes políticos. Marcou o início dos \"anos de chumbo\".",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-10",
    "user_id": null,
    "materia_id": "m-geografia",
    "assunto": "Matriz energética",
    "nivel": "Difícil",
    "instituicao": "Nível ENEM",
    "ano": null,
    "enunciado": "Em comparação com a média mundial, a matriz elétrica brasileira se destaca por:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "depender principalmente do carvão mineral.",
        "explicacao": "O carvão tem peso grande em países como China e Índia, não no Brasil."
      },
      {
        "letra": "B",
        "texto": "ter a energia nuclear como principal fonte.",
        "explicacao": "As usinas de Angra geram uma parte pequena da eletricidade do país."
      },
      {
        "letra": "C",
        "texto": "não usar energia eólica nem solar.",
        "explicacao": "As duas crescem rápido, sobretudo no Nordeste."
      },
      {
        "letra": "D",
        "texto": "ser baseada sobretudo em derivados de petróleo.",
        "explicacao": "O petróleo pesa nos transportes, não na geração de eletricidade."
      },
      {
        "letra": "E",
        "texto": "ter grande participação de fontes renováveis, com destaque para a hidreletricidade.",
        "explicacao": "Correta. A maior parte da eletricidade brasileira vem de fontes renováveis, principalmente hidrelétricas."
      }
    ],
    "correta": "E",
    "resposta_comentada": "Graças aos grandes rios, a hidreletricidade é a principal fonte da eletricidade no Brasil, e eólica, solar e biomassa crescem. No mundo, predominam fontes fósseis. A vantagem tem custo: hidrelétricas causam impactos ambientais e dependem das chuvas.",
    "serie_minima": "3º ano EM"
  },
  {
    "id": "q2-3-11",
    "user_id": null,
    "materia_id": "m-filosofia",
    "assunto": "Ética kantiana",
    "nivel": "Difícil",
    "instituicao": "Nível Fuvest",
    "ano": null,
    "enunciado": "Para Immanuel Kant, uma ação tem valor moral quando:",
    "alternativas": [
      {
        "letra": "A",
        "texto": "é feita por dever, segundo uma regra que se poderia querer como lei universal.",
        "explicacao": "Correta. É o imperativo categórico: agir de modo que a regra da ação possa valer para todos."
      },
      {
        "letra": "B",
        "texto": "produz a maior felicidade para o maior número de pessoas.",
        "explicacao": "Essa é a ideia do utilitarismo (Bentham e Mill)."
      },
      {
        "letra": "C",
        "texto": "traz vantagem a quem a pratica.",
        "explicacao": "Agir só pela vantagem é um imperativo hipotético, sem valor moral para Kant."
      },
      {
        "letra": "D",
        "texto": "segue os costumes da comunidade, quaisquer que sejam.",
        "explicacao": "Para Kant, a moral vem da razão, não do costume."
      },
      {
        "letra": "E",
        "texto": "busca o meio-termo entre dois vícios.",
        "explicacao": "O meio-termo virtuoso é ideia de Aristóteles."
      }
    ],
    "correta": "A",
    "resposta_comentada": "Kant avalia a intenção, não o resultado: uma ação é moral quando feita por dever e quando sua regra (máxima) poderia virar lei universal. Ex.: mentir não passa no teste, porque ninguém mais confiaria em promessa nenhuma.",
    "serie_minima": "3º ano EM"
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
