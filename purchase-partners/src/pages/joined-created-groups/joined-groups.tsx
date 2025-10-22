import Navbar from "../../components/navbar/navbar";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import BuyingGroupCard from "../buying-group-dashboard/buying-group-card";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";
import { useProfile } from "../../hooks/useProfile";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import type { Profile } from "../../types/api";
import { getNumberOfMembers } from "../../utils/buyingGroupDetails";
import { coerceGroupType } from "../../utils/typeHelpers";
import { useNavigate } from "react-router-dom";

// Sample data for joined groups
const joinedGroups = [
  {
    id: 1,
    created_at: "2025-01-15",
    active: true,
    location: "Melbourne",
    Products: {
      id: 1,
      name: "iPhone 17 Pro",
      description: "Latest iPhone model",
    },
  },
];

function JoinedGroups() {
  const { profile, error } = useProfile();
  const [groups, setGroups] = useState<BuyingGroupDetails[]>([]);
  const navigate = useNavigate();

  function onLeave(groupId: number) {
    navigate(`/group/${groupId}`);
  }

  async function getUserGroups(profile?: Profile) {
    if (!profile) {
      console.warn("No profile found — user might not be logged in.");
      return [];
    }

    const { data, error } = await supabase
      .from("BuyingGroupMembers")
      .select(
        `
            group_id,
            buyer_id
          `
      )
      .eq("buyer_id", profile.id);

    if (error) {
      console.error("Error fetching user groups:", error);
      return [];
    }

    console.log("Joined groups data:", data);
    return data;
  }

  useEffect(() => {
    async function getJoinedGroups() {
      if (!profile) {
        console.log("User not logged in.");
        return;
      }

      if (profile) {
        const joinedGroups = await getUserGroups(profile);
        const joinedGroupIds = joinedGroups.map((group) =>
          Number(group.group_id)
        );

        console.log("User joined group IDs:", joinedGroupIds);

        const { data, error } = await supabase
          .from("BuyingGroups")
          .select("*, Products (*)")
          .in("id", joinedGroupIds);

        if (error) {
          console.error("Error fetching joined groups:", error);
          return;
        }

        const groupsDetails = await Promise.all(
          data.map(async (group) => ({
            group: coerceGroupType(group),
            mode: "joined" as const,
            numMembers: await getNumberOfMembers(group.id),
          }))
        );

        setGroups(groupsDetails);
        console.log("Supabase BuyingGroups data:", data);
        console.log("Fetched group details:", groupsDetails);
      }
    }

    getJoinedGroups();
  }, [profile]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SearchNavBar buttonText="Create Group" buttonLink="/create-group" />

      <div className="px-6 pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <a href="/dashboard" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <span>Groups</span>
        </div>

        {/* Tab Navigation */}
        {/* <div className="flex justify-center gap-4 mb-8">
          <button className="px-8 py-3 font-bold text-lg bg-black text-yellow-400 rounded-lg">
            Joined
          </button>
          <span className="text-3xl text-gray-400">|</span>
          <a
            href="/created-groups"
            className="px-8 py-3 font-bold text-lg bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Created
          </a>
        </div> */}

        {/* Groups Header */}
        <h1 className="flex justify-center text-4xl font-bold mb-10">
          Joined Groups
        </h1>

        {/* Groups List */}
        <div className="grid grid-cols-2 gap-8">
          {groups.map((group) => (
            <BuyingGroupCard
              key={group.group.id}
              group={group.group}
              mode="joined"
              onLeave={onLeave}
              numMembers={group.numMembers}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JoinedGroups;
