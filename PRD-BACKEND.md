# PRD Backend — Pauta de Estudos

> Especificação dos dados e das permissões. Lido na etapa de criar o banco no Supabase.
> O SQL não está aqui: ele é escrito na hora de construir, a partir desta descrição.
> Fonte das decisões: `PLANO-DO-PROJETO.md`.

## Convenções

- Tabelas no plural, em minúsculo, sem acento, com underline: `cronograma_blocos`.
- Colunas em minúsculo com underline: `concluida_em`, `materia_id`.
- Toda tabela tem `id` e `created_at`.
- Chave estrangeira termina em `_id`.
- Campo de lista fechada vira CHECK, e o texto é **idêntico** ao usado na interface (com acento e maiúscula: `'A fazer'`, `'Média'`).
- Datas como `date` ou `timestamptz`.
- Arquivos: só os PDFs de resumo dos alunos, no Storage (ver "Arquivos").

---

## Unidade principal

**Aluno.** Vai existir mais de um? **Sim**, um por licença vendida. Ninguém trabalha em mais de um: cada aluno só enxerga os próprios dados, e a administradora não enxerga os estudos de ninguém.

Consequência: toda tabela de dado do aluno tem `user_id` (dono do registro), e toda regra de acesso é "só o dono, e só com licença ativa". Não há tabela de membros. O conteúdo de fábrica é compartilhado: registros com `user_id` vazio são do app e todo aluno com licença lê; registros com `user_id` preenchido são do aluno.

O mock e o seed têm **dois alunos** (Maria Claudia e Pedro), para provar a separação.

---

## Tabela `profiles`

Liga o login à pessoa e guarda o perfil dela.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave; é o próprio código do login |
| nome | text | sim | |
| email | text | sim | único, em minúsculo |
| role | text | sim | CHECK: `'aluno'`, `'admin'`; padrão `'aluno'` |
| serie | text | não | CHECK: `'9º ano EF'`, `'1º ano EM'`, `'2º ano EM'`, `'3º ano EM'`; vazio até a primeira entrada |
| meta_questoes_semana | integer | sim | padrão da série; ≥ 0 |
| meta_foco_min_semana | integer | sim | padrão da série; ≥ 0 |
| meta_provas_mes | integer | sim | padrão da série; ≥ 0 |
| so_sugerido | boolean | sim | padrão verdadeiro ("mostrar só o que o app sugere") |
| created_at | timestamptz | sim | automático |

Criado por gatilho quando alguém se cadastra, sempre como `'aluno'`. Só existe uma administradora, definida à mão no banco. Ninguém consegue mudar o próprio `role`.

---

## Tabela `licencas`

Uma licença por email comprador. É ela que decide se o aluno entra.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| email | text | sim | único, em minúsculo |
| nome | text | não | o nome que veio da Hotmart ou que a administradora digitou |
| status | text | sim | CHECK: `'Ativa'`, `'Bloqueada'` |
| origem | text | sim | CHECK: `'Hotmart'`, `'Manual'` |
| hotmart_transacao | text | não | código da transação da Hotmart |
| comprado_em | timestamptz | sim | data da aprovação (ou da liberação manual) |
| bloqueada_em | timestamptz | não | |
| motivo | text | não | ex.: "reembolso", "chargeback", "cortesia" |
| created_at | timestamptz | sim | automático |

**Regra de negócio:** licença ativa = existe linha com o email do login (confirmado) e `status = 'Ativa'`. A ligação é pelo email, não pelo id, porque a licença nasce antes de o aluno criar a conta.

---

## Tabela `hotmart_eventos`

Registro de todo aviso que a Hotmart mandou. Serve para conferir e consertar.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| evento | text | sim | o nome do evento enviado pela Hotmart |
| transacao | text | não | |
| email | text | não | email do comprador |
| payload | jsonb | sim | o aviso inteiro |
| processado | boolean | sim | padrão falso |
| erro | text | não | preenchido se falhou |
| created_at | timestamptz | sim | automático |

---

## Conteúdo de fábrica e do aluno

### Tabela `materias`
As 19 matérias da versão atual, com cor e ordem. Só fábrica.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| nome | text | sim | único; o texto exato da versão atual |
| cor | text | sim | tom da cor (hex ou matiz) |
| ordem | integer | sim | |
| created_at | timestamptz | sim | automático |

### Tabela `resumos`
Só do aluno (decidido em 25/11/2026: não há resumos do app).

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| tipo | text | sim | CHECK: `'Digitado'`, `'PDF'` |
| arquivo_path | text | só no PDF | caminho no Storage: `<user_id>/<resumo_id>.pdf`; obrigatório quando `tipo = 'PDF'`, vazio no Digitado |
| arquivo_nome | text | não | nome original do arquivo |
| paginas | integer | não | número de páginas do PDF |
| materia_id | uuid | sim | → materias |
| titulo | text | sim | |
| texto | text | só no Digitado | obrigatório quando `tipo = 'Digitado'` |
| created_at | timestamptz | sim | automático |

### Tabela `resumo_anotacoes`
As anotações de um resumo em PDF, uma linha por página. Coordenadas de 0 a 1, relativas à página (funcionam em qualquer tamanho de tela).

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| resumo_id | uuid | sim | → resumos; ao apagar o resumo, apaga junto; único por (resumo_id, pagina) |
| pagina | integer | sim | ≥ 1 |
| tracos | jsonb | sim | lista de `{cor, espessura, pontos: [[x, y, pressão]]}`; padrão `[]` |
| textos | jsonb | sim | lista de `{id, x, y, texto, cor}`; padrão `[]` |
| atualizado_em | timestamptz | sim | |
| created_at | timestamptz | sim | automático |

### Tabela `resumos_lidos`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| resumo_id | uuid | sim | → resumos; único por (user_id, resumo_id) |
| created_at | timestamptz | sim | quando marcou como lido |

### Tabela `flashcards`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | não | vazio = do app |
| materia_id | uuid | sim | → materias |
| frente | text | sim | a pergunta |
| verso | text | sim | a resposta |
| serie_minima | text | não | |
| created_at | timestamptz | sim | automático |

### Tabela `flashcard_respostas`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| flashcard_id | uuid | sim | → flashcards |
| acertou | boolean | sim | |
| created_at | timestamptz | sim | quando respondeu |

### Tabela `questoes`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | não | vazio = do app |
| materia_id | uuid | sim | → materias |
| assunto | text | sim | |
| nivel | text | sim | CHECK: `'Fácil'`, `'Médio'`, `'Difícil'` |
| instituicao | text | não | |
| ano | integer | não | |
| enunciado | text | sim | |
| alternativas | jsonb | sim | lista de `{letra, texto, explicacao}`, 4 ou 5 itens |
| correta | text | sim | CHECK: `'A'` a `'E'`, e precisa existir nas alternativas |
| resposta_comentada | text | não | |
| serie_minima | text | não | nas questões, é a série da questão: a sugestão mostra só as da série do aluno (25/11/2026). Vazia = todas |
| created_at | timestamptz | sim | automático |

Conteúdo de fábrica de questões (25/11/2026): autorais, no estilo e no nível de provas de instituições reconhecidas pelo MEC (ENEM, Fuvest/USP, Unicamp, UFRGS, UERJ, UnB, IFs e Colégio Pedro II), com "Nível ENEM" etc. em `instituicao`. Não copiam questões reais (direitos autorais, app vendido). Do 9º ano ao 3º ano o nível sobe; o 3º ano é todo Difícil. Questão nova entra por migration nova (`node scripts/gerar-seed.mjs questoes <prefixo>`), sem reescrever a de fábrica.

### Tabela `respostas_questoes`
Toda tentativa, para o Desempenho da v1.1 já nascer com histórico.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| questao_id | uuid | sim | → questoes |
| escolhida | text | sim | CHECK: `'A'` a `'E'` |
| acertou | boolean | sim | |
| tempo_seg | integer | não | ≥ 0 |
| created_at | timestamptz | sim | quando respondeu |

### Tabela `caderno_erros`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| questao_id | uuid | sim | → questoes; único por (user_id, questao_id) |
| motivo | text | não | CHECK: `'Não sabia o conteúdo'`, `'Falta de atenção'`, `'Interpretação'`, `'Conta errada'`, `'Faltou tempo'` |
| anotacao | text | não | |
| revisar | boolean | sim | padrão verdadeiro ("salvar para revisar") |
| created_at | timestamptz | sim | automático |

### Tabela `tarefas`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| titulo | text | sim | até 120 caracteres |
| materia_id | uuid | sim | → materias |
| prazo | date | não | |
| prioridade | text | sim | CHECK: `'Alta'`, `'Média'`, `'Baixa'`; padrão `'Média'` |
| status | text | sim | CHECK: `'A fazer'`, `'Em andamento'`, `'Concluído'`; padrão `'A fazer'` |
| observacao | text | não | |
| concluida_em | timestamptz | não | obrigatório quando `status = 'Concluído'`; vazio nos outros |
| created_at | timestamptz | sim | automático |

**Índices úteis:** (user_id, status), (user_id, prazo).

### Tabela `cronograma_blocos`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| dia_semana | integer | sim | CHECK 1 (segunda) a 7 (domingo) |
| inicio | time | sim | |
| fim | time | sim | CHECK: fim > inicio |
| materia_id | uuid | só no Estudo | → materias; vazia só em bloco que não é `'Estudo'` (ex.: "Prova anterior" do fim de semana, que vem assim da versão atual). Decidido na construção, 25/11/2026. |
| titulo | text | sim | "o que fazer" |
| tipo | text | sim | CHECK: `'Estudo'`, `'Prova anterior'`, `'Redação'`, `'Revisão de erros'` |
| tarefa_id | uuid | não | → tarefas; ao apagar a tarefa, fica vazio |
| feito_em | date | não | o dia em que foi marcado feito (vale para aquela semana) |
| created_at | timestamptz | sim | automático |

A semana sugerida de cada série não é tabela: fica no código, copiada da versão atual, e "Carregar semana sugerida" troca os blocos do aluno por ela.

### Tabela `sessoes_foco`
| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave |
| user_id | uuid | sim | dono |
| materia_id | uuid | não | |
| tarefa_id | uuid | não | ao apagar a tarefa, fica vazio |
| inicio | timestamptz | sim | |
| minutos | integer | sim | > 0 |
| saidas_aba | integer | sim | ≥ 0 |
| completou | boolean | sim | |
| created_at | timestamptz | sim | automático |

---

## Permissões

Escrito em português. Vira RLS na hora de construir. "Aluno com licença" = logado, email confirmado, e com licença `'Ativa'` para o email dele.

### `profiles`
- **Ver:** só o próprio perfil. A administradora **não** lê o perfil dos alunos (série e metas já são estudo); para a coluna "conta criada" da tela Licenças ela recebe só a lista de emails que já criaram conta (função `emails_com_conta()`). Decidido na construção, 25/11/2026.
- **Criar:** só o gatilho de cadastro.
- **Editar:** o próprio nome, série, metas e `so_sugerido`. Ninguém edita `role` nem `email` pelo app.
- **Apagar:** ninguém pelo app.
- **Sem login:** nada.

### `licencas`
- **Ver:** a administradora vê todas. O aluno vê só a linha do próprio email (para a tela Sem licença saber o motivo).
- **Criar / Editar:** a administradora (liberar à mão, bloquear, desbloquear) e o receptor da Hotmart.
- **Apagar:** ninguém (bloquear em vez de apagar, para não perder o histórico de vendas).
- **Sem login:** nada.

### `hotmart_eventos`
- **Ver:** só a administradora.
- **Criar:** só o receptor da Hotmart.
- **Editar / Apagar:** ninguém pelo app.

### Conteúdo de fábrica (`materias` e as linhas com `user_id` vazio de `flashcards`, `questoes`)
- **Ver:** aluno com licença e a administradora.
- **Criar / Editar / Apagar:** só a administradora (na v1, pela construção; o editor na tela vem na v1.1).
- **Sem login ou sem licença:** nada.

### Dados do aluno (`tarefas`, `cronograma_blocos`, `sessoes_foco`, `resumos`, `resumo_anotacoes`, `resumos_lidos`, `flashcard_respostas`, `respostas_questoes`, `caderno_erros` e as linhas com `user_id` preenchido de `flashcards`, `questoes`)
- **Ver / Criar / Editar / Apagar:** só o dono (`user_id` = quem está logado), e só com licença ativa.
- **Administradora:** **nada** dos alunos. Não vê, não cria, não edita, não apaga. Se o email dela tiver licença ativa (cortesia, 25/11/2026), ela é dona dos próprios estudos como qualquer aluno: a mesma regra (`user_id` = ela e `tem_licenca()`), sem nenhuma exceção para admin.
- **Sem login ou sem licença:** nada.

Toda tabela recebe GRANT só para `authenticated`. Nada liberado para `anon`.

---

## Fluxo de cadastro e liberação

1. O aluno compra na Hotmart com o email dele.
2. A Hotmart avisa o app; o receptor cria a licença `'Ativa'`, origem `'Hotmart'`, para aquele email.
3. O aluno cria a conta no app com o mesmo email e confirma pelo link que chega no email (**confirmação de email obrigatória**: sem ela, qualquer pessoa poderia criar conta com o email de quem comprou).
4. Entra, escolhe a série e começa no Quadro.
5. Sem licença para o email, ou licença bloqueada: só a tela Sem licença, com o WhatsApp (71) 90078-6252.
6. A administradora pode liberar um email à mão, ou bloquear e desbloquear qualquer licença, na tela Licenças.

O cadastro público fica aberto (a pessoa cria a própria conta), mas sem licença ativa nenhuma tabela devolve dado.

## Processos automáticos

### Receptor da Hotmart
- **Gatilho:** a Hotmart chama o endereço do receptor (uma função no Supabase) a cada evento do produto.
- **Passos:** 1. confere o código secreto da Hotmart (hottok) contra o guardado no Supabase; se não bater, responde recusado e não grava nada. 2. grava o aviso em `hotmart_eventos`. 3. compra aprovada ou completa: cria a licença ou, se já existir, volta para `'Ativa'`. 4. reembolso, chargeback ou cancelamento: muda para `'Bloqueada'`, com `bloqueada_em` e o motivo. 5. marca o aviso como processado.
- **Resultado:** a licença fica certa sem intervenção.
- **Se falhar:** grava o erro no aviso e responde com erro para a Hotmart tentar de novo; a tela Licenças mostra os avisos com erro. Receber o mesmo aviso duas vezes não pode criar licença duplicada (o email é único).
- **A conferir na construção:** os nomes exatos dos eventos e o formato do aviso, na documentação atual da Hotmart.

### Criar perfil no cadastro
- **Gatilho:** nova conta criada.
- **Passos:** cria a linha em `profiles` com `role = 'aluno'`, nome e email em minúsculo, metas zeradas até a escolha da série.

## Arquivos

Um bucket privado no Storage, `resumos`, só com os PDFs de resumo dos alunos.
- Caminho: `<user_id>/<resumo_id>.pdf`. Só PDF (`application/pdf`), até 20 MB.
- **Ver, enviar, apagar:** só o dono (a primeira pasta do caminho é o id de quem está logado) e só com licença ativa. A administradora não vê nada.
- O arquivo não é alterado depois de enviado; as anotações moram em `resumo_anotacoes`.
- Apagar o resumo apaga o arquivo.

## Para a v1.1 (fora do lançamento)

- `vestibulares` (fábrica e do aluno: nome, link https, número de questões, tempo, alternativas A–E ou A–D, áreas), `provas_feitas` (respostas, gabarito, anuladas, tempo, resultado) e `simulados_treino` — para a aba Simulados.
- Desempenho usa `respostas_questoes`, `flashcard_respostas`, `sessoes_foco` e `provas_feitas`; não precisa de tabela nova.

## Critérios de aceite

- [ ] Uma conta nova sem licença não recebe nenhuma linha de nenhuma tabela, nem do conteúdo de fábrica.
- [ ] Uma conta com email não confirmado não é tratada como licenciada, mesmo que exista licença para o email.
- [ ] Logado como Maria Claudia, uma consulta direta a `tarefas` não devolve nenhuma linha do Pedro (e vice-versa) — testado, não presumido.
- [ ] Logada como administradora, consultas a `tarefas`, `respostas_questoes`, `sessoes_foco` e `caderno_erros` devolvem zero linhas de alunos (com licença de cortesia, só as dela).
- [ ] O aluno não consegue mudar o próprio `role` nem criar ou editar licença.
- [ ] Um aviso da Hotmart sem o hottok correto é recusado e não cria licença.
- [ ] Um aviso de compra aprovada cria a licença; um de reembolso para o mesmo email a bloqueia; o mesmo aviso repetido não duplica nada.
- [ ] Um aluno com licença bloqueada perde o acesso a tudo na próxima consulta.
- [ ] Logado como Pedro, nem a tabela `resumos` nem o bucket `resumos` devolvem arquivo ou anotação da Maria Claudia.
- [ ] Os valores de status, prioridade, nível, tipo e motivo do banco são idênticos aos da interface.
- [ ] Todo campo obrigatório recusa cadastro vazio; `concluida_em` é recusado vazio quando o status é `'Concluído'`.

## A conta que vai chegar depois

- `[PENDENTE: produto na Hotmart com hottok e endereço do aviso configurados]` — sem isso, só liberação manual.
- `[PENDENTE: conta de envio de email (SMTP) para a confirmação de conta]` — o email embutido do Supabase só aguenta poucos envios por hora.
- `[PENDENTE: planos pagos do Supabase e da Vercel antes de vender]` — uso comercial e cópia de segurança.

## Decidir depois de usar

- `[DESCOBRIR NO USO: limitar o número de aparelhos por conta]` — por enquanto: sem limite.
