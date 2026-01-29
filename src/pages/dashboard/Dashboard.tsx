import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Storages from "./Storages";
import Products from "./Products";
import Notifications from "./Notifications";
import Profile from "./Profile";
import DashboardNavbarBottom from '../../components/dashboard/DashboardNavbarBottom';
import { ProductProvider } from '../../context/ProductContext';
import { StorageProvider } from '../../context/StorageContext';
import Items from './Items';
import { StorageItemProvider } from '../../context/StorageItemContext';

export default function Dashboard() {
    return (
        <>
            <DashboardNavbar />
            <Routes>
                <Route path="/" element={
                    <StorageProvider>
                        <Storages />
                    </StorageProvider>
                } />

                <Route path="storages/:id" element={
                    <StorageItemProvider>
                        <Items />
                    </StorageItemProvider>
                } />

                <Route path="/products" element={
                    <ProductProvider>
                        <Products />
                    </ProductProvider>
                } />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <DashboardNavbarBottom />
        </>
    )
}
