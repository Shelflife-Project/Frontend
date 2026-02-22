import { useEffect, useState } from "react";
import { useAuth, useProducts, useStorageItems, type Product, type Storage } from "shelflife-react-hooks";

type Props = {
    storage: Storage
}

export default function ItemsPopUp({ storage }: Props) {
    const { fetchItems, isError, isLoading, items, addItem, deleteItem } = useStorageItems();
    const { products, isError: productsError, isLoading: productsLoading } = useProducts();

    const [addProduct, setAddProduct] = useState<Product | null>(null);
    const [expiresAt, setExpiresAt] = useState<string>("");

    useEffect(() => {
        if (items.length > 0 || isLoading || isError) return;
        fetchItems(storage.id);
    }, [storage.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addProduct) return;
        addItem(storage.id, {
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
        return <div>Error loading items.</div>;
    }

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Items</h2>
                <p className="text-gray-600">Manage items in this storage.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="form-control w-full flex flex-row items-center">
                    <div className="inline-grid *:[grid-area:1/1] ">
                        <div className={`status ${addProduct ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                        <div className={`status ${addProduct ? 'status-success' : 'status-error'} me-2`}></div>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold me-2">Select a product</span>
                    </label>
                    <input
                        type="text"
                        maxLength={40}
                        name="name"
                        placeholder="e.g., user@example.com"
                        className="input input-bordered mr-2"
                        value={addProduct?.name || ""}
                        onChange={(e) => {
                            const product = products.find(p => p.name === e.target.value);
                            setAddProduct(product || null);
                        }}
                        required
                    />


                    <div className="inline-grid *:[grid-area:1/1] ">
                        <div className={`status ${expiresAt ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                        <div className={`status ${expiresAt ? 'status-success' : 'status-error'} me-2`}></div>
                    </div>
                    <label className="label">
                        <span className="label-text font-semibold me-2">Expires At</span>
                    </label>
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
                    <button
                        type="submit"
                        disabled={!addProduct || !expiresAt}
                        className={`btn flex-1 ${addProduct && expiresAt ? 'btn-info' : 'btn-disabled'}`}
                    >
                        Add Item
                    </button>
                </div>
            </form>
            <div className="overflow-x-auto mt-8 rounded-box border border-base-content/5 bg-base-100">
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