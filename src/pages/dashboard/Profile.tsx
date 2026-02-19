import UpdateUsernameForm from "../../components/dashboard/profile/UpdateUsernameForm";
import UploadPFPForm from "../../components/dashboard/profile/UploadPFPForm";
import { useAuth } from "shelflife-react-hooks";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Profile Settings</h1>

            <div className="flex items-center">
                <UploadPFPForm />
                <p className="font-lg font-bold">{user?.username}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-2">
                <UpdateUsernameForm />
                {/*
                    <UpdateEmailForm />
                    <UpdatePasswordForm />
                */}
            </div>
        </div>
    );
}
