import { useAuth } from "shelflife-react-hooks";
import UpdateEmailForm from "../../components/dashboard/profile/UpdateEmailForm";
import UpdatePasswordForm from "../../components/dashboard/profile/UpdatePasswordForm";
import UpdateUsernameForm from "../../components/dashboard/profile/UpdateUsernameForm";
import UploadPFPForm from "../../components/dashboard/profile/UploadPFPForm";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-base-100">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                <div className="flex flex-col md:flex-row md:items-center gap-6 bg-base-200 rounded-2xl p-6 shadow-sm">

                    <UploadPFPForm />

                    <div>
                        <h1 className="text-3xl font-bold">
                            {user?.username}
                        </h1>
                        <p className="text-sm opacity-70">
                            Manage your settings
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">
                    Account Settings
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <div className="bg-base-200 rounded-2xl p-5 shadow-sm border border-base-300">
                        <UpdateUsernameForm />
                    </div>

                    <div className="bg-base-200 rounded-2xl p-5 shadow-sm border border-base-300">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-base-200 rounded-2xl p-5 shadow-sm border border-base-300">
                        <UpdateEmailForm />
                    </div>

                </div>
            </div>
        </div>
    );
}