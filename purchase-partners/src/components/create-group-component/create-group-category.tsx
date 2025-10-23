import { useState } from "react";
import type { Categories, CompleteBuyingGroupInfo } from "../../types/api";
import { CategoryTreeFilter } from "../filter-bar/category-tree-filter";

function CreateGroupCategory(
    { categories, selectedCategoryId, setSelectedCategoryId }: 
    { categories?: Categories[], selectedCategoryId: number | null, setSelectedCategoryId: (id: number | null) => void }
) {
    
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // Get all descendant category IDs for a given category
    const getDescendantIds = (categoryId: number): number[] => {
        const descendants = [categoryId];
        if (!categories) return descendants;

        const findChildren = (parentId: number) => {
            const children = categories.filter((cat) => cat.parent_id === parentId);
            children.forEach((child) => {
                descendants.push(child.id);
                findChildren(child.id);
            });
        };

        findChildren(categoryId);
        return descendants;
    };

    const handleCategoryChange = (categoryId: number) => {
        console.log("Category selected:", categoryId);
        setSelectedCategoryId(categoryId);
        setShowCategoryDropdown(false);

        // // Filter groups based on selected category and all its descendants
        // if (onFilterChange) {
        //   const descendantIds = getDescendantIds(categoryId);
        //   const filtered = groups.filter((group) =>
        //     descendantIds.includes(group.category_id)
        //   );
        //   console.log("Descendant IDs:", descendantIds);
        //   console.log("Filtered results:", filtered.length, "groups");
        //   onFilterChange(filtered, categoryId);
        // }
    };

    const selectedCategoryName =
        selectedCategoryId === null
            ? "All Categories"
            : categories?.find((c) => c.id === selectedCategoryId)?.category_name ||
            "Categories";

    return (
        <div>
            {/* Category Dropdown Filter */}
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowCategoryDropdown(!showCategoryDropdown);
                    }}
                    className={`
              px-4 py-2 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200
              ${showCategoryDropdown
                            ? "bg-gray-100"
                            : "bg-white hover:bg-gray-50"
                        }
            `}
                >
                    {selectedCategoryName} {showCategoryDropdown ? "▼" : "▶"}
                </button>

                {showCategoryDropdown && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
                absolute top-full left-0 mt-2 border border-gray-300 rounded-lg
                bg-white z-10 min-w-[250px] max-h-[400px] overflow-y-auto p-2 shadow-lg
              "
                    >
                        {categories && categories.length > 0 ? (
                            <>
                                <div
                                    onClick={() => {
                                        setSelectedCategoryId(null);
                                        setShowCategoryDropdown(false);
                                    }}
                                    className={`
                      p-2 cursor-pointer flex items-center gap-2 rounded-md transition-colors duration-200
                      ${selectedCategoryId === null
                                            ? "bg-gray-100 hover:bg-gray-200"
                                            : "hover:bg-gray-50"
                                        }
                    `}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedCategoryId === null}
                                        onChange={() => {
                                            setSelectedCategoryId(null);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="cursor-pointer"
                                    />
                                    <span>All Categories</span>
                                </div>
                                <CategoryTreeFilter
                                    categories={categories}
                                    value={selectedCategoryId ? [selectedCategoryId] : []}
                                    onChange={handleCategoryChange}
                                />
                            </>
                        ) : (
                            <div className="p-2 text-gray-500">No categories available</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateGroupCategory;