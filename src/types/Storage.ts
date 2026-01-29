import type { User } from "./User";

export interface Storage {
    id: number;
    name: string;
    owner: User;
};