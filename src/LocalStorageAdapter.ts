import type { TokenStorage } from "shelflife-react-hooks";

export const localStorageAdapter: TokenStorage = {
    getItem: (key: string) => {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: string) => {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.error('localStorage setItem failed:', err);
        }
    },
    removeItem: (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error('localStorage removeItem failed:', err);
        }
    }
};