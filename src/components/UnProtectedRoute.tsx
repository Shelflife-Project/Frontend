import { Navigate } from 'react-router';
import { type User } from 'shelflife-react-hooks';

interface ProtectedRouteProps {
    element: React.ReactNode;
    user: User | null;
}

export function UnProtectedRoute({ element, user }: ProtectedRouteProps) {

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
}
