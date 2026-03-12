import { useState } from "react";
import { useProducts, type ProductCreateError } from "shelflife-react-hooks";

export default function CreateProductForm() {
    const { createProduct } = useProducts();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [barcode, setBarcode] = useState("");
    const [expirationDaysDelta, setExpirationDaysDelta] = useState(1);

    const [fieldErrors, setFieldErrors] = useState<ProductCreateError>({});
    const [generalError, setGeneralError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError("");

        try {
            await createProduct({
                name,
                description,
                category,
                barcode: barcode || undefined,
                expirationDaysDelta: expirationDaysDelta,
            });
        } catch (err: any) {
            const product = err as ProductCreateError

            if (product.name || product.category || product.barcode || product.expirationDaysDelta)
                setFieldErrors(product);
            else
                setGeneralError(err.message);
        }
    };

    return (
        <>
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
                        <span className="label-text font-semibold me-2">Product Description</span>
                    </label>
                    <textarea
                        maxLength={255}
                        placeholder="Description (optional)"
                        className={"textarea w-auto" + (fieldErrors.description ? " input-error" : "")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {fieldErrors.description && <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>}
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
                        className={`btn flex-1 ${name ? 'btn-success' : 'btn-disabled'}`}
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </>
    );
}