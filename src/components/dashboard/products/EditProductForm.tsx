import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProducts, type Product, type ProductCreateError, type UpdateProductRequest } from "shelflife-react-hooks";

type Props = {
    product: Product
};

export default function EditProductForm({ product }: Props) {
    const { updateProduct } = useProducts();

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [barcode, setBarcode] = useState(product.barcode);
    const [expirationDaysDelta, setExpirationDaysDelta] = useState(product.expirationDaysDelta);

    const [fieldErrors, setFieldErrors] = useState<ProductCreateError>({});
    const [generalError, setGeneralError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setGeneralError("");

        if (!product)
            return;

        const updateDto: UpdateProductRequest = {};

        if (name !== product.name) {
            updateDto.name = name;
        }

        if (description !== product.description) {
            updateDto.description = description ? description : "";
        }

        if (category !== product.category) {
            updateDto.category = category;
        }

        if (barcode !== product.barcode) {
            updateDto.barcode = barcode ? barcode : "";
        }

        if (expirationDaysDelta !== product.expirationDaysDelta) {
            updateDto.expirationDaysDelta = expirationDaysDelta;
        }

        try {
            await updateProduct(product.id, updateDto);
            toast.success("The changes have been successfully saved");
        } catch (err: any) {
            const product = err as ProductCreateError

            if (product.name || product.category || product.barcode || product.expirationDaysDelta)
                setFieldErrors(product);
            else
                setGeneralError(err.message);
        }
    };

    const setState = async () => {
        if (!product)
            return;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setBarcode(product.barcode);
        setExpirationDaysDelta(product.expirationDaysDelta);
    };

    useEffect(() => {
        setState();
    }, [product])

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit {product?.name}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control grid sm:grid-cols-2">
                    <label className="label">
                        <span className="label-text font-semibold me-2">Product Name</span>
                        <span className="text-red-500">*</span>
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
                        <span className="text-red-500">*</span>
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
                        <span className="label-text font-semibold me-2">Expires In (Days)</span>
                        <span className="text-red-500">*</span>
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

                <div className="form-control grid sm:grid-cols-2">
                    <label className="label">
                        <span className="label-text font-semibold me-2">Product Description</span>
                    </label>
                    <textarea
                        maxLength={255}
                        placeholder="Description (optional)"
                        className={"textarea w-auto" + (fieldErrors.description ? " input-error" : "")}
                        value={description ? description : ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {fieldErrors.description && <p className="text-red-500 text-sm mt-1">{fieldErrors.description}</p>}
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
                        value={barcode ? barcode : ""}
                        onChange={(e) => setBarcode(e.target.value)}
                    />
                    {fieldErrors.barcode && <p className="text-red-500 text-sm mt-1">{fieldErrors.barcode}</p>}
                </div>

                {generalError && <p className="text-red-500 mt-2">{generalError}</p>}

                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={
                            (!name || !category) ||
                            (
                                name === product.name &&
                                barcode === product.barcode &&
                                category === product.category &&
                                description === product.description &&
                                expirationDaysDelta === product.expirationDaysDelta
                            )
                        }
                        className={`btn flex-1 ${name ? 'btn-success' : 'btn-disabled'}`}
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </>
    );
}