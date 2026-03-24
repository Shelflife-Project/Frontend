import { useStorages } from "shelflife-react-hooks";
import StorageCard from "./StorageCard";
import Paginator from "../../Paginator";
import FormPopUp from "../../FormPopUp";
import CreateStorageForm from "./NewForm";

export default function StorageList() {
    const { fetchStorages, storages } = useStorages();

    const handleOnChange = (search: string, page: number, size: number) => {
        return fetchStorages(search, size, page);
    }

    return (
        <>
            <Paginator onChange={handleOnChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-12xl mx-auto">
                <FormPopUp button={
                    <button className="card bg-base-200 border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-300 transition cursor-pointer flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2">+</div>
                            <p className="text-sm opacity-70 mb-2">Add Storage</p>
                        </div>
                    </button>
                }>
                    <CreateStorageForm />
                </FormPopUp>
                {
                    storages
                        .map((storage) => (
                            <StorageCard key={storage.id} storage={storage} />
                        ))
                }
            </div>
        </>
    )
}