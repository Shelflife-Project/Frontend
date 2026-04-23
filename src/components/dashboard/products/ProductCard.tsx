import { useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useProducts, useAuth, type Product } from "shelflife-react-hooks";
import FormPopUp from "../../FormPopUp";
import EditProductForm from "./EditProductForm";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const { deleteProduct, uploadProductIcon } = useProducts();
    const { user } = useAuth();
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const canEdit = user?.admin || product.ownerId === user?.id;

    const handleIconChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await uploadProductIcon(product.id, file);
            setRefreshKey((k) => k + 1);
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const deleteProductHandler = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this product? If this is used somewhere it will also get deleted!");
        if (confirmDelete) {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
        }
    };

    return (
        <div className="card border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

            <figure className="group relative aspect-square bg-base-200 flex items-center justify-center overflow-hidden">

                <img
                    src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${product.id}/icon?${refreshKey}`}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                />

                {canEdit && (
                    <>
                        <input
                            id={`fileInput-${product.id}`}
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            className="hidden"
                            onChange={handleIconChange}
                        />

                        <label
                            htmlFor={`fileInput-${product.id}`}
                            className="absolute inset-0 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-sm transition">
                                Change Image
                            </div>
                        </label>

                        <label
                            htmlFor={`fileInput-${product.id}`}
                            className="absolute bottom-2 right-2 bg-base-100/80 backdrop-blur p-2 rounded-full shadow-md cursor-pointer transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                            </svg>
                        </label>
                    </>
                )}
            </figure>

            <div className="p-4 flex flex-col gap-3 flex-grow">

                <div>
                    <h2 className="font-semibold text-lg leading-tight break-all">
                        {product.name}
                    </h2>

                    {product.description && (
                        <p className="text-sm opacity-70 line-clamp-2 break-all">
                            {product.description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-base-200 rounded-xl px-3 py-2">
                        <p className="text-base-content/60 text-xs">Category</p>
                        <p className="font-medium truncate">{product.category}</p>
                    </div>

                    <div className="bg-base-200 rounded-xl px-3 py-2">
                        <p className="text-base-content/60 text-xs">Shelf life</p>
                        <p className="font-medium">{product.expirationDaysDelta} day(s)</p>
                    </div>

                    {product.barcode && (
                        <div className="col-span-2 bg-base-200 rounded-xl px-3 py-2">
                            <p className="text-base-content/60 text-xs">Barcode</p>
                            <p className="font-mono text-xs truncate">
                                {product.barcode}
                            </p>
                        </div>
                    )}
                </div>

                {canEdit && (
                    <div className="flex gap-2 mt-auto pt-2">
                        <FormPopUp
                            button={
                                <button className="btn btn-primary btn-sm flex-1">
                                    Edit
                                </button>
                            }
                        >
                            <EditProductForm product={product} />
                        </FormPopUp>

                        <button
                            onClick={() => deleteProductHandler(product.id)}
                            className="btn btn-error btn-sm flex-1"
                        >
                            Delete
                        </button>
                    </div>
                )}
                {!canEdit &&
                    <div title="You can't edit this product, but you can still add this to storages as an item" className="flex gap-2 mt-auto pt-2">
                        <p className="text-base-content/60 text-xs">You are not the owner of this product</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle mt-auto" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    </div>
                }
            </div>
        </div>
    );
}