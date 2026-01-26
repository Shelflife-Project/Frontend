import type { Product } from "../types/Product";

const API_URL = "http://localhost:8080/api/products";

export async function GetProducts(): Promise<Product[]> {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
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