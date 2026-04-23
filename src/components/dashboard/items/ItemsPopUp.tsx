import { useState } from "react";
import { toast } from "react-toastify";
import { useProducts, useStorageItems, type AddItemError, type Storage } from "shelflife-react-hooks";
import ProductSelector from "../../ProductSelector";

type Props = {
    storage: Storage
}

export default function ItemsPopUp({ storage }: Props) {
    const { addItem } = useStorageItems();
    const { products } = useProducts();

    const [selectedProductId, setSelectedProductId] = useState<number>(0);
    const [expiresAt, setExpiresAt] = useState<string>("");

    const onSelectProduct = async (productId: number) => {
        setSelectedProductId(productId);
        if (productId === 0)
            return;

        const p = products.find(x => x.id === productId);
        if (!p)
            return;

        const calc = new Date();
        calc.setDate(calc.getDate() + p?.expirationDaysDelta!);
        setExpiresAt(calc.toISOString().split('T')[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProductId <= 0) return;

        try {
            await addItem(storage.id, {
                productId: selectedProductId,
                expiresAt: expiresAt,
            });

            setSelectedProductId(0);
            setExpiresAt("");
            toast.success("Item added successfully");
        } catch (err: any) {
            const itemErr = err as AddItemError;

            if (itemErr) {
                if (itemErr.productId)
                    toast.error(`Product: ${itemErr.productId}`);
                else
                    toast.error(`Expires at: ${itemErr.expiresAt}`);
            }
            else
                toast.error("An error occured while adding the item");
        }
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-bold">Add item to {storage.name}</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <ProductSelector onSelect={(id: number) => onSelectProduct(id)} selectedProductId={selectedProductId} />

                <div className="form-control mt-4">
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
                        className="input w-full input-bordered mr-2"
                        value={expiresAt}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-full mt-5" disabled={selectedProductId === 0 || expiresAt === null}>Add Item</button>
            </form>
        </>

    )
}