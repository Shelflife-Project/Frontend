import { Route, Routes } from "react-router";
import { useAuth } from "shelflife-react-hooks";
import { UnProtectedRoute } from "./components/UnProtectedRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import { Bounce, ToastContainer } from "react-toastify/unstyled";

export default function App() {
    const { getMe, user } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            await getMe();
        };

        fetchUser();
    }, []);

    return (

        <Routes>
            <Route path='/' element={<UnProtectedRoute user={user} element={<Home />} />} />
            <Route path='/about' element={<UnProtectedRoute user={user} element={<About />} />} />
            <Route path='/login' element={<UnProtectedRoute user={user} element={<Login />} />} />
            <Route path='/signup' element={<UnProtectedRoute user={user} element={<SignUp />} />} />
            <Route path='/dashboard/*' element={<ProtectedRoute user={user} element={<Dashboard />} />} />
        </Routes>
       
    );
}