import StorageList from "../../components/dashboard/storage/StorageList";

export default function Storages() {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Storages</h1>
            <p className="text-gray-600 mb-8">Manage your storages here</p>

            <StorageList />
        </div>
    )
}
