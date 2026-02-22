import { useEffect } from "react";
import StorageCard from "../../components/dashboard/StorageCard";
import { CreateButtonWithOutClick } from "../../components/dashboard/CreateButton";
import { useStorages } from "shelflife-react-hooks";
import FormPopUp from "../../components/FormPopUp";
import CreateStorageForm from "../../components/storage/NewForm";

export default function Storages() {
    const { storages, fetchStorages } = useStorages();

    useEffect(() => {
        fetchStorages();
    }, []);

    return (
        <>
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Storages</h1>
                <p className="text-gray-600 mb-8">Manage your storages here</p>

                {storages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-12xl mx-auto">
                        {storages.map((storage) => (
                            <StorageCard key={storage.id} storage={storage} />
                        ))}
                    </div>
                )}

                {storages.length === 0 && (
                    <p className="text-gray-400">No storages created yet. Click the + button to create one!</p>
                )}
            </div>

            <FormPopUp button={<CreateButtonWithOutClick />} >
                <CreateStorageForm />
            </FormPopUp> 
            
        </>
    )
}
