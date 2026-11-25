-- ============================================================
-- Pauta de Estudos — pasta dos PDFs de resumo (Storage).
-- Fonte: PRD-BACKEND.md, "Arquivos".
-- Bucket privado: só PDF, até 20 MB. Caminho: <user_id>/<resumo_id>.pdf.
-- Só o dono (a primeira pasta do caminho é o id de quem está logado) e só
-- com licença ativa. O arquivo não muda depois de enviado: sem update.
-- (O check-grants confere tabelas do schema public; esta pasta é conferida
-- pelo teste de separação da etapa 7.)
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumos', 'resumos', false, 20971520, array['application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 20971520, allowed_mime_types = array['application/pdf'];

create policy "resumos_pdf_ver" on storage.objects for select to authenticated
  using (bucket_id = 'resumos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.tem_licenca()));

create policy "resumos_pdf_enviar" on storage.objects for insert to authenticated
  with check (bucket_id = 'resumos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.tem_licenca()));

create policy "resumos_pdf_apagar" on storage.objects for delete to authenticated
  using (bucket_id = 'resumos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.tem_licenca()));
