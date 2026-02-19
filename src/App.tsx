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

export default function App() {
    const { getMe } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            await getMe();
        };

        fetchUser();
    }, [getMe]);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<UnProtectedRoute element={<Login />} />} />
            <Route path='/signup' element={<UnProtectedRoute element={<SignUp />} />} />
            <Route path='/dashboard/*' element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
    );
}