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
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-database-fill" viewBox="0 0 16 16">
                    <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223" />
                    <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                    <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                    <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
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