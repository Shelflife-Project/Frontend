import Theme from "./Theme";
import UserIconDropdown from "./UserIconDropdown";

export default function Dashboard() {
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
                    <a role="tab" className="tab mx-8 px-6 my-2 text-lg">Storages</a>
                    <a role="tab" className="tab mx-8 px-6 my-2 text-lg">Products</a>
                    <a role="tab" className="tab mx-8 px-6 my-2 text-lg">Notifications</a>
                    <a role="tab" className="tab mx-8 px-6 my-2 text-lg">Profile</a>
                </div>
            </div>
        </>
    )
}