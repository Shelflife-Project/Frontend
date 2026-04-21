import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRunningLow } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditSettingForm from "./EditSettingForm";
import { CreateButtonCard } from "../CreateButton";
import CreateSettingForm from "./CreateSettingForm";

type Props = {
    storageId: number;
};

export default function SettingsTable({ storageId }: Props) {
    const { settings, fetchSettings, deleteSetting } = useRunningLow();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const deleteSettingHandler = async (id: number) => {
        if (confirm("Are you sure you want to remove this rule?")) {
            await deleteSetting(storageId, id);
            fetchSettings(storageId);
            toast.success("Rule deleted successfully");
        }
    };

    const getSettings = async () => {
        setIsLoading(true);
        await fetchSettings(storageId);
        setIsLoading(false);
    }

    useEffect(() => {
        getSettings();
    }, []);

    if (isLoading)
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <FormPopUp button={<CreateButtonCard />}>
                <CreateSettingForm storageId={storageId} />
            </FormPopUp>
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

                        <p className="text-xs text-base-content/60 mt-1">
                            Alert when stock drops below:
                        </p>

                        <p className="text-sm font-semibold">
                            {
                                `${s.runningLow + 1} Item(s)`
                            }
                        </p>

                        <div className="card-actions justify-between">
                            <FormPopUp
                                button={
                                    <button className="btn btn-primary btn-sm">
                                        Edit
                                    </button>
                                }
                            >
                                <EditSettingForm setting={s} />
                            </FormPopUp>

                            <button
                                onClick={() => deleteSettingHandler(s.id)}
                                className="btn btn-error btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}