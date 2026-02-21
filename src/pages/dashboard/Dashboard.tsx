import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Storages from "./Storages";
import DashboardNavbarBottom from '../../components/dashboard/DashboardNavbarBottom';
import Notifications from './Notifications';
import Profile from './Profile';
import Products from './Products';
import { ToastContainer } from 'react-toastify';


export default function Dashboard() {
    return (
        <>
            <DashboardNavbar />
            <Routes>
                <Route path="/" element={<Storages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
            </Routes>
            <div className="h-20" />
            <DashboardNavbarBottom />
            <ToastContainer
            className="toast-container z-50"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
