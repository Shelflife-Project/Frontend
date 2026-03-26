import { useState } from "react";
import { toast } from "react-toastify";
import { type EditShoppingItemError, type User, useUsers } from "shelflife-react-hooks";

type Props = {
    user: User
}

export default function EditUserForm({ user }: Props) {
    const { updateUser } = useUsers();
    const [username, setUsername] = useState<string>(user.username);
    const [isAdmin, setIsAdmin] = useState<boolean>(user.admin);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            updateUser(user.id, { username, isAdmin })
            toast.success("Changes successfully saved")
        } catch (err: any) {
            const error = err as EditShoppingItemError;

            if (error && error.amountToBuy) {
                toast.error(error.amountToBuy);
            }
        }
    }

    return (
        <div>
            <h2 className="text-2xl text-left font-bold mb-4">Edit {user.username}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <label className="label">
                            <span className="label-text font-semibold me-2">Username</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        className="input w-full input-bordered mr-2"
                        value={username}
                        min={1}
                        max={40}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <fieldset className="fieldset w-64 p-4">
                    <label className="label">
                        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="toggle" />
                        Is Admin
                    </label>
                </fieldset>
                <div>
                    <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                </div>
            </form>
        </div>
    );
}