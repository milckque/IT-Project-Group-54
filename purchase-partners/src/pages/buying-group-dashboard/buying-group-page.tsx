import { use, useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import Navbar from "../../components/navbar/navbar";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import { fetchGroupDetails } from "../../utils/buyingGroupDetails";
import { useProfile } from "../../hooks/useProfile";

function BuyingGroupPage() {
  const { profile, error } = useProfile();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<BuyingGroupDetails | null>(null);
  
  useEffect(() => {
    if (id) {
      fetchGroupDetails(profile ?? undefined, Number(id)).then((data) => {
        setGroup(data);
      });
    }
    // console.log("Loaded without profile checking");
  }, [id]);

  useEffect(() => {
    if (id && profile && !profileLoaded) {
      fetchGroupDetails(profile ?? undefined, Number(id)).then((data) => {
        setGroup(data);
      });
      setProfileLoaded(true);
      // console.log("Loaded with profile checking");
    }
  }, [id, profile]);

  function handleJoin() {
    if (!profile) {
      console.error("User profile not loaded.");
      return;
    }
    supabase.from('BuyingGroupMembers').upsert({
      group_id: group?.group.id,
      buyer_id: profile.id,
    }).then(({ data, error }) => {
      if (error) {
        console.error("Error joining group:", error);
      } else {
        console.log("Successfully joined group:", data);
      }
    });

    navigate(`/dashboard`);
  }

  function handleLeave() {
    if (!profile) {
      console.error("User profile not loaded.");
      return;
    }
    supabase
      .from("BuyingGroupMembers")
      .delete()
      .eq("group_id", group?.group.id)
      .eq("buyer_id", profile.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error leaving group:", error);
        } else {
          console.log("Successfully left group:", data);
        }
      });

    navigate(`/dashboard`);
  }


  return (
    <div className="dashboard-page flex flex-col size-full">
      <Navbar />
      {/* put the search bar in so it looks good, doesn't do any yet */}
      <SearchNavBar
        buttonText="Create Group"
        buttonLink="/create-group"
        data={[]}
        onSearchResults={() => { }}
      />

      <div className="bg-white px-6 pb-4">
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <a href="/dashboard" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <span>{group?.group.product.name}</span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8">
        <div className="details flex-20 flex flex-row justify-between px-10">
          <div className="flex flex-col gap-2">
            <h1 className=" text-5xl font-inter font-bold ">
              {group?.group.product.name}
            </h1>

            {/* Description */}
            <p className="text-2xl font-poppins ml-8 mt-3">Description</p>
            <p className="text-1xl font-poppins ml-8">
              {group?.group.product.description}
            </p>

            {/* Brand */}
            {/* Can't find brand in the database */}
            <p className="text-2xl font-poppins ml-8 mt-3">Brand</p>
            <p className="text-1xl font-poppins ml-8">
              {"NA"}
            </p>
          </div>

          {/* Join & Leave Buttons */}
          <div className="flex flex-col px-30">
            {group?.mode === "joined" ? (
              <button onClick={handleLeave} className="bg-white border-1 border-black h-15 w-70 text-black rounded-lg hover:bg-gray-200 font-medium text-2xl font-inter px-10 py-3 mt-5">
                Leave
              </button>
            ) : (
              <button onClick={handleJoin} className="bg-[#E52D2D] h-15 w-70 text-white rounded-lg hover:bg-red-700 font-medium text-2xl font-inter px-10 py-3 mt-5">
                Join
              </button>
            )}

            {/* Joined Buyers */}
            <p className="text-2xl font-medium font-poppins mt-20">
              Joined: {group?.numMembers} Buyers
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
