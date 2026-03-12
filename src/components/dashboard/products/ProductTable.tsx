import { useEffect, useState } from "react";
import { useProducts, type Product } from "shelflife-react-hooks";
import ProductCard from "./ProductCard";

export default function ProductTable() {
    const { products, fetchProducts } = useProducts();

    const [nextProducts, setNextProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const getProducts = async () => {
        const next = await fetchProducts(search, pageSize, page + 1);
        setNextProducts(next);

        fetchProducts(search, pageSize, page);
    };

    useEffect(() => {
        getProducts();
    }, [search, page, pageSize]);

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage((p) => p - 1);
    };

    return (
        <>
            <input
                className="input input-bordered mb-4"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
            />

            {products.length === 0 && (
                <p className="text-center text-gray-400">
                    No products created yet. Click the + button to create one!
                </p>
            )}

            {products.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6 mx-auto justify-items-center">
                        {
                            products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))
                        }
                    </div>
                </>
            )}

            <div className="flex items-center gap-2">
                <select className="select w-min" onChange={e => {setPageSize(Number(e.target.value)); setPage(0)}}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>

                <button
                    className="btn btn-primary"
                    onClick={prevPage}
                    disabled={page === 0}
                >
                    Previous
                </button>

                <p className="text-center">
                    Page {page + 1}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={nextProducts.length <= 0}
                >
                    Next
                </button>
            </div>
        </>
    );
}