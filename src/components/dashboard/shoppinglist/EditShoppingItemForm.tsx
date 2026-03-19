import { useState } from "react";
import { toast } from "react-toastify";
import { type EditShoppingItemError, type ShoppingListItem, useShoppingList } from "shelflife-react-hooks";

type Props = {
    item: ShoppingListItem
}

export default function EditShoppingItemForm({ item }: Props) {
    const { editItem } = useShoppingList();
    const [amount, setAmount] = useState<number>(item.amountToBuy);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            editItem(item.storage.id, item.id, { amountToBuy: amount })
        } catch (err: any) {
            const error = err as EditShoppingItemError;

            if (error && error.amountToBuy) {
                toast.error(error.amountToBuy);
                return;
            }
        }

        toast.success("Changes successfully saved")

    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit {item.product.name} item</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <label className="label">
                            <span className="label-text font-semibold me-2">Amount to buy</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        className="input w-full input-bordered mr-2"
                        value={amount}
                        min={1}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={amount === item.amountToBuy} className="btn btn-primary w-full">Save Changes</button>
                </div>
            </form>
        </div>
    );
}