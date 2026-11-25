// Conexão com o Supabase. Só dados.js importa este arquivo.
// As chaves entram no .env.local na Etapa 7 (nunca no código, nunca no GitHub).
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
// Chave publicável (sb_publishable_...).
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Enquanto o app usa dados de mentira, não há chave: a conexão fica vazia.
export const supabase = url && key ? createClient(url, key) : null
