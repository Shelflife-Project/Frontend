import type { Storage } from "../types/Storage";

const API_URL = "http://localhost:8080/api/storages";

export async function GetStorages(): Promise<Storage[]> {
    const res = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        console.error("Couldn't get storages");
        return [];
    }

    return res.json();
}

export async function CreateStorage(name: string): Promise<Storage> {
    const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    if (res.status == 400) {
        throw await res.json();
    }

    if (!res.ok) {
        throw new Error("Couldn't create storage")
    }
    
    return res.json();
}

export async function DeleteStorage(id: number) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
}