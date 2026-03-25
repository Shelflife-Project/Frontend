import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRunningLow } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditSettingForm from "./EditSettingForm";

type Props = {
    storageId: number;
};

export default function SettingsTable({ storageId }: Props) {
    const { settings, fetchSettings, deleteSetting } = useRunningLow();

    const deleteSettingHandler = async (id: number) => {
        if (confirm("Are you sure you want to remove this rule?")) {
            await deleteSetting(storageId, id);
            fetchSettings(storageId);
            toast.success("Rule deleted successfully");
        }
    };

    useEffect(() => {
        fetchSettings(storageId);
    }, []);

    if (settings.length === 0) {
        return (
            <div className="text-sm opacity-60 text-center py-6">
                No rules defined yet
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {settings.map((s) => (
                <div
                    key={s.id}
                    className="card bg-base-200 shadow-sm"
                >
                    <figure className="h-40 bg-base-200">
                        <img
                            src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${s.product.id}/icon`}
                            className="object-contain"
                        />
                    </figure>

                    <div className="card-body p-4">
                        <h3 className="font-medium">
                            {s.product.name}
                        </h3>

                        <p className="text-xs opacity-60 mt-1">
                            Alert when stock reaches:
                        </p>

                        <p className="text-sm font-semibold">
                            {
                                s.runningLow === 0 ?
                                    "Out of stock"
                                    :
                                    `${s.runningLow} Item(s)`
                            }
                        </p>

                        <div className="card-actions justify-between">
                            <button
                                onClick={() => deleteSettingHandler(s.id)}
                                className="btn btn-error btn-sm"
                            >
                                Delete
                            </button>

                            <FormPopUp
                                button={
                                    <button className="btn btn-primary btn-sm">
                                        Edit
                                    </button>
                                }
                            >
                                <EditSettingForm setting={s} />
                            </FormPopUp>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}