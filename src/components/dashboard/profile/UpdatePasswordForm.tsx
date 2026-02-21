import { useState } from "react";
import { useAuth, type ChangePasswordErrorResponse } from "shelflife-react-hooks";

export default function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const { user, changePassword } = useAuth();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!user)
            return;

        try {
            await changePassword({ oldPassword, newPassword, newPasswordRepeat });
            setSuccess("Password updated successfully!");

            setOldPassword("");
            setNewPassword("");
            setNewPasswordRepeat("");
        } catch (err: any) {
            const pass = err as ChangePasswordErrorResponse;
            setError(pass.oldPassword || pass.newPassword || pass.newPasswordRepeat || "");
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
                required
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="New password repeated"
                value={newPasswordRepeat}
                required
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            {success && <p className="text-success text-sm">{success}</p>}
            <button className={`btn btn-error w-fit mt-auto ${oldPassword === "" || newPassword === "" || newPasswordRepeat === "" ? "btn-disabled" : ""}`}>Update Password</button>
        </form>
    );
}