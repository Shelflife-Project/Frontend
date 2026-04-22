import { useEffect, useLayoutEffect, useState } from "react";
import type { PaginatedResponse } from "shelflife-react-hooks"

type Props = {
    onChange: (search: string, page: number, size: number) => Promise<PaginatedResponse<any>>;
    contextData: any[];
}

export default function Paginator({ onChange, contextData }: Props) {
    const [data, setData] = useState<PaginatedResponse<any>>({ currentPage: 0, data: [], hasNext: false, hasPrevious: false, pageSize: 0, totalItems: 0, totalPages: 0 });
    const [scheduledByThis, setScheduledByThis] = useState(true);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pages, setPages] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const change = async () => {
        setScheduledByThis(true);
        setIsLoading(true);
        const res = await onChange(search, page, pageSize);

        if (res.data.length === 0 && res.currentPage !== 0) {
            setPage(0);
            return;
        }

        setData(res);
        setIsLoading(false);
    }

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage((p) => p - 1);
    };

    const getPages = (currentPage: number, totalPages: number, pagesShown: number) => {
        const arr: number[] = [];

        let i = currentPage;
        i += Math.floor(pagesShown / 2);
        i = i > totalPages ? totalPages : i;

        i -= pagesShown - 1;

        if (i < 1)
            i = 1;

        while (arr.length != pagesShown && arr.length != totalPages) {
            arr.push(i++);
        }

        return arr;
    }

    useEffect(() => {
        if (isLoading)
            return;

        if (scheduledByThis) {
            setScheduledByThis(false);
            return;
        }

        if (data.data.length != contextData.length) {
            change();
        }
    }, [contextData]);

    useLayoutEffect(() => {
        change();
    }, [search, page, pageSize]);

    useLayoutEffect(() => {
        setPages(getPages(data.currentPage + 1, data.totalPages, 5));
    }, [data]);

    return <div className="text-left space-y-4">
        <div>
            <input
                className="input input-bordered w-full sm:w-64"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                }}
            />
        </div>

        <div className="sm:flex">
            <div className="flex gap-3 mb-4">
                <label htmlFor="pageSize" className="text-sm font-medium">
                    Items<br />per page:
                </label>
                <select
                    id="pageSize"
                    className="select select-bordered w-min"
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(0);
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                <button
                    className="btn btn-sm sm:btn-md btn-ghost flex-shrink-0"
                    onClick={() => setPage(0)}
                    disabled={data.currentPage === 0}
                    title="Go to first page">
                    {"<<"}
                </button>
                <button
                    onClick={prevPage}
                    disabled={!data.hasPrevious || isLoading}
                    className="btn btn-sm sm:btn-md btn-ghost flex-shrink-0"
                    title="Previous page">
                    {"<"}
                </button>

                <div className="flex flex-wrap gap-1">
                    {
                        pages.map((i) =>
                            <button
                                key={i}
                                onClick={() => setPage(i - 1)}
                                className={`btn btn-sm sm:btn-md flex-shrink-0 ${i === data.currentPage + 1 ? "btn-primary" : "btn-ghost"}`}
                                title={`Go to page ${i}`}>
                                {i}
                            </button>
                        )
                    }
                </div>

                <button
                    className="btn btn-sm sm:btn-md btn-ghost flex-shrink-0"
                    onClick={nextPage}
                    disabled={!data.hasNext || isLoading}
                    title="Next page">
                    {">"}
                </button>
                <button
                    className="btn btn-sm sm:btn-md btn-ghost flex-shrink-0"
                    onClick={() => setPage(data.totalPages - 1)}
                    disabled={data.currentPage + 1 === data.totalPages}
                    title="Go to last page">
                    {">>"}
                </button>
            </div>
        </div>

        <div className="text-xs md:text-sm text-gray-500">
            Page {data.currentPage + 1} of {data.totalPages} • {data.totalItems} total items
        </div>
    </div>
}