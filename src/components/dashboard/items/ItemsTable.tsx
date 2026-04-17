import { useEffect, useState } from "react";
import { useStorageItems, type Storage, type StorageItem } from "shelflife-react-hooks";
import ItemCard from "./ItemCard";
import FormPopUp from "../../FormPopUp";
import ItemsPopUp from "./ItemsPopUp";
import { CreateButtonCard } from "../CreateButton";
import EmptyList from "../../EmptyList";

type Props = {
    storage: Storage;
};

export default function ItemsTable({ storage }: Props) {
    const { items, fetchItems } = useStorageItems();
    const [itemsTable, setItemsTable] = useState<Map<number, StorageItem[]>>(new Map<number, StorageItem[]>());
    const [isLoading, setIsLoading] = useState(true);

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

    const getItems = async () => {
        setIsLoading(true);
        await fetchItems(storage.id);
        setIsLoading(false);
    }

    useEffect(() => {
        groupItems();
    }, [items])

    useEffect(() => {
        getItems();
    }, [storage]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    return (
        <>
            {
                [...itemsTable].length === 0 && <EmptyList />
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                <FormPopUp button={<CreateButtonCard text="Add Item" />}>
                    <ItemsPopUp storage={storage} />
                </FormPopUp>

                {[...itemsTable]
                    .sort(([a], [b]) => a - b)
                    .map(([productId, group]) => (
                        <ItemCard key={productId} items={group} />
                    ))}
            </div>
        </>
    );
}