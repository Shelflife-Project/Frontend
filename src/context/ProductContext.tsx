import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import { GetProducts } from '../apis/ProductsAPI';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setProducts(await GetProducts());
    };

    useEffect(() => {
        fetchProducts();
        setLoading(false);
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within ProductProvider');
    }
    return context;
}
