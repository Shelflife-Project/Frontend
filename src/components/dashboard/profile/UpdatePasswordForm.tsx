import { useState } from "react";
import { useAuth } from "shelflife-react-hooks";

export default function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { user, changePassword } = useAuth();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!user)
            return;

        try {
            await changePassword({ oldPassword, newPassword, newPasswordRepeat });
            setSuccess("Password updated successfully!");
            setError(null);

            setOldPassword("");
            setNewPassword("");
            setNewPasswordRepeat("");
        } catch (err: any) {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-4 space-y-3">
            <h2 className="font-semibold">Change Password</h2>
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password repeated"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            {success && <p className="text-success text-sm">{success}</p>}
            <button className="btn btn-error w-fit">Update Password</button>
        </form>
    );
}