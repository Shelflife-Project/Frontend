import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getCurrentUser } from '../apis/Authentication';
import type { User } from '../types/User';
import { useLocation } from 'react-router';

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const checkAuth = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [location]);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, refreshAuth: checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
