import { Link, useParams } from "react-router";
import SettingsTable from "../../components/dashboard/settings/SettingsTable";
import FormPopUp from "../../components/FormPopUp";
import { CreateButtonWithOutClick } from "../../components/dashboard/CreateButton";
import CreateSettingForm from "../../components/dashboard/settings/CreateSettingForm";
import EditStorageNameForm from "../../components/dashboard/settings/EditStorageNameForm";

export default function Settings() {
    const { id } = useParams();

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center">Settings</h1>

            <Link to={"/dashboard"} className="btn btn-secondary">Back</Link>

            <div className="my-4">
                <EditStorageNameForm storageId={Number(id)} />
            </div>

            <SettingsTable storageId={Number(id)} />
            <FormPopUp button={<CreateButtonWithOutClick />}>
                <CreateSettingForm storageId={Number(id)} />
            </FormPopUp>
        </div>
    )
}