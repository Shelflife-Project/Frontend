import { useEffect, useState } from "react";
import { useStorages } from "shelflife-react-hooks";

type Props = {
    storageId: number,
    onSelect: (id: number) => void
}

export default function StorageSelector({ storageId, onSelect }: Props) {
    const { fetchStorages, storages } = useStorages();
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchStorages(search);
    }, [search]);

    return (
        <div>
            <div className="w-full flex flex-row items-center">
                <div className="inline-grid *:[grid-area:1/1] ">
                    <div className={`status ${storageId > 0 ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                    <div className={`status ${storageId > 0 ? 'status-success' : 'status-error'} me-2`}></div>
                </div>
                <label className="label">
                    <span className="label-text font-semibold me-2">Select Product</span>
                </label>
            </div>

            <div className="form-control">
                <input
                    type="text"
                    maxLength={100}
                    name="productSearch"
                    placeholder="Search..."
                    className="input input-bordered w-full mr-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="max-h-36 w-full overflow-y-auto p-2">
                {storages
                    .map(p => (
                        <div key={p.id} className="flex items-center justify-between py-1">
                            <div className="truncate">{p.name}</div>
                            <button
                                type="button"
                                className={`btn btn-sm ms-2 ${storageId === p.id ? 'btn-error' : 'btn-success'}`}
                                onClick={() => onSelect(p.id)}
                            >
                                {storageId === p.id ? 'Deselect' : 'Select'}
                            </button>
                        </div>
                    ))}
                {
                    storages.length === 0 && (
                        <div className="text-sm text-gray-500">No storages match your search.</div>
                    )
                }
            </div>
        </div>
    );
}