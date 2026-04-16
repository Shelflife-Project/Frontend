import { useStorages } from "shelflife-react-hooks";
import StorageCard from "./StorageCard";
import Paginator from "../../Paginator";
import FormPopUp from "../../FormPopUp";
import CreateStorageForm from "./NewForm";
import { CreateButtonCard } from "../CreateButton";

export default function StorageList() {
    const { fetchStorages, storages } = useStorages();

    const handleOnChange = (search: string, page: number, size: number) => {
        return fetchStorages(search, size, page);
    }

    return (
        <>
            <Paginator onChange={handleOnChange} contextData={storages} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-12xl mx-auto">
                <FormPopUp button={<CreateButtonCard text="Add Storage" />}>
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