import { logout } from "../apis/Authentication";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
    const { refreshAuth } = useAuth();

    async function handleLogout() {
        await logout();
        refreshAuth();
    }

    return <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
}