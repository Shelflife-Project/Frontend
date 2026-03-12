import { useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useProducts, useAuth, type Product } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditProductForm from "./EditProductForm";

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { deleteProduct, uploadProductIcon } = useProducts();
    const { user } = useAuth();
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const canEdit = user?.admin || product.ownerId === user?.id;

    const handleIconChange = async (e: ChangeEvent<HTMLInputElement>, product: Product) => {
        if (!product)
            return;

        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await uploadProductIcon(product.id, file);
            setRefreshKey((prevKey) => prevKey + 1);
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const deleteProductHandler = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            await deleteProduct(id);

            toast.success("")
        }
    };

    return <div className="card bg-base-300 max-w-82 shadow-sm">
        {
            canEdit &&
            <figure>
                <div className="relative group">

                    <input
                        id={`fileInput-${product.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleIconChange(e, product)}
                    />

                    <label htmlFor={`fileInput-${product.id}`} className="cursor-pointer block">
                        <img
                            src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${product.id}/icon?${refreshKey}`}
                            className="rounded-lg"
                        />

                        <label className="w-max absolute bottom-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                            </svg>
                        </label>

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                            Change icon
                        </div>
                    </label>

                </div>
            </figure>
        }

        {
            !canEdit &&
            <img
                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${product.id}/icon`}
                className="rounded-lg"
            />
        }

        <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <h2>Category: {product.category}</h2>
            <h2>Barcode: {product.barcode}</h2>
            <h2>Expiration delta: {product.expirationDaysDelta} days</h2>

            {
                canEdit &&
                <div className="flex justify-between mt-auto">
                    <button className="btn btn-error" onClick={() => deleteProductHandler(product.id)}>Delete</button>
                    <FormPopUp button={<button className="btn btn-primary">Edit</button>}>
                        <EditProductForm productId={product.id} />
                    </FormPopUp>
                </div>
            }
        </div>
    </div>;
}