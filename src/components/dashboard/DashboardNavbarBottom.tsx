import { Link, useLocation } from "react-router";
import NotificationsIcon from "./notification/NotificationsIcon";


export default function DashboardNavbarBottom() {
    const isActive = (path: string) => location.pathname === path;
    const location = useLocation();

    const tabs = [
        {
            label: "Storages",
            path: "/dashboard",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-boxes" viewBox="0 0 16 16">
                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v3.5a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2.001-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 12.57V9.075a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zm2.146 1.479L12 3.075v3.994L8.898 9.129zm-6.908 7.068L3.75 8.848l3.898 2.212v3.994l-5.5-3.142zM9.5 9.753l3.898-2.212v3.994l-3.898 2.212z" />
                </svg>
            )
        },
        {
            label: "Products",
            path: "/dashboard/products",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0l-7 2.5A.5.5 0 0 0 .5 4v.5h15V4a.5.5 0 0 0-.314-.467l-7-2.5zM15 5H1v8.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5zM.5 15a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V5.5h-15V15z" />
                </svg>
            )
        },
        {
            label: "Notifications",
            path: "/dashboard/notifications",
            icon: (
                <NotificationsIcon />
            )
        },
        {
            label: "Shopping List",
            path: "/dashboard/shoppinglist",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
            )
        },
        {
            label: "Profile",
            path: "/dashboard/profile",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
            )
        }
    ];

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 py-4">

                <div role="tablist" className="tabs bg-base-100 tabs-box gap-1 sm:gap-2 flex-nowrap shadow-lg z-51">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            role="tab"
                            title={tab.label}
                            aria-label={tab.label}
                            className={`tab relative transition-all sm:mx-3 md:mx-8 sm:my-2 ${isActive(tab.path) ? "tab-active text-primary" : ""}`}
                        >
                            {tab.icon}
                        </Link>
                    ))}
                </div>
                <div
                    className="absolute inset-0 z-1 backdrop-blur-md bg-primary/10 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 10%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 100%)'
                    }}
                />

            </div>
        </>
    );
}