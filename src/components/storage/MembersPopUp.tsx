import { useEffect } from "react";
import { useStorageMembers, type Storage } from "shelflife-react-hooks"

type Props = {
    storage: Storage
}

export default function MembersPopUp({ storage }: Props) {
    const { members, fetchMembers, isLoading} = useStorageMembers();

    useEffect(() => {
        fetchMembers(storage.id);
    }, [storage.id]);

    if (isLoading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Members</h2>
                <p className="text-gray-600">Loading members...</p>
            </div>
        )
    }


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Members</h2>
            <p className="text-gray-600">Manage members of this storage.</p>
        </div>
    )
}
