import { useEffect, useState } from "react";
import { useStorages, type Storage } from "shelflife-react-hooks";
import StorageCard from "./StorageCard";

export default function StorageList() {
    const { fetchStorages } = useStorages();

    const [currentStorages, setCurrentStorages] = useState<Storage[]>([]);
    const [nextStorages, setNextStorages] = useState<Storage[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const getStorages = async () => {
        const current = await fetchStorages(search, pageSize, page);
        const next = await fetchStorages(search, pageSize, page + 1);

        setCurrentStorages(current);
        setNextStorages(next);
    };

    useEffect(() => {
        getStorages();
    }, [search, page, pageSize]);

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage((p) => p - 1);
    };

    return <>

        <div className="flex justify-between">

            <input
                className="input input-bordered mb-4"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
            />

            <div className="flex justify-center items-center gap-4">
                <select className="select" onChange={e => setPageSize(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>

                <button
                    className="btn btn-primary"
                    onClick={prevPage}
                    disabled={page === 0}
                >
                    Previous
                </button>

                <p className="text-center">
                    Page {page + 1}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={nextStorages.length <= 0}
                >
                    Next
                </button>
            </div>
        </div>

        {
            currentStorages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-12xl mx-auto">
                    {
                        currentStorages
                            .map((storage) => (
                                <StorageCard key={storage.id} storage={storage} />
                            ))
                    }
                </div>
            )
        }

        {
            currentStorages.length === 0 && (
                <p className="text-gray-400">No storages created yet. Click the + button to create one!</p>
            )
        }</>
}