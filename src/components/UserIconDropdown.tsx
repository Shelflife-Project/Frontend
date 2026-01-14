import { useEffect, useState } from "react";
import { getCurrentUser } from "../Fetch_APIs/autentication";
import type { User } from "../Types/User";
import LogoutButton from "./LogoutButton";
import UserIcon from "./UserIcon";

export default function UserIconDropdown() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
    }, []);

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
            <li><a href="/profile">Profile</a></li>
            <li><LogoutButton /></li>
        </ul>
    </div>
}