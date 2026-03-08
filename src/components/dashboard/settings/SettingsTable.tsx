import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRunningLow } from "shelflife-react-hooks";

type Props = {
    storageId: number
}

export default function SettingsTable({ storageId }: Props) {
    const { settings, fetchSettings, deleteSetting } = useRunningLow();

    const deleteSettingHandler = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to remove this setting?");
        if (confirmDelete) {
            await deleteSetting(storageId, id);
            fetchSettings(storageId);
            toast.success("Setting successfully deleted")
        }
    };

    useEffect(() => {
        fetchSettings(storageId);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto flex justify-items-center">
                {
                    settings.length > 0 &&
                    settings.map((s) => (
                        <div key={s.id} className="card bg-base-300 max-w-82 shadow-sm">
                            <figure>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${s.product.id}/icon`}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{s.product.name}</h2>
                                <p>Runs low at: {s.runningLow}</p>
                                <div className="flex justify-between">
                                    <button onClick={() => deleteSettingHandler(s.id)} className="btn btn-error">Delete</button>
                                    <button className="btn btn-secondary">Edit</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                settings.length == 0 &&
                <p className="text-center">There are no settings added yet</p>
            }
        </>
    );
}