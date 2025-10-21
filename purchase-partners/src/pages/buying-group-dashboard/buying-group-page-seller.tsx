import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import Navbar from "../../components/navbar/navbar";
import { useLocation, useParams } from "react-router-dom";
import type { BuyingGroup } from "../../types/api";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import NotificationPopup from "../../components/notif-pop-up/notif-pop-up";
import { fetchGroupDetails } from "../../utils/buyingGroupDetails";
import { useProfile } from "../../hooks/useProfile";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";

function BuyingGroupPageSeller() {
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

  //   useEffect(() => {
  //     async function fetchGroups() {
  //       const { data, error } = await supabase
  //         .from("BuyingGroups")
  //         .select(
  //           `
  //                     *,
  //                     Products (*)
  //                     `
  //         )
  //         .eq("id", id)
  //         .single();
  //       if (error) {
  //         console.error("Error fetching groups:", error);
  //       }
  //       setGroup(data ?? null);
  //       console.log("Fetched group:", data);
  //     }
  //     if (!group) {
  //       fetchGroups();
  //     }
  //   }, [id, group]);

  //   const handleSearchResults = (results: BuyingGroup[]) => {
  //     setFilteredGroups(results.length > 0 ? results : groups);
  //   };

  const handleNotificationSubmit = (count: string) => {
    console.log(`Set notification threshold to ${count} buyers`);
    // TODO: Save notification threshold to database
    // You would typically save this to Supabase here
  };

  return (
    <div className="dashboard-page flex flex-col size-full">
      <Navbar />

      {/* Modified SearchNavBar for Seller - shows "Offers" instead of "Create Group" */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <button className="bg-[#FFC107] text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 text-xl">
            Offers
          </button>
        </div>
      </div>

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
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-5xl font-inter font-bold">
              {group?.group.product.name}
            </h1>

            {/* Description */}
            <p className="text-2xl font-poppins mt-6">Description</p>
            <p className="text-lg font-poppins ml-4">
              {group?.group.product.description || "No description available."}
            </p>

            {/* Preferences - if you have them */}
            {/* {group?.preferences && (
              <>
                <p className="text-xl font-poppins ml-4 mt-2">Preferences:</p>
                <ul className="text-base font-poppins ml-8 list-disc">
                  <li>Base model or Pro versions considered</li>
                  <li>256 GB storage or higher</li>
                  <li>Any colour</li>
                </ul>
              </>
            )} */}

            {/* Brand */}
            <p className="text-2xl font-poppins mt-6">Brand</p>
            {/* <p className="text-lg font-poppins ml-4">
              {group?.group.product.brand || "NA"}
            </p> */}
          </div>

          {/* Seller Action Buttons */}
          <div className="flex flex-col items-end gap-4 min-w-[280px]">
            {/* Offer counter - top right */}
            <div className="text-xl font-medium">1/2</div>

            {/* Make an Offer Button */}
            <button
              onClick={() => navigate("/make-offer")}
              className="bg-[#E52D2D] w-full text-white rounded-lg hover:bg-red-600 font-medium text-xl font-inter px-8 py-3"
            >
              Make an Offer
            </button>

            {/* Pay Fee Button */}
            <button className="bg-white border-2 border-gray-300 w-full text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-xl font-inter px-8 py-3">
              Pay Fee
            </button>

            {/* Set Notify Threshold Button */}
            {/* <button
              onClick={() => setIsNotificationOpen(true)}
              className="bg-[#FFC107] w-full text-black rounded-lg hover:bg-yellow-500 font-medium text-xl font-inter px-8 py-3 flex items-center justify-center gap-2"
            >
              <span>🔔</span>
              Set Notify Threshold
            </button> */}

            {/* Joined Buyers */}
            <div className="mt-8">
              <p className="text-xl font-medium font-poppins text-right">
                Joined: {group?.numMembers || 608} Buyers
              </p>
              <div className="flex flex-row gap-2 mt-3 justify-end">
                <img
                  src="/Group_fill_grey.svg"
                  alt="members"
                  className="w-10 h-10"
                />
                <img
                  src="/Group_fill_grey.svg"
                  alt="members"
                  className="w-10 h-10"
                />
                <img
                  src="/Group_fill_grey.svg"
                  alt="members"
                  className="w-10 h-10"
                />
                <img
                  src="/Group_fill_grey.svg"
                  alt="members"
                  className="w-10 h-10"
                />
                <img
                  src="/Group_fill_grey.svg"
                  alt="members"
                  className="w-10 h-10"
                />
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

        {/* TODO: Add offers list here */}
      </div>

      {/* Notification Popup */}
      {/* <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onSubmit={handleNotificationSubmit}
      /> */}
    </div>
  );
}

export default BuyingGroupPageSeller;
