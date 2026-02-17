import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from 'shelflife-react-hooks';

interface ProtectedRouteProps {
    element: React.ReactNode;
}

export function UnProtectedRoute({ element }: ProtectedRouteProps) {
    const { getMe, isLoading, user } = useAuth();

    useEffect(() => {
        getMe();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
}
