import { use, useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import BuyingGroupCard from "./buying-group-card";
import type { CardMode } from "./buying-group-card";
import type { Product, BuyingGroup } from "../../types/api";
import CreateAndSearch from "../../components/buyer-bar/buyer-bar";
import { useProfile } from "../../hooks/useProfile";
import { coerceGroupType } from "../../utils/typeHelpers";
import { useNavigate } from "react-router-dom";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import FilterBar from "../../components/filter-bar/filter-bar";
import { fetchGroupsDetails } from "../../utils/buyingGroupDetails";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";


function BuyingGroupDashboard() {
    const { profile, error } = useProfile();
    const [profileLoaded, setProfileLoaded] = useState(false);
    const navigate = useNavigate();
    const [groups, setGroups] = useState<BuyingGroupDetails[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<BuyingGroupDetails[]>(
        []
    );

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

    function onJoin(groupId: number) {
        navigate(`/group/${groupId}`);
    }

    function onLeave(groupId: number) {
        navigate(`/group/${groupId}`);
    }

    const handleSearchResults = (results: BuyingGroupDetails[]) => {
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
                        key={item.group.id}
                        group={item.group}
                        mode={item.mode}
                        onJoin={onJoin}
                        onLeave={onLeave}
                        numMembers={item.numMembers}
                    />
                ))}
            </div>
            {/* <CreateGroupComponent
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onGroupCreated={handleGroupCreated}
      /> */}
        </div>
    );
}

export default BuyingGroupDashboard;
