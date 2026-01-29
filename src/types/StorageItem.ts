import type { Product } from "./Product";

export interface StorageItem {
    id: number;
    storage_id: number;
    product: Product;
    createdAt: Date;
    expiresAt: Date;
}