import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../Fetch_APIs/autentication";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then(user => {
                if (user)
                    navigate("/dashboard", { replace: true })
            });
    }, []);

    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    )
}


