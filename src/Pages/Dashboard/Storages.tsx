import { useState } from "react";

export default function Storages() {
    const [showForm, setShowForm] = useState(false);
    const [storageData, setStorageData] = useState({
        name: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStorageData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!storageData.name) return;
        console.log("Storage data:", storageData);
        setStorageData({ name: ""});
        setShowForm(false);
    };

    return (
        <>
            <div className="p-8 pb-32 text-center">
                <h1 className="text-3xl font-bold mb-4">Storages</h1>
                <p className="text-gray-600">Manage your storage locations here.</p>
            </div>

            {showForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-150 overflow-y-auto">
                    <div className="bg-base-100 rounded-lg shadow-xl p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Add New Storage</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <div className="inline-grid *:[grid-area:1/1]">
                                    <div className={`status ${storageData.name ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                                    <div className={`status ${storageData.name ? 'status-success' : 'status-error'} me-2`}></div>
                                </div>
                                <label className="label">
                                    <span className="label-text font-semibold me-2">Storage Name</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={40}
                                    name="name"
                                    placeholder="e.g., Kitchen Pantry"
                                    className="input input-bordered"
                                    value={storageData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={!storageData.name}
                                    className={`btn flex-1 ${storageData.name ? 'btn-info' : 'btn-disabled'}`}
                                >
                                    Create Storage
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="btn btn-ghost flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showForm && (
                <div
                    className="fixed inset-0 backdrop-blur-sm z-40"
                    onClick={() => setShowForm(false)}
                />
            )}

            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-0 right-0 mb-5 me-5 z-60 btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
            </button>
        </>
    )
}
