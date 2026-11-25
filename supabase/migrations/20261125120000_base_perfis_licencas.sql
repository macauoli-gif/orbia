-- ============================================================
-- Pauta de Estudos — base: perfis, licenças e avisos da Hotmart.
-- Fonte: PRD-BACKEND.md. Toda tabela: RLS ligada + GRANT escrito
-- só para authenticated (e service_role). Nada para anon.
-- ============================================================

-- ---------- profiles: liga o login à pessoa ----------
create table if not exists public.profiles (
  id                   uuid primary key references auth.users (id) on delete cascade,
  nome                 text not null default '' check (char_length(nome) <= 80),
  email                text not null unique check (email = lower(email)),
  role                 text not null default 'aluno' check (role in ('aluno', 'admin')),
  serie                text check (serie in ('9º ano EF', '1º ano EM', '2º ano EM', '3º ano EM')),
  meta_questoes_semana integer not null default 0 check (meta_questoes_semana >= 0),
  meta_foco_min_semana integer not null default 0 check (meta_foco_min_semana >= 0),
  meta_provas_mes      integer not null default 0 check (meta_provas_mes >= 0),
  so_sugerido          boolean not null default true,
  created_at           timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- ---------- licencas: uma por email comprador ----------
create table if not exists public.licencas (
  id                uuid primary key default gen_random_uuid(),
  email             text not null unique check (email = lower(email) and email like '%@%'),
  nome              text,
  status            text not null check (status in ('Ativa', 'Bloqueada')),
  origem            text not null check (origem in ('Hotmart', 'Manual')),
  hotmart_transacao text,
  comprado_em       timestamptz not null default now(),
  bloqueada_em      timestamptz,
  motivo            text,
  created_at        timestamptz not null default now()
);
alter table public.licencas enable row level security;

-- ---------- hotmart_eventos: todo aviso que a Hotmart mandou ----------
create table if not exists public.hotmart_eventos (
  id         uuid primary key default gen_random_uuid(),
  evento     text not null,
  transacao  text,
  email      text,
  payload    jsonb not null,
  processado boolean not null default false,
  erro       text,
  created_at timestamptz not null default now()
);
alter table public.hotmart_eventos enable row level security;

-- ---------- funções das regras ----------
-- security definer: leem auth.users e profiles sem depender da RLS de quem chama.
-- stable + (select ...) nas policies: avaliadas uma vez por consulta, não por linha.

-- É a administradora?
create or replace function public.eh_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

-- O email do login, só se já foi confirmado (sem confirmação, qualquer um
-- poderia criar conta com o email de quem comprou).
create or replace function public.meu_email_confirmado()
returns text language sql stable security definer set search_path = '' as $$
  select lower(email) from auth.users where id = (select auth.uid()) and email_confirmed_at is not null;
$$;

-- "Aluno com licença" (PRD-BACKEND, Permissões): logado, email confirmado,
-- licença 'Ativa' para esse email. É a chave de TODA tabela de estudo.
create or replace function public.tem_licenca()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.licencas l
    where l.email = public.meu_email_confirmado() and l.status = 'Ativa'
  );
$$;

revoke all on function public.eh_admin() from public, anon;
revoke all on function public.meu_email_confirmado() from public, anon;
revoke all on function public.tem_licenca() from public, anon;
grant execute on function public.eh_admin() to authenticated;
grant execute on function public.meu_email_confirmado() to authenticated;
grant execute on function public.tem_licenca() to authenticated;

-- ---------- regras: profiles ----------
-- Ver: só o próprio perfil. A administradora NÃO lê o perfil dos alunos (série e
-- metas já são estudo); para a tela Licenças ela só precisa saber se o email já
-- criou conta, e isso vem da função emails_com_conta() abaixo.
create policy "profiles_ver" on public.profiles for select to authenticated
  using (id = (select auth.uid()));

-- Para a coluna "conta criada" da tela Licenças: só os emails, só para a administradora.
create or replace function public.emails_com_conta()
returns setof text language sql stable security definer set search_path = '' as $$
  select email from public.profiles where public.eh_admin();
$$;
revoke all on function public.emails_com_conta() from public, anon;
grant execute on function public.emails_com_conta() to authenticated;
-- Editar: só o próprio. As COLUNAS liberadas estão no grant abaixo: ninguém
-- muda o próprio role nem o email pelo app.
create policy "profiles_editar" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (nome, serie, meta_questoes_semana, meta_foco_min_semana, meta_provas_mes, so_sugerido) on public.profiles to authenticated;
grant select, insert, update, delete on public.profiles to service_role;

-- ---------- regras: licencas ----------
-- Ver: a administradora vê todas; o aluno, só a linha do próprio email confirmado
-- (para a tela "Sem licença" saber o motivo).
create policy "licencas_ver" on public.licencas for select to authenticated
  using ((select public.eh_admin()) or email = (select public.meu_email_confirmado()));
-- Criar e editar: só a administradora (e o receptor da Hotmart, que usa service_role).
-- Apagar: ninguém (bloquear em vez de apagar, para não perder o histórico de vendas).
create policy "licencas_criar" on public.licencas for insert to authenticated
  with check ((select public.eh_admin()));
create policy "licencas_editar" on public.licencas for update to authenticated
  using ((select public.eh_admin())) with check ((select public.eh_admin()));

revoke all on public.licencas from anon;
grant select, insert, update on public.licencas to authenticated;
grant select, insert, update, delete on public.licencas to service_role;

-- ---------- regras: hotmart_eventos ----------
-- Ver: só a administradora. Criar: só o receptor (service_role).
create policy "hotmart_eventos_ver" on public.hotmart_eventos for select to authenticated
  using ((select public.eh_admin()));

revoke all on public.hotmart_eventos from anon;
grant select on public.hotmart_eventos to authenticated;
grant select, insert, update, delete on public.hotmart_eventos to service_role;

-- ---------- gatilho: criar o perfil no cadastro ----------
-- Sempre como 'aluno'. A administradora é definida à mão no banco.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, nome, email, role)
  values (new.id, left(coalesce(new.raw_user_meta_data->>'nome', ''), 80), lower(new.email), 'aluno');
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
