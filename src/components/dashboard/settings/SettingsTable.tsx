import { useEffect } from "react";
import { useRunningLow } from "shelflife-react-hooks";

type Props = {
    storageId: number
}

export default function SettingsTable({ storageId }: Props) {
    const { settings, createSetting, deleteSetting, editSetting, fetchSettings } = useRunningLow();

    useEffect(() => {
        fetchSettings(storageId);
    }, []);

    return (
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
                </div>
            </div>
        ))
    );
}