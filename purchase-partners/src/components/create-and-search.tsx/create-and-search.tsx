import { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import SideBar from '../side-bar/side-bar';

function CreateAndSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Phones');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarOpen(false);
        }
        }

        if (isSidebarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
        <div className="bg-white">
            {/* Navigation */}
            <div className="flex items-center gap-4 px-6 py-6">
            <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-500">
                Offers
            </button>
            
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 hover:bg-gray-100 rounded-lg"
            >
                <div className="flex flex-col gap-1">
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                </div>
            </button>
            </div>

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

        {/* Sidebar */}
        <SideBar ref={sidebarRef} isOpen={isSidebarOpen} />
        </>
    );
}

export default CreateAndSearch;