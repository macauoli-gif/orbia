# Pauta de Estudos

App de organização de estudos (9º ano EF ao 3º ano EM), vendido por licença vitalícia na Hotmart. Cada aluno só vê os próprios estudos; a administradora só vê dados da compra.
React + Vite + Supabase + Vercel. Bibliotecas no app: só `@supabase/supabase-js` e `pdfjs-dist` (aprovada em 25/11/2026 para mostrar os resumos em PDF; carregada só quando um PDF é aberto, em `src/components/pdf.js`). Nenhuma outra sem a dona do projeto aprovar. Perfis: aluno (`src/pages/AppAluno.jsx`) e administradora (`src/pages/AppAdmin.jsx`). Quem entra onde: `src/lib/licenca.js`.
Fonte das decisões: `PLANO-DO-PROJETO.md`, `PRD-FRONTEND.md`, `PRD-BACKEND.md`. Quando mudar uma decisão, mude lá primeiro.

## Onde o código novo vai

Uma pergunta decide: **"isto continuaria verdade se a tela fosse outra?"**

- **Sim → `src/lib/*.js`.** Regra pura: cálculo, recorte, decisão, formatação.
  Sem React, sem banco, sem `window`. Roda no Node sem bundler (import com
  `.js` explícito). É a única camada com teste.
- **Não → `src/screens/*.jsx`.** Estado de interface, layout, o que se toca.
  A tela **pede a decisão à lib**; não decide.
- `src/lib/dados.js` — **única porta do banco.** Nenhuma tela chama o Supabase
  (nem o mock) direto. Toda função devolve `{ data, erro }`. Ela só escolhe o
  miolo: `dados-supabase.js` (o banco, `USAR_MOCK = false` em `mockData.js`) ou
  `dados-mock.js` (dados de mentira que imitam a RLS; os testes rodam com ele).
  **Função nova vai nos DOIS miolos e na porta** — `tests/miolos.mjs` confere.
- `src/lib/supabase.js` — a conexão. Só `dados-supabase.js` importa.

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
(a versão antiga). Na Etapa 7 vira o seed das tabelas de conteúdo. **Não há
resumos do app** (decidido em 25/11/2026): a aba Resumos é só do aluno.

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

**Depois de QUALQUER migration, regenere `tests/_schema-snapshot.json`** (tabela →
colunas, tirado do banco real com `information_schema.columns`). O
`check-schema` e o `colunas-gravadas` comparam o código com esse retrato:
retrato velho não falha, passa verde mentindo.

**Banco:** projeto Supabase `pauta-de-estudos` (São Paulo), na organização da
dona do app. Mudança no banco = arquivo novo em `supabase/migrations/` (data no
nome) + aplicar com a ferramenta do Supabase. O SQL nunca existe só no painel.
O conteúdo de fábrica é gerado (`node scripts/gerar-seed.mjs fabrica`); não
edite a migration dele à mão.

## Antes de subir pro GitHub

Diff que toca em `src/lib/supabase.js`, `src/lib/dados*.js`, `src/lib/licenca.js`,
políticas RLS ou do Storage, migrations, ou no receptor da Hotmart (liberação e bloqueio de
licença) → rodar a revisão de código (`/code-review` no Claude Code, `/review`
no Codex) antes de subir. É por caminho, não por julgamento: nesses arquivos o
erro não aparece na tela. RLS frouxa vaza o estudo de um aluno para outro sem
nenhum sintoma; licença liberada errada é produto dado de graça.

## Deploy

No ar em https://pauta-de-estudos-mariaclaudiaoliveiraaraujoo-8447.vercel.app
(projeto Vercel `pauta-de-estudos`, ligado ao GitHub `macauoli-gif/orbia`, branch
`main`). A pessoa diz "sobe pro GitHub", o agente roda a régua e sobe com git
(`git add`, `git commit`, `git push`), e a Vercel publica sozinha em ~1 min.
A pessoa não digita comando: o agente roda o npm e o git na pasta dela.

- **Plano grátis (Hobby) da Vercel é só para uso não comercial.** Antes de vender:
  plano Pro (Vercel e Supabase), como está no plano do projeto.
- **Proteção da Vercel em nível padrão** (`prod_deployment_urls_and_all_previews`):
  o endereço principal é público; as versões de teste pedem login da Vercel.
  Não volte para `all_except_custom_domains`: isso tranca o app para os alunos.
- **Variáveis na Vercel:** o app só usa `VITE_SUPABASE_URL` e
  `VITE_SUPABASE_PUBLISHABLE_KEY`. As `POSTGRES_*` e `SUPABASE_*` vieram da
  integração Supabase da Vercel e não são usadas. **Nunca crie variável `VITE_` com
  segredo** (service role, senha): tudo que começa com `VITE_` vai para o navegador.
- **Endereço novo do app** (domínio próprio, por exemplo) precisa entrar no
  Supabase em Authentication → URL Configuration, senão o link de confirmação de
  conta e o de "esqueci a senha" levam para o lugar errado.

## Armadilhas desta base

- **Tabela nova nasce fechada para o app.** Toda tabela precisa de `grant` escrito
  na migration, só para `authenticated` (e `service_role`). Erro "permission denied
  for table (42501)" é GRANT faltando, não RLS. Nunca `grant all`, nunca `to anon`.
- **Quem protege os dados é a RLS do banco, não o app.** As conferências em
  `dados-supabase.js` só dão mensagem clara antes de o banco recusar. Teste de
  separação de verdade = no banco, simulando a pessoa (`set local role
  authenticated` + `request.jwt.claims`), não na tela.
- **"Aluno com licença" = `tem_licenca()` no banco**: logado, email
  confirmado, licença `'Ativa'` para o email. Toda regra de estudo usa ela.
  A administradora não lê `profiles` de aluno; a coluna "conta criada" vem de
  `emails_com_conta()`. Os 4 avisos do Supabase sobre essas funções serem
  chamáveis são de propósito (ver a migration de índices).
- **Contas de teste** (`admin@`, `maria@`, `pedro@`, `ana@`, `lucas@exemplo.com`)
  existem no banco real, com a senha em `.env.local` (`SENHA_CONTAS_TESTE`, fora
  do git). `admin@exemplo.com` é administradora: **apagar essas contas antes
  de vender** com `supabase/limpar-dados-de-exemplo.sql` (instruções dentro;
  a trava recusa enquanto não houver administradora de verdade).
- **O PDF de exemplo da Maria no mock** (`exemplo:/exemplos/...`) não existe no
  banco: lá, PDF só entra pelo app (Storage), porque o CHECK exige o arquivo
  no caminho `<user_id>/<resumo_id>.pdf`.
- **`tarefas.concluida_em` é obrigatório em `'Concluído'` e vazio nos outros.**
  Mudar status sempre por `comStatus()` (`lib/tarefas.js`); senão o banco recusa.
- **Blocos de "Prova anterior" da semana sugerida não têm matéria**
  (`materia_id` vazio). O banco aceita vazio só em bloco que não é `'Estudo'`
  (CHECK `cronograma_materia_no_estudo`).
- **O banco devolve hora como `"14:00:00"`**; `dados-supabase.js` corta para
  `"14:00"` (`hhmm`). Coluna `time` nova precisa do mesmo corte.
- **Resumos em PDF: o arquivo original nunca muda.** Anotação (caneta e texto)
  mora em `resumo_anotacoes`, uma linha por página, com coordenadas de 0 a 1
  relativas à página. Não "queime" anotação dentro do PDF.
- **pdf.js 6 fecha o documento por `doc.loadingTask.destroy()`**, não por
  `doc.destroy()` (que não existe e derruba a tela). Use `fecharPdf()`.
- **`public/pdfjs/` é gerado** por `scripts/copiar-pdfjs.mjs` (roda sozinho
  antes do dev e do build) a partir da versão instalada. Não edite nem suba
  para o git; se o PDF abrir sem fontes, é essa pasta faltando.
- **No mock, os PDFs moram no IndexedDB do navegador** (`dados-mock.js`); os de
  exemplo, em `public/exemplos/`. No banco, é o bucket privado `resumos`,
  caminho `<user_id>/<resumo_id>.pdf`.
- **A caneta não foi testada num tablet de verdade** (só mouse). Antes de
  vender, testar: pressão, dedo rolando com caneta por perto, "Só caneta".
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
