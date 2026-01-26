export interface Product {
    id: number;
    ownerId: number;
    name: string;
    category: string;
    barcode: string;
    expirationDaysDelta: number;
}