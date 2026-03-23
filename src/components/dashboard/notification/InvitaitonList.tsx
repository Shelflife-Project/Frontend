import { useEffect } from "react";
import { useInvites } from "shelflife-react-hooks";

type Prop = {

}

export default function InvitationList({ }: Prop) {
    const { fetchInvites, declineInvite, acceptInvite, invites, isLoading, isError } = useInvites();

    const pendingInvites = invites.filter((i) => !i.accepted);

    useEffect(() => {
        if (invites.length > 0 || isLoading || isError) return;
        fetchInvites();
    }, []);

    return (
        <div className="rounded-lg shadow-lg p-4">
            <h2 className="card-title mb-2">
                Storage Invitations
            </h2>

            {isLoading ? (
                <div className="text-sm opacity-80 text-center py-6">
                    Loading invites...
                </div>
            ) : isError ? (
                <div className="text-sm text-error text-center py-6">
                    Failed to load invites.
                </div>
            ) : pendingInvites.length === 0 ? (
                <div className="text-sm opacity-80 text-center py-6">
                    No pending invites.
                </div>
            ) : (
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {pendingInvites.map((invite) => (
                        <li
                            key={invite.id}
                            className="flex items-center justify-between bg-base-200 transition rounded-xl p-3"
                        >
                            <div className="flex flex-col">
                                <div className="font-medium">
                                    {invite.storage.name}
                                </div>

                                <div className="text-xs opacity-80 mt-1">
                                    Invited by <span className="font-medium">{invite.storage.owner.username}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="btn btn-square lg:w-16 btn-success" onClick={() => acceptInvite(invite.id)}>
                                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></g></svg>
                                </button>
                                <button className="btn btn-square lg:w-16 btn-error" onClick={() => declineInvite(invite.id)}>
                                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"></path></g></svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}