import { User } from "@supabase/supabase-js";
import supabase from "../../supabaseClient";
import { success } from "zod";
export const getUser = async (req) => {
    const { data: { user }, error: authError } = await supabase
        .auth
        .getUser(req.headers.authorization)

    if (authError || !user) {
        return null;
    }
    return user;
}

export const getProfile = async (req) => {
    const user = await getUser(req);

    if (!user) {
        const error = new Error("Unauthorized")
        throw error;
    }

    const { data: profile } = await supabase
        .from("Profiles")
        .select("id")
        .eq("auth_id", user.id)
        .single();

    if (!profile) {
        const error = new Error("Profile not found");
        throw error;
    }

    return profile;
}
