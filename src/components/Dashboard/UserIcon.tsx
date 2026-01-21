import { useAuth } from "../../context/AuthContext";

const URL = "http://localhost:8080/api/users/";

export default function UserIcon({ id = 0 }) {
    const {user} = useAuth();

    if (user == null) {
        return <img src={URL + id + "/pfp"} />
    }

    return <img src={URL + user.id + "/pfp"} />
}