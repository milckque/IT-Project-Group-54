import { createClient, SupabaseClient } from '@supabase/supabase-js'
// import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
