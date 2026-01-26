import { DeleteStorage } from "../../Fetch_APIs/Storage";
import type { Storage } from "../../Types/Storage";

export default function StorageCard({ storage, onDelete }: { storage: Storage; onDelete: () => void }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this storage?");
        if (confirmDelete) {
            await DeleteStorage(storage.id);
            onDelete();
        }
    };

    return (
        <div className="card card-bordered bg-base-300 w-full">
            <div className="card-body">
                <h2 className="card-title text-2xl">{storage.name}</h2>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <button className="btn btn-sm sm:btn-md btn-success">Members</button>
                    <button className="btn btn-sm sm:btn-md btn-primary">View Items</button>
                    <button onClick={handleDelete} className="btn btn-sm sm:btn-md btn-error">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}