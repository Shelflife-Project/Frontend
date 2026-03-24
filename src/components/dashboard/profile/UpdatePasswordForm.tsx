import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth, type ChangePasswordErrorResponse } from "shelflife-react-hooks";

export default function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState<string>("");
    const { user, changePassword } = useAuth();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        if (!user)
            return;

        try {
            await changePassword({ oldPassword, newPassword, newPasswordRepeat });
            toast.success("Password updated successfully!");

            setOldPassword("");
            setNewPassword("");
            setNewPasswordRepeat("");
        } catch (err: any) {
            const pass = err as ChangePasswordErrorResponse;
            setError(pass.oldPassword || pass.newPassword || pass.newPasswordRepeat || "");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <h2 className="font-semibold text-lg">Change your Password</h2>

            <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Current password"
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
                placeholder="Repeat new password"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <button
                className="btn btn-primary w-full"
                disabled={!oldPassword || !newPassword || !newPasswordRepeat}
            >
                Update Password
            </button>
        </form>
    );
}