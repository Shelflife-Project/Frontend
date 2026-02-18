import { useAuth } from "shelflife-react-hooks";

export default function LogoutButton() {
    const { logout } = useAuth();

    async function handleLogout() {
        await logout();
    }

    return <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
}