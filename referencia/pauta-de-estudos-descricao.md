Use a skill prd-do-seu-jeito.

Quero montar o plano do meu sistemaPauta de Estudos Pauta de Estudos

App de organização de estudos para a Maria Claudia, em um único arquivo HTML, sem senha e sem servidor. Os dados ficam no navegador de quem usa.

Versão publicada: https://claude.ai/artifact/4u1sHnc2kheuuXFk5t1t7T

## Entrada por série
- Tela de entrada local: nome e série (9º ano do fundamental, 1º, 2º ou 3º ano do ensino médio). Não há senha nem conta online.
- O botão "Alterar nome ou série" fica no topo.
- A série muda: o cronograma sugerido, as metas semanais, os avisos, o foco em vestibular e quais resumos e questões aparecem primeiro. O filtro "mostrar só o que o app sugere" pode ser desmarcado para ver tudo.
- Foco em vestibular: nenhum no 9º ano, só para conhecer o formato no 1º, começa no 2º (uma prova anterior por mês) e é mais forte no 3º (uma por semana).
- As metas (questões por semana, horas de foco, provas por mês) são sugestões do app e podem ser alteradas. A série mínima de cada resumo e questão também é orientação do app, não currículo oficial.

## Abas
1. **Quadro:** Kanban com A fazer, Em andamento e Concluído; prazo, prioridade e matéria; alertas de tarefas atrasadas e de prazos em até 48 horas.
2. **Cronograma:** semana editável com blocos de 50 minutos, de segunda a sexta, das 14h às 18h, cobrindo as 19 matérias (Matemática duas vezes). Há botão para carregar a semana sugerida da série. No 2º e no 3º ano entram blocos de fim de semana para provas anteriores, redação e revisão de erros.
3. **Banco de resumos:** resumos do próprio app, por matéria, mais os resumos do aluno; marcar como lido.
4. **Flashcards:** jogo em tela cheia; a pergunta fica na frente e, ao virar, a resposta aparece em tamanho grande; setas para errei e acertei.
5. **Questões:** banco por matéria, assunto, nível, instituição, ano e resolvidas ou pendentes; resposta comentada; explicação de cada alternativa; caderno de erros com motivo e anotação; salvar para revisar; o aluno pode cadastrar questões.
6. **Simulados:**
   - *Provas anteriores:* links oficiais e cartão-resposta com cronômetro (ver abaixo).
   - *Treino com o banco do app:* por matéria, por assunto ou completo; cronômetro; modo prova real com tempo limite e encerramento automático; correção, resultado por disciplina e evolução.
7. **Desempenho:** acertos por matéria, evolução mensal, tempo por disciplina, assuntos mais errados e os três assuntos que mais precisam de atenção, com sugestão do que estudar.
8. **Foco:** Pomodoro com tela de foco, contagem de saídas da aba e registro das sessões.

O app não tem aba de grupos de estudo.

## Metas e avisos
Aparecem no topo de todas as telas: questões da semana, tempo de foco da semana, provas anteriores no mês, aviso de ritmo abaixo da meta e aviso de última prova anterior antiga (a partir do 2º ano).

## Provas anteriores
- O app **não contém questões nem gabaritos de provas reais**. Ele traz links para os sites oficiais do ENEM (Inep), da Fuvest e da Unicamp (Comvest), e permite adicionar outros vestibulares com nome e link https.
- Fluxo: o aluno baixa o caderno no site oficial, resolve, marca A a E (ou A a D) no cartão-resposta com cronômetro e, se quiser, tempo limite; pode marcar questões para revisar.
- Gabarito: o aluno cola as letras do gabarito oficial, antes ou depois da prova. X ou * indica questão anulada, que sai da contagem.
- Resultado: acertos, percentual, tempo, em branco, resultado por área (formato `Nome:1-45, Outra:46-90`), mapa da prova, questões para revisar, comparação com a prova anterior corrigida e gráfico de evolução.
- Valores padrão: Fuvest 1ª fase com 90 questões e 300 minutos (edição de 2024, segundo a imprensa). Para o ENEM, 90 questões por dia e áreas 1–45 e 46–90 são conhecimento geral, sem fonte aberta. Na Unicamp o número de questões fica em branco. Tudo é editável e deve ser conferido no edital do ano da prova.
- Se o aluno anexar o PDF da prova e do gabarito numa conversa, as questões podem ser extraídas e conferidas com o gabarito antes de entrar no banco.

## Espaço para cálculo
Painel abaixo das alternativas (questão, treino e cartão-resposta) para quem usa tablet com caneta: caneta em três cores e três espessuras com sensibilidade à pressão, borracha, desfazer, limpar e mais espaço. O toque do dedo é ignorado quando a caneta é detectada, ou com a opção "Só caneta". O rascunho fica só na memória enquanto o app está aberto.

## Dados e privacidade
- Tudo é salvo no navegador (armazenamento local). Trocar de aparelho ou limpar o navegador perde os dados, a menos que use o Backup (copiar e colar um JSON).
- "Começar do zero" apaga os dados e volta para a tela de entrada.
- Nada é enviado a servidor.

## Limitações conhecidas
- O conteúdo dos resumos e das questões do app é autoral e deve ser conferido por um professor.
- O navegador não consegue bloquear outros aplicativos durante o Pomodoro; o app só conta as saídas da aba.
- As provas feitas ainda não entram no Desempenho por assunto.
- O rascunho de cálculo não é salvo ao recarregar a página.
- O espaço de cálculo foi testado com mouse e com eventos simulados de caneta, não num tablet de verdade.
- Os links oficiais do Inep, da Fuvest e da Comvest não foram abertos para conferência durante a construção; clique neles para confirmar.
