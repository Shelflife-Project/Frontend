import { useNavigate, useParams } from "react-router";
import ItemsTable from "../../components/dashboard/items/ItemsTable";
import { useStorages } from "shelflife-react-hooks";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";

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
            <div className="container px-4 py-6 mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Items in {storage.name}
                    </h1>

                    <Link
                        to="/dashboard"
                        className="btn btn-secondary btn-sm"
                    >
                        Back
                    </Link>
                </div>
                <ItemsTable storage={storage} />
            </div>
        </>
    );
}