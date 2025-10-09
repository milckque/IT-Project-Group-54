import Navbar from '../../components/navbar/navbar';
import SellerOffersBar from '../../components/seller-offers-bar/seller-offers-bar';
import SellerOfferCard from './seller-offer-card';
import type { ProductOffer } from './seller-offer-card';

// Sample data for product offers
const productOffers: ProductOffer[] = [
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
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Search, Filters, and Sidebar */}
      <SellerOffersBar />

      {/* Main Content */}
      <div className="bg-white min-h-screen">
        {/* Product Cards */}
        <div className="px-6 space-y-4 pb-8">
          {productOffers.map((offer) => (
            <SellerOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;