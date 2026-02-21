import { flexRender, getCoreRowModel, useReactTable, type Row } from "@tanstack/react-table";
import { useEffect } from "react";
import { useStorageItems, type StorageItem } from "shelflife-react-hooks";

type Props = {
    storageId: number;
}

export default function ItemsTable({ storageId }: Props) {
    const { items, fetchItems, deleteItem } = useStorageItems();

    const deleteItemHandler = async (item_id: number) => {
        const confirmDelete = confirm("Are you sure you want to remove this item?");
        if (confirmDelete) {
            await deleteItem(storageId, item_id);
            fetchItems(storageId);
        }
    };

    useEffect(() => {
        fetchItems(storageId);
    }, [storageId]);


    const columns = [
        {
            header: 'Product',
            accessorKey: 'product.name',
        },
        {
            header: 'Expiration Date',
            cell: ({ row }: { row: Row<StorageItem> }) => {
                const date = row.original.expiresAt;
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric' });
            },
        },
        {
            header: "Actions",
            enableSorting: false,
            enableGlobalFilter: false,
            cell: ({ row }: { row: Row<StorageItem> }) => {
                const item = row.original;
                return (
                    <div className="grid grid-cols-2 gap-2 min-w-max">
                        <button className="btn btn-sm btn-primary">Edit</button>
                        <button className="btn btn-sm btn-error" onClick={() => deleteItemHandler(item.id)}>
                            Delete
                        </button>
                    </div>
                );
            },
        }
    ]

    const table = useReactTable({
        columns,
        data: items,
        getCoreRowModel: getCoreRowModel()
    });


    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-2">
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    <div className="space-x-2">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}