import { useEffect } from "react";
import { useShoppingList } from "shelflife-react-hooks";
import ShoppingCard from "./ShoppingCard";
import { CreateButtonCard } from "../CreateButton";
import FormPopUp from "../../FormPopUp";
import CreateShoppingListItemForm from "./CreateShoppingListItemForm";
import EmptyList from "../../EmptyList";

export default function ShoppingListTable() {
    const { fetchAggregated, items } = useShoppingList()

    useEffect(() => {
        fetchAggregated();
    }, [])

    return (
        <>
            {
                items.length === 0 && <EmptyList />
            }
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <FormPopUp button={<CreateButtonCard text="Add Item" />} >
                    <CreateShoppingListItemForm />
                </FormPopUp>
                {items.map((item) => <ShoppingCard key={item.id} item={item} />)}
            </div>
        </>
    );
}