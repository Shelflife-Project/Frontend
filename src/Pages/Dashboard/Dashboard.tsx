import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import Storages from "./Storages";
import Products from "./Products";
import Notifications from "./Notifications";
import Profile from "./Profile";

export default function Dashboard() {
    return (
        <>
        <DashboardNavbar />
        <Routes>
            <Route path="/" element={<Storages />} />
            <Route path="/products" element={<Products />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        </>
    )
}
