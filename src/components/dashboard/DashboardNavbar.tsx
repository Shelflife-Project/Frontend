import Theme from "../Theme";
import UserIconDropdown from "./UserIconDropdown";

export default function DashboardNavbar() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <Theme />
                </div>
                <div className="navbar-end">
                    <UserIconDropdown />
                </div>
            </div>
        </>
    )
}