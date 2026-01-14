import { useNavigate } from "react-router";
import { logout } from "../Fetch_APIs/autentication";

export default function LogoutButton() {
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login", { replace: true });
    }

    return <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
}