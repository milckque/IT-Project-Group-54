import SideBar from "../side-bar/side-bar";
import { useState, useRef, useEffect } from "react";

function CreateAndSearch() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    function toggleSideBar() {
        setIsSideBarOpen(!isSideBarOpen);
    }

    // Close sidebar when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsSideBarOpen(false);
            }
        }

        if (isSideBarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSideBarOpen]);

    return (
        <div className="header h-24 px-4 bg-gray-200 flex items-center justify-between">
            <SideBar isOpen={isSideBarOpen} ref={sidebarRef} />
            <a href="/create-group" className="h-16 m-4 px-2 bg-yellow-500 text-xl font-bold rounded shadow-lg hover:bg-yellow-600 transition flex items-center">Create Group</a>
            <input type="text" placeholder="Search..." className="m-4 p-2 border rounded w-4/5" />
            <div className="h-10 w-10 m-4 p-2 border rounded inline-block cursor-pointer" onClick={toggleSideBar}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                </svg>
            </div>
        </div>
    );
}

export default CreateAndSearch;