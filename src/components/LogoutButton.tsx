import { useAuth } from "shelflife-react-hooks";

export default function LogoutButton() {
    const { getMe, logout } = useAuth();

    async function handleLogout() {
        await logout();
        getMe();
    }

    return <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
}