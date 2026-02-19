import { useEffect, useState } from "react";
import CreateButton from "../CreateButton";
import { useProducts } from "shelflife-react-hooks";

export default function CreateProductForm() {
    const { fetchProducts, createProduct } = useProducts();

    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [barcode, setBarcode] = useState("");
    const [expirationDaysDelta, setExpirationDaysDelta] = useState(1);

    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [generalError, setGeneralError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError("");

        try {
            await createProduct({ name, category, barcode, expirationDaysDelta });
            fetchProducts();
            setShowForm(false);
        } catch (err: any) {
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>
            {showForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-150 overflow-y-auto">
                    <div className="bg-base-100 rounded-lg shadow-xl p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Add New Product</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control grid sm:grid-cols-2">
                                <label className="label">
                                    <span className="label-text font-semibold me-2">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={40}
                                    name="name"
                                    placeholder="e.g., Bread"
                                    className={"input input-bordered w-auto" + (fieldErrors.name ? " input-error" : "")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
                            </div>

                            <div className="form-control grid sm:grid-cols-2">
                                <label className="label">
                                    <span className="label-text font-semibold me-2">Category</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={40}
                                    name="category"
                                    placeholder="e.g., Baked goods"
                                    className={"input input-bordered w-auto" + (fieldErrors.category ? " input-error" : "")}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                                {fieldErrors.category && <p className="text-red-500 text-sm mt-1">{fieldErrors.category}</p>}
                            </div>

                            <div className="form-control grid sm:grid-cols-2">
                                <label className="label">
                                    <span className="label-text font-semibold me-2">Barcode</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={40}
                                    name="barcode"
                                    placeholder="12345 (optional)"
                                    className={"input input-bordered w-auto" + (fieldErrors.barcode ? " input-error" : "")}
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                />
                                {fieldErrors.barcode && <p className="text-red-500 text-sm mt-1">{fieldErrors.barcode}</p>}
                            </div>

                            <div className="form-control grid sm:grid-cols-2">
                                <label className="label">
                                    <span className="label-text font-semibold me-2">Expires In (Days)</span>
                                </label>
                                <input
                                    type="number"
                                    maxLength={40}
                                    name="expiration"
                                    placeholder="e.g., Bread"
                                    className={"input input-bordered w-auto" + (fieldErrors.expirationDaysDelta ? " input-error" : "")}
                                    value={expirationDaysDelta}
                                    onChange={(e) => setExpirationDaysDelta(parseInt(e.target.value))}
                                    min={1}
                                    required
                                />
                                {fieldErrors.expirationDaysDelta && <p className="text-red-500 text-sm mt-1">{fieldErrors.expirationDaysDelta}</p>}
                            </div>

                            {generalError && <p className="text-red-500 mt-2">{generalError}</p>}

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={!name || !category}
                                    className={`btn flex-1 ${name ? 'btn-info' : 'btn-disabled'}`}
                                >
                                    Create Product
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
            <CreateButton onClick={() => { setShowForm(true) }} />
        </>
    );
}