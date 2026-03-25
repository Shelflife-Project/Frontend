import ShoppingListTable from "../../components/dashboard/shoppinglist/ShoppingListTable";

export default function ShoppingList() {
    return (
        <div className="mx-auto p-8 mb-8">
            <h1 className="text-center text-3xl font-bold text-green-700 mb-2">
                Shopping List
            </h1>

            <ShoppingListTable />
        </div>
    )
}
