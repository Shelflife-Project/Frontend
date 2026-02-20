import { useAuth } from "shelflife-react-hooks";
import LogoutButton from "../LogoutButton";
import UserIcon from "./UserIcon";
import { Link } from "react-router";

export default function UserIconDropdown() {
    const { user, isLoading } = useAuth();

    if (isLoading)
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;

    if (!user)
        return <Link to="/login" className="btn btn-secondary">Login</Link>;

    return <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <UserIcon />
            </div>
        </div>
        <ul
            tabIndex={-1}
            className="menu dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><LogoutButton /></li>
        </ul>
    </div>
}