import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import SideBar from "../side-bar/side-bar";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import type { BuyingGroup } from "../../types/api";

type SearchNavBarProps = {
  buttonText: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  onSearchResults?: (results: any[]) => void;
  data: BuyingGroup[];
};

function SearchNavBar({
  buttonText,
  buttonLink,
  onButtonClick,
  onSearchResults,
  data,
}: SearchNavBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      onSearchResults?.([]);
      return;
    }
    const fuse = new Fuse(data, {
      keys: ["Products.name", "Products.description"],
    });

    const result = fuse.search(searchQuery);
    onSearchResults?.(result.map((r) => r.item));
    }, [searchQuery, onSearchResults]);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonLink) {
      navigate(buttonLink);
    }
  };

  return (
    <>
      <div className="bg-white">
        {/* Navigation */}
        <div className="flex items-center gap-4 px-6 py-6">
          <button
            onClick={handleButtonClick}
            className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-500"
          >
            {buttonText}
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
      </div>

      {/* Sidebar */}
      <SideBar ref={sidebarRef} isOpen={isSidebarOpen} />
    </>
  );
}

export default SearchNavBar;
