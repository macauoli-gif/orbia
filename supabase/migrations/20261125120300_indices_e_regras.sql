-- ============================================================
-- Pauta de Estudos — ajustes de desempenho pedidos pelo Supabase (advisors).
-- 1) Índice em toda ligação entre tabelas (foreign key) que ainda não tinha:
--    sem ele, apagar uma tarefa ou uma questão varre a tabela inteira.
-- 2) Flashcards e questões tinham DUAS regras de leitura (ver + meus); agora
--    a leitura é só "ver", e "meus" cobre só criar, editar e apagar.
--
-- Os 4 avisos de segurança "SECURITY DEFINER executável por authenticated"
-- (eh_admin, tem_licenca, meu_email_confirmado, emails_com_conta) ficam de
-- propósito: as regras de acesso precisam delas, e elas só respondem sobre
-- quem está logado (emails_com_conta só para a administradora).
-- ============================================================

create index if not exists caderno_erros_questao_idx on public.caderno_erros (questao_id);
create index if not exists cronograma_materia_idx on public.cronograma_blocos (materia_id);
create index if not exists cronograma_tarefa_idx on public.cronograma_blocos (tarefa_id);
create index if not exists flashcard_respostas_flashcard_idx on public.flashcard_respostas (flashcard_id);
create index if not exists flashcard_respostas_user_idx on public.flashcard_respostas (user_id);
create index if not exists flashcards_materia_idx on public.flashcards (materia_id);
create index if not exists questoes_materia_idx on public.questoes (materia_id);
create index if not exists respostas_questoes_questao_idx on public.respostas_questoes (questao_id);
create index if not exists resumo_anotacoes_user_idx on public.resumo_anotacoes (user_id);
create index if not exists resumos_materia_idx on public.resumos (materia_id);
create index if not exists resumos_lidos_resumo_idx on public.resumos_lidos (resumo_id);
create index if not exists sessoes_foco_materia_idx on public.sessoes_foco (materia_id);
create index if not exists sessoes_foco_tarefa_idx on public.sessoes_foco (tarefa_id);
create index if not exists tarefas_materia_idx on public.tarefas (materia_id);

drop policy if exists "flashcards_meus" on public.flashcards;
create policy "flashcards_criar" on public.flashcards for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "flashcards_editar" on public.flashcards for update to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "flashcards_apagar" on public.flashcards for delete to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));

drop policy if exists "questoes_meus" on public.questoes;
create policy "questoes_criar" on public.questoes for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "questoes_editar" on public.questoes for update to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()))
  with check (user_id = (select auth.uid()) and (select public.tem_licenca()));
create policy "questoes_apagar" on public.questoes for delete to authenticated
  using (user_id = (select auth.uid()) and (select public.tem_licenca()));
