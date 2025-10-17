import { useState } from "react";
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

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGroupCreated: () => void;
}

function CreateGroupModal({ isOpen, onClose, onGroupCreated }: CreateGroupModalProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    async function insertGroup(formValues: ZodSafeParseResult<any>) {
        try {
            setIsLoading(true);
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

            console.log("Group created successfully:", buyingGroup);
            onGroupCreated();
            onClose();
        } catch (error) {
            console.error("Error creating group:", error);
            setErrors({ submit: "Failed to create group. Please try again." });
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);
        const result = userSchema.safeParse(formValues);

        if (result.success) {
            console.log("Form is valid:", result.data);
            setErrors({});
            insertGroup(result);
        } /* else {
            const newErrors: Record<string, string> = {};
            result.error.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as string] = err.message;
                }
            });
            setErrors(newErrors);
        } */
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Create Buying Group</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-6">
                        {/* Product Name */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Product Name:</label>
                            <input
                                type="text"
                                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                                    errors.productName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="..."
                                id="productName"
                                name="productName"
                                required
                            />
                            {errors.productName && (
                                <span className="text-red-500 text-sm mt-1">{errors.productName}</span>
                            )}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Category:</label>
                            <select 
                                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
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
                            {errors.category && (
                                <span className="text-red-500 text-sm mt-1">{errors.category}</span>
                            )}
                        </div>

                        {/* Location */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Location:</label>
                            <input
                                type="text"
                                className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                                    errors.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="..."
                                id="location"
                                name="location"
                                required
                            />
                            {errors.location && (
                                <span className="text-red-500 text-sm mt-1">{errors.location}</span>
                            )}
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Brand:</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="..."
                                id="brand"
                                name="brand"
                            />
                        </div>

                        {/* Expiry */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Expiry:</label>
                            <select 
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                id="expiry"
                                name="expiry"
                            >
                                <option>Implementation needed</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                            <label className="text-lg font-normal mb-2">Description:</label>
                            <textarea
                                className="border border-gray-300 rounded px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                                placeholder="..."
                                id="description"
                                name="description"
                            />
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {errors.submit}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-center gap-8 mt-12">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-bold py-3 px-10 rounded-lg shadow-md"
                            >
                                {isLoading ? "Creating..." : "Create group"}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="border-2 border-red-300 text-red-500 hover:bg-red-50 font-semibold py-3 px-10 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGroupModal;