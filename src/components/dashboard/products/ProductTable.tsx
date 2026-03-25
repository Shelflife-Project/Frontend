import { useProducts } from "shelflife-react-hooks";
import ProductCard from "./ProductCard";
import Paginator from "../../Paginator";
import { CreateButtonCard } from "../CreateButton";
import FormPopUp from "../../FormPopUp";
import CreateProductForm from "./CreateProductForm";

export default function ProductTable() {
    const { products, fetchProducts } = useProducts();

    const handleOnChange = (search: string, page: number, size: number) => {
        return fetchProducts(search, size, page);
    }

    return (
        <>
            <Paginator onChange={handleOnChange} />

            {products.length === 0 && (
                <p className="text-center text-gray-400">
                    No products created yet. Click the + button to create one!
                </p>
            )}

            {products.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6 mx-auto justify-items-center">
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