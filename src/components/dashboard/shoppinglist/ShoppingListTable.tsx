import { useEffect } from "react";
import { useShoppingList } from "shelflife-react-hooks";

export default function ShoppingListTable() {
    const { fetchAggregated, items, deleteItem } = useShoppingList()

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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-xl shadow-sm min-w-32"
                    >
                        <div>
                            <p>{item.product.name}</p>
                            <p className="text-xs text-green-600">
                                {item.product.category}
                            </p>
                            <p className="text-xs">
                                Amount to buy: {item.amountToBuy}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => { }}
                                className="btn btn-success"
                            >
                                S
                            </button>
                            <button
                                onClick={() => deleteItem(item.storage.id, item.id)}
                                className="btn btn-error"
                            >
                                R
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}