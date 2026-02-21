import { useEffect, useState } from "react";
import { useStorageMembers, type Storage } from "shelflife-react-hooks"

type Props = {
    storage: Storage
}

export default function MembersPopUp({ storage }: Props) {
    const { members, fetchMembers, inviteMember, isLoading } = useStorageMembers(); 
    const [inviteEmail, setInviteEmail] = useState<string>("");
    
    useEffect(() => {
        fetchMembers(storage.id);
    }, [storage.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteEmail) {
            await inviteMember(storage.id, {
                email: inviteEmail
            });
            setInviteEmail("");
            fetchMembers(storage.id);
        }
    };

    if (isLoading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Members</h2>
                <p className="text-gray-600">Loading members...</p>
            </div>
        )
    }


    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Members</h2>
                <p className="text-gray-600">Manage members of this storage.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="form-control w-full flex flex-row items-center">
                    <div className="inline-grid *:[grid-area:1/1] ">
                        <div className={`status ${inviteEmail ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                        <div className={`status ${inviteEmail ? 'status-success' : 'status-error'} me-2`}></div>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold me-2">Invite Member</span>
                    </label>
                    <input
                        type="text"
                        maxLength={40}
                        name="name"
                        placeholder="e.g., user@example.com"
                        className="input input-bordered"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={!inviteEmail}
                        className={`btn flex-1 ${inviteEmail ? 'btn-info' : 'btn-disabled'}`}
                    >
                        Invite Member
                    </button>

                </div>
            </form>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <th>{member.id}</th>
                                <td>{member.user.username}</td>
                                <td>{member.accepted ? "Accepted" : "Pending"}</td>
                                <td><button className="btn btn-sm btn-success">Edit</button></td>
                                <td><button className="btn btn-sm btn-error">Remove</button></td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </>

    )
}
