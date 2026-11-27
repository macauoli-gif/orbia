-- ============================================================
-- Questões de fábrica (27/11/2026): a pedido da dona, saem as questões que o
-- app escreveu (autorais e "no estilo de" vestibulares) e entram questões reais
-- de provas oficiais (ENEM e IFSC), na migration seguinte (..._questoes_reais.sql).
-- Apaga só as de fábrica (user_id vazio). As respostas e o caderno de erros
-- ligados a elas vão junto (on delete cascade). Questões que os alunos
-- cadastraram não são tocadas.
-- ============================================================
delete from public.questoes where user_id is null;
