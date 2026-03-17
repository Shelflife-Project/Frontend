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
        <ul className="list bg-base-200 rounded-box shadow-md">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Invitations for you</li>

            {invites.filter(invite => !invite.accepted).map((invite) => (
                <li key={invite.id} className="list-row items-center">
                    <div>
                        <div>You have been invited to <span className="font-semibold">{invite.storage.name}</span>, </div>
                        <div className="text-xs uppercase font-semibold opacity-60">{invite.storage.owner.username.substring(0, 15)} wants to share this storage with you.</div>
                    </div>
                    <button className="btn  btn-sm sm:btn-md btn-success" onClick={() => acceptInvite(invite.id)}>
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></g></svg>
                    </button>  
                    <button className="btn btn-sm sm:btn-md btn-error" onClick={() => declineInvite(invite.id)}>
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"></path></g></svg>
                    </button>  
                </li>
            ))}
        </ul>
    );
}