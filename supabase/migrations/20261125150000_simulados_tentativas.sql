-- ============================================================
-- Simulados de vestibulares (25/11/2026): as tentativas do aluno.
-- As provas e os gabaritos oficiais ficam no código (src/lib/simulados-provas.js,
-- gerado de PDFs oficiais e públicos). Aqui fica só o que o aluno marcou.
-- Mesma regra de toda tabela de estudo: só o dono, com licença ativa.
-- Tentativa terminada não se edita (sem grant de update): refazer cria outra.
-- ============================================================

create table if not exists public.simulados_tentativas (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade default auth.uid(),
  prova_id   text not null check (prova_id ~ '^[a-z0-9-]{3,40}$'),
  idioma     text check (idioma in ('Inglês', 'Espanhol', 'Francês')),
  -- { "1": "A", "2": "C", ... } — só letras de A a E
  respostas  jsonb not null check (
    jsonb_typeof(respostas) = 'object'
    and not jsonb_path_exists(respostas, '$.* ? (@ != "A" && @ != "B" && @ != "C" && @ != "D" && @ != "E")')
  ),
  tempo_seg  integer not null check (tempo_seg >= 0 and tempo_seg <= 86400),
  created_at timestamptz not null default now()
);
create index if not exists simulados_tentativas_user_idx on public.simulados_tentativas (user_id, created_at desc);
alter table public.simulados_tentativas enable row level security;

create policy "simulados_tentativas_ver" on public.simulados_tentativas for select to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "simulados_tentativas_criar" on public.simulados_tentativas for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "simulados_tentativas_apagar" on public.simulados_tentativas for delete to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));

revoke all on public.simulados_tentativas from anon;
grant select, insert, delete on public.simulados_tentativas to authenticated;
grant select, insert, update, delete on public.simulados_tentativas to service_role;
