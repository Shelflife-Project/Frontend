import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Storages from "./Storages";
import DashboardNavbarBottom from '../../components/dashboard/DashboardNavbarBottom';
import Notifications from './Notifications';
import Profile from './Profile';
import Products from './Products';
import Items from './Items';


export default function Dashboard() {
    return (
        <>
            <DashboardNavbar />
            <Routes>
                <Route path="storages/:id" element={<Items />} />
                <Route path="/" element={<Storages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
            </Routes>
            <div className="h-20" />
            <DashboardNavbarBottom />
        </>
    )
}
