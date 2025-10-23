import type {
  BuyingGroup,
  CompleteBuyingGroupInfo,
  Profile,
} from "../types/api";
import type { CardMode } from "../pages/buying-group-dashboard/buying-group-card";
import supabase from "../supabaseClient";
import { coerceGroupType } from "./typeHelpers";

export type BuyingGroupDetails = {
  group: BuyingGroup;
  mode: CardMode;
  numMembers: number;
};

export async function fetchCompleteBuyingGroup(buyer_id?: number): Promise<
  CompleteBuyingGroupInfo[]
> {
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
  if (buyer_id !== undefined) {
    const { data: memberGroups } = await supabase
      .from("BuyingGroupMembers")
      .select("group_id")
      .eq("buyer_id", buyer_id);

    const groupIds = memberGroups?.map((m) => m.group_id) ?? [];
    if (groupIds.length === 0) {
      return [];
    }
    query = query.in("id", groupIds);
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  const flattened: CompleteBuyingGroupInfo[] = data.map((row) => {
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
  return flattened;
}
export async function fetchGroupsDetails(
  profile?: Profile
): Promise<BuyingGroupDetails[]> {
  const { data, error } = await supabase.from("BuyingGroups").select(`
                id, location, active, created_at,
                Products (*)
            `);
  if (error) {
    console.error("Error fetching groups:", error);
  }

  const groupDetails = await Promise.all(
    data?.map(async (group) => ({
      group: coerceGroupType(group),
      mode: (await isMember(group.id, profile))
        ? ("joined" as CardMode)
        : ("browse" as CardMode),
      numMembers: await getNumberOfMembers(group.id),
    })) || []
  );

  // console.log("Fetched groups:", data);
  return groupDetails;
}

export async function fetchGroupDetails(
  profile?: Profile,
  groupId?: number
): Promise<BuyingGroupDetails> {
  const { data, error } = await supabase
    .from("BuyingGroups")
    .select(
      `
                *,
                Products (*)
                `
    )
    .eq("id", groupId)
    .single();
  if (error) {
    console.error("Error fetching groups:", error);
  }

  const groupDetails: BuyingGroupDetails = {
    group: coerceGroupType(data),
    mode: (await isMember(data.id, profile))
      ? ("joined" as CardMode)
      : ("browse" as CardMode),
    numMembers: await getNumberOfMembers(data.id),
  };

  // console.log("Fetched group:", groupDetails);
  return groupDetails;
}

export async function isMember(groupId: number, profile?: Profile): Promise<boolean> {
  // return false;
  if (!profile) {
    return false;
  }
  const { data, error } = await supabase
    .from("BuyingGroupMembers")
    .select("*")
    .eq("group_id", groupId)
    .eq("buyer_id", profile.id);
  if (error) {
    if (error.code === "PGRST116") {
      // No rows found
      return false;
    }
    console.error("Error checking membership:", error);
    return false;
  }

  return data && data.length > 0;
}

export async function getNumberOfMembers(groupId: number): Promise<number> {
  // return 0;
  const { count, error } = await supabase
    .from("BuyingGroupMembers")
    .select("*", { count: "exact", head: true })
    .eq("group_id", groupId);
  if (error) {
    console.error("Error fetching number of members:", error);
    return 0;
  }
  return (count as number) || 0;
}


export function getBuyerIconLightUp(num_members: number) {
  if (num_members == 0) {
    return 0;
  } else if (num_members < 5) {
    return 1;
  } else if (num_members < 10) {
    return 2;
  } else if (num_members < 100) {
    return 3;
  } else {
    return 4;
  }
}