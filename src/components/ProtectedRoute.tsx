import { Navigate } from 'react-router';
import { type User } from 'shelflife-react-hooks';

interface ProtectedRouteProps {
    element: React.ReactNode;
    user: User | null;
    isLoading: boolean;
}

export function ProtectedRoute({ element, user, isLoading }: ProtectedRouteProps) {

    if (isLoading)
        return;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element;
}
