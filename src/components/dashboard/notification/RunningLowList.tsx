import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useShoppingList, useStorageItems, type RunningLowNotification } from "shelflife-react-hooks";

export default function RunningLowList() {
    const { fetchRunningLowAggregated, runningLow, isError: storageIsError, isLoading: storageIsLoading } = useStorageItems();
    const { fetchAggregated, items, createItem, isError: shoppingIsError, isLoading: shoppingIsLoading } = useShoppingList();

    const getItems = async () => {
        await fetchAggregated();
        await fetchRunningLowAggregated();
    }

    const onAddToCart = async (item: RunningLowNotification) => {
        try {
            await createItem(item.storage.id, {
                productId: item.product.id,
                amountToBuy: item.runningLowAt - item.amount + 1,
            });

            toast.success("Successfully added item to shopping list");
            getItems();
        } catch (e: any) {
            toast.error("Couldn't add item to shopping list");
        }
    }

    const isAlreadyAdded = (x: RunningLowNotification) =>
        items.some(
            (item) =>
                item.storage.id === x.storage.id &&
                item.product.id === x.product.id
        );

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className="rounded-lg shadow-lg p-4">
            <h2 className="card-title mb-2">
                Items Running Low
            </h2>

            {storageIsLoading || shoppingIsLoading ? (
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : storageIsError || shoppingIsError ? (
                <div className="text-sm text-error text-center py-6">
                    Failed to load items.
                </div>
            ) : runningLow.length === 0 ? (
                <div className="text-sm opacity-80 text-center py-6">
                    Everything is well stocked.
                </div>
            ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {runningLow.map((item, i) => {
                        const empty = item.amount <= 0;
                        const alreadyAdded = isAlreadyAdded(item);

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

                                        <div className="text-xs mt-1">
                                            {empty ? (
                                                <span className="text-red-500 font-medium">
                                                    Out of stock
                                                </span>
                                            ) : (
                                                <span className="text-orange-500 font-medium">
                                                    Only {item.amount} left
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {alreadyAdded ? (
                                        <span className="text-xs text-success font-medium">
                                            Added ✓
                                        </span>
                                    ) : (
                                        <button
                                            title={`Add ${item.runningLowAt - item.amount + 1} of ${item.product.name} to the shopping list`}
                                            onClick={() => onAddToCart(item)}
                                            className="btn btn-square btn-success p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                            </svg>
                                        </button>
                                    )}
                                    <Link
                                        title="Edit Rule"
                                        to={`/dashboard/storages/${item.storage.id}/settings`}
                                        className="btn btn-square btn-primary p-2">
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