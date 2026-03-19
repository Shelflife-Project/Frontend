import { useEffect } from "react";
import { useInvites } from "shelflife-react-hooks";

type Prop = {

}

export default function InvitationList({ }: Prop) {
    const { fetchInvites, declineInvite, acceptInvite, invites, isLoading, isError } = useInvites();

    useEffect(() => {
        if (invites.length > 0 || isLoading || isError) return;
        fetchInvites();
    }, []);


    if (isLoading) {
        return <div>Loading invitations...</div>;
    }

    if (isError) {
        return <div>Error loading invitations.</div>;
    }

    return (
        <div className="card bg-base-200 px-4">
            <h2 className="text-xs opacity-60 tracking-wide pt-4 pb-2">Storage Invitations</h2>
            <div className="overflow-x-hidden max-h-48">
                {invites.filter(invite => !invite.accepted).map((invite) => (
                    <div key={invite.id} className="grid grid-cols-3 gap-4 my-2 items-center">
                        <div className="col-span-2">
                            <div>You have been invited to <span className="font-semibold">{invite.storage.name}</span>, </div>
                            <div className="text-xs uppercase font-semibold opacity-60">{invite.storage.owner.username.substring(0, 15)} wants to share this storage with you.</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="btn btn-success" onClick={() => acceptInvite(invite.id)}>
                                <svg className="size-[1.2em] min-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></g></svg>
                            </button>
                            <button className="btn btn-error" onClick={() => declineInvite(invite.id)}>
                                <svg className="size-[1.2em] min-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"></path></g></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}