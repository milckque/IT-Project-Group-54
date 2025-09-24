import supabase from "../supabaseClient"
export const getBuyingGroups = async (req, res) => {
    const { data: BuyingGroups, error } = await supabase
        .from("BuyingGroups")
        .select("*");

    console.log("fetched buying groups", BuyingGroups);

    if (error) {
        throw error;
    }
    return res.status(200).json({success: true, data: BuyingGroups});
}

export const getBuyingGroupInfo = async (req, res) => {
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
}


export const createBuyingGroup = async (req, res) => {
    const { product_name, product_description, location } = req.body;

    const formattedName = formatProductName(product_name);

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
    
    return res.status(201).json({success: true, data: newGroup})
}

export const joinBuyingGroup = async (req, res) => {
    const { group_id } = req.params;
    
    const user = await getUser(req);

    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { data: profile } = await supabase
        .from("Profiles")
        .select("id")
        .eq("auth_id", user.id)
        .single();

    if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const { error } = await supabase
        .from("BuyingGroupMembers")
        .insert([{
            group_id: parseInt(group_id),
            buyer_id: profile.id
        }])
    if (error) {
        throw error;
    }

    return res.status(201).json({ success: true, message: "joined buying group"})
}

export const leaveBuyingGroup = async (req, res) => {
    const { group_id } = req.params;
    
    const user = getUser;
    
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { error } = await supabase
        .from("BuyingGroupMembers")
        .delete()
        .eq("group_id", group_id)
        .eq("buyer_id", buyer_id)

    if (error) {
        console.log("Error in leaveBuyingGroup", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

    return res.status(200).json({success: true, message: "left buying group"})
}

const formatProductName = (name: string): string => {
  return name
      .toLowerCase()
          .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
};

const getUser = async (req) => { 
    const { data: { user }, error: authError } = await supabase
        .auth
        .getUser(req.headers.authorization)

    if (authError || !user) {
        return null;
    }
    return user;
}
