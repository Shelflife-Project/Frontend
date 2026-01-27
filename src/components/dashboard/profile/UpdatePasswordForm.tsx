import { useState, type FormEvent } from "react";
import { UpdatePassword } from "../../../apis/User";
import { useAuth } from "../../../context/AuthContext";

export default function UpdatePasswordForm() {
    const [oldPass, setOldPass] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { user } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user)
            return;

        try {
            await UpdatePassword(oldPass, password, repeat);
            setSuccess("Password updated successfully!");
            setError(null);

            setOldPass("");
            setPassword("");
            setRepeat("");
        } catch (err: any) {
            setError(err.oldPassword || err.newPassword || err.newPasswordRepeat || err.error || "An unexpected error occurred.");
            setSuccess(null);
        }
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
            {error && <p className="text-error text-sm">{error}</p>}
            {success && <p className="text-success text-sm">{success}</p>}
            <button className="btn btn-error w-fit">Update Password</button>
        </form>
    );
}