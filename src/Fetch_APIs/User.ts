const API_URL = 'http://localhost:8080/api';

export async function UploadPFP(formData: FormData, userId: number) {
    const res = await fetch(API_URL + "/users/" + userId + "/pfp", {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if (!res.ok) {
        throw res.json();
    }
}

export async function UpdateUsername(username: string, userId: number) {
    const res = await fetch(API_URL + "/users/" + userId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include"
    });

    if (!res.ok) {
        throw res.json();
    }

    return res.json();
}

export async function UpdateEmail(email: string, userId: number) {
    const res = await fetch(API_URL + "/users/" + userId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
    });

    if (!res.ok) {
        throw res.json();
    }

    return res.json();
}

export async function UpdatePassword(oldPassword: string, newPassword: string, newPasswordRepeat: string) {
    const res = await fetch(API_URL + "/auth/password/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword, newPasswordRepeat }),
        credentials: "include"
    });

    if (!res.ok) {
        throw res.json();
    }

    return res.json();
}