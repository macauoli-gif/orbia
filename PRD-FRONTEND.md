# PRD Frontend — Pauta de Estudos

> Especificação da interface. Quem constrói lê este arquivo.
> Nesta fase não existe banco: as telas funcionam com os dados de exemplo do fim deste arquivo.
> Fonte das decisões: `PLANO-DO-PROJETO.md`.
> Referência visual e de conteúdo: `referencia/pauta-de-estudos-v1.html` (a versão atual, num arquivo só). O comportamento de cada aba descrito aqui é o da versão atual, a menos que este arquivo diga outra coisa.

## O que o sistema é

App de organização de estudos para alunos do 9º ano do fundamental ao 3º ano do ensino médio, vendido por licença vitalícia na Hotmart. Usado no celular, no tablet (às vezes com caneta) e no computador.

**Escopo do lançamento (v1):** Entrada, Sem licença, Série, Quadro, Cronograma, Questões, Caderno de erros, Foco, Banco de resumos, Flashcards, Minha conta e Licenças. Simulados, Desempenho e Espaço para cálculo ficam para a v1.1 (ver o fim do arquivo).

## Padrão técnico

- React + Vite (versões atuais), sem biblioteca de componente pronta.
- Visual a partir de um `index.css` próprio, com as variáveis de cor da versão atual.
- Navegação por estado, sem endereço no navegador.
- Cor principal #0b6e8a (tema escuro: #4cc0de). Aviso crítico #c4321f, atenção #8a5300 (era #b9700a; escurecido para contraste 4,5:1), em dia #1f7a4d. Fundo #f3f6f8, superfície #ffffff, texto #14232e, texto secundário #5c6f7c, linhas #d9e2e8.
- Fontes: Bricolage Grotesque (títulos) e DM Sans (texto).
- Tema claro e escuro, seguindo o aparelho.
- Celular: barra inferior fixa com 5 itens (Quadro, Cronograma, Questões, Foco, Mais). Tablet deitado e computador: menu lateral à esquerda com todos os itens.
- Cada uma das 19 matérias tem uma cor própria, usada em etiquetas, cartões e blocos.

## Perfis

- **Aluno:** entra no Quadro. Vê só os próprios estudos e o conteúdo de fábrica.
- **Administradora:** entra em Licenças. Vê só os dados da compra de cada aluno (nome, email, data, situação). Nunca vê os estudos dos alunos. Se o email dela tiver licença ativa (decidido em 25/11/2026), entra como aluna (Série na primeira vez, depois Quadro), vê só os estudos DELA e tem Licenças no menu (no celular, dentro de Mais).

## Mapa de navegação

```
Entrada (Entrar · Criar conta · Esqueci a senha)
└── Sem licença ativa: aviso + Sair
└── Aluno: [Série, só na primeira vez] → Quadro · Cronograma · Questões (→ Resolver, Caderno de erros) · Foco · Mais (Banco de resumos · Flashcards · Minha conta)
└── Administradora: Licenças · Minha conta
└── Administradora com licença ativa: as telas do Aluno (com os dados dela) + Licenças
```

---

## Faixa de metas e avisos (topo de todas as telas do aluno)

**Quem acessa:** aluno.

**O que aparece**
Linha com o nome do aluno e a série. Abaixo, três medidores da semana: questões respondidas / meta, minutos de foco / meta, provas anteriores no mês / meta (este só a partir do 2º ano; antes da v1.1 aparece "chega em breve"). Abaixo, a lista de avisos: tarefas atrasadas (vermelho), prazos em até 48 horas (amarelo), ritmo abaixo da meta (amarelo). Mostra até 3 avisos e o botão "ver todos".

**Ações**
- **Tocar num aviso de tarefa:** abre o Quadro com o cartão daquela tarefa aberto.
- **Ver todos / ver menos:** expande a lista.

**Estado vazio**
"Tudo em dia. Bom estudo!"

---

## Painel do dia (topo do Quadro, a tela inicial) — decidido em 25/11/2026

**Quem acessa:** aluno (e a administradora com licença).

**O que aparece** (igual ao painel da versão antiga)
Data por extenso, "Olá, nome · série" e o botão "Alterar nome ou série" (abre Minha conta). Quatro contadores: tarefas atrasadas (vermelho), vencem em até 48 h (amarelo), pendências no total, blocos de hoje sem registro (amarelo); em verde quando zerados. Lista de avisos: tarefa atrasada, vence hoje, vence em 1 ou 2 dias, bloco de hoje acontecendo agora e bloco de hoje que já passou sem ser marcado. Mostra 5 e o botão "Ver todos os N avisos". Abaixo, "Metas da semana · série": questões, tempo de foco e provas anteriores no mês (chega em breve), o aviso de ritmo e o foco da série.

No Quadro a faixa de metas não aparece (o painel já mostra tudo); nas outras telas ela continua.

**Ações**
- **Tocar num aviso de tarefa:** abre o cartão da tarefa. **Num aviso de bloco:** abre o Cronograma.

**Estado vazio**
"Tudo em dia. Nenhum aviso agora."

---

## Tela: Entrada

**Quem acessa:** todos, antes de entrar.

**O que aparece**
Nome "Pauta de Estudos", frase curta ("Seu plano de estudos, do 9º ano ao vestibular"), campos de email e senha, botão Entrar, links "Criar conta" e "Esqueci a senha". Em Criar conta: nome, email, senha e repetir senha, com a dica "Use o mesmo email da compra na Hotmart".

**Campos e informações**

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Nome | texto | sim (só em Criar conta) | até 80 caracteres |
| Email | email | sim | |
| Senha | senha | sim | mínimo 8 caracteres |

**Ações**
- **Entrar:** confere email e senha. Administradora sem licença vai para Licenças; com licença ativa, entra como aluna. Aluno com licença ativa vai para Série (primeira vez) ou Quadro. Aluno sem licença vai para Sem licença.
- **Criar conta:** cria a conta e mostra "Enviamos um email para confirmar sua conta. Abra o link e volte aqui para entrar."
- **Esqueci a senha:** pede o email e mostra "Se este email tiver conta, enviamos um link para criar uma senha nova."

**Estado vazio**
Não se aplica.

---

## Tela: Sem licença

**Quem acessa:** quem fez login sem licença ativa.

**O que aparece**
Título e mensagem, conforme o caso:
- Nenhuma licença para o email: "Não encontramos uma licença para este email. Use o mesmo email da compra na Hotmart ou fale com o suporte: WhatsApp (71) 90078-6252."
- Licença bloqueada: "Sua licença não está ativa. Fale com o suporte: WhatsApp (71) 90078-6252."
Mostra o email com que a pessoa entrou. Botões: "Falar no WhatsApp" (abre `https://wa.me/5571900786252`), "Tentar de novo" e "Sair".

**Ações**
- **Tentar de novo:** confere a licença de novo (útil logo depois da compra).
- **Sair:** volta para Entrada.

---

## Tela: Série (primeira entrada)

**Quem acessa:** aluno, só na primeira entrada (e por "Alterar série" em Minha conta).

**O que aparece**
"Em que série você está?" e quatro cartões de escolha, só com o nome da série (9º ano do fundamental, 1º, 2º e 3º ano do ensino médio). Sem linha de descrição embaixo (decidido em 25/11/2026).
Abaixo, o botão "Começar". O valor gravado é o rótulo curto, idêntico ao do banco: `9º ano EF`, `1º ano EM`, `2º ano EM`, `3º ano EM`; o nome longo é só o texto do cartão.

**Ações**
- **Começar:** salva a série, aplica as metas sugeridas da série e abre o Quadro. Na primeira vez, oferece "Carregar a semana sugerida no Cronograma".

---

## Tela: Quadro (tela do dia a dia)

**Quem acessa:** aluno.
**Chega aqui por:** é a primeira tela depois da entrada; item Quadro do menu.

**O que aparece**
Título "Quadro", filtro de matéria, opção "só desta semana" e o botão "+ Nova tarefa" sempre visível. Três colunas: A fazer, Em andamento, Concluído, cada uma com o número de cartões. No celular, uma coluna por vez, com abas no topo.

Cada cartão (estilo Kanban, como o protótipo; decidido em 25/11/2026) mostra: na primeira linha a etiqueta da matéria com a cor dela, a etiqueta de prazo quando é urgente ("Atrasada 1 d" em vermelho, "Vence hoje" ou "Vence em 2 d" em amarelo) e a prioridade; depois o título em negrito, "Prazo 24/11" (ou "Sem prazo") e os botões ← → (mover para a coluna vizinha) e Editar. Borda esquerda vermelha se atrasada, amarela se vence em até 48 horas, verde se concluída (título riscado). Colunas com fundo cinza claro.

Ordem dentro da coluna: atrasadas primeiro, depois prazo mais próximo, depois prioridade (Alta, Média, Baixa). Tarefas concluídas há mais de 30 dias saem da coluna Concluído.

**Campos e informações** (janela de nova tarefa / editar)

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Título | texto | sim | até 120 caracteres |
| Matéria | lista das 19 matérias | sim | |
| Prazo | data | não | |
| Prioridade | lista: Alta, Média, Baixa | sim | padrão Média |
| Situação | lista: A fazer, Em andamento, Concluído | sim | padrão A fazer |
| Observação | texto longo | não | |

**Ações**
- **+ Nova tarefa:** abre a janela; ao salvar, o cartão aparece na coluna certa sem recarregar.
- **Arrastar o cartão** com a caneta, o mouse ou o dedo (o dedo segura um instante antes de arrastar; sem isso, rola a página) para outra coluna — no celular, para uma das abas. **Ou as setas ← →** do cartão. Muda a situação; ao ir para Concluído, guarda a data de conclusão.
- **Tocar no cartão:** abre a gaveta de detalhes com Editar, Apagar e "Começar foco nesta tarefa".
- **Começar foco nesta tarefa:** abre Foco já com a matéria e a tarefa escolhidas.
- **Apagar:** pede confirmação.

**Estado vazio**
"Nada por aqui. Crie sua primeira tarefa ou carregue a semana sugerida no Cronograma."

---

## Tela: Cronograma

**Quem acessa:** aluno.
**Chega aqui por:** item Cronograma do menu.

**O que aparece**
A semana em colunas (segunda a sexta; no 2º e 3º ano também sábado e domingo), com o dia de hoje destacado. Cada bloco mostra horário, matéria (cor) e o que fazer ("Exercícios resolvidos", "Treino de redação"...). O bloco de agora fica verde; bloco que já passou sem estar marcado como feito fica amarelo. Cada bloco tem a caixa "feito". No celular, um dia por vez, com setas para trocar.

A semana sugerida, por série, é a da versão atual: blocos de 50 minutos das 14h às 18h (14:00, 15:00, 16:10, 17:10), as 19 matérias, Matemática duas vezes; no 2º e 3º ano, blocos de fim de semana para prova anterior, redação e revisão de erros.

**Campos e informações** (editar bloco)

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Dia | lista: Segunda a Domingo | sim | |
| Início e fim | hora | sim | fim depois do início |
| Matéria | lista das 19 matérias | sim | |
| O que fazer | texto | sim | até 80 caracteres |
| Tipo | lista: Estudo, Prova anterior, Redação, Revisão de erros | sim | padrão Estudo |
| Tarefa ligada | lista das tarefas não concluídas | não | |

**Ações**
- **Carregar semana sugerida:** pergunta "Isso troca a sua semana atual pela sugerida da sua série. Continuar?" e substitui os blocos.
- **+ Bloco / Editar / Apagar bloco.**
- **Marcar feito:** risca o bloco.

**Estado vazio**
"Sua semana está vazia. Carregue a semana sugerida para o seu ano ou crie seus próprios blocos."

---

## Tela: Questões

**Quem acessa:** aluno.
**Chega aqui por:** item Questões do menu.

**O que aparece**
Filtros: matéria, assunto, nível (Fácil, Médio, Difícil), instituição, ano, situação (Todas, Pendentes, Resolvidas, Para revisar) e a opção "mostrar só o que o app sugere para a minha série" (marcada por padrão; mostra só as questões da série do aluno, não as das séries anteriores — 25/11/2026). Botões "+ Cadastrar questão" e "Caderno de erros". Lista de cartões com matéria, assunto, nível, instituição e ano, o começo do enunciado e a marca "resolvida" (acertou / errou) quando houver.

**Ações**
- **Tocar na questão:** abre Resolver questão.
- **+ Cadastrar questão:** formulário com matéria, assunto, nível, instituição, ano, enunciado, alternativas (A a E, ou A a D), a correta, explicação de cada alternativa e resposta comentada. A questão é só do aluno e aparece com a etiqueta "minha".

**Estado vazio**
"Nenhuma questão com estes filtros. Tente tirar um filtro ou desmarcar 'só o que o app sugere'."

## Tela: Resolver questão

**O que aparece**
Etiquetas (matéria, assunto, nível, instituição, ano), enunciado grande, alternativas como botões. Depois de responder: faixa verde "Acertou" ou vermelha "Errou — a correta é C", resposta comentada e a explicação de cada alternativa. Botões: "Salvar para revisar", "Anotar no caderno de erros" (só se errou), "Próxima".

**Ações**
- **Escolher alternativa:** grava a resposta (com o tempo gasto) e mostra a correção. Não dá para trocar depois de responder; "Refazer" cria uma resposta nova.
- **Anotar no caderno de erros:** pede motivo (Não sabia o conteúdo, Falta de atenção, Interpretação, Conta errada, Faltou tempo) e anotação livre.

## Tela: Caderno de erros

**O que aparece**
Lista das questões erradas ou salvas para revisar, com matéria, motivo e anotação. Filtro por matéria e por motivo.

**Ações**
- **Refazer:** abre Resolver questão.
- **Editar anotação / Tirar do caderno.**

**Estado vazio**
"Nenhum erro anotado ainda. Quando errar uma questão, anote aqui o motivo para não errar de novo."

---

## Tela: Foco

**Quem acessa:** aluno.
**Chega aqui por:** item Foco do menu; "Começar foco nesta tarefa" no Quadro.

**O que aparece**
Matéria e tarefa (opcionais), tempo de foco (padrão 25 min) e de pausa (padrão 5 min), relógio grande, botões Começar, Pausar e Encerrar. Durante o foco, tela cheia com o relógio e a matéria. Abaixo, "Sessões de hoje" e o total de minutos da semana.

**Ações**
- **Começar:** inicia a contagem e entra em tela de foco. Cada vez que o aluno sai da aba, conta uma saída e mostra o número ao terminar.
- **Encerrar / terminar o tempo:** grava a sessão (início, minutos, saídas, matéria, tarefa, se completou).

**Estado vazio**
"Nenhuma sessão hoje. 25 minutos de foco já fazem diferença."

---

## Tela: Banco de resumos

**Quem acessa:** aluno.
**Chega aqui por:** Mais → Banco de resumos.

**O que aparece**
**Decidido em 25/11/2026: a aba é só do aluno; não há resumos do app.**
À esquerda (no celular, faixa rolável no topo), as 19 matérias com a contagem. Busca por título e texto, filtro de tipo (Todos, PDF, Digitados). Cartões com título, matéria, tipo (PDF com o número de páginas, ou Digitado) e o começo do texto; caixa "lido".

**Ações**
- **Abrir:** resumo digitado mostra o texto inteiro; resumo em PDF abre o editor de PDF (abaixo).
- **Marcar como lido.**
- **+ Enviar PDF:** escolhe um arquivo PDF (até 20 MB), título (padrão: nome do arquivo) e matéria. Abre direto no editor.
- **+ Resumo digitado:** título, matéria e texto (com o modelo de resumo da versão atual já preenchido).
- Todo resumo pode ser editado e apagado pelo aluno (apagar um PDF apaga também as anotações).

**Estado vazio**
"Nenhum resumo nesta matéria ainda. Envie o PDF do seu resumo ou escreva um."

---

## Tela: Editor de PDF (resumo em PDF)

**Quem acessa:** aluno, ao abrir um resumo em PDF.

**O que aparece**
Título e matéria no topo, botão Voltar e a situação do salvamento ("Salvando…" / "Salvo"). Barra de ferramentas: Mover (rolar sem escrever), Caneta, Borracha, Texto; três cores (azul-escuro, vermelho, verde) e três espessuras; Desfazer; Limpar página; "Só caneta". As páginas do PDF uma abaixo da outra, na largura da tela (no computador, até 1200 px), cada uma com o número.

**Ações**
- **Caneta:** escreve por cima da página. Com caneta digital, a espessura acompanha a pressão. Quando o app percebe uma caneta, o toque do dedo passa a rolar a página em vez de escrever (ou sempre, com "Só caneta").
- **Borracha:** apaga o traço inteiro em que tocar.
- **Texto:** toca no lugar e digita; a caixa pode ser editada e apagada depois.
- **Desfazer:** volta a última ação da página. **Limpar página:** pede confirmação.
- As anotações são salvas sozinhas, página por página, logo depois de cada mudança. O PDF original nunca é alterado.

**Estados**
Carregando o PDF: "Abrindo o PDF…". Arquivo que não abre: "Não conseguimos abrir este PDF. Envie de novo ou escolha outro arquivo."

---

## Tela: Flashcards

**Quem acessa:** aluno.
**Chega aqui por:** Mais → Flashcards.

**O que aparece**
Filtro por matéria, botão "Jogar", lista dos cartões (pergunta, começo da resposta, acertos e erros do aluno nele) e "+ Meu flashcard".

**Ações**
- **Jogar:** abre o jogo em tela cheia, como na versão atual: pergunta na frente, toque para virar e ver a resposta grande, botões "Errei" e "Acertei" (e setas do teclado). No fim, o resultado com estrelas. Cada resposta é gravada.
- **+ Meu flashcard / Editar / Apagar** (só os do aluno).

**Estado vazio**
"Nenhum flashcard nesta matéria. Crie o primeiro."

---

## Tela: Minha conta

**Quem acessa:** todos.

**O que aparece**
Nome (editável), email (só leitura), série e "Alterar série" (aluno), metas da semana editáveis (aluno: questões por semana, minutos de foco por semana, provas anteriores por mês), "Restaurar metas sugeridas", "Trocar senha", "Sair". Link para os termos de uso e a política de privacidade.

---

## Tela: Licenças (administradora)

**Quem acessa:** só a administradora.

**O que aparece**
Três números no topo: licenças ativas, bloqueadas, vendidas neste mês. Aviso vermelho se houver avisos da Hotmart com erro. Busca por nome ou email; filtro por situação (Ativa, Bloqueada) e origem (Hotmart, Manual). Tabela: nome, email, data da compra, origem, situação, se o aluno já criou a conta.

**Campos e informações** (liberar à mão)

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Email | email | sim | único |
| Nome | texto | não | |
| Motivo | texto | não | ex.: "cortesia", "comprou com outro email" |

**Ações**
- **+ Liberar email:** cria uma licença ativa com origem Manual.
- **Bloquear / Desbloquear:** pede motivo para bloquear e confirmação.
- **Avisos com erro:** lista os avisos da Hotmart que falharam, com data, email e erro, e o botão "Liberar este email".

**Regras por perfil**
- A administradora não vê tarefas, respostas, resumos próprios nem nada de estudo dos alunos. Esta tela não tem link para nada disso.

**Estado vazio**
"Nenhuma licença ainda. Quando a primeira venda for aprovada na Hotmart, ela aparece aqui."

---

## Textos do sistema

- Botões: Salvar, Cancelar, Nova tarefa, Apagar, Editar, Começar, Encerrar, Próxima, Sair.
- Confirmação de exclusão: "Apagar '<título>'? Isso não pode ser desfeito."
- Sem licença: ver tela Sem licença.
- Erro genérico: "Algo deu errado e não salvamos. Confira sua internet e tente de novo."
- Salvo: "Salvo."

## Dados de exemplo

Dois alunos diferentes, para provar que um não vê nada do outro, mais a administradora.

```
Usuários
- Administradora: admin@exemplo.com
- Aluno 1: Maria Claudia, maria@exemplo.com, 2º ano EM, licença Ativa (Hotmart, 03/11/2026)
- Aluno 2: Pedro Souza, pedro@exemplo.com, 9º ano EF, licença Ativa (Manual, 18/11/2026, "cortesia")
- Sem licença: ana@exemplo.com (conta criada, nenhuma licença)
- Licença bloqueada: lucas@exemplo.com (Hotmart, 10/11/2026; bloqueada 15/11/2026, "reembolso")

Tarefas da Maria Claudia (hoje = 25/11/2026)
1. Lista de função do 2º grau — Matemática — prazo 21/11 — Alta — A fazer (atrasada)
2. Resumo de Revolução Industrial — História — prazo 26/11 — Média — A fazer (vence em 48h)
3. Redação: tema da semana — Produção de texto — prazo 28/11 — Alta — Em andamento
4. Exercícios de leis de Newton — Física — prazo 02/12 — Média — A fazer
5. Ler capítulo 3 da obra do bimestre — Literatura — sem prazo — Baixa — A fazer
6. Revisar células e organelas — Biologia — prazo 18/11 — Média — Concluído em 17/11
7. Vocabulário unidade 4 — Língua inglesa — prazo 20/11 — Baixa — Concluído em 20/11
8. Prova anterior Fuvest 2024 — Matemática — prazo 30/11 — Alta — A fazer

Tarefas do Pedro Souza
1. Classes de palavras — Língua portuguesa — prazo 27/11 — Média — A fazer
2. Mapa dos biomas — Geografia — prazo 24/11 — Alta — Em andamento (atrasada)

Conteúdo de fábrica: os resumos, flashcards, questões, vestibulares e a semana sugerida
que já existem em referencia/pauta-de-estudos-v1.html.
```

## Critérios de aceite

- [ ] O aluno com licença ativa abre direto no Quadro, com a faixa de metas e avisos no topo.
- [ ] Na primeira entrada, o aluno escolhe a série antes de ver o Quadro.
- [ ] Criar uma tarefa faz ela aparecer na coluna certa sem recarregar a página.
- [ ] Mover um cartão para Concluído grava a data de conclusão e risca o título.
- [ ] Uma tarefa com prazo ontem aparece primeiro, com borda vermelha, e gera aviso no topo.
- [ ] Logado como Pedro, nenhuma tarefa, resumo, resposta ou sessão da Maria Claudia aparece em nenhuma tela.
- [ ] Quem entra sem licença (ana) ou com licença bloqueada (lucas) vê só a tela Sem licença, com o WhatsApp do suporte.
- [ ] A administradora sem licença vê a tela Licenças e não tem como chegar a nenhuma tela de estudo.
- [ ] A administradora com licença ativa vê as telas de estudo só com os dados dela, e chega a Licenças pelo menu.
- [ ] Responder uma questão mostra a correção, a resposta comentada e a explicação de cada alternativa.
- [ ] Trocar a série muda a semana sugerida, as metas e o que aparece primeiro em questões.
- [ ] Todas as telas funcionam no celular (375 px) sem rolagem horizontal, e no tema escuro.
- [ ] Cada lista tem estado vazio com texto próprio.
- [ ] O aluno envia um PDF, escreve por cima com a caneta e com texto, fecha, abre de novo e as anotações continuam lá; o PDF original não muda.
- [ ] Logado como Pedro, nenhum PDF nem anotação da Maria Claudia aparece.

## Para a v1.1 (fora do lançamento)

Descritas em detalhe na versão atual (`referencia/`), entram depois:
- **Simulados:** provas anteriores (links oficiais, cartão-resposta A a E ou A a D, cronômetro, gabarito colado com X ou * para anulada, resultado por área, mapa da prova, comparação e evolução) e treino com o banco do app (por matéria, assunto ou completo, modo prova real).
- **Desempenho:** acertos por matéria, evolução mensal, tempo por disciplina, assuntos mais errados e os três que mais precisam de atenção.
- **Espaço para cálculo** com caneta, depois de testado num tablet de verdade.
- **Editor do conteúdo de fábrica** para a administradora.

## A conta que vai chegar depois

- `[PENDENTE: termos de uso e política de privacidade]` — o link em Minha conta e em Criar conta precisa apontar para o texto final.
- `[PENDENTE: conferência do conteúdo de fábrica por um professor]`.

## Decidir depois de usar

- `[DESCOBRIR NO USO: quantos dias a tarefa concluída fica visível]` — por enquanto: 30 dias.
