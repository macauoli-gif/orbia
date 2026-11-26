# Plano do Projeto — Nous (antes "Pauta de Estudos")

> **26/11/2026:** o app passou a se chamar **Nous**, e o Banco de resumos saiu do app (a dona pediu). O visual segue o manual de identidade da marca.

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
- **Custo de não resolver:** sem login e sem licença, não há produto para vender.

## A solução

O app mantém o que a versão atual já faz (abaixo) e ganha o que falta para ser vendido: conta com email e senha, dados guardados com segurança fora do navegador (não se perdem ao trocar de aparelho), licença vitalícia liberada e bloqueada sozinha pela Hotmart, e uma tela para você administrar as licenças sem ver os estudos de ninguém. O conteúdo de fábrica (questões e flashcards) passa a ser um só, igual para todos; o que cada aluno cria ou responde é só dele.

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

### Banco de resumos (decidido em 25/11/2026: só do aluno)
- **Não há mais resumos do app.** A aba é o banco de resumos próprio de cada aluno.
- **Resumo em PDF:** o aluno envia um PDF (até 20 MB) e escreve por cima, com caneta digital, dedo ou mouse (três cores, três espessuras, pressão da caneta, borracha, desfazer, limpar a página) e com caixas de texto digitado. O PDF original fica guardado intacto; as anotações ficam numa camada por cima e são salvas sozinhas.
- **Resumo digitado:** continua existindo, com o modelo de resumo da versão atual.
- Filtro por matéria, busca e "marcar como lido".
- **Antes de vender:** testar a caneta num tablet de verdade (a versão atual só foi testada com mouse).

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

Tudo o que o aluno cria ou responde (tarefas, cronograma, resumos próprios, questões próprias, respostas, caderno de erros, simulados, sessões de foco, metas, série) pertence a ele e só ele vê, inclusive os PDFs de resumo e as anotações. O conteúdo do app (questões e flashcards de fábrica, links de vestibulares) é um só, igual para todos, e só a administradora edita.

## Perfis de usuário

- **Administradora (você):** vende o app, libera e bloqueia licenças, cuida do conteúdo de fábrica · primeira tela: Licenças
  - **Administradora que também estuda (decidido em 25/11/2026):** se o email dela tiver licença ativa (cortesia, origem Manual), ela entra como aluna — Quadro e todas as telas de estudo, com os dados DELA — e ganha o item Licenças no menu. Continua sem ver os estudos de nenhum outro aluno. Sem licença, entra só em Licenças e Minha conta, como antes.
- **Aluno:** comprou a licença e estuda · primeira tela: **Quadro** (a tela do dia a dia)

### Matriz de permissões (confirmada: a administradora vê só os dados da compra, nunca os estudos)

| Ação | Administradora | Aluno | Sem licença ativa |
|---|---|---|---|
| Ver os próprios estudos | só se tiver licença ativa (cortesia) | sim | não |
| Ver os estudos de outro aluno | **não** | **não** | não |
| Criar, editar e apagar os próprios registros | só se tiver licença ativa (cortesia) | sim | não |
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
| Supabase | banco, login, os PDFs de resumo dos alunos e o receptor do aviso da Hotmart | grátis para construir e testar; **plano Pro (cerca de US$ 25/mês) antes de vender** — no grátis o projeto "dorme" depois de uma semana sem uso e não tem cópia de segurança automática |
| Vercel | colocar no ar | grátis para construir; **plano Pro (cerca de US$ 20/mês) antes de vender** — o plano grátis da Vercel é só para uso não comercial |
| Envio de email (ex.: Resend) | email de confirmação de conta e de "esqueci a senha" | grátis até alguns milhares de emails por mês; o email embutido do Supabase só aguenta poucos envios por hora e não serve para vendas |
| Hotmart | vender e cobrar | a taxa da Hotmart sobre cada venda |
| GitHub | guardar o código | grátis |

**Total por mês:** R$ 0 até o lançamento; depois, perto de US$ 45/mês (Supabase Pro + Vercel Pro), mais a taxa da Hotmart por venda. Valores a conferir nos sites no dia da contratação.
**O que custaria a alternativa pronta:** não se aplica (o app é o produto que você vende).

## Prazo

- **Quer usar de verdade em:** lançamento (início das vendas) em dezembro de 2026. `[PENDENTE: dia exato]`
- **Horas por semana disponíveis:** `[PENDENTE]`

### O que entra no lançamento e o que vem logo depois (proposta)

Com até cinco semanas, o lançamento leva o que o aluno usa toda semana e o que faz a venda funcionar. O resto chega como atualização gratuita para quem já comprou (a licença é vitalícia).

**No lançamento (v1):**
- Login, licença pela Hotmart (liberação e bloqueio automáticos) e a tela Licenças
- Entrada por série, metas e avisos no topo
- Quadro (a tela do dia a dia), Cronograma, Banco de resumos (só do aluno, com PDF anotado à mão e por texto), Flashcards, Questões (com caderno de erros) e Foco
- Conteúdo de fábrica (questões, flashcards, matérias, semana sugerida) trazido da versão atual

**Simulados de vestibulares — trazido para o lançamento em 25/11/2026:** provas anteriores oficiais de ENEM (2 dias), Fuvest 1ª fase, Unicamp 1ª fase e UERJ (exames de qualificação), dos últimos 5 anos com gabarito publicado, com o gabarito oficial já cadastrado (lido dos PDFs oficiais). O aluno escolhe a instituição e o ano, abre a prova no site oficial, marca no cartão-resposta com cronômetro, e vê a correção (acertos, erros, em branco, anuladas fora da conta), por área/disciplina quando o gabarito oficial separa (ENEM e UERJ), o mapa da prova e a evolução a cada tentativa. O app não guarda cópia das provas.

**ExactLab — trazido para o lançamento em 26/11/2026:** uma página com três áreas (Matemática, Física e Química) com as fórmulas do 9º ano ao 3º ano do ensino médio, organizadas por assunto e série, com o significado de cada letra e a unidade. Na Química, uma Tabela Periódica Interativa e Didática com os 118 elementos (dados oficiais do PubChem/NIH): ficha completa de cada elemento, modos de visualização (famílias, classificação, estados físicos, distribuição eletrônica e propriedades periódicas), busca, filtros, comparador, favoritos (guardados na conta do aluno), glossário, como ler a tabela e atividades guiadas.

**Logo depois (v1.1):**
- Treino com o banco do app dentro de Simulados (por matéria, assunto ou completo)
- Desempenho (gráficos e os três assuntos que mais precisam de atenção)
- Espaço para cálculo com caneta (precisa ser testado num tablet de verdade antes)
- Tela para você editar o conteúdo de fábrica dentro do app (até lá, o conteúdo é atualizado pela construção)

---

# 2. Insights do Mercado

## Benchmark

`[PENDENTE: benchmark não pesquisado]` — nesta conversa não houve busca de concorrentes. Nenhum nome, preço ou funcionalidade de concorrente foi escrito aqui para não inventar. Vale olhar antes de definir o preço da licença na Hotmart.

## Por que ainda vale construir o meu

O app já existe, foi feito para uma aluna real e cobre do 9º ano ao 3º ano com o foco em vestibular mudando por série. A versão nova transforma isso num produto vendável: login, dados que não se perdem e licença paga uma vez.

## Referências de interface

- **Gosta de:** o visual da versão atual, que serve de base (arquivo em `referencia/pauta-de-estudos-v1.html`).
- **Usa mais em:** computador, tablet (com caneta) e celular. Mobile primeiro.
- **Cor principal:** #0b6e8a (azul-petróleo da versão atual; no tema escuro, #4cc0de)
- **Cores de aviso:** atrasado #c4321f, atenção #8a5300 (escurecido de #b9700a em 25/11/2026 para o texto ficar legível: contraste 4,5:1), em dia #1f7a4d
- **Fontes:** Bricolage Grotesque (títulos) e DM Sans (texto), as mesmas da versão atual
- **Tema:** claro e escuro, seguindo o aparelho
- **Logo:** o nome "Nous" no topo (logo e cores conforme o manual de identidade)

---

# 3. Arquitetura

## Mapa de telas

```
Tela de entrada (Entrar / Criar conta / Esqueci a senha)
├── Sem licença ativa → aviso com o WhatsApp do suporte e botão Sair
├── Aluno
│   ├── Primeira entrada: escolher a série
│   ├── Quadro (início)
│   ├── Cronograma
│   ├── Questões
│   │   ├── Resolver questão
│   │   └── Caderno de erros
│   ├── Foco
│   └── Mais
│       ├── Banco de resumos
│       ├── Flashcards (e o jogo em tela cheia)
│       └── Minha conta (nome, série, metas, sair)
└── Administradora
    ├── Licenças (início)
    └── Minha conta
```

**Navegação:** celular com barra inferior de 5 itens (Quadro, Cronograma, Questões, Foco, Mais); computador e tablet deitado com menu lateral com todos os itens. As metas e avisos ficam no topo de todas as telas do aluno.

## Processos automáticos

### Aviso da Hotmart (compra aprovada, reembolso, chargeback)
- **Gatilho:** a Hotmart chama o endereço do app a cada evento de compra do produto Pauta de Estudos.
- **Passos:** 1. confere o código secreto da Hotmart (hottok); sem ele, recusa. 2. guarda o aviso inteiro no registro de eventos. 3. compra aprovada: cria ou reativa a licença do email do comprador. 4. reembolso, chargeback ou cancelamento: bloqueia a licença daquele email.
- **Resultado:** a licença fica certa sem você tocar em nada.
- **Se der errado:** o aviso fica no registro com o erro; a tela Licenças mostra "avisos com erro" para você liberar à mão. A Hotmart tenta reenviar sozinha.

### Primeira entrada do aluno
- **Gatilho:** o aluno cria a conta com o email da compra.
- **Passos:** 1. o app cria o perfil dele como aluno. 2. confere se existe licença ativa para aquele email. 3. sem licença: mostra o aviso com o WhatsApp. 4. com licença: pede a série e abre o Quadro.

## Modelagem de dados

O detalhe campo a campo está no `PRD-BACKEND.md`. Em resumo, três grupos:

- **Contas e venda:** perfis, licenças, avisos da Hotmart.
- **Conteúdo de fábrica (igual para todos, só a administradora muda):** matérias, flashcards e questões do app, vestibulares.
- **Do aluno (só ele vê):** tarefas, cronograma, resumos (digitados e em PDF, com as anotações), questões próprias, resumos lidos, respostas de flashcards e de questões, caderno de erros, sessões de foco.

## A pergunta de um ano

- **Sua, como vendedora:** "quantas licenças vendi por mês, e quantas foram reembolsadas?" → a tabela de licenças guarda data de compra, origem e data de bloqueio desde o primeiro dia.
- **Do aluno:** "eu melhorei desde que comecei?" → toda resposta de questão e de flashcard é guardada com data, mesmo antes de existir a tela Desempenho. Quando ela chegar (v1.1), já terá histórico.

## Melhorias para a v2

- Desempenho, espaço para cálculo e editor de conteúdo — cortados do lançamento pelo prazo (ver lista acima). Simulados de provas anteriores entraram no lançamento (25/11/2026).
- Aplicativo de loja (Android e iOS) — o app abre no navegador do celular e pode ser fixado na tela inicial.
- Grupos de estudo — fora do escopo desde a versão atual.

---

# Limitações conhecidas da versão atual (para não perder de vista)

- O conteúdo das questões e dos flashcards do app é autoral e precisa ser conferido por um professor.
- As provas feitas ainda não entram no Desempenho por assunto.
- O espaço de cálculo foi testado com mouse e caneta simulada, não num tablet de verdade.
- Os links oficiais do Inep, da Fuvest e da Comvest não foram conferidos.

# A conta que vai chegar depois

Coisas que você sabe que precisa, mas não tinha o dado na hora.

- `[PENDENTE: dia exato do lançamento]` — custo: sem ele não dá para dizer se o corte acima é suficiente.
- `[PENDENTE: horas por semana]` — custo: idem.
- `[PENDENTE: conferência do conteúdo de fábrica por um professor]` — custo: vender resumos e questões com erro é risco de reputação e de reembolso.
- `[PENDENTE: termos de uso e política de privacidade]` — custo: o app guarda dados de alunos, muitos menores de idade (LGPD). Precisa existir antes de vender; vale uma conversa com um advogado.
- `[PENDENTE: produto criado na Hotmart, com o código secreto (hottok) e o endereço do aviso configurados]` — custo: sem isso a liberação automática não funciona; até lá, só a liberação manual.
- `[PENDENTE: conta de envio de email (ex.: Resend) e domínio próprio]` — custo: sem ela, a confirmação de conta e o "esqueci a senha" travam com poucos alunos.
- `[PENDENTE: apagar os dados de exemplo antes de vender]` — decidido em 25/11/2026 manter por enquanto (Maria, Pedro, Ana, Lucas e a administradora de teste, todos @exemplo.com). Antes de vender: você cria a sua conta no app, ela vira administradora, e roda-se `supabase/limpar-dados-de-exemplo.sql` (a trava recusa se você ainda não for administradora). Custo de esquecer: uma conta de administradora de teste com acesso às licenças reais.
- `[PENDENTE: preço da licença]` — custo: não muda o app, mas muda a conta do negócio.
- `[PENDENTE: benchmark de concorrentes]` — custo: decidir preço sem referência.

# Decidir depois de usar

Coisas que só dá para saber usando. Não é dívida, é calendário.

- `[DESCOBRIR NO USO: o aluno pode estar logado em vários aparelhos ao mesmo tempo?]` — por enquanto ficou: pode (sem limite). Se aparecer compartilhamento de senha, limitar depois.
- `[DESCOBRIR NO USO: quantos dias uma tarefa concluída fica visível no Quadro]` — por enquanto ficou: 30 dias.
