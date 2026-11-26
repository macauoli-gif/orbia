-- ============================================================
-- Tela Licenças (26/11/2026): "Tirar da lista".
-- A administradora pode apagar uma licença: a pessoa some da lista e perde o
-- acesso (tem_licenca() deixa de achar a licença). A conta e os estudos da
-- pessoa NÃO são apagados; se ela comprar de novo, a licença nova devolve tudo.
-- Só a administradora apaga; aluno, sem licença e anônimo, nunca.
-- ============================================================
create policy "licencas_apagar" on public.licencas for delete to authenticated
  using ((select public.eh_admin()));
grant delete on public.licencas to authenticated;
