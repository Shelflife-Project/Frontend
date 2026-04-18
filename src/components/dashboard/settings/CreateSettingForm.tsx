import { useEffect, useState } from "react";
import { useRunningLow } from "shelflife-react-hooks";
import ProductSelector from "../items/ProductSelector";
import { toast } from "react-toastify";

type Props = {
    storageId: number
}

export default function CreateSettingForm({ storageId }: Props) {
    const { fetchSettings, createSetting, settings } = useRunningLow();

    const [addProduct, setAddProduct] = useState<number>(0);
    const [runsLowAt, setRunsLowAt] = useState<number>(1);

    const onSelectProduct = (productId: number) => {
        if (addProduct === 0) setAddProduct(productId);
        else setAddProduct(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addProduct) return;

        try {
            await createSetting(storageId, {
                productId: addProduct,
                runningLow: runsLowAt - 1,
            });

            setAddProduct(0);
            setRunsLowAt(0);

            toast.success("Rule added successfully")
        } catch (err: any) {
            toast.error("An error occured while adding rule");
        }

    }

    useEffect(() => {
        fetchSettings(storageId);
    }, [storageId]);

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-bold">Add Rule</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <ProductSelector selectedProductId={addProduct} onSelect={(id: number) => onSelectProduct(id)} predicate={(p) => !settings.find((s) => s.product.id === p.id)} />

                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <label className="label">
                            <span className="label-text font-semibold me-2">Runs low at</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        className="input w-full input-bordered mr-2"
                        value={runsLowAt}
                        min={1}
                        onChange={(e) => setRunsLowAt(Number(e.target.value))}
                        required
                    />
                </div>

                <button className="btn btn-primary w-full mt-5" disabled={addProduct === 0}>Create Rule</button>
            </form>
        </>

    )
}