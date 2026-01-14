import { useNavigate } from "react-router";
import { useState } from "react";
import { signup } from "../Fetch_APIs/autentication";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
    const [generalError, setGeneralError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError("");

        if (password !== passwordRepeat) {
            setGeneralError("Passwords do not match");
            return;
        }

        try {
            await signup(username, email, password, passwordRepeat);
            navigate("/login");
        } catch (err: any) {
            try {
                const errorData = JSON.parse(err?.message || "{}");
                setFieldErrors(errorData);
            } catch {
                setGeneralError(err?.message || "Signup failed");
            }
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
                            <input required type="text" className={`input ${fieldErrors.username ? 'input-error' : ''}`} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {fieldErrors.username && <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>}

                            <label className="label">Email</label>
                            <input required type="email" className={`input ${fieldErrors.email ? 'input-error' : ''}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}

                            <label className="label">Password</label>
                            <input required type="password" className={`input ${fieldErrors.password ? 'input-error' : ''}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}

                            <label className="label">Repeat Password</label>
                            <input required type="password" className={`input ${fieldErrors.passwordRepeat ? 'input-error' : ''}`} placeholder="Repeat Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                            {fieldErrors.passwordRepeat && <p className="text-red-500 text-sm mt-1">{fieldErrors.passwordRepeat}</p>}
 
                            <div><a className="link link-hover" href="/login">Already have an account?</a></div>
                            <button className="btn btn-neutral mt-4" type="submit">Sign Up</button>
                            {generalError && <p className="text-red-500 mt-2">{generalError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}