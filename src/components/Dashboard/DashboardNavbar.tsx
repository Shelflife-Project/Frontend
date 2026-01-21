import Theme from "../Theme";
import UserIconDropdown from "./UserIconDropdown";
import { Link, useLocation } from "react-router";

export default function DashboardNavbar() {
    const location = useLocation();
    
    const tabs = [
        { label: "Storages", path: "/dashboard/" },
        { label: "Products", path: "/dashboard/products" },
        { label: "Notifications", path: "/dashboard/notifications" },
        { label: "Profile", path: "/dashboard/profile" }
    ];
    
    const isActive = (path: string) => location.pathname === path;

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

            <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 bg-base-100 shadow-lg py-4">
                <div role="tablist" className="tabs tabs-box gap-2">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            role="tab"
                            className={`tab mx-8 px-6 my-2 text-lg ${isActive(tab.path) ? 'tab-active' : ''}`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}