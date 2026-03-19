import { useState } from "react";
import { useAuth, type UpdateUserError } from "shelflife-react-hooks";

export default function UpdateUsernameForm() {
    const { user, changeMe } = useAuth();

    const [username, setUsername] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!user)
            return;

        try {
            await changeMe({ username });
            setSuccess("Username updated successfully!");
            setUsername("");
        } catch (err: any) {
            const update = err as UpdateUserError;
            if (update.username)
                setError(update.username);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
                Username
            </h2>

            <input
                type="text"
                maxLength={40}
                className={`input input-bordered w-full ${error ? "input-error" : ""}`}
                placeholder="New username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />

            {error && <p className="text-error text-sm">{error}</p>}
            {success && <p className="text-success text-sm">{success}</p>}
            <button className={`btn btn-primary w-full ${username === "" ? "btn-disabled" : ""}`}>Update Username</button>
        </form>
    );
}