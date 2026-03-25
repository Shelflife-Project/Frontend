import { useState } from "react";
import { toast } from "react-toastify";
import { useStorages, type Storage } from "shelflife-react-hooks";

type Props = {
    storage: Storage
}

export default function EditStorageNameForm({ storage }: Props) {
    const { changeStorageName } = useStorages();
    const [newName, setNewName] = useState<string>(storage.name);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storage)
            return;

        if (newName !== storage.name) {
            try {
                await changeStorageName(storage.id, {
                    name: newName
                });
            } catch (err: any) {
                if (err.name) {
                    toast.error(err.name)
                    return;
                }
            }
            toast.success("Storage name saved successfully")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="label">
                    <span className="label-text font-semibold">Storage Name</span>
                </label>
            </div>
            <input
                type="text"
                maxLength={40}
                className="input input-bordered"
                value={newName}
                min={0}
                onChange={(e) => setNewName(e.target.value)}
                required
            />
            <br />
            <button
                type="submit"
                disabled={!newName || newName === storage?.name}
                className={`btn mt-2 w-max ${newName ? 'btn-info' : 'btn-disabled'}`}
            >
                Save Changes
            </button>
        </form>
    )
}