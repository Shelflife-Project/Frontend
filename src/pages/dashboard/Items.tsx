import { useParams } from "react-router";
import { useStorageItem } from "../../context/StorageItemContext";
import { useEffect } from "react";
import ItemsTable from "../../components/dashboard/items/ItemsTable";

export default function Items() {
    const { id } = useParams();
    const { setStorageId } = useStorageItem();

    useEffect(() => {
        if (id) {
            setStorageId(Number(id));
        }
    }, []);

    return (
        <>
            <div className="p-4 container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Items Page</h1>
                <ItemsTable />
            </div>
        </>
    );
}