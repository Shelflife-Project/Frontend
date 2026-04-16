import BetterLottie from "../../components/BetterLottie";
import ShoppingListTable from "../../components/dashboard/shoppinglist/ShoppingListTable";
import ShoppingCart from "../../assets/lotties/shopping cart.json"

export default function ShoppingList() {
    return (
        <div className="p-8 relative">
            <div className="mb-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
                </div>

                <div className="hidden sm:flex absolute top-0 right-0 w-32">
                    <BetterLottie animationData={ShoppingCart} />
                </div>
            </div>

            <ShoppingListTable />
        </div>
    )
}
