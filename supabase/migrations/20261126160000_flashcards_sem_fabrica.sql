-- ============================================================
-- Flashcards (26/11/2026): os modelos do app saem, a pedido da dona.
-- Cada aluno faz os próprios (e edita e apaga os dele, como já era pela RLS).
-- Apaga só os de fábrica (user_id vazio); as respostas de alunos a esses
-- cartões vão junto (on delete cascade de flashcard_respostas).
-- Os flashcards que os alunos criaram não são tocados.
-- ============================================================
delete from public.flashcards where user_id is null;
