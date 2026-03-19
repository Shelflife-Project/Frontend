import { useState, type ChangeEvent } from "react";
import UserIcon from "../UserIcon";
import { useAuth, useUsers } from "shelflife-react-hooks";

export default function UploadPFPForm() {
    const { user } = useAuth();
    const { uploadUserPfp } = useUsers();
    const [refreshKey, setRefreshKey] = useState(0);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!user)
            return;

        const file = e.target.files?.[0];
        if (!file) return;

        await uploadUserPfp(user.id, file);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="flex items-center gap-4 my-4 me-4">
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
            <label htmlFor="fileInput" className="cursor-pointer">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary">
                        <UserIcon refreshKey={refreshKey} />
                    </div>
                </div>
            </label>
        </div>
    );
}