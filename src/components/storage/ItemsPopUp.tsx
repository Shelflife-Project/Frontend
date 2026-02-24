import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProducts, useStorageItems, type Product, type Storage } from "shelflife-react-hooks";

type Props = {
    storage: Storage
}

export default function ItemsPopUp({ storage }: Props) {
    const { fetchItems, isError, isLoading, items, addItem, deleteItem } = useStorageItems();
    const { products, fetchProducts, isError: productsError, isLoading: productsLoading } = useProducts();

    const [addProduct, setAddProduct] = useState<Product | null>(null);
    const [productFilter, setProductFilter] = useState<string>("");
    const [expiresAt, setExpiresAt] = useState<string>("");

    useEffect(() => {
        if ( isLoading || isError) return;
        fetchItems(storage.id);
        if ( productsLoading || productsError) return;
        fetchProducts();
    }, [storage.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addProduct) return;
        await addItem(storage.id, {
            productId: addProduct.id,
            expiresAt: expiresAt,
        });
        setAddProduct(null);
        setExpiresAt("");
        fetchItems(storage.id);
    }

    const handleRemove = async (itemId: number) => {
        await deleteItem(storage.id, itemId);
        fetchItems(storage.id);
    }

    if (isLoading || productsLoading) {
        return <div>Loading...</div>;
    }

    if (isError || productsError) {
       toast.error("An error occurred while fetching items or products. Please try again later."); 
    }

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold">Items</h2>
                <p className="text-gray-600">Manage items in this storage.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-row">

                <div className="form-control  w-1/2 lg:w-2/3  gap-1 flex flex-col items-center">

                    <div className="w-full flex flex-row items-center">
                        <div className="inline-grid *:[grid-area:1/1] ">
                            <div className={`status ${addProduct ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                            <div className={`status ${addProduct ? 'status-success' : 'status-error'} me-2`}></div>
                        </div>
                        <label className="label">
                            <span className="label-text font-semibold me-2">Search a product</span>
                        </label>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input
                            type="text"
                            maxLength={100}
                            name="productSearch"
                            placeholder="Search products..."
                            className="input input-bordered mr-2"
                            value={productFilter}
                            onChange={(e) => setProductFilter(e.target.value)}
                        />
                    </div>

                    <div /> <div />

                    <div className="w-full flex flex-row items-center">
                        <div className="inline-grid *:[grid-area:1/1] ">
                            <div className={`status ${expiresAt ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                            <div className={`status ${expiresAt ? 'status-success' : 'status-error'} me-2`}></div>
                        </div>
                        <label className="label">
                            <span className="label-text font-semibold me-2">Expires At</span>
                        </label>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <input
                            type="date"
                            maxLength={40}
                            name="name"
                            placeholder="e.g., user@example.com"
                            className="input input-bordered mr-2"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            required
                        />
                    </div>

                    <div /> <div /> <div />

                    <button
                        type="submit"
                        disabled={!addProduct || !expiresAt}
                        className={`btn flex-1 ${addProduct && expiresAt ? 'btn-info' : 'btn-disabled'}`}
                    >
                        Add Item
                    </button>
                </div>

                {
                    // selector for the select product
                }

                <div className="w-1/2 lg:w-1/3 flex flex-col items-start">
                    <div className="w-full flex flex-row items-center">
                        <div className="inline-grid *:[grid-area:1/1] ">
                            <div className={`status ${addProduct ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                            <div className={`status ${addProduct ? 'status-success' : 'status-error'} me-2`}></div>
                        </div>
                        <label className="label">
                            <span className="label-text font-semibold me-2">Select Product</span>
                        </label>
                    </div>

                    <div className="max-h-36 w-full overflow-y-auto p-2">
                        {products
                            .filter(p => productFilter.trim() === '' ? true : p.name.toLowerCase().includes(productFilter.toLowerCase()))
                            .map(p => (
                                <div key={p.id} className="flex items-center justify-between py-1">
                                    <div className="truncate">{p.name}</div>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ms-2 ${addProduct?.id === p.id ? 'btn-error' : 'btn-success'}`}
                                        onClick={() => {
                                            if (addProduct?.id === p.id) {
                                                setAddProduct(null);
                                                return setProductFilter("");
                                            }
                                            setProductFilter(p.name);   
                                            return setAddProduct(p)
                                        }}
                                    >
                                       {addProduct?.id === p.id ? 'Deselect' : 'Select'} 
                                    </button>
                                </div>
                            ))}
                        {products.filter(p => productFilter.trim() === '' ? true : p.name.toLowerCase().includes(productFilter.toLowerCase())).length === 0 && (
                            <div className="text-sm text-gray-500">No products match your search.</div>
                        )}
                    </div> 
                </div>
            </form>
            <div className="overflow-x-auto mt-2 rounded-box border border-base-content/5 bg-base-100 max-h-48">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.product.name}</td>
                                <td>{item.expiresAt ? "Active" : "Expired"}</td>
                                <td><button className="btn btn-sm btn-error" onClick={() => handleRemove(item.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}