import { useNavigate, useParams } from "react-router";
import ItemsTable from "../../components/dashboard/items/ItemsTable";
import { useStorages } from "shelflife-react-hooks";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";

export default function Items() {
    const { id } = useParams();
    const { fetchStorage, storage } = useStorages();
    const navigate = useNavigate();

    const getStorage = async () => {
        try {
            await fetchStorage(Number(id));
        } catch (err: any) {
            navigate("/dashboard", { replace: true })
            toast.error("Couldn't find storage");
        }
    }

    useLayoutEffect(() => {
        getStorage();
    }, []);

    if (!storage)
        return;

    return (
        <>
            <div className="p-4 container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Items Page</h1>
                <ItemsTable storage={storage} />
            </div>
        </>
    );
}