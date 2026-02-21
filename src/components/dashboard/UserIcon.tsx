import { useEffect, useState } from "react";
import { useAuth, useUsers } from "shelflife-react-hooks";

export default function UserIcon({ defaultId = 0 }) {
    const { user } = useAuth();
    const { getUserPfp } = useUsers();
    const [src, setSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadImage = async (id: number) => {
            try {
                const blob = await getUserPfp(id);
                const objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
            } catch (err) {
                console.error(err);
            }
        };

        if (defaultId > 0 || user == null)
            loadImage(defaultId);
        else
            loadImage(user.id);
    }, []);


    return <img src={src} />
}