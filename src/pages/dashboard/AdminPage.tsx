import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, useUsers, type User } from "shelflife-react-hooks";
import UserIcon from "../../components/dashboard/UserIcon";
import { toast } from "react-toastify";

export default function AdminPage() {
    const { getMe, user: self } = useAuth();
    const { fetchUsers, users, deleteUser } = useUsers();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filtered = users.filter((u) =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    const checkAdmin = async () => {
        try {
            const u = await getMe();
            if (!u?.admin)
                throw new Error();
        } catch (err: any) {
            navigate("/dashboard", { replace: true })
        }
    }

    const handleDelete = async (user: User) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${user.username}?`);
        if (confirmDelete) {
            await deleteUser(user.id);
            toast.success("User deleted successfully");
        }
    };

    useLayoutEffect(() => {
        checkAdmin();
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-sm opacity-70">
                        Manage your app users and permissions
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search users..."
                    className="input input-bordered w-full md:w-72"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="rounded-2xl shadow-md overflow-hidden">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((user) => (
                            <tr key={user.id} className="hover">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="text-primary-content rounded-full w-10">
                                                <UserIcon defaultId={user.id} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {user.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span
                                        className={`badge ${user.admin
                                            ? "badge-success"
                                            : "badge-info"
                                            }`}
                                    >
                                        {user.admin ? "Admin" : "User"}
                                    </span>
                                </td>

                                <td className="text-right">
                                    {
                                        user.id !== self?.id &&
                                        <div className="flex justify-end gap-2">
                                            <button className="btn btn-sm btn-primary">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(user)} className="btn btn-sm btn-error">
                                                Delete
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
