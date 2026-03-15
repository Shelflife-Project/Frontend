import InvitationList from "../../components/dashboard/notification/InvitaitonList";
import RunningLowList from "../../components/dashboard/notification/RunningLowList";
import ShoppingList from "../../components/dashboard/notification/ShoppingList";

export default function Notifications() {
    return (
        <>
            <div className="p-8 pb-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Notifications</h1>
                <p className="text-gray-600">Check your notifications here.</p>
            </div>


            <div className="grid md:grid-cols-3 gap-6 px-6 mb-6">
                <ShoppingList />
                <InvitationList /> 
                <RunningLowList />
            </div>
        </>
    )
}
