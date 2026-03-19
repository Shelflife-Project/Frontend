import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth, type SignupError } from "shelflife-react-hooks";
import { toast } from "react-toastify";

export default function SignUpForm() {
    const { signup } = useAuth();

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [fieldErrors, setFieldErrors] = useState<SignupError>({});
    const [generalError, setGeneralError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let field = {} as SignupError

        if (password !== passwordRepeat) {
            field = { ...field, passwordRepeat: "Passwords do not match" };
        }

        try {
            await signup({ username, email, password, passwordRepeat });
            navigate("/login");
            toast.success("Successful sign up! Please log in!");
        } catch (err: any) {
            const signup = err as SignupError;

            field = {...field, ...signup};

            setFieldErrors(field);
            setGeneralError(signup.error || err.mesage || "");
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
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                className={`input ${fieldErrors.password ? 'input-error' : ''}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}

                            <label className="label">Repeat Password</label>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                className={`input ${fieldErrors.passwordRepeat ? 'input-error' : ''}`}
                                placeholder="Repeat Password"
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                            {fieldErrors.passwordRepeat && <p className="text-red-500 text-sm mt-1">{fieldErrors.passwordRepeat}</p>}

                            <label className="label cursor-pointer justify-start gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <span className="label-text">Show passwords</span>
                            </label>

                            <div><Link className="link link-hover" to="/login">Already have an account?</Link></div>
                            <button className="btn btn-neutral mt-4" type="submit">Sign Up</button>
                            {generalError && <p className="text-red-500 mt-2">{generalError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}