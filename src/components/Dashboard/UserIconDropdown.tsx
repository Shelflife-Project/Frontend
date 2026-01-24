import LogoutButton from "../LogoutButton";
import UserIcon from "./UserIcon";
import { useAuth } from "../../context/AuthContext";

export default function UserIconDropdown() {
    const { user } = useAuth();

    if (!user)
        return <a href="/login" className="btn btn-secondary">Login</a>;

    return <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <UserIcon />
            </div>
        </div>
        <ul
            tabIndex={-1}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/dashboard/profile">Profile</a></li>
            <li><LogoutButton /></li>
        </ul>
    </div>
}