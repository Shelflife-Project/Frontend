import { useParams } from "react-router";
import SettingsTable from "../../components/dashboard/settings/SettingsTable";
import FormPopUp from "../../components/FormPopUp";
import { CreateButtonWithOutClick } from "../../components/dashboard/CreateButton";
import CreateSettingForm from "../../components/dashboard/settings/CreateSettingForm";

export default function Settings() {
    const { id } = useParams();

    return (
        <>
            <div className="p-4 container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">Settings</h1>
                <SettingsTable storageId={Number(id)} />
                <FormPopUp button={<CreateButtonWithOutClick />}>
                    <CreateSettingForm storageId={Number(id)} />
                </FormPopUp>
            </div>
        </>
    )
}