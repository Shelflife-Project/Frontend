import { useEffect } from "react";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditStorageItemsForm from "./EditStorageItemForm";

type Props = {
    storageId: number;
}

export default function ItemsTable({ storageId }: Props) {
    const { items, fetchItems, deleteItem } = useStorageItems();

    const deleteItemHandler = async (item_id: number) => {
        const confirmDelete = confirm("Are you sure you want to remove this item?");
        if (confirmDelete) {
            await deleteItem(storageId, item_id);
            fetchItems(storageId);
        }
    };

    const daysToExpire = (item: StorageItem) => {
        var diff = Math.abs(new Date().getTime() - new Date(item.expiresAt).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return diffDays;
    };

    useEffect(() => {
        fetchItems(storageId);
    }, [storageId]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto flex justify-items-center">
            {
                items.map((x, i) =>
                    <div key={i} className="card bg-base-300 shadow-sm">
                        <figure>
                            <img
                                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${x.id}/icon`}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{x.product.name}</h2>
                            <h2
                                className={daysToExpire(x) < 0 ? "text-error" : daysToExpire(x) < 2 ? "text-warning" : ""}>
                                Expires at: {new Date(x.expiresAt).toLocaleDateString()}
                            </h2>
                            <div className="card-actions justify-between">
                                <button className="btn btn-error" onClick={() => deleteItemHandler(x.id)}>Delete</button>
                                <FormPopUp button={<button className="btn btn-primary">Edit</button>}>
                                    <EditStorageItemsForm storageId={storageId} itemId={x.id} />
                                </FormPopUp>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}