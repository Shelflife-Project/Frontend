import type { ReactElement } from "react";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditStorageItemsForm from "./EditStorageItemForm";
import { toast } from "react-toastify";

type Props = {
    items: StorageItem[];
}

export default function ItemCard({ items }: Props) {
    const { addItem, deleteItem } = useStorageItems();

    const daysToExpire = (item: StorageItem) => {
        var diff = new Date(item.expiresAt).getTime() - new Date().getTime();
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return diffDays;
    };

    const getStatus = (days: number): ReactElement => {
        if (days < 0) return <div className="text-red-500">Expired</div>;
        if (days === 0) return <div className="text-orange-500 text-sm">Expires Today</div>;
        return <div className="text-success">{days} days</div>;
    };

    const deleteItemHandler = async (item: StorageItem) => {
        const confirmDelete = confirm("Are you sure you want to remove this item?");

        if (!confirmDelete)
            return;

        try {
            await deleteItem(item.storage.id, item.id);
            toast.success("Item removed successfully");
        } catch {
            toast.error("Couldn't remove item");
        }
    };

    const addOneExtra = async () => {
        const template = items[0];

        const calc = new Date();
        calc.setDate(calc.getDate() + template.product.expirationDaysDelta!);
        const expiresAt = calc.toISOString().split('T')[0];

        try {
            await addItem(template.storage.id, { productId: template.product.id, expiresAt })
            toast.success("Item added successfully");
        } catch {
            toast.error("Couldn't add item");
        }

    }

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-lg transition overflow-hidden">
            <figure className="h-40 bg-base-200">
                <img
                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${items[0].product.id}/icon`}
                    className="object-contain"
                />
            </figure>
            <div className="card-body pb-4 bg-base-200">
                <h2 className="card-title">{items[0].product.name}</h2>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {items.map((item) =>
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg px-3 py-2">
                            <div className="flex flex-col">
                                <span className="text-xs opacity-80">
                                    {new Date(
                                        item.expiresAt
                                    ).toLocaleDateString()}
                                </span>

                                {
                                    getStatus(daysToExpire(item))
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
                                    <EditStorageItemsForm item={item} />
                                </FormPopUp>

                                <button
                                    onClick={() =>
                                        deleteItemHandler(item)
                                    }
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="card-actions mt-auto">
                    <p className="text-xs opacity-80">{items.length} Item(s)</p>
                    <button className="btn btn-xs font-normal shadow-sm" onClick={addOneExtra}>Add +1</button>
                </div>
            </div>
        </div>
    );
}