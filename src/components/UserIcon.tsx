import { useEffect, useState } from "react";
import { getCurrentUser } from "../Fetch_APIs/autentication";
import type { User } from "../Types/User";

const URL = "http://localhost:8080/api/users/";

export default function UserIcon({ id = 0 }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser()
            .then(setUser);
    }, []);

    if (user == null) {
        return <img src={URL + id + "/pfp"} />
    }

    return <img src={URL + user.id + "/pfp"} />
}