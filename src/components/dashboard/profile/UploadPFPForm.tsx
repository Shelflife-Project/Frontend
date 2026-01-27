import { useState, type ChangeEvent } from "react";
import { useAuth } from "../../../context/AuthContext";
import { UploadPFP } from "../../../apis/User";
import UserIcon from "../UserIcon";

export default function UploadPFPForm() {
    const { user } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!user)
            return;

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("pfp", file);

        await UploadPFP(formData, user.id);
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
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <UserIcon key={refreshKey} />
                    </div>
                </div>
            </label>
        </div>
    );
}