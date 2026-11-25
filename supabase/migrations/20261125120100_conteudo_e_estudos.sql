-- ============================================================
-- Pauta de Estudos — conteúdo de fábrica e dados do aluno.
-- Fonte: PRD-BACKEND.md. Os textos dos CHECK são IDÊNTICOS aos da
-- interface (src/lib/*.js): divergir faz o salvamento falhar calado.
--
-- Regra de toda tabela do aluno: só o dono (user_id = quem está logado)
-- e só com licença ativa. A administradora não vê nada de estudo.
-- Quando a linha aponta para outra (questão, resumo, tarefa), o WITH CHECK
-- confere que a outra é visível para o aluno: ninguém responde a questão
-- própria de outro aluno nem anota no PDF dele.
-- ============================================================

-- ---------- conteúdo de fábrica ----------
create table if not exists public.materias (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null unique,
  cor        text not null,
  ordem      integer not null,
  created_at timestamptz not null default now()
);
alter table public.materias enable row level security;
create policy "materias_ver" on public.materias for select to authenticated
  using ((select public.tem_licenca()) or (select public.eh_admin()));
revoke all on public.materias from anon;
grant select on public.materias to authenticated;
grant select, insert, update, delete on public.materias to service_role;

-- Flashcards e questões: user_id vazio = do app (todo aluno com licença lê);
-- preenchido = do aluno (só ele).
create table if not exists public.flashcards (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users (id) on delete cascade default auth.uid(),
  materia_id   uuid not null references public.materias (id),
  frente       text not null check (btrim(frente) <> ''),
  verso        text not null check (btrim(verso) <> ''),
  serie_minima text check (serie_minima in ('9º ano EF', '1º ano EM', '2º ano EM', '3º ano EM')),
  created_at   timestamptz not null default now()
);
create index if not exists flashcards_user_idx on public.flashcards (user_id);
alter table public.flashcards enable row level security;

create table if not exists public.questoes (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users (id) on delete cascade default auth.uid(),
  materia_id         uuid not null references public.materias (id),
  assunto            text not null check (btrim(assunto) <> ''),
  nivel              text not null check (nivel in ('Fácil', 'Médio', 'Difícil')),
  instituicao        text,
  ano                integer,
  enunciado          text not null check (btrim(enunciado) <> ''),
  -- lista de {letra, texto, explicacao}, 4 ou 5 itens
  alternativas       jsonb not null check (jsonb_typeof(alternativas) = 'array' and jsonb_array_length(alternativas) between 4 and 5),
  correta            text not null check (correta in ('A', 'B', 'C', 'D', 'E')),
  resposta_comentada text,
  serie_minima       text check (serie_minima in ('9º ano EF', '1º ano EM', '2º ano EM', '3º ano EM')),
  created_at         timestamptz not null default now(),
  -- a correta precisa existir entre as alternativas
  constraint questoes_correta_existe check (jsonb_path_exists(alternativas, '$[*] ? (@.letra == $c)', jsonb_build_object('c', correta)))
);
create index if not exists questoes_user_idx on public.questoes (user_id);
alter table public.questoes enable row level security;

-- Ver: as do app (aluno com licença ou administradora) e as próprias (aluno com licença).
-- Criar/editar/apagar: só as próprias. As do app mudam só pela construção (service_role).
create policy "flashcards_ver" on public.flashcards for select to authenticated
  using ((user_id is null and ((select public.tem_licenca()) or (select public.eh_admin())))
      or (user_id = (select auth.uid()) and (select public.tem_licenca())));
create policy "flashcards_meus" on public.flashcards for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "questoes_ver" on public.questoes for select to authenticated
  using ((user_id is null and ((select public.tem_licenca()) or (select public.eh_admin())))
      or (user_id = (select auth.uid()) and (select public.tem_licenca())));
create policy "questoes_meus" on public.questoes for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));

revoke all on public.flashcards from anon;
revoke all on public.questoes from anon;
grant select, insert, update, delete on public.flashcards to authenticated;
grant select, insert, update, delete on public.questoes to authenticated;
grant select, insert, update, delete on public.flashcards to service_role;
grant select, insert, update, delete on public.questoes to service_role;

-- ---------- resumos: só do aluno (sem resumos do app desde 25/11/2026) ----------
create table if not exists public.resumos (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade default auth.uid(),
  tipo         text not null check (tipo in ('Digitado', 'PDF')),
  materia_id   uuid not null references public.materias (id),
  titulo       text not null check (btrim(titulo) <> '' and char_length(titulo) <= 120),
  texto        text,
  arquivo_path text,
  arquivo_nome text,
  paginas      integer,
  created_at   timestamptz not null default now(),
  -- Digitado tem texto e não tem arquivo; PDF tem arquivo (na pasta do dono) e páginas, e não tem texto.
  constraint resumos_tipo_coerente check (
    (tipo = 'Digitado' and texto is not null and btrim(texto) <> '' and arquivo_path is null)
    or (tipo = 'PDF' and texto is null and paginas >= 1
        and arquivo_path = user_id::text || '/' || id::text || '.pdf')
  )
);
create index if not exists resumos_user_idx on public.resumos (user_id, created_at desc);
alter table public.resumos enable row level security;
create policy "resumos_meus" on public.resumos for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
revoke all on public.resumos from anon;
grant select, insert, update, delete on public.resumos to authenticated;
grant select, insert, update, delete on public.resumos to service_role;

-- Anotações por cima do PDF, uma linha por página. Coordenadas de 0 a 1.
create table if not exists public.resumo_anotacoes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade default auth.uid(),
  resumo_id     uuid not null references public.resumos (id) on delete cascade,
  pagina        integer not null check (pagina >= 1),
  tracos        jsonb not null default '[]' check (jsonb_typeof(tracos) = 'array'),
  textos        jsonb not null default '[]' check (jsonb_typeof(textos) = 'array'),
  atualizado_em timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  unique (resumo_id, pagina)
);
alter table public.resumo_anotacoes enable row level security;
create policy "resumo_anotacoes_meus" on public.resumo_anotacoes for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and resumo_id in (select id from public.resumos where tipo = 'PDF'));
revoke all on public.resumo_anotacoes from anon;
grant select, insert, update, delete on public.resumo_anotacoes to authenticated;
grant select, insert, update, delete on public.resumo_anotacoes to service_role;

create table if not exists public.resumos_lidos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  resumo_id  uuid not null references public.resumos (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, resumo_id)
);
alter table public.resumos_lidos enable row level security;
create policy "resumos_lidos_meus" on public.resumos_lidos for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and resumo_id in (select id from public.resumos));
revoke all on public.resumos_lidos from anon;
grant select, insert, delete on public.resumos_lidos to authenticated;
grant select, insert, update, delete on public.resumos_lidos to service_role;

-- ---------- respostas (histórico para o Desempenho da v1.1) ----------
create table if not exists public.flashcard_respostas (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade default auth.uid(),
  flashcard_id uuid not null references public.flashcards (id) on delete cascade,
  acertou      boolean not null,
  created_at   timestamptz not null default now()
);
alter table public.flashcard_respostas enable row level security;
create policy "flashcard_respostas_meus" on public.flashcard_respostas for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and flashcard_id in (select id from public.flashcards));
revoke all on public.flashcard_respostas from anon;
grant select, insert on public.flashcard_respostas to authenticated;
grant select, insert, update, delete on public.flashcard_respostas to service_role;

create table if not exists public.respostas_questoes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  questao_id uuid not null references public.questoes (id) on delete cascade,
  escolhida  text not null check (escolhida in ('A', 'B', 'C', 'D', 'E')),
  acertou    boolean not null,
  tempo_seg  integer check (tempo_seg >= 0),
  created_at timestamptz not null default now()
);
create index if not exists respostas_questoes_user_idx on public.respostas_questoes (user_id, created_at desc);
alter table public.respostas_questoes enable row level security;
create policy "respostas_questoes_meus" on public.respostas_questoes for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and questao_id in (select id from public.questoes));
revoke all on public.respostas_questoes from anon;
grant select, insert on public.respostas_questoes to authenticated;
grant select, insert, update, delete on public.respostas_questoes to service_role;

create table if not exists public.caderno_erros (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  questao_id uuid not null references public.questoes (id) on delete cascade,
  motivo     text check (motivo in ('Não sabia o conteúdo', 'Falta de atenção', 'Interpretação', 'Conta errada', 'Faltou tempo')),
  anotacao   text,
  revisar    boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, questao_id)
);
alter table public.caderno_erros enable row level security;
create policy "caderno_erros_meus" on public.caderno_erros for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and questao_id in (select id from public.questoes));
revoke all on public.caderno_erros from anon;
grant select, insert, update, delete on public.caderno_erros to authenticated;
grant select, insert, update, delete on public.caderno_erros to service_role;

-- ---------- tarefas (Quadro) ----------
create table if not exists public.tarefas (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade default auth.uid(),
  titulo       text not null check (btrim(titulo) <> '' and char_length(titulo) <= 120),
  materia_id   uuid not null references public.materias (id),
  prazo        date,
  prioridade   text not null default 'Média' check (prioridade in ('Alta', 'Média', 'Baixa')),
  status       text not null default 'A fazer' check (status in ('A fazer', 'Em andamento', 'Concluído')),
  observacao   text,
  concluida_em timestamptz,
  created_at   timestamptz not null default now(),
  -- Concluído exige a data; os outros a recusam (a regra do app: comStatus em lib/tarefas.js).
  constraint tarefas_conclusao check ((status = 'Concluído') = (concluida_em is not null))
);
create index if not exists tarefas_user_status_idx on public.tarefas (user_id, status);
create index if not exists tarefas_user_prazo_idx on public.tarefas (user_id, prazo);
alter table public.tarefas enable row level security;
create policy "tarefas_meus" on public.tarefas for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
revoke all on public.tarefas from anon;
grant select, insert, update, delete on public.tarefas to authenticated;
grant select, insert, update, delete on public.tarefas to service_role;

-- ---------- cronograma ----------
create table if not exists public.cronograma_blocos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  dia_semana integer not null check (dia_semana between 1 and 7),
  inicio     time not null,
  fim        time not null,
  -- Vazia só em bloco que não é de estudo (ex.: "Prova anterior" do fim de semana,
  -- que vem assim da versão atual). Decisão registrada no AGENTS.md.
  materia_id uuid references public.materias (id),
  titulo     text not null check (btrim(titulo) <> '' and char_length(titulo) <= 80),
  tipo       text not null default 'Estudo' check (tipo in ('Estudo', 'Prova anterior', 'Redação', 'Revisão de erros')),
  tarefa_id  uuid references public.tarefas (id) on delete set null,
  feito_em   date,
  created_at timestamptz not null default now(),
  constraint cronograma_fim_depois check (fim > inicio),
  constraint cronograma_materia_no_estudo check (tipo <> 'Estudo' or materia_id is not null)
);
create index if not exists cronograma_user_idx on public.cronograma_blocos (user_id, dia_semana);
alter table public.cronograma_blocos enable row level security;
create policy "cronograma_blocos_meus" on public.cronograma_blocos for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and (tarefa_id is null or tarefa_id in (select id from public.tarefas)));
revoke all on public.cronograma_blocos from anon;
grant select, insert, update, delete on public.cronograma_blocos to authenticated;
grant select, insert, update, delete on public.cronograma_blocos to service_role;

-- ---------- foco ----------
create table if not exists public.sessoes_foco (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  materia_id uuid references public.materias (id),
  tarefa_id  uuid references public.tarefas (id) on delete set null,
  inicio     timestamptz not null,
  minutos    integer not null check (minutos > 0),
  saidas_aba integer not null default 0 check (saidas_aba >= 0),
  completou  boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists sessoes_foco_user_idx on public.sessoes_foco (user_id, inicio desc);
alter table public.sessoes_foco enable row level security;
create policy "sessoes_foco_meus" on public.sessoes_foco for all to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca())
    and (tarefa_id is null or tarefa_id in (select id from public.tarefas)));
revoke all on public.sessoes_foco from anon;
grant select, insert on public.sessoes_foco to authenticated;
grant select, insert, update, delete on public.sessoes_foco to service_role;
