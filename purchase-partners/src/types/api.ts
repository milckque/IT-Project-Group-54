export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
}

export interface BuyingGroup {
  id: number;
  location: string;
  active: boolean;
  created_at?: string;
  product?: Product;
}

export interface BuyingGroupRaw {
  id: number;
  location: string;
  active: boolean;
  created_at?: string;
  Products: Product[];
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  auth_id: string;
  country_name: string;
  phone_number: string;
  postcode: string;
}

export interface BuyingGroupMember {
  id: number;
  group: BuyingGroup;
  buyer: Profile;
  joined_at?: string;
}

export interface Offer {
  id: number;
  group_id: number;
  seller_id: number;
  price: number;
  min_threshold: number;
  expiry?: string;
  created_at?: string;
}

export interface AcceptedOfferGroup {
  id: number;
  offer_id: number;
  buyer_id: number;
  accepted_at?: string;
}
// API request types
export interface CreateBuyingGroupRequest {
  product_name: string;
  product_description?: string;
  location: string;
}

export interface CreateOfferRequest {
  group_id: string;
  price: number;
  min_threshold: number;
}

// API response types
// export interface BuyingGroupWithDetails extends BuyingGroup {
//   Products: { name: string };
//   BuyingGroupMembers: { count: number };
// }

export interface OfferInfoResponse {
  NumJoinedOffer: number;
}

// API Endpoint types
export type GetBuyingGroupsResponse = ApiResponse<BuyingGroup[]>;
// export type GetBuyingGroupInfoResponse = ApiResponse<BuyingGroupWithDetails>;
export type CreateBuyingGroupResponse = ApiResponse<BuyingGroup>;
export type JoinBuyingGroupResponse = ApiResponse<null>;
export type LeaveBuyingGroupResponse = ApiResponse<null>;

export type GetOfferInfoResponse = ApiResponse<OfferInfoResponse>;
export type CreateOfferResponse = ApiResponse<Offer>;
export type JoinOfferResponse = ApiResponse<null>;
export type LeaveOfferResponse = ApiResponse<null>;
