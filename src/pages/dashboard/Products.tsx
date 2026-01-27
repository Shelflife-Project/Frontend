import ProductTable from "../../components/dashboard/products/ProductTable";
import CreateProductForm from "../../components/dashboard/products/CreateProductForm";

export default function Products() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Products</h1>
                <p className="text-gray-600">View and manage your products here.</p>
            </div>
            <ProductTable />
            <CreateProductForm />
        </div>
    )
}
