import type { Product } from "../types/Product";

const API_URL = "http://localhost:8080/api/products";

export async function GetProducts(): Promise<Product[]> {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        console.error("Couldn't get products");
        return [];
    }

    return res.json();
}

export async function DeleteProduct(id: number) {
    await fetch(API_URL + "/" + id, {
        method: "DELETE",
        credentials: "include",
    });
}

export async function CreateProduct(name: string, category: string, barcode: string, expirationDaysDelta: number) {
    const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, barcode, expirationDaysDelta }),
    });

    if (res.status === 400) {
        throw await res.json();
    }

    if (!res.ok) {
        throw new Error("Couldn't create product");
    }

    return await res.json();
}