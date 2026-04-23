import { useLayoutEffect, useState } from "react";
import { useProducts, type Product } from "shelflife-react-hooks";

type Props = {
    predicate?: (value: Product, index: number, array: Product[]) => unknown
    selectedProductId: number
    onSelect: (id: number) => void
}

export default function ProductSelector({ predicate, selectedProductId, onSelect }: Props) {
    const { fetchProducts, isLoading } = useProducts();

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    const searchProducts = async () => {
        const res = await fetchProducts(search, 10, 0);
        let filtered = res.data;

        if (predicate)
            filtered = res.data.filter(predicate);

        setProducts(filtered);
    }

    useLayoutEffect(() => {
        searchProducts();
    }, [search, predicate]);

    return (
        <div className="dropdown w-full">
            <div className="w-full flex flex-row items-center">
                <div className="inline-grid *:[grid-area:1/1] ">
                    <div className={`status ${selectedProductId !== 0 ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                    <div className={`status ${selectedProductId !== 0 ? 'status-success' : 'status-error'} me-2`}></div>
                </div>
                <label className="label">
                    <span className="label-text font-semibold me-2">Product</span>
                </label>
            </div>
            <input
                tabIndex={0}
                type="text"
                className="input input-bordered w-full"
                placeholder="Search product..."
                value={search}
                onChange={(e) => {
                    const value = e.target.value || "";
                    setSearch(value);
                    onSelect(0);
                }}
            />

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box w-full mt-1 shadow max-h-60 overflow-y-auto"
            >
                {isLoading && (
                    <li className="p-2 text-sm">
                        <span className="loading loading-spinner loading-sm"></span>
                        Loading...
                    </li>
                )}

                {!isLoading && products.map((p) => (
                    <li key={p.id}>
                        <button
                            type="button"
                            onClick={() => {
                                onSelect(p.id);
                                setSearch(p.name);
                                document.activeElement instanceof HTMLElement && document.activeElement.blur();
                            }}
                        >
                            {p.name}
                        </button>
                    </li>
                ))}

                {!isLoading && products.length === 0 && (
                    <li className="p-2 text-sm text-base-content/60">No results</li>
                )}
            </ul>
        </div>
    );
}