import { useParams } from "react-router";
import ItemsTable from "../../components/dashboard/items/ItemsTable";

export default function Items() {
    const { id } = useParams();

    return (
        <>
            <div className="p-4 container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Items Page</h1>
                <ItemsTable storageId={Number(id)} />
            </div>
        </>
    );
}