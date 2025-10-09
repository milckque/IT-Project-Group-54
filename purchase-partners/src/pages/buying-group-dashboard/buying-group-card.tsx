import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import type { BuyingGroup } from "./buying-group-dashboard";

function BuyingGroupCard({ group }: { group: BuyingGroup }) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div key={group.id} className="group-card h-48 p-4 bg-gray-200 shadow-xl rounded-lg flex flex-row relative">
            {/* Bookmark Button */}
            <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-300 rounded-lg transition-colors"
            >
                <Bookmark 
                    className={`w-6 h-6 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                />
            </button>

            <div className="details flex-3 flex flex-col justify-between pr-4">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{group.Products?.name ? 'Mobile phones' : ''}</p>
                    <h2 className="text-2xl font-bold mb-3">{group.Products.name}</h2>
                    
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500">👥</span>
                            <span className="text-sm">Joined: Buyers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-600">💰</span>
                            <span className="text-sm text-green-700">Offers: 0</span>
                        </div>
                    </div>
                </div>
                
                <p className="text-xs text-gray-500">Expires: {new Date(group.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="functionality flex-1 flex flex-col justify-center items-end">
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold">
                    Join Now
                </button>
            </div>
        </div>
    );
}

export default BuyingGroupCard;