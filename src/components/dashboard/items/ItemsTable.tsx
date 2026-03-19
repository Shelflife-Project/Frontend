import { useEffect, useState } from "react";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditStorageItemsForm from "./EditStorageItemForm";

type Props = {
    storageId: number;
}

export default function ItemsTable({ storageId }: Props) {
    const { items, fetchItems, deleteItem } = useStorageItems();
    const [itemsTable, setItemsTable] = useState<Map<number, StorageItem[]>>(new Map<number, StorageItem[]>());

    const deleteItemHandler = async (item_id: number) => {
        const confirmDelete = confirm("Are you sure you want to remove this item?");
        if (confirmDelete) {
            await deleteItem(storageId, item_id);
            fetchItems(storageId);
        }
    };

    const daysToExpire = (item: StorageItem) => {
        var diff = new Date(item.expiresAt).getTime() - new Date().getTime();
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return diffDays;
    };

    const groupItems = async () => {
        let table = new Map<number, StorageItem[]>();

        items.forEach((x) => {
            if (table.has(x.product.id)) {
                let list = table.get(x.product.id)!;

                list.push(x);
                table.set(x.product.id, list);
            }
            else {
                table.set(x.product.id, [x]);
            }
        })

        setItemsTable(table);
    };

    useEffect(() => {
        groupItems();
    }, [items])

    useEffect(() => {
        fetchItems(storageId);
    }, [storageId]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto flex justify-items-center">
            {
                [...itemsTable]
                    .sort(([keyA], [keyB]) => keyA - keyB)
                    .map(([key, value]) => (
                        <div key={key} className="card bg-base-300 max-w-82 shadow-sm">
                            <figure>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${key}/icon`}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{value[0].product.name}</h2>

                                <div className="max-h-40 overflow-x-hidden space-y-2">
                                    {
                                        value.map((y, i) =>
                                            <div key={i} className="gap-4 flex justify-between">
                                                <h2
                                                    className={daysToExpire(y) < 0 ? "text-red-600" : daysToExpire(y) < 2 ? "text-orange-600" : ""}>
                                                    Expires at: {new Date(y.expiresAt).toLocaleDateString()}
                                                </h2>
                                                <FormPopUp button={<button className="btn btn-primary">Edit</button>}>
                                                    <EditStorageItemsForm storageId={storageId} itemId={y.id} />
                                                </FormPopUp>
                                                <button className="btn btn-error" onClick={() => deleteItemHandler(y.id)}>Delete</button>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    ))
            }
        </div>
    );
}