import { useAuth } from "../../backend/AuthContext";
import { useProfile } from "../../hooks/useProfile";

function Navbar() {
    const { user } = useAuth();
    const { profile } = useProfile();

    return (
        <nav className="relative bg-black">
            <div className="mx-auto relative flex h-16 px-3 items-center justify-between">
                <div className="flex flex-1 items-center justify-start h-full">
                    <div className="flex items-center m-1 px-3">
                        <span className="text-amber-400 font-bold tracking-wide md:text-2xl">
                            Purchase Partners
                        </span>
                    </div>
                </div>
                <div className="inset-y-0 flex items-center m-1 px-3">
                <span className="text-amber-400 font-bold tracking-wide md:text-2xl"> Hello, {profile?.first_name ?? "there"}! </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;