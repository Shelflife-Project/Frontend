import { useEffect, useState } from "react";
import type { PaginatedResponse } from "shelflife-react-hooks"

type IdAble = {
    id: number;
};

type Props = {
    onChange: (search: string, page: number, size: number) => Promise<PaginatedResponse<IdAble>>;
    contextData: IdAble[];
}

export default function Paginator({ onChange, contextData }: Props) {
    const [data, setData] = useState<PaginatedResponse<IdAble>>({ currentPage: 0, data: [], hasNext: false, hasPrevious: false, pageSize: 0, totalItems: 0, totalPages: 0 });

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [isLoading, setIsLoading] = useState(false);

    const change = async () => {
        setIsLoading(true);
        const res = await onChange(search, page, pageSize);

        if (res.data.length === 0 && res.currentPage !== 0) {
            setPage(0);
            return;
        }

        setIsLoading(false);
        setData(res);
    }

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage((p) => p - 1);
    };

    useEffect(() => {
        const added = contextData.filter(x => !data.data.some(y => y.id === x.id));
        const removed = data.data.filter(y => !contextData.some(x => x.id === y.id));

        if (added.length > 0 || removed.length > 0) {
            change();
        }
    }, [contextData]);

    useEffect(() => {
        change();
    }, [search, page, pageSize]);

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
                    className="join-item btn">
                    «
                </button>

                <button
                    onClick={() => change()}
                    className="join-item btn">
                    {page + 1}
                </button>

                <button
                    className="join-item btn"
                    onClick={nextPage}
                    disabled={!data.hasNext || isLoading}>
                    »
                </button>
            </div>
        </div>
    </div>
}