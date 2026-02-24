import { useEffect, useRef } from "react";
import { useAuth, useShoppingList, useToPurchase } from "shelflife-react-hooks";

type Prop = {

}

export default function ShoppingList({ }: Prop) {
    const { fetchAggregated, items, isLoading, isError} = useToPurchase();
   

    useEffect(() => {
        if (items.length > 0 || isLoading || isError) return; 
        
        fetchAggregated();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading shopping list.</div>;
    }

    return (
        <ul className="list bg-base-300 rounded-box shadow-md">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Items to buy</li>


            {items.map((item) => (
                <li key={item.productId} className="list-row">
                    <div>
                        <div>{item.productName}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{item.amountToBuy}</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                    </button> 
                </li>
            ))}
        </ul>
    );
}