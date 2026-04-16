import { useProducts } from "shelflife-react-hooks";
import ProductCard from "./ProductCard";
import Paginator from "../../Paginator";
import { CreateButtonCard } from "../CreateButton";
import FormPopUp from "../../FormPopUp";
import CreateProductForm from "./CreateProductForm";

export default function ProductTable() {
    const { products, fetchProducts, isLoading } = useProducts();

    const handleOnChange = (search: string, page: number, size: number) => {
        return fetchProducts(search, size, page);
    }

    return (
        <>
            <p className="text-xs opacity-60 mb-1">Search by name, category or barcode</p>
            <Paginator onChange={handleOnChange} contextData={products} />

            {
                isLoading &&
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            }

            {!isLoading && products.length === 0 && (
                <p className="text-center text-gray-400">
                    No products created yet. Click the + button to create one!
                </p>
            )}

            {!isLoading && products.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6 mb-6 mx-auto justify-items-center">
                        <FormPopUp button={<CreateButtonCard text="Create Product" />} >
                            <CreateProductForm />
                        </FormPopUp>
                        {
                            products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))
                        }
                    </div>
                </>
            )}
        </>
    );
}