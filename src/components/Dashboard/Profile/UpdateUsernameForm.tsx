import { useState, type FormEvent } from "react";
import { UpdateUsername } from "../../../Fetch_APIs/User";
import { useAuth } from "../../../context/AuthContext";

export default function UpdateUsernameForm() {
    const [username, setUsername] = useState("");
    const { user, refreshAuth } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user)
            return;

        await UpdateUsername(username, user.id);
        refreshAuth();
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-4 space-y-3">
            <h2 className="font-semibold">Change Username</h2>
            <input
                type="text"
                className="input input-bordered w-full"
                placeholder="New username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn btn-primary w-fit mt-auto">Update Username</button>
        </form>
    );

}