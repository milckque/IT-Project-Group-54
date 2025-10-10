import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import type { BuyingGroup } from "./buying-group-dashboard";

type CardMode = 'browse' | 'joined' | 'created';

type BuyingGroupCardProps = {
  group: BuyingGroup;
  mode?: CardMode;
  onLeave?: (id: number) => void;
  onDelete?: (id: number) => void;
  onJoin?: (id: number) => void;
};

function BuyingGroupCard({ group, mode = 'browse', onLeave, onDelete, onJoin }: BuyingGroupCardProps) {
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
                    <p className="text-sm text-gray-600 mb-1 italic">{group.Products?.name ? 'Mobile phones' : ''}</p>
                    <h2 className="text-2xl font-bold mb-3">{group.Products.name}</h2>
                    
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">👥</span>
                            <span>Joined: Buyers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-green-600">💰</span>
                            <span className="text-green-700">Offers: 0</span>
                        </div>
                    </div>
                </div>
                
                <p className="text-xs text-gray-500">Expired: {new Date(group.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="functionality flex-1 flex flex-col justify-center items-end gap-2">
                {mode === 'browse' && (
                    <button 
                        onClick={() => onJoin?.(group.id)}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold"
                    >
                        Join Now
                    </button>
                )}
                
                {mode === 'joined' && (
                    <button 
                        onClick={() => onLeave?.(group.id)}
                        className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-300 font-medium"
                    >
                        Leave
                    </button>
                )}
                
                {mode === 'created' && (
                    <>
                        <button 
                            onClick={() => onLeave?.(group.id)}
                            className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-300 font-medium"
                        >
                            Leave
                        </button>
                        <button 
                            onClick={() => onDelete?.(group.id)}
                            className="px-6 py-2 border-2 border-red-400 text-red-600 rounded hover:bg-red-50 font-medium"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default BuyingGroupCard;