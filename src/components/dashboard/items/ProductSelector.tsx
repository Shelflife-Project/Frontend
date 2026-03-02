import { useState } from "react";
import type { Product } from "shelflife-react-hooks";

type Props = {
    products: Product[],
    productId: number,
    onSelect: (id: number) => void
}

export default function ProductSelector({ products, productId, onSelect }: Props) {
    const [productFilter, setProductFilter] = useState<string>("");

    return (
        <div>
            <div className="w-full flex flex-row items-center">
                <div className="inline-grid *:[grid-area:1/1] ">
                    <div className={`status ${productId > 0 ? 'status-success' : 'status-error'} animate-ping me-2`}></div>
                    <div className={`status ${productId > 0 ? 'status-success' : 'status-error'} me-2`}></div>
                </div>
                <label className="label">
                    <span className="label-text font-semibold me-2">Select Product</span>
                </label>
            </div>

            <div className="form-control">
                <input
                    type="text"
                    maxLength={100}
                    name="productSearch"
                    placeholder="Search..."
                    className="input input-bordered w-full mr-2"
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                />
            </div>

            <div className="max-h-36 w-full overflow-y-auto p-2">
                {products
                    .filter(p => productFilter.trim() === '' ? true : p.name.toLowerCase().includes(productFilter.toLowerCase()))
                    .filter(p => productId === 0 ? p : p.id === productId)
                    .map(p => (
                        <div key={p.id} className="flex items-center justify-between py-1">
                            <div className="truncate">{p.name}</div>
                            <button
                                type="button"
                                className={`btn btn-sm ms-2 ${productId === p.id ? 'btn-error' : 'btn-success'}`}
                                onClick={() => onSelect(p.id)}
                            >
                                {productId === p.id ? 'Deselect' : 'Select'}
                            </button>
                        </div>
                    ))}
                {products.filter(p => productFilter.trim() === '' ? true : p.name.toLowerCase().includes(productFilter.toLowerCase())).length === 0 && (
                    <div className="text-sm text-gray-500">No products match your search.</div>
                )}
            </div>
        </div>
    );
}