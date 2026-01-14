import { useNavigate } from "react-router";
import { useState } from "react";
import { signup } from "../Fetch_APIs/autentication";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!username || !email || !password || !passwordRepeat) {
            setError("Please fill out all fields");
            return;
        }

        if (password !== passwordRepeat) {
            setError("Passwords do not match");
            return;
        }

        try {
            await signup(username, email, password, passwordRepeat);
            navigate("/login");
        } catch (err: any) {
            setError(err?.message || "Signup failed");
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create an account</h1>
                    <p className="py-6">Join ShelfLife — enter your details to get started.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form className="fieldset" onSubmit={handleSubmit}>
                            <label className="label">Username</label>
                            <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <label className="label">Repeat Password</label>
                            <input type="password" className="input" placeholder="Repeat Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />

                            <div><a className="link link-hover" href="/login">Already have an account?</a></div>
                            <button className="btn btn-neutral mt-4" type="submit">Sign Up</button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}