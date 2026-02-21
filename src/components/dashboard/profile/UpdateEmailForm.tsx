import { useState } from "react";
import { useNavigate } from "react-router";
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
            alert("Email updated successfully!\nYou will get logged out.\nPlease login again.")
            await getMe();
            navigate("/login", { replace: true })
        } catch (err: any) {
            const update = err as UpdateUserError
            if (update.email)
                setError(update.email);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-4 space-y-3">
            <h2 className="font-semibold">Change Email</h2>
            <input
                type="email"
                className={`input input-bordered w-full ${error ? "input-error" : ""}`}
                placeholder="New email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            <button className={`btn btn-primary w-fit mt-auto ${email === "" ? "btn-disabled" : ""}`}>Update Email</button>
        </form>
    );
}