import { toast } from "react-toastify"
import { useShoppingList, type ShoppingListItem } from "shelflife-react-hooks"
import EditShoppingItemForm from "./EditShoppingItemForm"
import FormPopUp from "../../FormPopUp"

type Props = {
    item: ShoppingListItem
}

export default function ShoppingCard({ item }: Props) {
    const { deleteItem, createStorageItemsWithShoppingListItem } = useShoppingList()

    const onDelete = async (item: ShoppingListItem) => {
        const confirmDelete = confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            await deleteItem(item.storage.id, item.id);

            toast.success("Item successfully removed")
        }
    }

    const onChecked = async (item: ShoppingListItem) => {
        const confirmAdd = confirm(`Are you sure you want to add this item to ${item.storage.name}? This will remove this item and add ${item.amountToBuy} to ${item.storage.name}`);
        if (confirmAdd) {
            await createStorageItemsWithShoppingListItem(item.storage.id, item.id);

            toast.success(`Item successfully added to ${item.storage.name}`)
        }
    }

    return (
        <div
            key={item.id}
            className="flex items-center justify-between bg-success/10 px-4 py-3 gap-2 rounded-xl shadow-sm min-w-32"
        >
            <img className="size-10 rounded-box" src={`${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${item.product.id}/icon/small`} />
            <div>
                <p>{item.product.name}</p>
                <div className="text-xs uppercase font-semibold opacity-60">Amount to buy in {item.storage.name}: {item.amountToBuy}</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={() => onChecked(item)}
                    className="btn btn-success"
                >
                    <svg className="min-w-16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                    </svg>
                </button>

                <FormPopUp
                    button={
                        <button className="btn btn-primary">
                            <svg className="min-w-16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                    }
                >
                    <EditShoppingItemForm item={item} />
                </FormPopUp>

                <button
                    onClick={() => onDelete(item)}
                    className="btn btn-error"
                >
                    <svg className="min-w-16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}