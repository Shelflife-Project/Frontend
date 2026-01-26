import { useState, type FormEvent } from "react";
import { UpdateEmail } from "../../../Fetch_APIs/User";
import { useAuth } from "../../../context/AuthContext";

export default function UpdateEmailForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { user } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user)
            return;

        try {
            await UpdateEmail(email, user.id);
            setSuccess("Email updated successfully!");
            setError(null);
            
            setEmail("");
        } catch (err: any) {
            setError(err.email || err.error || "An unexpected error occurred.");
            setSuccess(null);
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
            {success && <p className="text-success text-sm">{success}</p>}
            <button className="btn btn-primary w-fit mt-auto">Update Email</button>
        </form>
    );
}