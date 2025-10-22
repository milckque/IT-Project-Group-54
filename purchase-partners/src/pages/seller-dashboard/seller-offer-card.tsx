import { useState } from "react";
import { Bookmark, Bell } from "lucide-react";
import type { BuyingGroup } from "../../types/api";

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
  group: BuyingGroup;
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
            {group.product?.name ? "Mobile phones" : ""}
          </p>
          <h2 className="text-2xl font-bold mb-3">{group.product?.name}</h2>

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
        {/* {mode === "make-offer" && ( */}
        <button
          onClick={() => makeOffer?.(group.id)}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold"
        >
          Make Offer
        </button>
        {/* )} */}

        {/* {mode === "joined" && (
          <button
            onClick={() => onLeave?.(group.id)}
            className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-300 font-medium"
          >
            Make Offer
          </button>
        )}

        {mode === "created" && (
          <>
            <button
              onClick={() => onLeave?.(group.id)}
              className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-300 font-medium"
            >
              Make Offer
            </button>
          </>
        )} */}
      </div>
    </div>
  );
}

// function SellerOfferCard({ offer }: { offer: ProductOffer }) {
//   const [isBookmarked, setIsBookmarked] = useState(offer.bookmarked);

//   const toggleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

// return (
//   <div className="bg-gray-200 rounded-xl p-6 shadow-xl">
//     <div className="flex items-start justify-between">
//       <div className="flex-1">
//         <p className="text-sm text-gray-600 mb-2">{offer.category}</p>
//         <h2 className="text-2xl font-bold mb-4">{offer.name}</h2>

//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-500">👥</span>
//             <span className="text-sm">Joined: {offer.joined} Buyers</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-green-600">💰</span>
//             <span className="text-sm text-green-700">Offers: {offer.offers}</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col items-end gap-4">
//         <div className="flex gap-2">
//           <button className="p-2 hover:bg-gray-300 rounded-lg">
//             <Bell className="w-5 h-5" />
//           </button>
//           <button
//             onClick={toggleBookmark}
//             className="p-2 hover:bg-gray-300 rounded-lg"
//           >
//             <Bookmark
//               className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`}
//             />
//           </button>
//         </div>

//         <button
//           className={`px-8 py-3 rounded-lg font-semibold ${
//             offer.hasOffer
//               ? 'bg-black text-white hover:bg-gray-800'
//               : 'bg-red-500 text-white hover:bg-red-600'
//           }`}
//         >
//           {offer.hasOffer ? 'Pay fee' : 'Make offer'}
//         </button>

//         <p className="text-xs text-gray-500">Expired: {offer.expired}</p>
//       </div>
//     </div>
//   </div>
// );

export default SellerOfferCard;
// export type { ProductOffer };
