import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth, type UpdateUserError } from "shelflife-react-hooks";

export default function UpdateEmailForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string>("");
    const { user, changeMe, getMe } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        if (!user)
            return;

        try {
            await changeMe({ email });
            await getMe();
            toast.success("Email updated successfully!");
            navigate("/login", { replace: true })
        } catch (err: any) {
            const update = err as UpdateUserError
            if (update.email)
                setError(update.email);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <h2 className="font-semibold text-lg">Change Email</h2>

            <input
                type="email"
                className={`input input-bordered w-full ${error ? "input-error" : ""}`}
                placeholder="New email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-sm">
                ⚠️ You'll be logged out after changing email
            </div>

            <button
                className="btn btn-primary w-full"
                disabled={!email}
            >
                Update Email
            </button>
        </form>
    );
}