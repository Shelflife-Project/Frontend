import { useState } from "react";
import { useStorages } from "shelflife-react-hooks";

type Props = {}

export default function CreateStorageForm({ }: Props) {
    const { createStorage, fetchStorages } = useStorages();
     const [newStorageName, setNewStorageName] = useState("");
    
        const handleSubmit = async (e: React.SubmitEvent) => {
            e.preventDefault();
            if (!newStorageName) return;
    
            await createStorage({ name: newStorageName });
            fetchStorages();
            setNewStorageName(""); 
        };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Storage</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <div className="inline-grid *:[grid-area:1/1]">
                        <div className={`status ${newStorageName ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                        <div className={`status ${newStorageName ? 'status-success' : 'status-error'} me-2`}></div>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold me-2">Storage Name</span>
                    </label>
                    <input
                        type="text"
                        maxLength={40}
                        name="name"
                        placeholder="e.g., Kitchen Pantry"
                        className="input input-bordered"
                        value={newStorageName}
                        onChange={(e) => setNewStorageName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={!newStorageName}
                        className={`btn flex-1 ${newStorageName ? 'btn-info' : 'btn-disabled'}`}
                    >
                        Create Storage
                    </button>

                </div>
            </form>
        </>
    )
}