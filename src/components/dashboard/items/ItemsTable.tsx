import { useEffect } from "react";
import { useStorageItems } from "shelflife-react-hooks";

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

    useEffect(() => {
        fetchItems(storageId);
    }, [storageId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto flex justify-items-center">
            {
                items.map((x, i) =>
                    <div key={i} className="card bg-base-300 shadow-sm">
                        <figure>
                            <img
                                className="max-w-82"
                                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${x.id}/icon`}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{x.product.name}</h2>
                            <div className="card-actions justify-between">
                                <button className="btn btn-error" onClick={() => deleteItemHandler(x.id)}>Delete</button>
                                <button className="btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}