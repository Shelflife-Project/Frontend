import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";

type Props = {
    item: StorageItem;
}

export default function EditStorageItemsForm({ item }: Props) {
    const { editItem } = useStorageItems();
    const [expirationDate, setExpirationDate] = useState<string>(item.expiresAt);

    useEffect(() => {
        setExpirationDate(item.expiresAt);
    }, [item])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (expirationDate) {
            try {
                const edit = await editItem(item.storage.id, item.id, { expiresAt: expirationDate });
                if (edit)
                    toast.success("Changes saved successfully");
            }
            catch (err) {
                toast.error("An error occured while saving your changes");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <div className="inline-grid *:[grid-area:1/1] ">
                            <div className={`status ${expirationDate ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                            <div className={`status ${expirationDate ? 'status-success' : 'status-error'} me-2`}></div>
                        </div>
                        <label className="label">
                            <span className="label-text font-semibold me-2">Expires At</span>
                        </label>
                    </div>
                    <input
                        type="date"
                        maxLength={40}
                        className="input w-full input-bordered mr-2"
                        value={expirationDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={expirationDate === item.expiresAt} className="btn btn-primary w-full">Save Changes</button>
                </div>
            </form>
        </div>
    );

}