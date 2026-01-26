import { useNavigate } from "react-router";
import Navbar from "../components/Navbar"
import SignUpForm from "../components/SignUpForm"
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    if (isLoggedIn)
        navigate("/dashboard", { replace: true })

    return (
        <>
            <Navbar />
            <SignUpForm />
        </>
    )
}