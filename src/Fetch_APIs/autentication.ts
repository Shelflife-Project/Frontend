import type { User } from "../Types/User";

const API_URL = 'http://localhost:8080/api/auth';

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }
}

export async function signup(username: string, email: string, password: string, passwordRepeat: string) {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password, passwordRepeat }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Signup failed");
    }
}

export async function logout() {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
}

export async function getCurrentUser(): Promise<User | null> {
    const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (res.status != 200)
        return null;

    return res.json();
}