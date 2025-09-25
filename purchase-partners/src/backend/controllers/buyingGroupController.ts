import supabase from "../supabaseClient"
import type { Request, Response } from "express"
import { getProfile } from "../utils/auth";

export const getBuyingGroups = async (req: Request, res: Response) => {
    const { data: BuyingGroups, error } = await supabase
        .from("BuyingGroups")
        .select("*");

    console.log("fetched buying groups", BuyingGroups);

    if (error) {
        throw error;
    }
    return res.status(200).json({ success: true, data: BuyingGroups });
}

export const getBuyingGroupInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { data: BuyingGroups, error } = await supabase
        .from("BuyingGroups")
        .select(`
            Products (name),
            BuyingGroupMembers (count)
        `)
        .eq("id", id)
        .single();

    console.log("fetched buying group info", BuyingGroups);

    if (error) {
        throw error;
    }
    return res.status(200).json({ success: true, data: BuyingGroups })
}


export const createBuyingGroup = async (req: Request, res: Response) => {
    const { product_name, product_description, location } = req.body;

    const formattedName = formatProductName(product_name);

    let productId;
    const { data: existingProduct } = await supabase
        .from("Products")
        .select("id")
        .ilike("name", product_name)
    if (existingProduct) {
        productId = existingProduct.id;
    } else {
        const { data: newProduct, error: productError } = await supabase
            .from("Products")
            .insert({
                name: formattedName,
                description: product_description
            })
            .select("id")
            .single();

        if (productError) {
            throw productError;
        }
        productId = newProduct.id;
    }

    const { data: newGroup, error } = await supabase
        .from('BuyingGroups')
        .insert([{
            product_id: productId,
            location: location
        }])
        .select()
        .single()

    if (error) {
        throw error;
    }

    return res.status(201).json({ success: true, data: newGroup })
}

export const joinBuyingGroup = async (req: Request, res: Response) => {
    const { group_id } = req.params;

    let profile;
    try {
        profile = await getProfile(req);
    } catch (error) {
        return res.status(404).json({ success: false, error });
    }

    const { error } = await supabase
        .from("BuyingGroupMembers")
        .insert([{
            "group_id": group_id,
            "buyer_id": profile.id
        }])
    if (error) {
        throw error;
    }

    return res.status(201).json({ success: true, message: "joined buying group" })
}

export const leaveBuyingGroup = async (req: Request, res: Response) => {
    const { group_id } = req.params;

    let profile;
    try {
        profile = await getProfile(req);
    } catch (error) {
        return res.status(404).json({ success: false, error });
    }

    const buyer_id = profile.id;
    const { error } = await supabase
        .from("BuyingGroupMembers")
        .delete()
        .eq("group_id", group_id)
        .eq("buyer_id", buyer_id)

    if (error) {
        console.log("Error in leaveBuyingGroup", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

    return res.status(200).json({ success: true, message: "left buying group" })
}

const formatProductName = (name: string): string => {
    return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

