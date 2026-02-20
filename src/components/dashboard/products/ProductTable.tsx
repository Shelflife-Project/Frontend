import { useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type Row, type SortingState } from "@tanstack/react-table";
import { useAuth, useProducts, type Product } from "shelflife-react-hooks";


export default function ProductTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const { user } = useAuth();
    const { products, fetchProducts, deleteProduct } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [])

    const deleteProductHandler = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    const columns = useMemo<ColumnDef<Product>[] | any>(() => [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "barcode",
            header: "Barcode",
        },
        {
            accessorKey: "expirationDaysDelta",
            header: "Expires In (Days)"
        },
        {
            header: "Actions",
            enableSorting: false,
            enableGlobalFilter: false,
            cell: ({ row }: { row: Row<Product> }) => {
                const product = row.original;
                if (product.ownerId === user?.id)
                    return (
                        <div className="grid grid-cols-2 gap-2 min-w-max">
                            <button className="btn btn-sm btn-primary">Edit</button>
                            <button className="btn btn-sm btn-error" onClick={() => deleteProductHandler(row.original.id)}>
                                Delete
                            </button>
                        </div>
                    );

                return null;
            },
        }
    ], [])

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        state: { sorting, globalFilter },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <>
            <input type="text" onChange={e => table.setGlobalFilter(e.target.value)} className="input input-bordered mb-2 w-fit" placeholder="Search" />

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-2">
                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                                        <div className="space-x-2">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() === "asc" && "↑"}
                                            {header.column.getIsSorted() === "desc" && "↓"}
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

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="btn btn-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <p className="text-sm select-none">
                        {"Page " + (table.getState().pagination.pageIndex + 1) + " of " + table.getPageCount()}
                    </p>
                </div>

                <select
                    className="select select-sm w-fit"
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50, 100].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}