import Navbar from "../../components/navbar/navbar";
import SellerOffersBar from "../../components/seller-bar/seller-bar";
import SearchNavBarSeller from "../../components/search-nav-bar/search-nav-bar-seller";
import SellerOfferCard from "./seller-offer-card";
// import type { ProductOffer } from "./seller-offer-card";
import FilterBar from "../../components/filter-bar/filter-bar";
import { useProfile } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { fetchGroupsDetails } from "../../utils/buyingGroupDetails";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";
import { use, useEffect, useState } from "react";

// Sample data for product offers
// const productOffers: ProductOffer[] = [
//   {
//     id: 1,
//     category: "Mobile phones",
//     name: "iPhone 17 Pro",
//     joined: 2123,
//     offers: 2,
//     expired: "19/10/25",
//     hasOffer: true,
//     bookmarked: true,
//   },
//   {
//     id: 2,
//     category: "Mobile phones",
//     name: "iPhone 17",
//     joined: 1301,
//     offers: 1,
//     expired: "30/10/25",
//     hasOffer: true,
//     bookmarked: false,
//   },
//   {
//     id: 3,
//     category: "Mobile phones",
//     name: "Samsung Galaxy S25 Ultra",
//     joined: 806,
//     offers: 1,
//     expired: "15/10/25",
//     hasOffer: false,
//     bookmarked: false,
//   },
//   {
//     id: 4,
//     category: "Mobile phones",
//     name: "Samsung Galaxy Z Flip7 5G",
//     joined: 803,
//     offers: 0,
//     expired: "18/10/25",
//     hasOffer: false,
//     bookmarked: false,
//   },
// ];

function SellerDashboard() {
  const { profile, error } = useProfile();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const navigate = useNavigate();
  const [groups, setGroups] = useState<BuyingGroupDetails[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<BuyingGroupDetails[]>(
    []
  );

  const handleSearchResults = (results: BuyingGroupDetails[]) => {
    setFilteredGroups(results.length > 0 ? results : groups);
  };

  useEffect(() => {
    // Runs when profile is loaded
    if (profile && !profileLoaded) {
      setProfileLoaded(true);
      fetchGroupsDetails(profile).then((data) => {
        setGroups(data);
        setFilteredGroups(data);
      });
    }
  }, [profile, profileLoaded]);

  useEffect(() => {
    // Runs once on component mount
    fetchGroupsDetails().then((data) => {
      setGroups(data);
      setFilteredGroups(data);
    });
  }, []);

  function makeOffer(groupId: number) {
    navigate(`/buying-group-seller/${groupId}`);
  }

  return (
    <div className="dashboard-page flex flex-col size-full">
      {/* Navbar */}
      <Navbar />

      {/* Search, Filters, and Sidebar */}
      {/* <SellerOffersBar /> */}

      <SearchNavBarSeller
        buttonText="Create Group"
        buttonLink="/create-group"
        data={groups}
        onSearchResults={handleSearchResults}
      />
      <FilterBar />

      {/* Main Content */}
      {/* <div className="bg-white min-h-screen"> */}
      {/* Product Cards */}
      {/* <div className="px-6 space-y-4 pb-8">
          {productOffers.map((offer) => (
            <SellerOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div> */}

      <div className="grid grid-cols-2 gap-8 p-8">
        {filteredGroups.map((item) => (
          <SellerOfferCard
            key={item.group.id}
            group={item.group}
            mode={item.mode}
            makeOffer={makeOffer}
            numMembers={item.numMembers}
          />
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;
