import { useNavigate } from "react-router-dom";
import { useAuth } from "../../backend/AuthContext";

export default function Logout() {
  const { signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    // After sign-out, navigate home (or login)
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
