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
        <label htmlFor="pfp" className="cursor-pointer group">
            <div className="relative group flex justify-center">

                <input
                    id={"pfp"}
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                    onChange={(e) => handleChange(e)}
                />

                <label htmlFor="pfp" className="cursor-pointer group">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-2 group-hover:blur-[0.1em] ring-offset-base-100 transition group-hover:scale-105">
                            <UserIcon refreshKey={refreshKey} />
                        </div>
                    </div>

                    <div className="rounded-full absolute inset-0 bg-black/50 opacity-0 group-hover:scale-105 flex items-center justify-center text-white text-sm transition">
                    </div>
                </label>
            </div>
                <p className="text-xs text-center mt-2 text-base-content/60 group-hover:opacity-100">
                    Change photo
                </p>
        </label>
    );
}