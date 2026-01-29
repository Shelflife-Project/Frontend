import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { StorageItem } from '../types/StorageItem';
import { GetItems } from '../apis/StorageItemsAPI';

interface StorageItemContextType {
    items: StorageItem[];
    loading: boolean;
    fetchItems: () => Promise<void>;
    setStorageId: (id: number) => void;
}

const StorageItemContext = createContext<StorageItemContextType | undefined>(undefined);

export function StorageItemProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<StorageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [storageId, setStorageId] = useState(0);

    const fetchItems = async () => {
        if(storageId > 0)
            setItems(await GetItems(storageId));
    };

    useEffect(() => {
        fetchItems();
        setLoading(false);
    }, [storageId]);

    return (
        <StorageItemContext.Provider value={{ items, loading, fetchItems, setStorageId }}>
            {children}
        </StorageItemContext.Provider>
    );
}

export function useStorageItem() {
    const context = useContext(StorageItemContext);
    if (!context) {
        throw new Error('useStorageItem must be used within StorageItemProvider');
    }
    return context;
}
