import Navbar from "../../components/navbar/navbar";
import supabase from "../../supabaseClient";
import z, { type ZodSafeParseResult } from "zod";

// A lot of the form handling code is adapted from this video:
// https://www.youtube.com/watch?v=_QpTQrxzY8A
const userSchema = z.object({
    productName: z.string().min(1, "Product name is required").max(127, "Product name is too long"),
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    brand: z.string().optional(),
    expiry: z.string().optional(),
    description: z.string().optional(),
});


function CreateGroup() {

    // This is very hacked together definitely needs to be improved
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

        // console.log("Form Data:", formData);
        // console.log("Form Values:", formValues);
        // console.log("Validation Result:", result);
        if (result.success) {
            // Handle successful form submission
            console.log("Form is valid:", result.data);
            // Can use stuff like result.data.productName
            insertGroup(result);
        }
    };

    return (
        <div className="dashboard-page flex flex-col size-full">
            <Navbar />
            <div className="h-full bg-white flex flex-col">
                <form action={handleSubmit} className="m-24 space-y-6 space-x-16 flex flex-col items-center">
                    <input
                        type="text"
                        className="text-6xl italic bg-gray-200 w-4/5 p-3 mx-24 focus:outline-none"
                        maxLength={127}
                        placeholder="Product Name..."
                        id="productName"
                        name="productName"
                        autoComplete="off"
                        required
                    />

                    <div className="space-y-6 w-3/5">
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 font-medium text-gray-700">Category:</label>
                            <select 
                                className="border rounded px-3 py-1 w-40" 
                                id="category"
                                name="category"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="transport">Transport</option>
                                <option value="householdAppliances">Household Appliances</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 font-medium text-gray-700">Location:</label>
                            <input
                                type="text"
                                className="border rounded px-3 py-1 flex-1"
                                placeholder="Select Location"
                                id="location"
                                name="location"
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 font-medium text-gray-700">Brand:</label>
                            <input
                                type="text"
                                className="border rounded px-3 py-1 flex-1"
                                placeholder="Select Brand"
                                id="brand"
                                name="brand"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="w-32 text-right mr-4 font-medium text-gray-700">Expiry:</label>
                            <select className="border rounded px-3 py-1 w-60">
                                <option>Implementation needed</option>
                            </select>
                        </div>
                        <div className="flex items-start">
                            <label className="w-32 text-right mr-4 font-medium text-gray-700 pt-2">Description:</label>
                            <textarea
                                className="border rounded px-3 py-2 flex-1 min-h-[60px]"
                                placeholder="Description"
                                id="description"
                                name="description"
                            />
                        </div>
                        <div className="flex justify-center space-x-6 mt-8">
                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded shadow"
                            >
                                Create group
                            </button>
                            <button
                                type="button"
                                className="border border-red-300 text-red-500 hover:bg-red-50 font-medium py-2 px-6 rounded"
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