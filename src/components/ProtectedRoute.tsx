import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    element: React.ReactNode;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return element;
}
