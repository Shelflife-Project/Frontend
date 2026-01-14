import { useNavigate } from "react-router";
import { login } from "../Fetch_APIs/autentication";
import { useState } from "react";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
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
                            <div><a className="link link-hover" href="/signup">Don't have an account?</a></div>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" type="submit">Login</button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}