import { useEffect } from "react";
import { Link } from "react-router";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";

export default function ShoppingList() {
    const { aboutToExpireItems, fetchAboutToExpireAggregated, isError, isLoading, deleteItem } = useStorageItems();

    const fetchItems = () => {
        fetchAboutToExpireAggregated();
    }

    const removeFromStorage = async (item: StorageItem) => {
        const confirmDelete = confirm(`Are you sure you want to remove this item from ${item.storage.name}?`);
        if (confirmDelete) {
            await deleteItem(item.storage.id, item.id);
            fetchItems();
        }
    }

    const daysToExpire = (item: StorageItem) => {
        var diff = new Date(item.expiresAt).getTime() - new Date().getTime();
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return diffDays;
    };

    const sortedItems = [...aboutToExpireItems].sort(
        (a, b) =>
            new Date(a.expiresAt).getTime() -
            new Date(b.expiresAt).getTime()
    );

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="rounded-lg shadow-lg p-4">
            <h2 className="card-title mb-2">
                Expiring & Expired Items
            </h2>

            {isLoading ? (
                <div className="text-sm opacity-80 text-center py-6">
                    Loading items...
                </div>
            ) : isError ? (
                <div className="text-sm text-error text-center py-6">
                    Failed to load items.
                </div>
            ) : sortedItems.length === 0 ? (
                <div className="text-sm opacity-80 text-center py-6">
                    Nothing is expiring.
                </div>
            ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {sortedItems.map((item, i) => {
                        const days = daysToExpire(item);
                        const isExpired = days < 0;

                        return (
                            <li
                                key={i}
                                className="flex items-center justify-between bg-base-200 transition rounded-xl p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        className="size-10 sm:size-14 rounded-lg"
                                        src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${item.product.id}/icon/small`}
                                    />

                                    <div>
                                        <div className="font-medium">
                                            {item.product.name}
                                        </div>

                                        <div className="text-xs opacity-80">
                                            {item.storage.name}
                                        </div>

                                        <div className="text-xs">
                                            {isExpired ? (
                                                <span className="text-red-500 font-medium">
                                                    Expired{" "}
                                                    {Math.abs(days)} day(s) ago
                                                </span>
                                            ) : days === 0 ? (
                                                <span className="text-orange-500 font-medium">
                                                    Expires today
                                                </span>
                                            ) : (
                                                <span className="text-green-600 font-medium">
                                                    {days} day(s) left
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {
                                        isExpired &&
                                        <button
                                            title="Remove Item"
                                            className="btn btn-square lg:w-16 btn-error"
                                            onClick={() => removeFromStorage(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </button>
                                    }
                                    <Link
                                        title="Edit Item"
                                        to={`/dashboard/storages/${item.storage.id}`}
                                        className="btn btn-square lg:w-16 btn-primary p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}