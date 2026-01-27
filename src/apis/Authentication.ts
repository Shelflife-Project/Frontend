import type { User } from "../types/User";

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

    if (res.status == 400) {
        throw await res.json();
    }

    if (!res.ok)
        throw new Error("Couldn't sign up");
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

    if (!res.ok)
        return null;

    return res.json();
}