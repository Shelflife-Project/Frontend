import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    if (isLoggedIn)
        navigate("/dashboard", { replace: true })

    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    )
}


