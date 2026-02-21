import { useEffect, useState } from "react";
import { useProducts, useStorageItems } from "shelflife-react-hooks";


type Props = {
    storageId: number;
}

export default function CreateStorageItemsForm({ storageId }: Props) {

    const { products, fetchProducts } = useProducts();
    const { addItem } = useStorageItems();


    useEffect(() => {
        fetchProducts();
    }, []);



    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [expirationDate, setExpirationDate] = useState<string>("");

    const onSelectProduct = (e: React.FormEvent<HTMLSelectElement>) => {
        const productId = parseInt(e.currentTarget.value);
        const selectedProduct = products.find((product) => product.id === productId);
        const calc = new Date();
        calc.setDate(calc.getDate() + selectedProduct?.expirationDaysDelta!);
        setExpirationDate(calc.toISOString().split('T')[0]);
        setSelectedProduct(productId);
    };


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProduct && expirationDate) {
            addItem(storageId, {productId: selectedProduct, expiresAt: expirationDate});
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create Storage Item</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Products</legend>
                    <select value={selectedProduct? selectedProduct : "Pick a product"} className="select" onChange={onSelectProduct}>
                        <option disabled={true}>Pick a product</option>
                        {
                            products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))
                        }
                    </select>
                </fieldset>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input type="date" className="input input-bordered w-full" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Create Item</button>
                </div>
            </form>
        </div>
    );

}