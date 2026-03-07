import { useState } from "react";
import { useStorages, type Storage } from "shelflife-react-hooks"

type Props ={
    storage: Storage
}

export default function SettingsForm({ storage }: Props) {
    const { changeStorageName, fetchStorages} = useStorages();
    const [newName, setNewName] = useState<string>(storage.name);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newName !== storage.name) {
            await changeStorageName(storage.id, {
                name: newName
            });
            fetchStorages();
        }
    };

    return (
         <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Settings for {storage.name}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control w-full flex flex-row items-center">
                    <div className="inline-grid *:[grid-area:1/1] ">
                        <div className={`status ${newName ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                        <div className={`status ${newName ? 'status-success' : 'status-error'} me-2`}></div>
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
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex w-full justify-center gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={!newName}
                        className={`btn ${newName ? 'btn-info' : 'btn-disabled'}`}
                    >
                        Save Changes
                    </button>

                </div>
            </form>
        </>
    )
}