# Plano do Projeto — Pauta de Estudos

> Fonte da verdade deste projeto. Quando mudar de ideia, mude aqui primeiro.
> Última atualização: 25/11/2026
> Ponto de partida: a versão atual (um arquivo HTML, dados só no navegador), descrita em `C:\Projeto\pauta-de-estudos.md` e publicada em https://claude.ai/artifact/4u1sHnc2kheuuXFk5t1t7T

## Em uma frase

Um app de organização de estudos, vendido por licença de uso, que deixa cada aluno que comprou (9º ano ao 3º ano do ensino médio) entrar com a própria conta e encontrar os próprios estudos em qualquer aparelho, juntando tarefas, cronograma, resumos, flashcards, questões, simulados, desempenho e foco num lugar só. Nasceu como o app da Maria Claudia.

---

# 1. Visão Estratégica

## Os problemas

### Problema 1 — Não dá para vender o app como ele é
- **Como acontece hoje:** já existe a versão em HTML, com os dados guardados só no navegador, sem login.
- **Por que uma versão nova:** vender licenças de uso. Hoje qualquer pessoa com o link usa, não há como saber quem pagou, e os dados de cada aluno não acompanham a pessoa entre aparelhos.
- **Quem compra e quem usa:** o próprio aluno compra a licença e usa o app. Não há pais, escola ou professor acompanhando.
- **Licença:** vitalícia. Paga uma vez, usa para sempre; não há renovação nem vencimento.
- **Como a venda e o pagamento acontecem:** pela Hotmart. O app não cobra nada; só recebe o aviso da Hotmart de que a compra foi aprovada.
- **Frequência:** [AINDA NÃO RESPONDIDO]
- **Custo:** [AINDA NÃO RESPONDIDO]
- **Último caso:** [AINDA NÃO RESPONDIDO]

## A solução

O app mantém tudo o que a versão atual já faz (abaixo). O que muda na versão nova depende do Problema 1. [AINDA NÃO RESPONDIDO]

**O que ele NÃO faz (v1), proposta:**
- Grupos de estudo ou chat entre alunos (a versão atual também não tem)
- Questões e gabaritos de provas reais dentro do app (só os links oficiais e o cartão-resposta)
- Bloquear outros aplicativos durante o Pomodoro (o navegador não permite)

## Funcionalidades (herdadas da versão atual)

### Entrada e série
- **Abre em:** tela de entrada com nome e série (9º EF, 1º, 2º ou 3º EM)
- **Efeito da série:** muda o cronograma sugerido, as metas semanais, os avisos, o foco em vestibular e a ordem de resumos e questões. O filtro "mostrar só o que o app sugere" pode ser desligado.
- **Foco em vestibular:** nenhum no 9º; só conhecer o formato no 1º; uma prova anterior por mês no 2º; uma por semana no 3º.
- **Ações:** "Alterar nome ou série" no topo.

### Metas e avisos (topo de todas as telas)
- Questões da semana, tempo de foco da semana, provas anteriores no mês, aviso de ritmo abaixo da meta, aviso de prova anterior antiga (a partir do 2º ano). As metas são sugestões e podem ser alteradas.

### Quadro — a tela do dia a dia (confirmado: as tarefas são digitadas pelo aluno, uma a uma; nada vem sozinho do Cronograma)
- **Abre em:** Kanban com três colunas, A fazer, Em andamento e Concluído. No celular, uma coluna por vez, com abas no topo.
- **No topo, antes das colunas:** a faixa de metas da semana e os avisos (atrasadas e prazo em até 48 horas), com o número de cada um.
- **Cada cartão mostra:** título, matéria (com a cor da matéria), prazo ("hoje", "amanhã", "em 3 dias", "atrasada há 2 dias") e prioridade (alta, média, baixa).
- **Ordem dentro da coluna:** atrasadas primeiro, depois por prazo mais próximo, depois por prioridade.
- **Filtro:** por matéria; "só desta semana".
- **Ações:** botão "+ Nova tarefa" sempre visível; arrastar o cartão de coluna (ou tocar e escolher "mover para"); editar; apagar.
- **Ao clicar num cartão:** abre a gaveta com os detalhes e o botão "Começar foco nesta tarefa" (abre o Pomodoro já ligado à matéria).
- **Vazio:** "Nada por aqui. Crie sua primeira tarefa ou carregue a semana sugerida no Cronograma."
- **Nasce e morre:** o aluno cria; o que está em Concluído há mais de 30 dias some da coluna, mas continua contando no Desempenho.

### Cronograma
- **Abre em:** semana, de segunda a sexta, das 14h às 18h, em blocos de 50 minutos, com as 19 matérias (Matemática duas vezes)
- **Ações:** editar blocos; carregar a semana sugerida da série
- **No 2º e no 3º ano:** blocos de fim de semana para provas anteriores, redação e revisão de erros

### Banco de resumos
- Resumos do app por matéria, mais os resumos do aluno; marcar como lido

### Flashcards
- Jogo em tela cheia: pergunta na frente, resposta grande ao virar; setas para "errei" e "acertei"

### Questões
- **Filtros:** matéria, assunto, nível, instituição, ano, resolvidas ou pendentes
- **Mostra:** resposta comentada e explicação de cada alternativa
- **Ações:** resolver, salvar para revisar, cadastrar questão própria
- **Caderno de erros:** motivo e anotação

### Simulados
- **Provas anteriores:** links oficiais (ENEM/Inep, Fuvest, Unicamp/Comvest, e outros com nome e link https); o aluno resolve no caderno oficial e marca no cartão-resposta (A a E ou A a D) com cronômetro e tempo limite opcional; marca questões para revisar; cola o gabarito oficial (X ou * = anulada, sai da contagem); resultado com acertos, percentual, tempo, em branco, resultado por área (`Nome:1-45, Outra:46-90`), mapa da prova, comparação com a prova anterior e gráfico de evolução.
- **Treino com o banco do app:** por matéria, por assunto ou completo; cronômetro; modo prova real com tempo limite e encerramento automático; correção, resultado por disciplina e evolução.
- **Valores padrão (editáveis, conferir no edital):** Fuvest 1ª fase com 90 questões e 300 minutos; ENEM com 90 questões por dia e áreas 1–45 e 46–90; Unicamp sem número de questões.

### Desempenho
- Acertos por matéria, evolução mensal, tempo por disciplina, assuntos mais errados, e os três assuntos que mais precisam de atenção, com sugestão do que estudar

### Foco
- Pomodoro com tela de foco, contagem de saídas da aba e registro das sessões

### Espaço para cálculo
- Painel abaixo das alternativas (questão, treino e cartão-resposta): caneta em três cores e três espessuras com pressão, borracha, desfazer, limpar e mais espaço; ignora o dedo quando detecta a caneta, ou com "Só caneta". Hoje o rascunho se perde ao recarregar.

## Unidade principal

Aluno (cada licença é um aluno) — vai existir mais de um? **sim, um por licença vendida**. Alguém trabalha em mais de um ao mesmo tempo? **não; só a administradora enxerga a lista de alunos, e mesmo ela não vê os estudos de ninguém**.

Tudo o que o aluno cria ou responde (tarefas, cronograma, resumos próprios, questões próprias, respostas, caderno de erros, simulados, sessões de foco, metas, série) pertence a ele e só ele vê. O conteúdo do app (resumos, questões e flashcards de fábrica, links de vestibulares) é um só, igual para todos, e só a administradora edita.

## Perfis de usuário

- **Administradora (você):** vende o app, libera e bloqueia licenças, cuida do conteúdo de fábrica · primeira tela: Licenças
- **Aluno:** comprou a licença e estuda · primeira tela: **Quadro** (a tela do dia a dia)

### Matriz de permissões (confirmada: a administradora vê só os dados da compra, nunca os estudos)

| Ação | Administradora | Aluno | Sem licença ativa |
|---|---|---|---|
| Ver os próprios estudos | — | sim | não |
| Ver os estudos de outro aluno | **não** | **não** | não |
| Criar, editar e apagar os próprios registros | — | sim | não |
| Ver o conteúdo de fábrica | sim | sim | não |
| Editar o conteúdo de fábrica | sim | não | não |
| Ver a lista de alunos e licenças (nome, email, data da compra, situação) | sim | não | não |
| Liberar e bloquear licença (ex.: reembolso) | sim | não | não |
| **Quem não fez login** | não vê nada | | |

## Fluxo de cadastro (proposta)

1. O aluno compra na Hotmart, com o email dele.
2. Quando a compra é aprovada, a Hotmart avisa o app sozinha (o "webhook": um aviso automático que a Hotmart manda para um endereço do app). O app cria a licença para aquele email, sem você fazer nada.
3. A página de obrigado e o email da Hotmart levam o aluno ao link do app, com a instrução: "crie sua senha usando o mesmo email da compra".
4. O aluno cria a senha com aquele email e entra direto. Na primeira entrada, escolhe a série (como na versão atual).
5. Se ele tentar entrar com um email que não comprou, vê: "Não encontramos uma licença para este email. Use o mesmo email da compra na Hotmart ou fale com o suporte: WhatsApp (71) 90078-6252."
6. Reembolso ou chargeback na Hotmart: a Hotmart avisa e o app bloqueia a licença sozinho. O aluno vê: "Sua licença não está ativa."
7. Plano B, na tela Licenças: você pode liberar um email à mão (cortesia, aluno que comprou com email errado) e bloquear ou desbloquear qualquer licença.

Quem fica sem licença ativa não vê nada além da tela de entrada.

## Ferramentas e custo

| Peça | Para que serve | Custo |
|---|---|---|
| Claude | construir o sistema | a assinatura que você já tem |
| React + Vite | a interface | grátis |
| Supabase | banco, login e arquivos | grátis até crescer |
| Vercel | colocar no ar | grátis |
| GitHub | guardar o código | grátis |

**Total por mês:** R$ 0 no início
**O que custaria a alternativa pronta:** [AINDA NÃO RESPONDIDO]

## Prazo

- **Quer usar de verdade em:** lançamento (início das vendas) em dezembro de 2026, [AINDA NÃO RESPONDIDO: dia]
- **Horas por semana disponíveis:** [AINDA NÃO RESPONDIDO]

---

# 2. Insights do Mercado

[AINDA NÃO RESPONDIDO]

---

# 3. Arquitetura

[AINDA NÃO RESPONDIDO]

---

# Limitações conhecidas da versão atual (para não perder de vista)

- O conteúdo dos resumos e das questões do app é autoral e precisa ser conferido por um professor.
- As provas feitas ainda não entram no Desempenho por assunto.
- O espaço de cálculo foi testado com mouse e caneta simulada, não num tablet de verdade.
- Os links oficiais do Inep, da Fuvest e da Comvest não foram conferidos.

# A conta que vai chegar depois

Nada aqui ainda.

# Decidir depois de usar

Nada aqui ainda.
