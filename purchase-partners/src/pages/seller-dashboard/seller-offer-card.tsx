import { useState } from 'react';
import { Bookmark, Bell } from 'lucide-react';

type ProductOffer = {
  id: number;
  category: string;
  name: string;
  joined: number;
  offers: number;
  expired: string;
  hasOffer: boolean;
  bookmarked: boolean;
};

function SellerOfferCard({ offer }: { offer: ProductOffer }) {
  const [isBookmarked, setIsBookmarked] = useState(offer.bookmarked);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-gray-200 rounded-xl p-6 shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{offer.category}</p>
          <h2 className="text-2xl font-bold mb-4">{offer.name}</h2>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">👥</span>
              <span className="text-sm">Joined: {offer.joined} Buyers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">💰</span>
              <span className="text-sm text-green-700">Offers: {offer.offers}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-300 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleBookmark}
              className="p-2 hover:bg-gray-300 rounded-lg"
            >
              <Bookmark 
                className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`}
              />
            </button>
          </div>

          <button 
            className={`px-8 py-3 rounded-lg font-semibold ${
              offer.hasOffer 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {offer.hasOffer ? 'Pay fee' : 'Make offer'}
          </button>

          <p className="text-xs text-gray-500">Expired: {offer.expired}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerOfferCard;
export type { ProductOffer };