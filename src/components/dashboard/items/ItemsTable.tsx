import { useEffect, useState } from "react";
import { useStorageItems, type Storage, type StorageItem } from "shelflife-react-hooks";
import ItemCard from "./ItemCard";
import FormPopUp from "../../FormPopUp";
import ItemsPopUp from "./ItemsPopUp";

type Props = {
    storage: Storage;
};

export default function ItemsTable({ storage }: Props) {
    const { items, fetchItems } = useStorageItems();
    const [itemsTable, setItemsTable] = useState<Map<number, StorageItem[]>>(new Map<number, StorageItem[]>());

    const groupItems = async () => {
        let table = new Map<number, StorageItem[]>();

        items.forEach((x) => {
            if (table.has(x.product.id)) {
                let list = table.get(x.product.id)!;

                list.push(x);
                table.set(x.product.id, list);
            }
            else {
                table.set(x.product.id, [x]);
            }
        })

        setItemsTable(table);
    };

    useEffect(() => {
        groupItems();
    }, [items])

    useEffect(() => {
        fetchItems(storage.id);
    }, [storage]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <FormPopUp button={
                <button className="card bg-base-200 border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-300 transition cursor-pointer flex items-center justify-center h-full min-h-[220px]">
                    <div className="text-center">
                        <div className="text-4xl mb-2">+</div>
                        <p className="text-sm opacity-70">Add Item</p>
                    </div>
                </button>
            }>
                <ItemsPopUp storage={storage} />
            </FormPopUp>

            {[...itemsTable]
                .sort(([a], [b]) => a - b)
                .map(([productId, group]) => (
                    <ItemCard key={productId} items={group} />
                ))}
        </div>
    );
}