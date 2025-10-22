import Navbar from "../../components/navbar/navbar";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import SearchNavBarSeller from "../../components/search-nav-bar/search-nav-bar-seller";

// Sample data for created groups

type Offer = {
  id: number;
  title: string;
  discountLabel: string; // e.g., "35% Off"
  expires?: string; // e.g., "18/10/2025"
  current: number;
  total: number;
  status: "offered" | "pending";
};

const offers: Offer[] = [
  {
    id: 101,
    title: "Samsung Galaxy S25 Ultra",
    discountLabel: "35% Off",
    expires: "18/10/2025",
    current: 540,
    total: 1000,
    status: "offered",
  },
  {
    id: 102,
    title: "Samsung Galaxy Z Flip7 5G",
    discountLabel: "25% Off",
    current: 630,
    total: 1000,
    status: "pending",
  },
];

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-700 whitespace-nowrap">
        {current} / {total} {pct >= 100 ? "claimed" : "joined"}
      </span>
      <div className="h-3 w-full rounded-full bg-gray-300 overflow-hidden">
        <div
          className="h-full rounded-full bg-gray-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const base =
    "group-card h-48 p-4 md:p-8 shadow-xl rounded-lg flex flex-col gap-4";

  const styles =
    offer.status === "offered"
      ? "bg-amber-100 cursor-default"
      : "bg-gray-200 cursor-default";

  const Content = (
    <>
      <div>
        <h3 className="text-2xl md:text-[32px] font-extrabold leading-tight">
          {offer.title}
        </h3>
        <p className="text-xl font-semibold mt-2">{offer.discountLabel}</p>
        {offer.expires && (
          <p className="text-sm text-gray-700 mt-1">Expired: {offer.expires}</p>
        )}
        {offer.status === "pending" && (
          <p className="text-xs text-gray-600 mt-1">Wait for buyers to join…</p>
        )}
      </div>
      <ProgressBar current={offer.current} total={offer.total} />
    </>
  );

  return (
    <div className={`${base} ${styles}`}>
      <div>
        <h3 className="text-2xl md:text-[32px] font-bold leading-tight">
          {offer.title}
        </h3>
        <p className="text-xl font-semibold mt-2">{offer.discountLabel}</p>
        {offer.expires && (
          <p className="text-sm text-gray-700 mt-1">Expired: {offer.expires}</p>
        )}
        {offer.status === "pending" && (
          <p className="text-xs text-gray-600 mt-1">Wait for buyers to join…</p>
        )}
      </div>
      <ProgressBar current={offer.current} total={offer.total} />
    </div>
  );
}

function SellerOffers() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SearchNavBarSeller buttonText="Offers" buttonLink="/seller-offers" />

      <div className="px-6 pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <a href="/seller-dashboard" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <span>Offers</span>
        </div>

        {/* Groups Header */}
        <h2 className="text-xl font-bold text-center mb-6"> Current Offers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerOffers;
