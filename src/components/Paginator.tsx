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

    return <div className="text-left">
        <input
            className="input input-bordered mb-4"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
            }}
        />

        <div className="flex items-center gap-4 mb-4">
            <p className="text-xs">Show items: </p>
            <select
                className="select w-min"
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

            <div className="join">
                <button
                    onClick={prevPage}
                    disabled={!data.hasPrevious || isLoading}
                    className="join-item btn btn-ghost">
                    {"<"}
                </button>

                {
                    pages.map((i) =>
                        <button
                            key={i}
                            onClick={() => setPage(i - 1)}
                            className={`join-item btn ${i === data.currentPage + 1 ? "btn-primary" : "btn-ghost"}`}>
                            {i}
                        </button>
                    )
                }

                <button
                    className="join-item btn btn-ghost"
                    onClick={nextPage}
                    disabled={!data.hasNext || isLoading}>
                    {">"}
                </button>
            </div>
        </div>
    </div>
}