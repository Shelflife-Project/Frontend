import { useState, type FormEvent } from "react";
import { UpdatePassword } from "../../../Fetch_APIs/User";
import { useAuth } from "../../../context/AuthContext";

export default function UpdatePasswordForm() {
    const [oldPass, setOldPass] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const { user, refreshAuth } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user)
            return;

        await UpdatePassword(oldPass, password, repeat);
        refreshAuth();
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-4 space-y-3">
            <h2 className="font-semibold">Change Password</h2>
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Old password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password repeated"
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
            />
            <button className="btn btn-error w-fit">Update Password</button>
        </form>
    );

}