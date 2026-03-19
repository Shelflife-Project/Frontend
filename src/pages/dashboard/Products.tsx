import ProductTable from "../../components/dashboard/products/ProductTable";
import CreateProductForm from "../../components/dashboard/products/CreateProductForm";
import { CreateButtonWithOutClick } from "../../components/dashboard/CreateButton";
import FormPopUp from "../../components/FormPopUp";

export default function Products() {
    return (
        <div className="mx-auto p-8 mb-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Products</h1>
                <p className="text-gray-600">View and manage your products here.</p>
            </div>
            <ProductTable />
            <FormPopUp button={<CreateButtonWithOutClick />} >
                <CreateProductForm />
            </FormPopUp>
        </div>
    )
}
