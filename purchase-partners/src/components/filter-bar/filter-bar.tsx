import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CategoryTreeFilter } from "./category-tree-filter";
import type { Categories, CompleteBuyingGroupInfo } from "../../types/api";

interface FilterBarProps {
  categories?: Categories[];
  groups?: CompleteBuyingGroupInfo[];
  onFilterChange?: (filteredGroups: CompleteBuyingGroupInfo[], categoryId: number | null) => void;
}

function FilterBar({ categories, groups = [], onFilterChange }: FilterBarProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

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
    console.log('Category selected:', categoryId);
    setSelectedCategoryId(categoryId);
    setShowCategoryDropdown(false);

    // Filter groups based on selected category and all its descendants
    if (onFilterChange) {
      const descendantIds = getDescendantIds(categoryId);
      const filtered = groups.filter(
        (group) => descendantIds.includes(group.category_id)
      );
      console.log('Descendant IDs:', descendantIds);
      console.log('Filtered results:', filtered.length, 'groups');
      onFilterChange(filtered, categoryId);
    }
  };

  const selectedCategoryName = 
    selectedCategoryId === null
      ? 'All Categories'
      : categories?.find((c) => c.id === selectedCategoryId)?.category_name || 'Categories';

  return (
    <div onClick={(e) => {
      // Close dropdown when clicking outside
      if (showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
    }}>
      <div>
        <span>Home</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
          Filter & Sort
        </button>

        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCategoryDropdown(!showCategoryDropdown);
            }}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: showCategoryDropdown ? '#f0f0f0' : 'white',
              transition: 'background-color 0.2s',
            }}
          >
            {selectedCategoryName} {showCategoryDropdown ? '▼' : '▶'}
          </button>

          {showCategoryDropdown && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: 'white',
                zIndex: 10,
                minWidth: '250px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '8px',
              }}
            >
              {categories && categories.length > 0 ? (
                <>
                    <div
                    onClick={() => {
                      setSelectedCategoryId(null);
                      setShowCategoryDropdown(false);
                      if (onFilterChange) {
                        onFilterChange(groups, null);
                      }
                    }}
                    style={{
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: selectedCategoryId === null ? '#f0f0f0' : 'transparent',
                      padding: '8px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedCategoryId === null}
                      onChange={() => {
                        setSelectedCategoryId(null);
                        if (onFilterChange) {
                          onFilterChange(groups, null);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        cursor: 'pointer',
                      }}
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
                <div style={{ padding: '8px', color: '#666' }}>
                  No categories available
                </div>
              )}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Select Location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        />
      </div>
    </div>
  );
}

export default FilterBar;