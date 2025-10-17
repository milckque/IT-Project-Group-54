import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import BuyingGroupCard from "./buying-group-card";
import { useNavigate } from "react-router-dom";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import type { BuyingGroup } from "../../types/api";
import FilterBar from "../../components/filter-bar/filter-bar";

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   id: number;
//   name: string;
//   description: string;
// };

// type BuyingGroup = {
//   id: number;
//   created_at: string;
//   active: boolean;
//   location: string;
//   Products: Product;
// };

function BuyingGroupDashboard() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<BuyingGroup[]>([]);

  async function fetchGroups() {
    const { data, error } = await supabase.from("BuyingGroups").select(`
                *,
                Products (*)
            `);
    if (error) {
      console.error("Error fetching groups:", error);
    }
    setGroups(data ?? []);
    setFilteredGroups(data ?? []);
    console.log("Fetched groups:", data);
  }

  const handleJoin = async (groupId: number) => {
    navigate(`/group/${groupId}`);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearchResults = (results: BuyingGroup[]) => {
    setFilteredGroups(results.length > 0 ? results : groups);
  };
  return (
    <div className="dashboard-page flex flex-col size-full">
      <Navbar />
      <SearchNavBar
        buttonText="Create Group"
        buttonLink="/create-group"
        data={groups}
        onSearchResults={handleSearchResults}
      />
      <FilterBar />
      <div className="grid grid-cols-2 gap-8 p-8">
        {filteredGroups.map((item) => (
          <BuyingGroupCard
            key={item.id}
            group={item}
            mode="browse"
            onJoin={handleJoin}
          />
        ))}
      </div>
    </div>
  );
}

export default BuyingGroupDashboard;
