import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import CreateAndSearch from "../../components/create-and-search.tsx/create-and-search";

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
                    <div key={item.id} className="group-card p-4 border-2 border-black rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Buying Group {item.Products.name}</h2>
                        <p className="mb-4">{item.Products.description}</p>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuyingGroupDashboard;