import { useParams } from "react-router";
import { useStorageItem } from "../../context/StorageItemContext";

export default function Items() {
    const { id } = useParams();
    const {setStorageId} = useStorageItem();

    setStorageId(Number(id));

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Items Page</h1>
            {/* Items content goes here */}
        </div>
    );
}