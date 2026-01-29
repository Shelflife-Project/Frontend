import type { StorageItem } from "../types/StorageItem";

const API_URL = "http://localhost:8080/api/storages/";

export async function GetItems(storageId: number): Promise<StorageItem[]> {
    const res = await fetch(API_URL + storageId + "/items", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        console.error("Couldn't get items");
        return [];
    }

    return res.json();
}

export async function DeleteItem(storage_id: number, item_id: number) {

    await fetch(API_URL + storage_id + "/items/" + item_id, {
        method: "GET",
        credentials: "include",
    });
}
