import { Routes, Route, } from 'react-router';
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Storages from "./Storages";
import DashboardNavbarBottom from '../../components/dashboard/DashboardNavbarBottom';

export default function Dashboard() {
    return (
        <>
            <DashboardNavbar />
            <Routes>
                <Route path="/" element={<Storages />} />
                {
                    /*<Route path="/products" element={
                    <ProductProvider>
                        <Products />
                    </ProductProvider>
                } />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />*/
                }
            </Routes>
            <DashboardNavbarBottom />
        </>
    )
}
