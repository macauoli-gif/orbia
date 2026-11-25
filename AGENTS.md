# Pauta de Estudos

App de organização de estudos (9º ano EF ao 3º ano EM), vendido por licença vitalícia na Hotmart. Cada aluno só vê os próprios estudos; a administradora só vê dados da compra.
React + Vite + Supabase + Vercel, sem outra biblioteca no app. Perfis: aluno (`src/pages/AppAluno.jsx`) e administradora (`src/pages/AppAdmin.jsx`). Quem entra onde: `src/lib/licenca.js`.
Fonte das decisões: `PLANO-DO-PROJETO.md`, `PRD-FRONTEND.md`, `PRD-BACKEND.md`. Quando mudar uma decisão, mude lá primeiro.

## Onde o código novo vai

Uma pergunta decide: **"isto continuaria verdade se a tela fosse outra?"**

- **Sim → `src/lib/*.js`.** Regra pura: cálculo, recorte, decisão, formatação.
  Sem React, sem banco, sem `window`. Roda no Node sem bundler (import com
  `.js` explícito). É a única camada com teste.
- **Não → `src/screens/*.jsx`.** Estado de interface, layout, o que se toca.
  A tela **pede a decisão à lib**; não decide.
- `src/lib/dados.js` — **única porta do banco.** Nenhuma tela chama o Supabase
  (nem o mock) direto. Toda função devolve `{ data, erro }`.
- `src/lib/supabase.js` — a conexão. Só `dados.js` importa.

Três consequências práticas:

1. **`if` de negócio dentro de tela vai para `lib`**, mesmo com três linhas —
   se a linha decide *o que é verdade*, e não *o que aparece*.
2. **Constante compartilhada tem um dono só.** Status e prioridade (`lib/tarefas.js`),
   séries (`lib/series.js`), tipos de bloco (`lib/cronograma.js`), níveis e motivos
   de erro (`lib/questoes.js`). O texto é **idêntico** ao CHECK do banco, com
   acento e maiúscula (`'A fazer'`, `'Média'`, `'2º ano EM'`).
3. **Arquivo grande não é problema; arquivo confuso é.** Quebre quando o arquivo
   passar a ter *dois motivos para mudar*.

**A unidade é o aluno.** Toda tabela de estudo tem `user_id`; `dados.js` injeta,
as telas nunca passam. Conteúdo de fábrica = `user_id` vazio, igual para todos.
A administradora **não vê nada** de estudo: nem no mock, nem na RLS.
O mock e o seed têm **dois alunos** (Maria Claudia e Pedro) de propósito: é o
que prova a separação. Não reduza para um.

`src/lib/fabrica.js` foi gerado a partir de `referencia/pauta-de-estudos-v1.html`
(a versão antiga). Na Etapa 7 vira o seed das tabelas de conteúdo.

## Régua de verificação

```bash
npm run check
```

Build + lint + testes. **Fecha em zero** — não há linha de base herdada aqui.
Aviso novo é seu e é de agora; conserte no mesmo lote.
No Windows, se `npm` der erro de "execução de scripts desabilitada", use
`npm.cmd` (e `npx.cmd`). Nunca mexa na política de execução do Windows.

Nada disso prova que a tela funciona. Verde com a tela em branco é rotina:
abra a tela e olhe.

**Todo bug corrigido em `src/lib/` nasce com teste junto** (`tests/*.mjs`),
no mesmo lote. Build e lint não pegam regra errada.

## Antes de subir pro GitHub

Diff que toca em `src/lib/supabase.js`, `src/lib/dados.js`, `src/lib/licenca.js`,
políticas RLS, migrations, ou no receptor da Hotmart (liberação e bloqueio de
licença) → rodar a revisão de código (`/code-review` no Claude Code, `/review`
no Codex) antes de subir. É por caminho, não por julgamento: nesses arquivos o
erro não aparece na tela. RLS frouxa vaza o estudo de um aluno para outro sem
nenhum sintoma; licença liberada errada é produto dado de graça.

## Deploy

Ainda não está no ar (etapa 9). O padrão desta casa: a pessoa diz "sobe pro
GitHub", o agente sobe com git (`git add`, `git commit`, `git push`), e a Vercel
publica sozinha. A pessoa não digita comando: o agente roda o npm e o git na
pasta dela.

## Armadilhas desta base

- **Tabela nova nasce fechada para o app.** Toda tabela precisa de `grant` escrito
  na migration, só para `authenticated` (e `service_role`). Erro "permission denied
  for table (42501)" é GRANT faltando, não RLS. Nunca `grant all`, nunca `to anon`.
- **O app ainda roda com dados de mentira** (`USAR_MOCK = true` em
  `src/lib/mockData.js`). O mock imita a RLS dentro de `dados.js`; quando o
  Supabase entrar, a regra de verdade passa a ser a RLS, e o miolo de
  `dados.js` é que muda — nenhuma tela.
- **`tarefas.concluida_em` é obrigatório em `'Concluído'` e vazio nos outros.**
  Mudar status sempre por `comStatus()` (`lib/tarefas.js`); senão o banco recusa.
- **Blocos de "Prova anterior" da semana sugerida não têm matéria**
  (`materia_id` vazio). A coluna no banco precisa aceitar vazio para os tipos
  diferentes de `'Estudo'`.
- **Datas:** "hoje" sempre por `hojeISO()` (`lib/datas.js`). `toISOString()`
  vira UTC e pula um dia depois das 21h no Brasil.
- **Licença é por email, não por id**: ela nasce na Hotmart antes de a conta
  existir. Compare sempre com `normalizarEmail()`, e só conte licença com email
  confirmado.

## Higiene de código (vale para toda mudança)

Cada função morta é uma mentira que o próximo leitor precisa desmascarar.

- **Ao remover um recurso, cace a cadeia inteira no mesmo lote:** a função em
  `lib/dados.js` → a exposição no contexto → os chamadores nas telas → a query.
  Função exposta que nenhuma tela chama é lixo.
- **Zero avisos novos de lint.** Aviso antigo que você encontrar, limpe se já
  estiver tocando no arquivo.
- **Código comentado não é backup, o git é.** Comentário explica *por quê*.
  Bloco comentado sem explicação, apague.
- **Antes de apagar, prove que está morto:** grep pelo símbolo no projeto
  inteiro, e verifique quem chama o *wrapper*, não só a função. Depois confira
  órfãos: quem só era chamado pelo que você removeu morre no mesmo commit.
- **Estado que nunca muda ou nunca é lido é lixo** — `useState` sem setter,
  prop que ninguém consome, flag que ninguém liga.
- **Limpeza NUNCA toca no banco nem em arquivo de dado.** Tabela ou coluna
  órfã continua existindo até decisão de quem é dono. Na dúvida, pergunte.

## O que entra neste arquivo

Ele é lido inteiro em toda sessão — cada linha custa em todas elas. Só entra o
que o código não conta sozinho:

- ✅ armadilha ("X parece seguro mas faz Y"), o porquê de uma decisão,
  convenção que **difere** do padrão da linguagem, proibição ("nunca faça Z"),
  comando não óbvio, o que a verificação exige.
- ❌ árvore de pastas, lista de dependências, resumo de arquitetura, assinatura
  de função, boa prática genérica, histórico do que foi feito. `ls` e o
  `package.json` já respondem isso — e, quando envelhecem aqui, passam a
  mentir.
