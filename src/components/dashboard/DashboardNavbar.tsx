import { Link } from "react-router";
import Theme from "../Theme";
import UserIconDropdown from "./UserIconDropdown";

export default function DashboardNavbar() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <Link to={"/dashboard"}><img src="/shelflife.svg" className="w-8 me-2" /></Link>
                    
                </div>
                <div className="navbar-end">
                    <Theme />
                    <UserIconDropdown />
                </div>
            </div>
        </>
    )
}