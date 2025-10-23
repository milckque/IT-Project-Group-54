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
import { fetchCompleteBuyingGroup } from "../../utils/buyingGroupDetails";
import type { CompleteBuyingGroupInfo } from "../../types/api";
import type { Categories } from "../../types/api";
import supabase from "../../supabaseClient";

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
  const [groups, setGroups] = useState<CompleteBuyingGroupInfo[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<
    CompleteBuyingGroupInfo[]
  >([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [joinedGroupIds, setJoinedGroupIds] = useState<Set<number>>(new Set());
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<
    CompleteBuyingGroupInfo[] | null
  >(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Categories").select("*");
      if (error) throw error;
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Runs when profile is loaded
    if (profile && !profileLoaded) {
      setProfileLoaded(true);
      fetchCompleteBuyingGroup().then((data) => {
        setGroups(data);
        setFilteredGroups(data);
      });
      if (profile.id) {
        fetchCompleteBuyingGroup(profile.id).then((data) => {
          const ids = new Set(data.map((group) => group.id));
          setJoinedGroupIds(ids);
        });
      }
    }
  }, [profile, profileLoaded]);

  useEffect(() => {
    // Runs once on component mount
    fetchCompleteBuyingGroup().then((data) => {
      setGroups(data);
      setFilteredGroups(data);
    });
  }, []);

  function makeOffer(groupId: number) {
    navigate(`/buying-group-seller/${groupId}`);
  }

  const handleSearchResults = (results: CompleteBuyingGroupInfo[]) => {
    setSearchResults(results.length > 0 ? results : null);

    // Apply category filter on top of search results
    const baseData = results.length > 0 ? results : groups;
    if (selectedCategoryId !== null) {
      const descendantIds = getDescendantIds(selectedCategoryId);
      const categoryFiltered = baseData.filter((group) =>
        descendantIds.includes(group.category_id)
      );
      setFilteredGroups(categoryFiltered);
    } else {
      setFilteredGroups(baseData);
    }
  };

  const getDescendantIds = (categoryId: number): number[] => {
    const descendants = [categoryId];
    const findChildren = (parentId: number) => {
      const children = categories.filter((cat) => cat.parent_id === parentId);
      children.forEach((child) => {
        descendants.push(child.id);
        findChildren(child.id);
      });
    };
    findChildren(categoryId);
    return descendants;
  };

  const handleFilterChange = (
    filtered: CompleteBuyingGroupInfo[],
    categoryId: number | null
  ) => {
    setSelectedCategoryId(categoryId);

    // If there are search results, apply the filter to them
    // Otherwise apply filter to all groups
    const baseData = searchResults || groups;

    if (categoryId === null) {
      setFilteredGroups(baseData);
    } else {
      const descendantIds = getDescendantIds(categoryId);
      const categoryFiltered = baseData.filter((group) =>
        descendantIds.includes(group.category_id)
      );
      setFilteredGroups(categoryFiltered);
    }
  };

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
            key={item.id}
            group={item}
            // mode={item.mode}
            makeOffer={makeOffer}
            numMembers={item.num_members}
          />
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;
