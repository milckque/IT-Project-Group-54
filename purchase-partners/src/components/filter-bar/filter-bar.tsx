import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function FilterBar() {
  const [selectedCategory, setSelectedCategory] = useState('Phones');
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="px-6 pb-4">
        <span className="text-gray-600">Home</span>
      </div>

      {/* Filters */}
      <div className="px-6 pb-6 flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Sort
        </button>
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <option>Phones</option>
          <option>Laptops</option>
          <option>Tablets</option>
        </select>
        
        <div className="border border-gray-300 rounded-lg">
          <CountrySelect
            containerClassName="form-group"
            inputClassName=""
            onChange={(country: any) => {
              setSelectedLocation(country.name);
            }}
            placeHolder="Select Country"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;