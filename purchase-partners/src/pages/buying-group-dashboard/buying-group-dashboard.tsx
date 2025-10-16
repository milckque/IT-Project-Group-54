import { use, useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import BuyingGroupCard from "./buying-group-card";
import type { CardMode } from "./buying-group-card";
import type { Product, BuyingGroup } from "../../types/api";
import CreateAndSearch from '../../components/buyer-bar/buyer-bar';
import { useProfile } from "../../hooks/useProfile";
import { coerceGroupType } from "../../utils/typeHelpers";

type BuyingGroupDetails = {
    group: BuyingGroup;
    mode: CardMode;
    numMembers: number;
}

function BuyingGroupDashboard() {
    const { profile, error } = useProfile();
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [groups, setGroups] = useState<BuyingGroupDetails[]>([]);

    async function fetchGroups() {
        const { data, error } = await supabase
            .from('BuyingGroups')
            .select(`
                id, location, active, created_at,
                Products (*)
            `);
        if (error) {
            console.error("Error fetching groups:", error);
        }

        const groupsWithMode = await Promise.all(data?.map(async (group) => ({
            group: coerceGroupType(group),
            mode: await isMember(group.id) ? 'joined' as CardMode : 'browse' as CardMode,
            numMembers: await getNumberOfMembers(group.id),
        })) || []);

        setGroups(groupsWithMode || []);
        // console.log("Fetched groups:", data);
    }

    async function isMember(groupId: number): Promise<boolean> {
        // return false;
        if (!profile) {
            return false;
        }
        const { data, error } = await supabase
            .from('BuyingGroupMembers')
            .select('*')
            .eq('group_id', groupId)
            .eq('buyer_id', profile.id);
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return false;
            }
            console.error("Error checking membership:", error);
            return false;
        }

        return data && data.length > 0;
    }

    async function getNumberOfMembers(groupId: number): Promise<number> {
        // return 0;
        const { count, error } = await supabase
            .from('BuyingGroupMembers')
            .select('*', { count: 'exact', head: true })
            .eq('group_id', groupId);
        if (error) {
            console.error("Error fetching number of members:", error);
            return 0;
        }
        return count as number || 0;
    }

    useEffect(() => {
        if (profile && !profileLoaded) {
            setProfileLoaded(true);
            fetchGroups();
            console.log("Profile loaded:", profile);
        }
    }, [profile, profileLoaded]);

    useEffect(() => {
        console.log("test");
        fetchGroups();
    }, []);

    function onJoin(groupId: number) {
        // console.log("Joining group with ID:", groupId);
        if (!profile) {
            console.error("User profile not loaded.");
            return;
        }

        supabase.from('BuyingGroupMembers').upsert({
            group_id: groupId,
            buyer_id: profile.id,
        }).then(({ data, error }) => {
            if (error) {
                console.error("Error joining group:", error);
            } else {
                console.log("Successfully joined group:", data);
            }
        });

        // Update the group mode locally
        setGroups((prevGroups) => prevGroups.map((item) =>
            item.group.id === groupId ? { ...item, mode: 'joined' } : item
        ));
    }

    function onLeave(groupId: number) {
        if (!profile) {
            console.error("User profile not loaded.");
            return;
        }

        supabase.from('BuyingGroupMembers').
            delete().
            eq('group_id', groupId).
            eq('buyer_id', profile.id)
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error leaving group:", error);
                } else {
                    console.log("Successfully left group:", data);
                }
            });
        
        // Update the group mode locally
        setGroups((prevGroups) => prevGroups.map((item) =>
            item.group.id === groupId ? { ...item, mode: 'browse' } : item
        ));
    }

    return (
        <div className="dashboard-page flex flex-col size-full">
            <Navbar /> 
            <CreateAndSearch />
            <div className="grid grid-cols-2 gap-8 p-8">
                {groups.map((item) => (
                    <BuyingGroupCard key={item.group.id} group={item.group} mode={item.mode} onJoin={onJoin} onLeave={onLeave} numMembers={item.numMembers}/>
                ))}
            </div>
        </div>
    );
}

export default BuyingGroupDashboard;
export type { Product, BuyingGroup };