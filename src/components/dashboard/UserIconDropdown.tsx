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

                {
                    user.admin &&
                    <li>
                        <Link to="/dashboard/admin">Admin Page</Link>
                    </li>
                }

                <div className="divider my-1"></div>

                <li>
                    <Link to="/dashboard/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/help">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                        </svg>
                        Help
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
