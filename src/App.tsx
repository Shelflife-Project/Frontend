import { Route, Routes } from "react-router";
import { useAuth } from "shelflife-react-hooks";
import { UnProtectedRoute } from "./components/UnProtectedRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useLayoutEffect, useState } from "react";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Help from "./pages/Help";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./providers/ThemeProvider";

export default function App() {
    const { getMe, user } = useAuth();
    const { theme } = useTheme();

    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const fetchUser = async () => {
            await getMe();
            setIsLoading(false);
        };

        fetchUser();
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<UnProtectedRoute user={user} element={<Home />} />} />
                <Route path='/about' element={<UnProtectedRoute user={user} element={<About />} />} />
                <Route path='/login' element={<UnProtectedRoute user={user} element={<Login />} />} />
                <Route path='/signup' element={<UnProtectedRoute user={user} element={<SignUp />} />} />
                <Route path='/help' element={<ProtectedRoute isLoading={isLoading} user={user} element={<Help />} />} />
                <Route path='/dashboard/*' element={<ProtectedRoute isLoading={isLoading} user={user} element={<Dashboard />} />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme ? "dark" : "light"}
            />
        </>
    );
}