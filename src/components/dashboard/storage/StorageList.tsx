import { useStorages } from "shelflife-react-hooks";
import StorageCard from "./StorageCard";
import Paginator from "../../Paginator";

export default function StorageList() {
    const { fetchStorages, storages } = useStorages();

    const handleOnChange = (search: string, page: number, size: number) => {
        return fetchStorages(search, size, page);
    }

    return <>
        <Paginator onChange={handleOnChange}/>
        {
            storages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-12xl mx-auto">
                    {
                        storages
                            .map((storage) => (
                                <StorageCard key={storage.id} storage={storage} />
                            ))
                    }
                </div>
            )
        }

        {
            storages.length === 0 && (
                <p className="text-gray-400">No storages created yet. Click the + button to create one!</p>
            )
        }</>
}