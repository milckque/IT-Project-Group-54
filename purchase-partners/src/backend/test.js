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
let query = supabase.from("BuyingGroupsWithCount").select(
  `
        *,
        Products (
          *,
          Categories (*)
        ),
        BuyingGroupMembers(count)
      `
);

let buyer_id = 4;
// Filter by buyer_id if provided
if (buyer_id !== undefined) {
  const { data: memberGroups } = await supabase
    .from("BuyingGroupMembers")
    .select("group_id")
    .eq("buyer_id", buyer_id);

  const groupIds = memberGroups?.map((m) => m.group_id) ?? [];
  if (groupIds.length === 0) {
    // return [];
  }
  query = query.in("id", groupIds);
}

const { data, error } = await query;
if (error) {
  console.error("Error fetching data:", error);
}
const flattened = data.map((row) => {
  const membersCount = row.nummembers;
  const product = row.Products;
  const category = product?.Categories;
  return {
    id: row.id,
    created_at: row.created_at,
    active: row.active,
    location: row.location,
    product_id: row.product_id,
    product_name: product?.name ?? "",
    product_desc: product?.description ?? "",
    category_id: category?.id ?? 0,
    category_name: category?.category_name ?? "",
    // Map the calculated member count
    num_members: membersCount,
  };
});
console.log(flattened, flattened.length);
