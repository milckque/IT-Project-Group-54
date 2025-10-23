import { Bookmark } from "lucide-react";
import { useState } from "react";
import type { CompleteBuyingGroupInfo } from "../../types/api";

export type CardMode = "browse" | "joined" | "created";

type BuyingGroupCardProps = {
  group: CompleteBuyingGroupInfo;
  mode?: CardMode;
  onLeave?: (id: number) => void;
  onJoin?: (id: number) => void;
};

function BuyingGroupCard({
  group,
  mode = "browse",
  onLeave,
  onJoin,
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
            {group.product_name ? "Mobile phones" : ""}
          </p>
          <h2 className="text-2xl font-bold mb-3">{group.product_name}</h2>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">👥</span>
              <span>Joined: {group.num_members}</span>
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
        {mode === "browse" && (
          <button
            onClick={() => onJoin?.(group.id)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold"
          >
            Join Now
          </button>
        )}

        {mode === "joined" && (
          <button
            onClick={() => onLeave?.(group.id)}
            className="px-9 py-3 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Leave
          </button>
        )}

        {mode === "created" && (
          <>
            <button
              onClick={() => onLeave?.(group.id)}
              className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-300 font-medium"
            >
              Leave
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BuyingGroupCard;
