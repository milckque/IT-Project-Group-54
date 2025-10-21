import { createClient, SupabaseClient } from '@supabase/supabase-js'
// import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


// const { data, error } = await supabase.from("BuyingGroupMembers").select("*"); // selects all rows and columns

//   if (error) {
//     console.error("Error fetching data:", error);
//   } else {
//     console.log("Data from BuyingGroupMembers:", data);
//   }

export default supabase;
