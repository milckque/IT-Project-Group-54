import SideBarItem from "./side-bar-item";
import { forwardRef } from "react";
import "./side-bar.css";
import { useAuth } from "../../backend/AuthContext";

// css to handle the sliding in and out of the sidebar
const width = 20; // Width in rem
const sidebarStyles = (isOpen: boolean) => ({
  width: `${width}rem`,
  right: isOpen ? 0 : `-${width}rem`,
  transition: "right 0.3s ease",
});

const SideBar = forwardRef<HTMLDivElement, { isOpen?: boolean }>(
  ({ isOpen = false }, ref) => {
    const { signOut, loading, user } = useAuth();
    return (
      <div
        ref={ref}
        style={sidebarStyles(isOpen)}
        className={`side-bar bg-yellow-200 h-full flex flex-col space-y-4 p-4 border-b border-gray-300 absolute top-0 z-10 overflow-hidden`}
      >
        <div className="header">Insert stuff here</div>

        <div className="body flex flex-col space-y-2">
          <SideBarItem title="Groups" href="/joined-groups" />
          <SideBarItem title="Vouchers" href="/vouchers" />
          {user ? (
            <div className="mt-auto pt-2">
              <SideBarItem
                title={loading ? "Signing out..." : "Logout"}
                onClick={async (e) => {
                  e.preventDefault();
                  await signOut();
                  window.location.reload();
                }}
              />
            </div>
          ) : (
            <SideBarItem title="Login" href="/login" />
          )}
        </div>
      </div>
    );
  }
);

export default SideBar;
