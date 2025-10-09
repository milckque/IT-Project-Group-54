import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import SearchNavBar from "../../components/search-nav-bar/search-nav-bar";
import supabase from "../../supabaseClient";
import z, { type ZodSafeParseResult } from "zod";

const userSchema = z.object({
    productName: z.string().min(1, "Product name is required").max(127, "Product name is too long"),
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    brand: z.string().optional(),
    expiry: z.string().optional(),
    description: z.string().optional(),
});

function CreateGroup() {
    const navigate = useNavigate();

    async function insertGroup(formValues: ZodSafeParseResult<any>) {
        const productData = {
            name: formValues.data.productName,
            description: formValues.data.description || "",
        }

        console.log("Inserting product:", productData);
        const { data: product } = await supabase
            .from('Products')
            .insert([productData])
            .select()
            .single();

        const buyingGroupData = {
            location: formValues.data.location,
            active: true,
            product_id: product.id 
        }

        console.log("Inserting group:", formValues.data);
        const { data: buyingGroup } = await supabase
            .from('BuyingGroups')
            .insert([buyingGroupData])
            .select()
            .single();
    }

    const handleSubmit = (formData: FormData) => {
        const formValues = Object.fromEntries(formData);
        const result = userSchema.safeParse(formValues)

        if (result.success) {
            console.log("Form is valid:", result.data);
            insertGroup(result);
        }
    };

    return (
        <div className="dashboard-page flex flex-col size-full bg-gray-900">
            <Navbar />
            <SearchNavBar buttonText="Create Group" />

            <div className="bg-white px-6 pb-4">
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <a href="/dashboard" className="hover:text-gray-900">Home</a>
                    <span>/</span>
                    <span>Create Group</span>
                </div>
            </div>

            <div className="h-full bg-white flex flex-col items-center py-12">
                <form action={handleSubmit} className="w-full max-w-3xl px-8">
                    {/* Product Name Input */}
                    <input
                        type="text"
                        className="w-full text-5xl italic bg-transparent border-none focus:outline-none text-center mb-12 placeholder-gray-400"
                        maxLength={127}
                        placeholder="Product name..."
                        id="productName"
                        name="productName"
                        autoComplete="off"
                        required
                    />

                    {/* Form Fields */}
                    <div className="space-y-6 max-w-2xl mx-auto">
                        {/* Category */}
                        <div className="flex items-center">
                            <label className="w-40 text-left text-lg font-normal">Category:</label>
                            <select 
                                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                                id="category"
                                name="category"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>Choose</option>
                                <option value="electronics">Electronics</option>
                                <option value="transport">Transport</option>
                                <option value="householdAppliances">Household Appliances</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="flex items-center">
                            <label className="w-40 text-left text-lg font-normal">Location:</label>
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="..."
                                id="location"
                                name="location"
                                required
                            />
                        </div>

                        {/* Brand */}
                        <div className="flex items-center">
                            <label className="w-40 text-left text-lg font-normal">Brand:</label>
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="..."
                                id="brand"
                                name="brand"
                            />
                        </div>

                        {/* Expiry */}
                        <div className="flex items-center">
                            <label className="w-40 text-left text-lg font-normal">Expiry:</label>
                            <select className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                                <option>Implementation needed</option>id="expiry"
                                name="expiry"
                            </select>
                        </div>

                        {/* Description */}
                        <div className="flex items-start">
                            <label className="w-40 text-left text-lg font-normal pt-2">Description:</label>
                            <textarea
                                className="flex-1 border border-gray-300 rounded px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                                placeholder="..."
                                id="description"
                                name="description"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-8 mt-12">
                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-10 rounded-lg shadow-md"
                            >
                                Create group
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="border-2 border-red-300 text-red-500 hover:bg-red-50 font-semibold py-3 px-10 rounded-lg"
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGroup;


