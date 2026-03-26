import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Storages from "./Storages";
import DashboardNavbarBottom from '../../components/dashboard/DashboardNavbarBottom';
import Notifications from './Notifications';
import Profile from './Profile';
import Products from './Products';
import Items from './Items';
import Settings from './Settings';
import ShoppingList from './ShoppingList';
import AdminPage from './AdminPage';


export default function Dashboard() {
    return (
        <>
            <DashboardNavbar />
            <Routes>
                <Route path="storages/:id" element={<Items />} />
                <Route path="storages/:id/settings" element={<Settings />} />
                <Route path="/" element={<Storages />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
                <Route path="/shoppinglist" element={<ShoppingList />} />
            </Routes>
            <div className="h-20" />
            <DashboardNavbarBottom />
        </>
    )
}
