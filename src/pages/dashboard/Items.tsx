import { useParams } from "react-router";
import ItemsTable from "../../components/dashboard/items/ItemsTable";
import FormPopUp from "../../components/FormPopUp";
import ItemsPopUp from "../../components/storage/ItemsPopUp";
import { useStorages } from "shelflife-react-hooks";
import { useEffect, useState } from "react";
import type { Storage } from "../../types/Storage";
import { CreateButtonWithOutClick } from "../../components/dashboard/CreateButton";

export default function Items() {
    const { id } = useParams();
    const { fetchStorage } = useStorages();
    const [storage, setStorage] = useState<Storage | null>(null);


    const getStorage = async () => {
        setStorage(await fetchStorage(Number(id)));
    }

    useEffect(() => {
        getStorage();
    }, []);

    return (
        <>
            <div className="p-4 container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Items Page</h1>
                <ItemsTable storageId={Number(id)} />
                {storage &&
                    <FormPopUp button={<CreateButtonWithOutClick />}>
                        <ItemsPopUp storage={storage} />
                    </FormPopUp>
                }
            </div>
        </>
    );
}