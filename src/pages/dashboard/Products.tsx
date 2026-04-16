import BetterLottie from "../../components/BetterLottie";
import ProductTable from "../../components/dashboard/products/ProductTable";
import Grocery from "../../assets/lotties/Grocery.json";

export default function Products() {
    return (
        <div className="p-8 relative">
            <div className="mb-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Product Database</h1>
                    <p className="text-gray-600">View and manage products here.</p>
                </div>

                <div className="hidden sm:flex absolute top-0 right-0 w-48">
                    <BetterLottie animationData={Grocery} />
                </div>
            </div>

            <ProductTable />
        </div>
    )
}
