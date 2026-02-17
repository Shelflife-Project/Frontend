import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "shelflife-react-hooks";

export default function LoginForm() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            await login({ email, password });
        } catch (err: any) {
            setError(err.message);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back! Please enter your details to log in to your account.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form className="fieldset" onSubmit={handleSubmit}>
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div><Link className="link link-hover" to="/signup">Don't have an account?</Link></div>
                            <button className="btn btn-neutral mt-4" type="submit">Login</button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}