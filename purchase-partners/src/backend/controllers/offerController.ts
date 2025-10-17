import supabase from "../../supabaseClient.ts";
import type { Request, Response } from "express";
import { getProfile } from "../utils/auth";

export const getOfferInfo = async (req: Request, res: Response) => {
  const { offer_id } = req.params;
  const { count, error } = await supabase
    .from("AcceptedOfferGroup")
    .select("*", { count: "exact", head: true })
    .eq("offer_id", offer_id)
  console.log("getting offer info");

  if (error) {
    throw error;
  }

  const NumJoinedOffer = Number(count) || 0;
  return res.status(200).json({ success: true, NumJoinedOffer});
};
export const createOffer = async (req: Request, res: Response) => {
  const { group_id, price, min_threshold } = req.params;

  let profile;
  try {
    profile = await getProfile(req);
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }

  const seller_id = profile.id;
  const { data, error } = await supabase.from("Offers").insert([
    {
      group_id: group_id,
      seller_id: seller_id,
      price: price,
      expiry: null,
      min_threshold: min_threshold,
    },
  ]);

  console.log("created offers", data);

  if (error) {
    throw error;
  }
  return res.status(200).json({ success: true, data: data });
};

export const joinOffer = async (req: Request, res: Response) => {
  const { offer_id } = req.params;
  let profile;
  try {
    profile = await getProfile(req);
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }

  const buyer_id = profile.id;
  const { data, error } = await supabase.from("Offers").insert([
    {
      offer_id: offer_id,
      buyer_id: buyer_id,
    },
  ]);

  console.log("accepted offer", data);

  if (error) {
    throw error;
  }
  return res.status(200).json({ success: true, data: data });
};

export const leaveOffer = async (req: Request, res: Response) => {
  const { offer_id } = req.params;

  let profile;
  try {
    profile = await getProfile(req);
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }

  const buyer_id = profile.id;
  const { data, error } = await supabase
    .from("Offers")
    .delete()
    .eq("offer_id", offer_id)
    .eq("buyer_id", buyer_id);

  console.log("left offer", data);

  if (error) {
    throw error;
  }
  return res.status(200).json({ success: true, data: data });
};
