import { useAuth } from "shelflife-react-hooks";
import LogoutButton from "../LogoutButton";
import UserIcon from "./UserIcon";
import { Link } from "react-router";

export default function UserIconDropdown() {
    const { user, isLoading } = useAuth();

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    if (!user)
        return (
            <Link to="/login" className="btn btn-primary">
                Login
            </Link>
        );

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition"
            >
                <div className="w-10 rounded-full ring ring-primary">
                    <UserIcon />
                </div>
            </div>

            <ul
                tabIndex={-1}
                className="menu dropdown-content bg-base-200 rounded-box z-50 mt-3 w-64 p-2 shadow-xl border border-base-300"
            >
                <li className="menu-title px-3 py-2 text-xs opacity-70">
                    Signed in as
                    <span className="font-semibold text-base-content">
                        {user.username}
                    </span>
                </li>

                <div className="divider my-1"></div>

                <li>
                    <Link to="/dashboard">Storages</Link>
                </li>
                <li>
                    <Link to="/dashboard/products">Products</Link>
                </li>
                <li>
                    <Link to="/dashboard/notifications">Notifications</Link>
                </li>
                <li>
                    <Link to="/dashboard/shoppinglist">Shopping List</Link>
                </li>
                <li>
                    <Link to="/dashboard/admin">Admin Page</Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                    <Link to="/dashboard/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        Profile
                    </Link>
                </li>

                <div className="divider my-1"></div>

                <li className="text-error">
                    <LogoutButton />
                </li>
            </ul>
        </div>
    );
}
