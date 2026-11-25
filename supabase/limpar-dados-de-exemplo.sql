-- ============================================================
-- LIMPAR OS DADOS DE EXEMPLO — rodar ANTES DE VENDER (etapa 8, decisão
-- de 25/11/2026: manter os dados de exemplo por enquanto).
-- NÃO é migration: roda uma vez só, à mão, quando a dona do app pedir.
--
-- O que é "de exemplo": todo email terminado em @exemplo.com (ou @exemplo,
-- o aviso de erro da Hotmart de teste). Aluno de verdade nunca usa esse domínio.
--
-- ANTES de rodar:
--   1. A dona do app cria a conta DELA no app (com o email real) e confirma.
--   2. Torná-la administradora (troque o email):
--        update public.profiles set role = 'admin' where email = 'EMAIL-DELA';
--   3. Conferir que ela entra e vê a tela Licenças.
-- Só então rode o bloco abaixo: ele apaga a admin@exemplo.com.
--
-- PDFs: o banco não deixa apagar arquivo do Storage por SQL. Os PDFs das
-- contas de exemplo ficam na pasta "resumos" (uma subpasta por pessoa);
-- apague pelo painel do Supabase (Storage → resumos) as pastas cujo nome é
-- um dos ids que a consulta 0 lista.
-- ============================================================

-- 0. Conferir antes (só lê): quem vai ser apagado e quantos PDFs têm.
select u.id, u.email,
  (select count(*) from public.resumos r where r.user_id = u.id and r.tipo = 'PDF') as pdfs
from auth.users u where u.email like '%@exemplo.com' order by u.email;

-- 1. Apagar. A trava confere ANTES: sem uma administradora de verdade (fora do
--    @exemplo.com), não apaga nada — senão o app ficaria sem ninguém para
--    liberar licença. Tudo num bloco só: ou apaga tudo, ou nada.
do $$
begin
  if not exists (select 1 from public.profiles where role = 'admin' and email not like '%@exemplo.com') then
    raise exception 'Nenhuma administradora de verdade ainda. Faça os passos 1 a 3 antes.';
  end if;
  -- Os estudos, perfis, respostas e anotações saem junto (on delete cascade).
  delete from auth.users where email like '%@exemplo.com';
  delete from public.licencas where email like '%@exemplo.com';
  delete from public.hotmart_eventos where email like '%@exemplo%';
end $$;

-- 2. Conferência: contas e licenças de exemplo têm que dar zero.
select
  (select count(*) from auth.users where email like '%@exemplo.com') as contas_de_exemplo,
  (select count(*) from public.licencas where email like '%@exemplo.com') as licencas_de_exemplo,
  (select count(*) from public.profiles where role = 'admin') as administradoras;
