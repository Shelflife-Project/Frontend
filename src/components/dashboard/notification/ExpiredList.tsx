import { useEffect } from "react";
import { Link } from "react-router";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";

export default function ShoppingList() {
    const { expiredItems, aboutToExpireItems, fetchAboutToExpireAggregated, fetchExpiredAggregated, isLoading, isError, deleteItem } = useStorageItems();

    const fetchItems = () => {
        fetchExpiredAggregated();
        fetchAboutToExpireAggregated();
    }

    const removeFromStorage = async (item: StorageItem) => {
        const confirmDelete = confirm(`Are you sure you want to remove this item from ${item.storage.name}?`);
        if (confirmDelete) {
            await deleteItem(item.storage.id, item.id);
            fetchItems();
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading items.</div>;
    }

    return (
        <ul className="list bg-base-200 rounded-box shadow-md max-h-64">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Expired items</li>

            <span className="overflow-x-auto">

                {
                    expiredItems.map((x, i) =>
                        <li key={i} className="list-row">
                            <div>
                                <img className="size-10 rounded-box" src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${x.product.id}/icon/small`} />
                            </div>
                            <div>
                                <div>{x.product.name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">Expired at <span className="text-red-500">{x.expiresAt}</span> in {x.storage.name}</div>
                            </div>
                            <button className="btn btn-square btn-error" onClick={() => removeFromStorage(x)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </button>
                            <Link to={`/dashboard/storages/${x.storage.id}`} className="btn btn-square btn-primary p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </Link>
                        </li>
                    )
                }

                {
                    aboutToExpireItems.filter(x => !expiredItems.find(y => y.id === x.id)).map((x, i) =>
                        <li key={i} className="list-row">
                            <div><img className="size-10 rounded-box" src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${x.product.id}/icon/small`} /></div>
                            <div>
                                <div>{x.product.name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60 text-orange-500">Expires today in {x.storage.name}</div>
                            </div>
                            <Link to={`/dashboard/storages/${x.storage.id}`} className="btn btn-square btn-primary p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </Link>
                        </li>
                    )
                }

            </span>

            {
                expiredItems.length == 0 &&
                <li className="p-4 text-xs opacity-80 tracking-wide">There are no items expired</li>
            }

        </ul>
    );
}