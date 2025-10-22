import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bemnmyvemyosyocrnjgf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbW5teXZlbXlvc3lvY3JuamdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MjU0NzIsImV4cCI6MjA3MTQwMTQ3Mn0.aJEDxJ84HZWJa0S_ShMA3kCyF60BZ_kDcqTe_kqdg-0";

const supabase = createClient(supabaseUrl, supabaseKey);

// const { data, error } = await supabase
//   .from("BuyingGroups")
//   .select("*, Products(*)");

// if (error) {
//   console.error("Error fetching data:", error);
// } else {
//   const flattened = data.map((row) => ({
//     id: row.id,
//     created_at: row.created_at,
//     active: row.active,
//     location: row.location,
//     product_id: row.product_id,
//     product_name: row.Products.name,
//     product_description: row.Products.description,
//   }));
//   console.log(flattened);
// }

// const { data, error } = await supabase
//   .from("Categories")
//   .select("*");

// if (error) {
//   console.error("Error fetching data:", error);
// } else {
//   console.log(data);
// }

const { data, error } = await supabase.from("BuyingGroupsWithCount").select(`
    *,
    Products (
      *,
        Categories (*)
      )
    ),
    BuyingGroupMembers(count)
  `);

if (error) {
  console.error("Error fetching data:", error);
} else {
  const flattened = data.map((row) => ({
    id: row.id,
    created_at: row.created_at,
    active: row.active,
    location: row.location,
    product_id: row.product_id,
    product_name: row.Products?.name ?? null,
    product_description: row.Products?.description ?? null,
    category_id: row.Products?.category_id ?? null,
    category_name: row.Products?.Categories?.category_name ?? null,
    num_members: row.nummembers,
  }));
  console.log(data);
}
