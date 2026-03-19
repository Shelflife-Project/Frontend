import { useEffect } from "react";
import { useShoppingList } from "shelflife-react-hooks";
import ShoppingCard from "./ShoppingCard";

export default function ShoppingListTable() {
    const { fetchAggregated, items } = useShoppingList()

    useEffect(() => {
        fetchAggregated();
    }, [])

    return (
        <>
            {
                items.length === 0 && (
                    <p className="text-gray-400 text-center">
                        Your list is empty
                    </p>
                )
            }
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => <ShoppingCard key={item.id} item={item} />)}
            </div>
        </>
    );
}