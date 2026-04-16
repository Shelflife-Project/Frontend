import StorageList from "../../components/dashboard/storage/StorageList";
import Inventory from "../../assets/lotties/Inventory.json";
import BetterLottie from "../../components/BetterLottie";

export default function Storages() {
    return (
        <div className="p-8 relative">
            <div className="mb-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Storages</h1>
                    <p className="text-gray-600">Manage your storages here</p>
                </div>

                <div className="hidden sm:flex absolute top-0 right-0 w-64">
                    <BetterLottie animationData={Inventory} />
                </div>
            </div>

            <StorageList />
        </div>
    );
}