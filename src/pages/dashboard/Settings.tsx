import { Link, useParams } from "react-router";
import SettingsTable from "../../components/dashboard/settings/SettingsTable";
import EditStorageNameForm from "../../components/dashboard/settings/EditStorageNameForm";
import { useAuth, useStorages } from "shelflife-react-hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useLayoutEffect } from "react";

export default function Settings() {
    const { id } = useParams();
    const { fetchStorage, storage } = useStorages();
    const { user } = useAuth();
    const navigate = useNavigate();

    const getStorage = async () => {
        try {
            await fetchStorage(Number(id));
        } catch (err: any) {
            navigate("/dashboard", { replace: true })
            toast.error("Couldn't find storage");
        }
    }

    useLayoutEffect(() => {
        getStorage();
    }, []);

    const isOwner = storage?.owner.id === user?.id;
    const canEdit = isOwner || user?.admin;

    if (!storage)
        return;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">
                    Storage Settings
                </h1>

                <Link
                    to="/dashboard"
                    className="btn btn-secondary btn-sm"
                >
                    Back
                </Link>
            </div>

            {
                canEdit &&
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="text-sm font-semibold mb-3">
                            General
                        </h2>

                        <EditStorageNameForm storage={storage} />
                    </div>
                </div>
            }


            <div className="card shadow-md">
                <div className="card-body">
                    <h2 className="text-sm font-semibold">
                        Low Stock Alert Rules
                    </h2>

                    <SettingsTable storageId={Number(id)} />
                </div>
            </div>
        </div>
    );
}