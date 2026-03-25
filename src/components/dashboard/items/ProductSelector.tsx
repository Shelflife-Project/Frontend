import { useEffect, useState } from "react";
import { useProducts, type Product } from "shelflife-react-hooks";

type Props = {
    predicate?: (value: Product, index: number, array: Product[]) => unknown
    selectedProductId: number
    onSelect: (id: number) => void
}

export default function ProductSelector({ predicate, selectedProductId, onSelect }: Props) {
    const { fetchProducts } = useProducts();
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);

    const searchProduct = async () => {
        onSelect(0);

        const res = await fetchProducts(search, 10, 0);

        if (predicate)
            setProducts(res.data.filter(predicate));
        else
            setProducts(res.data);
    }

    useEffect(() => {
        searchProduct();
    }, [search, predicate]);

    return (
        <div>
            <div className="w-full flex flex-row items-center">
                <div className="inline-grid *:[grid-area:1/1] ">
                    <div className={`status ${selectedProductId !== 0 ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                    <div className={`status ${selectedProductId !== 0 ? 'status-success' : 'status-error'} me-2`}></div>
                </div>
                <label className="label">
                    <span className="label-text font-semibold me-2">Product</span>
                </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Search product..."
                    className="input w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={selectedProductId}
                    onChange={(e) => onSelect(Number(e.target.value))}
                    className="select w-full">

                    <option disabled value="0">Select product</option>

                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}

                    {products.length === 0 && (
                        <option disabled>No products match your search</option>
                    )}
                </select>
            </div>

        </div>
    );
}