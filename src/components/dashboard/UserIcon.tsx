import { useAuth } from "shelflife-react-hooks";

export default function UserIcon({ defaultId = 0, refreshKey = 0 }) {
    const { user } = useAuth();

    const src = import.meta.env.VITE_BACKEND_BASE_URL + "/api/users/" + ((defaultId > 0 ? defaultId : user?.id || 0)) + "/pfp";

    return <img src={src + "?key=" + refreshKey} />
}