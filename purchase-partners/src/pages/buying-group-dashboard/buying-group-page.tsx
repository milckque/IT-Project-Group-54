import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import Navbar from "../../components/navbar/navbar";
import { useLocation, useParams } from "react-router-dom";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import type { BuyingGroup } from "./buying-group-dashboard";

// type BuyingGroupPage = {
//   group: BuyingGroup;
// };

function BuyingGroupPage() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<any>(location.state?.group || null);

  useEffect(() => {
    async function fetchGroups() {
      const { data, error } = await supabase
        .from("BuyingGroups")
        .select(
          `
                *,
                Products (*)
                `
        )
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching groups:", error);
      }
      setGroup(data ?? null);
      console.log("Fetched group:", data);
    }
    if (!group) {
      fetchGroups();
    }
  }, [id, group]);

  return (
    <div className="dashboard-page flex flex-col size-full">
      <Navbar />
      <SearchNavBar buttonText="Create Group" buttonLink="/create-group" />
      <div className="bg-white px-6 pb-4">
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <a href="/dashboard" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <span>{group?.Products.name}</span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8">
        <div className="details flex-20 flex flex-row justify-between px-10">
          <div className="flex flex-col gap-2">
            <h1 className=" text-5xl font-inter font-bold ">
              {group?.Products.name}
            </h1>

            {/* Description */}
            <p className="text-2xl font-poppins ml-8 mt-3">Description</p>
            <p className="text-1xl font-poppins ml-8">
              {group?.Products.description || "No description available."}
            </p>

            {/* Brand */}
            {/* Can't find brand in the database */}
            <p className="text-2xl font-poppins ml-8 mt-3">Brand</p>
            <p className="text-1xl font-poppins ml-8">
              {group?.Products.brand || "NA"}
            </p>
          </div>

          {/* Join & Leave Buttons */}
          <div className="flex flex-col px-30">
            {/* not function yet */}
            <button className="bg-[#E52D2D] h-15 w-70 text-white rounded-lg hover:bg-red-700 font-medium text-2xl font-inter px-10 py-3 mt-5">
              Join
            </button>

            <button className="bg-white border-1 border-black h-15 w-70 text-black rounded-lg hover:bg-gray-200 font-medium text-2xl font-inter px-10 py-3 mt-5">
              Leave
            </button>

            {/* Joined Buyers */}
            {/* Need implementation */}
            <p className="text-2xl font-medium font-poppins mt-20">
              Joined: ... Buyers
            </p>
            <div className="relative w-40 h-10 mt-2">
              <div className="absolute w-97 h-20 rounded-lg bg-[#808080] opacity-20" />
              <div className="flex flex-row gap-2">
                <img src="/Group_fill_grey.svg" alt="members" />
                <img src="/Group_fill_grey.svg" alt="members" />
                <img src="/Group_fill_grey.svg" alt="members" />
                <img src="/Group_fill_grey.svg" alt="members" />
                <img src="/Group_fill_grey.svg" alt="members" />
              </div>
            </div>
          </div>
        </div>
        {/* Border line */}
        <hr className="my-6 mx-10 border-t-2 border-gray-300" />

        {/* Current offers */}
        <div className="flex items-center px-16">
          <img src="/Subtract.svg" alt="Voucher" className="w-8 h-auto" />
          <p className="text-2xl font-poppins font-black text-[#E52D2D] ml-4">
            Current offers:{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyingGroupPage;
