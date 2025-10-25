import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import { fetchGroupDetails } from "../../utils/buyingGroupDetails";
import { useProfile } from "../../hooks/useProfile";
import type { BuyingGroupDetails } from "../../utils/buyingGroupDetails";
import type { CreateOfferRequest } from "../../types/api";
import type { Offer } from "../../types/api";

function MakeOfferPage() {
  const navigate = useNavigate();
  const { profile, error } = useProfile();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [group, setGroup] = useState<BuyingGroupDetails | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  // const group = location.state?.group;

  const [newOffer, setNewOffer] = useState(0);
  const [quantity, setQuantity] = useState("Qty");
  const [description, setDescription] = useState("");
  const [minThreshold, setMinThreshold] = useState(1);

  useEffect(() => {
    if (id && profile && !profileLoaded) {
      if (!profile.is_seller) {
        navigate("/dashboard");
        return;
      }
      fetchGroupDetails(profile ?? undefined, Number(id)).then((data) => {
        setGroup(data);
      });
      setProfileLoaded(true);
      // console.log("Loaded with profile checking");
    }
  }, [id, profile]);

  useEffect(() => {
    if (id) {
      fetchGroupDetails(profile ?? undefined, Number(id)).then((data) => {
        setGroup(data);
      });
    }
    // console.log("Loaded without profile checking");
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const offerData: CreateOfferRequest = {
      group_id: id!,
      price: newOffer,
      min_threshold: minThreshold,
    };

    const { data: offer } = await supabase
      .from("Offers")
      .insert([offerData])
      .select()
      .single();
    console.log("Created offer");

    // const CompletedOfferData : Offer = {
    //   id: offer.id,
    //   group_id: offer.group_id,
    //   seller_id: profile?.id || 0,
    //   price: offer.price ? offer.price : 0,
    //   min_threshold: offer.min_threshold,
    // };

    // TODO: Submit offer to database
    console.log({
      groupId: id,
      newOffer,
      minThreshold,
      quantity,
      description,
    });

    // You would typically save this to Supabase here
    // const { data, error } = await supabase
    //   .from('Offers')
    //   .insert([
    //     {
    //       buying_group_id: id,
    //       discount: newOffer,
    //       quantity: quantity,
    //       description: description
    //     }
    //   ]);

    // Navigate back to the buying group page
    navigate(`/buying-group-seller/${id}`);
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <div className="make-offer-page flex flex-col min-h-screen">
      <Navbar />

      {/* Search Bar Section */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/offers")}
            className="bg-[#FFC107] text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 text-xl"
          >
            Offers
          </button>
          <div className="flex-1 mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 pl-10 bg-gray-200 rounded-lg focus:outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button className="p-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-6 pb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <a href="/seller-dashboard" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <a
            href={`/buying-group-seller/${id}`}
            className="hover:text-gray-900"
          >
            {group?.group.product.name || "Samsung Galaxy Z Flip7 5G"}
          </a>
          <span>/</span>
          <span className="text-gray-900">Make Offer</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white px-16 py-8">
        <h1 className="text-5xl font-bold mb-8">
          {group?.group.product.name || "Samsung Galaxy Z Flip7 5G"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          {/* Current Offer */}
          <div className="flex items-center gap-8">
            <label className="text-2xl font-medium min-w-[250px]">
              Current Offer:
            </label>
            <div className="text-2xl">None</div>
          </div>

          {/* New Offer */}
          <div className="flex items-center gap-8">
            <label className="text-2xl font-medium min-w-[250px] text-black">
              New Offer:
            </label>
            <input
              type="number"
              value={newOffer}
              onChange={(e) => setNewOffer(Number(e.target.value))}
              placeholder="$$$"
              className="px-4 py-2 border-b-2 border-gray-300 focus:border-gray-500 outline-none text-xl bg-gray-50"
              required
            />
          </div>

          {/* Threshold */}
          <div className="flex items-center gap-8">
            <label className="text-2xl font-medium min-w-[250px] text-black">
              Threshold:
            </label>
            <input
              type="number"
              value={minThreshold}
              onChange={(e) => setMinThreshold(Number(e.target.value))}
              placeholder="$$$"
              className="px-4 py-2 border-b-2 border-gray-300 focus:border-gray-500 outline-none text-xl bg-gray-50"
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-8">
            <label className="text-2xl font-medium min-w-[250px]">
              Quantity:
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="px-6 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-xl"
              required
            >
              <option value="Qty">Qty</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-100">51-100</option>
              <option value="100+">100+</option>
            </select>
          </div>

          {/* Offer Description */}
          <div className="flex items-start gap-8">
            <label className="text-2xl font-medium min-w-[250px] pt-2">
              Offer Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="..."
              rows={4}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-xl resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 pt-12">
            <button
              type="submit"
              className="bg-[#FFC107] text-black font-semibold px-16 py-4 rounded-lg hover:bg-yellow-500 text-2xl shadow-lg"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="bg-white border-2 border-red-400 text-red-600 font-semibold px-16 py-4 rounded-lg hover:bg-red-50 text-2xl"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MakeOfferPage;
