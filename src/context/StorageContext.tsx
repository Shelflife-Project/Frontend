import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Storage } from '../types/Storage';
import { GetStorages } from '../apis/StorageAPI';

interface StorageContextType {
    storages: Storage[];
    loading: boolean;
    fetchStorages: () => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: ReactNode }) {
    const [storages, setStorages] = useState<Storage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStorages = async () => {
        setStorages(await GetStorages());
    };

    useEffect(() => {
        fetchStorages();
        setLoading(false);
    }, []);

    return (
        <StorageContext.Provider value={{ storages, loading, fetchStorages }}>
            {children}
        </StorageContext.Provider>
    );
}

export function useStorage() {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('useStorage must be used within StorageProvider');
    }
    return context;
}
