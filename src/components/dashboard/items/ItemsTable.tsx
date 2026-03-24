import { useEffect, useState, type ReactElement } from "react";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditStorageItemsForm from "./EditStorageItemForm";

type Props = {
    storageId: number;
};

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

    const getStatus = (days: number): ReactElement => {
        if (days < 0) return <div className="text-red-500">Expired</div>;
        if (days === 0) return <div className="text-orange-500 text-sm">Expires Today</div>;
        return <div className="text-success">{days} days</div>;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[...itemsTable]
                .sort(([a], [b]) => a - b)
                .map(([productId, group]) => (
                    <div key={productId} className="card bg-base-100 shadow-sm hover:shadow-lg transition overflow-hidden">
                        <figure className="h-40 bg-base-200">
                            <img
                                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${productId}/icon`}
                                className="object-contain"
                            />
                        </figure>
                        <div className="card-body bg-base-200">
                            <h2 className="card-title">{group[0].product.name}</h2>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {group.map((item) => {
                                    const days = daysToExpire(item);

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg px-3 py-2"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-xs opacity-80">
                                                    {new Date(
                                                        item.expiresAt
                                                    ).toLocaleDateString()}
                                                </span>

                                                {
                                                    getStatus(days)
                                                }
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <FormPopUp
                                                    button={
                                                        <button className="btn btn-sm btn-primary">
                                                            Edit
                                                        </button>
                                                    }
                                                >
                                                    <EditStorageItemsForm
                                                        storageId={storageId}
                                                        itemId={item.id}
                                                    />
                                                </FormPopUp>

                                                <button
                                                    onClick={() =>
                                                        deleteItemHandler(
                                                            item.id
                                                        )
                                                    }
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="card-actions mt-auto justify-end">
                                <p className="text-xs opacity-80">{group.length} Item(s)</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}