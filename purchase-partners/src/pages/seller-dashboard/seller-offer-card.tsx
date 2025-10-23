import { useState } from "react";
import { Bookmark, Bell } from "lucide-react";
import type { CompleteBuyingGroupInfo } from "../../types/api";
import supabase from "../../supabaseClient";
import { get } from "react-hook-form";

export type CardMode = "make-offer";

// type ProductOffer = {
//   id: number;
//   category: string;
//   name: string;
//   joined: number;
//   offers: number;
//   expired: string;
//   hasOffer: boolean;
//   bookmarked: boolean;
// };

type BuyingGroupCardProps = {
  group: CompleteBuyingGroupInfo;
  mode?: CardMode;
  makeOffer?: (id: number) => void;
  onJoin?: (id: number) => void;
  onLeave?: (id: number) => void;
  numMembers?: number;
};

function SellerOfferCard({
  group,
  // mode = "make-offer",
  makeOffer,
  numMembers,
  onLeave,
}: BuyingGroupCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const expiryDate = group.created_at
    ? new Date(
        new Date(group.created_at).setMonth(
          new Date(group.created_at).getMonth() + 2
        )
      )
    : null;

  // console.log("Group in Card:", group);

  // // Very hacky
  // async function getProductCategoryName(product_id: number): Promise<string> {
  //   const { data, error } = await supabase
  //     .from("Products")
  //     .select("category_id")
  //     .eq("id", product_id)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching product category:", error);
  //     return "Unknown";
  //   }
  //   if (data.category_id == null) {
  //     return "General";
  //   }

  //   const { data: categoryData, error: categoryError } = await supabase
  //     .from("Categories")
  //     .select("category_name")
  //     .eq("id", data.category_id)
  //     .single();

  //   return categoryData?.category_name || "Unknown";
  // }

  return (
    <div
      key={group.id}
      className="group-card h-48 p-4 bg-gray-200 shadow-xl rounded-lg flex flex-row relative"
    >
      {/* Bookmark Button */}
      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-300 rounded-lg transition-colors"
      >
        <Bookmark
          className={`w-6 h-6 ${
            isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
          }`}
        />
      </button>

      <div className="details flex-3 flex flex-col justify-between pr-4">
        <div>
          <p className="text-sm text-gray-600 mb-1 italic">
            {group.category_name ? group.category_name : "General"}
          </p>
          <h2 className="text-2xl font-bold mb-3">{group.product_name}</h2>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">👥</span>
              <span>Joined: {numMembers}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-600">💰</span>
              <span className="text-green-700">Offers: 0</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Expired: {expiryDate ? expiryDate.toLocaleDateString() : "N/A"}
        </p>
      </div>

      <div className="functionality flex-1 flex flex-col justify-center items-end gap-2">
        <button
          onClick={() => makeOffer?.(group.id)}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold"
        >
          Make Offer
        </button>

      </div>
    </div>
  );
}


export default SellerOfferCard;
// export type { ProductOffer };
