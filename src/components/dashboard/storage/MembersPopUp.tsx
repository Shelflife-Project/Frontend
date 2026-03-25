import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth, useStorageMembers, type InviteMemberError, type Storage } from "shelflife-react-hooks"
import UserIcon from "../UserIcon";

type Props = {
    storage: Storage
}

export default function MembersPopUp({ storage }: Props) {
    const { user } = useAuth();

    const { members, fetchMembers, inviteMember, removeMember } = useStorageMembers();
    const [inviteEmail, setInviteEmail] = useState<string>("");

    const isOwner = storage.owner.id === user?.id || user?.admin;

    useEffect(() => {
        fetchMembers(storage.id);
    }, [storage.id]);

    const handleRemove = async (userId: number) => {
        try {
            await removeMember(storage.id, userId);
            fetchMembers(storage.id);
            toast.success("Member successfully removed");
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inviteEmail)
            return;

        try {
            await inviteMember(storage.id, {
                email: inviteEmail
            });
            setInviteEmail("");
            fetchMembers(storage.id);
            toast.success("Member successfully invited");
        } catch (e: any) {
            const err = e as InviteMemberError;

            if (err.email)
                toast.error(err.email);
            else if (e.message)
                toast.error(e);
        }
    };

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Members</h2>
            </div>
            {
                isOwner &&
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
                            className="input input-bordered mr-2"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={!inviteEmail}
                            className={`btn flex-1 ${inviteEmail ? 'btn-info' : 'btn-disabled'}`}
                        >
                            Send
                        </button>
                    </div>
                </form>
            }
            <div className="overflow-x-auto mt-8 rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Status</th>
                            {
                                isOwner &&
                                <th>Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <th>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <UserIcon defaultId={member.user.id} />
                                        </div>
                                    </div>
                                </th>
                                <td>{member.user.username}</td>
                                {
                                    member.accepted ?
                                        <td className="align-middle">
                                            <span className="badge badge-success">Accepted</span>
                                        </td>
                                        :
                                        <td className="align-middle">
                                            <span className="badge badge-warning">Pending</span>
                                        </td>
                                }

                                {
                                    isOwner &&
                                    <td><button className="btn btn-sm btn-error" onClick={() => handleRemove(member.user.id)}>Remove</button></td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}
