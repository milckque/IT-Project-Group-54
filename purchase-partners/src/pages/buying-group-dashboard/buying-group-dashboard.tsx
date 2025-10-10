import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import BuyingGroupCard from "./buying-group-card";
import CreateAndSearch from '../../components/buyer-bar/buyer-bar';

type Product = {
    id: number;
    name: string;
    description: string;
};

type BuyingGroup = {
    id: number;
    created_at: string;
    active: boolean;
    location: string;
    Products: Product;
};

function BuyingGroupDashboard() {
    const [groups, setGroups] = useState<BuyingGroup[]>([]);

    async function fetchGroups() {
        const { data, error } = await supabase
            .from('BuyingGroups')
            .select(`
                *,
                Products (*)
            `);
        if (error) {
            console.error("Error fetching groups:", error);
        } 
        setGroups(data ?? []);
        console.log("Fetched groups:", data);
    }

    useEffect(() => {
        fetchGroups();
    }, []);


    return (
        <div className="dashboard-page flex flex-col size-full">
            <Navbar /> 
            <CreateAndSearch />
            <div className="grid grid-cols-2 gap-8 p-8">
                {groups.map((item) => (
                    <BuyingGroupCard key={item.id} group={item} />
                ))}
            </div>
        </div>
    );
}

export default BuyingGroupDashboard;
export type { Product, BuyingGroup };