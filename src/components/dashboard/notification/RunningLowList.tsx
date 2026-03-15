import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useStorageItems, useStorages, type RunningLowNotification } from "shelflife-react-hooks";

export default function RunningLowList() {
    const { fetchRunningLow } = useStorageItems();
    const { fetchStorages } = useStorages();

    const [runningLow, setRunningLow] = useState<RunningLowNotification[]>([]);

    const getRunningLow = async () => {
        const storages = await fetchStorages();
        let items = [] as RunningLowNotification[]

        for (let i = 0; i < storages.data.length; i++) {
            const notifications = await fetchRunningLow(storages.data[i].id);
            items = items.concat(notifications);
        }

        setRunningLow(items);
    };

    useEffect(() => {
        getRunningLow();
    }, []);

    return (
        <ul className="list bg-base-200 rounded-box shadow-md max-h-64">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Items running low</li>

            <span className="overflow-x-auto">

                {
                    runningLow.map((x, i) =>
                        <li key={i} className="list-row">
                            <div><img className="size-10 rounded-box" src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${x.product.id}/icon/small`} /></div>
                            <div>
                                <div>{x.product.name}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">Only {x.amount} left in {x.storage.name}</div>
                            </div>
                            <button className="btn btn-square btn-success p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </button>
                            <Link to={`/dashboard/storages/${x.storage.id}/settings`} className="btn btn-square btn-primary p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </Link>
                        </li>
                    )
                }
            </span>

            {
                runningLow.length == 0 &&
                <li className="p-4 text-xs opacity-80 tracking-wide">There are no items running low</li>
            }

        </ul>
    );
}