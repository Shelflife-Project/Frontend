import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "shelflife-react-hooks";

export default function UpdateEmailForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { user, changeMe, getMe } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user)
            return;

        try {
            await changeMe({ email });
            alert("Email updated successfully!\nYou will get logged out.\nPlease login again.")
            await getMe();
            navigate("/login", { replace: true })
        } catch (err: any) {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-4 space-y-3">
            <h2 className="font-semibold">Change Email</h2>
            <input
                type="email"
                className="input input-bordered w-full"
                placeholder="New email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            <button className="btn btn-primary w-fit mt-auto">Update Email</button>
        </form>
    );
}