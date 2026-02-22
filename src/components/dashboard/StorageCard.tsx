import { useAuth, useStorages, type Storage } from "shelflife-react-hooks";
import FormPopUp from "../FormPopUp";
import SettingsForm from "../storage/SettingsFrom";
import MembersPopUp from "../storage/MembersPopUp";

export default function StorageCard({ storage }: { storage: Storage; }) {
    const { user } = useAuth();
    const { deleteStorage, fetchStorages } = useStorages();

    const deleteButtonValue = storage.owner.id === user?.id || user?.admin ? "Delete" : "Leave";

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to " + deleteButtonValue + " this storage?");
        if (confirmDelete) {
            await deleteStorage(storage.id);
            fetchStorages();
        }
    };

    return (
        <div className="card card-bordered bg-base-300 w-full">
            <div className="card-body">

                <FormPopUp button={
                    // Check if the user is the owner of the storage, if not, don't show the settings button
                    <div className="flex items-start justify-between">
                        <div className="flex flex-row items-end gap-6">
                            <h2 className="card-title text-2xl">{storage.name}</h2>
                            {
                                storage.owner.id !== user?.id && (
                                    <p className="text-xs uppercase font-semibold opacity-60">{"Owned by: " + storage.owner.username}</p>
                                )
                            }
                        </div>
                        <a className="btn btn-ghost btn-sm btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                            </svg>
                        </a>
                    </div>
                }>
                    <SettingsForm storage={storage}/>
                </FormPopUp>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <FormPopUp button={<a className="btn btn-sm sm:btn-md btn-success w-full">Members</a>}>
                        <MembersPopUp storage={storage} />
                    </FormPopUp>
                    <a className="btn btn-sm sm:btn-md btn-primary">Items</a>
                    <button onClick={handleDelete} className="btn btn-sm sm:btn-md btn-error">
                        {deleteButtonValue}
                    </button>
                </div>
            </div>
        </div>
    );
}