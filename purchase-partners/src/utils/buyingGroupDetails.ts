import type { BuyingGroup, Profile } from "../types/api";
import type { CardMode } from "../pages/buying-group-dashboard/buying-group-card";
import supabase from "../supabaseClient";
import { coerceGroupType } from "./typeHelpers";

export type BuyingGroupDetails = {
    group: BuyingGroup;
    mode: CardMode;
    numMembers: number;
};

export async function fetchGroupsDetails(profile?: Profile): Promise<BuyingGroupDetails[]> {
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

export async function fetchGroupDetails(profile?: Profile, groupId?: number): Promise<BuyingGroupDetails> {
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
    let temp = await isMember(data.id, profile);

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

async function isMember(groupId: number, profile?: Profile): Promise<boolean> {
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

async function getNumberOfMembers(groupId: number): Promise<number> {
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