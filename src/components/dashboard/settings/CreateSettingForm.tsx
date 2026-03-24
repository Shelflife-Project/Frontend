import { useEffect, useState } from "react";
import { useProducts, useRunningLow, type Product } from "shelflife-react-hooks";
import ProductSelector from "../items/ProductSelector";
import { toast } from "react-toastify";

type Props = {
    storageId: number
}

export default function CreateSettingForm({ storageId }: Props) {
    const { fetchSettings, createSetting, isLoading } = useRunningLow();
    const { fetchProducts, isLoading: productsLoading } = useProducts();

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [addProduct, setAddProduct] = useState<number>(0);
    const [runsLowAt, setRunsLowAt] = useState<number>(0);

    const getProductsWithoutSetting = async () => {
        const settings = await fetchSettings(storageId);
        const products = await fetchProducts();

        const filtered = products.data.filter((p) => !settings.find((s) => s.product.id === p.id))

        setFilteredProducts(filtered);
    };

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
                runningLow: runsLowAt,
            });

            setAddProduct(0);
            setRunsLowAt(0);

            toast.success("Rule added successfully")
        } catch (err: any) {
            toast.error("An error occured while adding rule");
        }

    }

    useEffect(() => {
        getProductsWithoutSetting();
    }, [storageId]);

    if (isLoading || productsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-bold">Add Rule</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <ProductSelector products={filteredProducts} productId={addProduct} onSelect={(id: number) => onSelectProduct(id)} />

                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <label className="label">
                            <span className="label-text font-semibold me-2">Runs low at</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        maxLength={40}
                        className="input w-full input-bordered mr-2"
                        value={runsLowAt}
                        min={0}
                        onChange={(e) => setRunsLowAt(Number(e.target.value))}
                        required
                    />
                </div>

                <button className="btn btn-primary w-full mt-5">Create Rule</button>
            </form>
        </>

    )
}