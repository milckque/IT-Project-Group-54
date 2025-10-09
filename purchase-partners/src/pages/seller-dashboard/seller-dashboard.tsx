import { useState } from 'react';
import { Bookmark, Bell } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import CreateAndSearch from '../../components/create-and-search.tsx/create-and-search';

// Sample data for product offers
const productOffers = [
    {
        id: 1,
        category: 'Mobile phones',
        name: 'iPhone 17 Pro',
        joined: 2123,
        offers: 2,
        expired: '19/10/25',
        hasOffer: true,
        bookmarked: true
    },
    {
        id: 2,
        category: 'Mobile phones',
        name: 'iPhone 17',
        joined: 1301,
        offers: 1,
        expired: '30/10/25',
        hasOffer: true,
        bookmarked: false
    },
    {
        id: 3,
        category: 'Mobile phones',
        name: 'Samsung Galaxy S25 Ultra',
        joined: 806,
        offers: 1,
        expired: '15/10/25',
        hasOffer: false,
        bookmarked: false
    },
    {
        id: 4,
        category: 'Mobile phones',
        name: 'Samsung Galaxy Z Flip7 5G',
        joined: 803,
        offers: 0,
        expired: '18/10/25',
        hasOffer: false,
        bookmarked: false
    }
    ];

    function SellerDashboard() {
    const [bookmarkedItems, setBookmarkedItems] = useState<Record<number, boolean>>(
        productOffers.reduce((acc, product) => {
        acc[product.id] = product.bookmarked;
        return acc;
        }, {} as Record<number, boolean>)
    );

    const toggleBookmark = (productId: number) => {
        setBookmarkedItems(prev => ({
        ...prev,
        [productId]: !prev[productId]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900">
        {/* Navbar */}
        <Navbar />

        {/* Search, Filters, and Sidebar */}
        <CreateAndSearch />

        {/* Main Content */}
        <div className="bg-white min-h-screen">
            {/* Product Cards */}
            <div className="px-6 space-y-4 pb-8">
            {productOffers.map((product) => (
                <div key={product.id} className="bg-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                    
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                        <span className="text-yellow-500">👥</span>
                        <span className="text-sm">Joined: {product.joined} Buyers</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-green-600">💰</span>
                        <span className="text-sm text-green-700">Offers: {product.offers}</span>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-300 rounded-lg">
                        <Bell className="w-5 h-5" />
                        </button>
                        <button 
                        onClick={() => toggleBookmark(product.id)}
                        className="p-2 hover:bg-gray-300 rounded-lg"
                        >
                        <Bookmark 
                            className={`w-5 h-5 ${bookmarkedItems[product.id] ? 'fill-yellow-400 text-yellow-400' : ''}`}
                        />
                        </button>
                    </div>

                    <button 
                        className={`px-8 py-3 rounded-lg font-semibold ${
                        product.hasOffer 
                            ? 'bg-black text-white hover:bg-gray-800' 
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                    >
                        {product.hasOffer ? 'Pay fee' : 'Make offer'}
                    </button>

                    <p className="text-xs text-gray-500">Expired: {product.expired}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}

export default SellerDashboard;