import ProductTable from "../../components/dashboard/products/ProductTable";

export default function Products() {
    return (
        <div className="mx-auto p-8 mb-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Database</h1>
                <p className="text-gray-600">View and manage products here.</p>
            </div>
            <ProductTable />
        </div>
    )
}
