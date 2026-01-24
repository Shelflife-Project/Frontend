import { type ChangeEvent } from "react";
import { UploadPFP } from "../../Fetch_APIs/User";
import { useAuth } from "../../context/AuthContext";
import UserIcon from "../../components/Dashboard/UserIcon";
import UpdateUsernameForm from "../../components/Dashboard/Profile/UpdateUsernameForm";
import UpdateEmailForm from "../../components/Dashboard/Profile/UpdateEmailForm";
import UpdatePasswordForm from "../../components/Dashboard/Profile/UpdatePasswordForm";

export default function Profile() {
    const { user } = useAuth();

    const handlePfpChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!user)
            return;

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("pfp", file);

        UploadPFP(formData, user.id);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Profile Settings</h1>

            <div className="flex items-center gap-4 mb-4">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePfpChange}
                />
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <UserIcon />
                    </div>
                </div>
                <p className="font-lg font-bold">{user?.username}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-2">
                <UpdateUsernameForm />
                <UpdateEmailForm />
                <UpdatePasswordForm />
            </div>
        </div>
    );
}
