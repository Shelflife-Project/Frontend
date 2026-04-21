import { useEffect, useState } from "react";
import { useShoppingList } from "shelflife-react-hooks";
import ShoppingCard from "./ShoppingCard";
import { CreateButtonCard } from "../CreateButton";
import FormPopUp from "../../FormPopUp";
import CreateShoppingListItemForm from "./CreateShoppingListItemForm";
import EmptyList from "../../EmptyList";

export default function ShoppingListTable() {
    const { fetchAggregated, items } = useShoppingList()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getItems = async () => {
        setIsLoading(true);
        await fetchAggregated();
        setIsLoading(false);
    }

    useEffect(() => {
        getItems();
    }, [])

    if (isLoading)
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    return (
        <>
            {
                items.length === 0 && <EmptyList title="Your Shopping List is empty" description="Start by adding something to it" />
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