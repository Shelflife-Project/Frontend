import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProducts, useStorageItems, type Storage } from "shelflife-react-hooks";
import ProductSelector from "./ProductSelector";

type Props = {
    storage: Storage
}

export default function ItemsPopUp({ storage }: Props) {
    const { fetchItems, isError, isLoading, addItem } = useStorageItems();
    const { products, fetchProducts, isError: productsError, isLoading: productsLoading } = useProducts();

    const [addProduct, setAddProduct] = useState<number>(0);
    const [expiresAt, setExpiresAt] = useState<string>("");

    useEffect(() => {
        if (isLoading || isError) return;
        fetchItems(storage.id);
        if (productsLoading || productsError) return;
        fetchProducts();
    }, [storage.id]);

    const onSelectProduct = (productId: number) => {
        if (addProduct !== productId) {
            const selectedProduct = products.find((product) => product.id === productId);
            const calc = new Date();
            calc.setDate(calc.getDate() + selectedProduct?.expirationDaysDelta!);
            setExpiresAt(calc.toISOString().split('T')[0]);
            setAddProduct(productId);
        }
        else {
            setExpiresAt("");
            setAddProduct(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addProduct) return;

        await addItem(storage.id, {
            productId: addProduct,
            expiresAt: expiresAt,
        });

        setAddProduct(0);
        setExpiresAt("");
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
                <h2 className="text-xl font-bold">Add item</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <ProductSelector products={products} productId={addProduct} onSelect={(id: number) => onSelectProduct(id)} />

                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <div className="inline-grid *:[grid-area:1/1] ">
                            <div className={`status ${expiresAt ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                            <div className={`status ${expiresAt ? 'status-success' : 'status-error'} me-2`}></div>
                        </div>
                        <label className="label">
                            <span className="label-text font-semibold me-2">Expires At</span>
                        </label>
                    </div>
                    <input
                        type="date"
                        maxLength={40}
                        className="input w-full input-bordered mr-2"
                        value={expiresAt}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-full mt-5">Add Item</button>
            </form>
        </>

    )
}