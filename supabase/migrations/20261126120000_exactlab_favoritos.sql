-- ============================================================
-- ExactLab (26/11/2026): elementos favoritos da tabela periódica.
-- Os dados dos elementos ficam no código (src/lib/exactlab/, do PubChem);
-- aqui só a estrela que o aluno marcou. Mesma regra de toda tabela de estudo:
-- só o dono, com licença ativa. Sem update: tirar a estrela apaga a linha.
-- ============================================================

create table if not exists public.exactlab_favoritos (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade default auth.uid(),
  numero_atomico integer not null check (numero_atomico between 1 and 118),
  created_at     timestamptz not null default now(),
  constraint exactlab_favoritos_unico unique (user_id, numero_atomico)
);
alter table public.exactlab_favoritos enable row level security;

create policy "exactlab_favoritos_ver" on public.exactlab_favoritos for select to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "exactlab_favoritos_criar" on public.exactlab_favoritos for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "exactlab_favoritos_apagar" on public.exactlab_favoritos for delete to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));

revoke all on public.exactlab_favoritos from anon;
grant select, insert, delete on public.exactlab_favoritos to authenticated;
grant select, insert, update, delete on public.exactlab_favoritos to service_role;
