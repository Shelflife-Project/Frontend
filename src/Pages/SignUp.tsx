import { useNavigate } from "react-router";
import Navbar from "../components/Navbar"
import SignUpForm from "../components/SignUpForm"
import { getCurrentUser } from "../Fetch_APIs/autentication";
import { useEffect } from "react";

export default function SignUp() {
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
            <SignUpForm />
        </>
    )
}