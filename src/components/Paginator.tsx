import { useEffect, useState } from "react";
import type { PaginatedResponse } from "shelflife-react-hooks"

type Props = {
    onChange: (search: string, page: number, size: number) => Promise<PaginatedResponse<any>>;
}

export default function Paginator({ onChange }: Props) {
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [isLoading, setIsLoading] = useState(false);

    const change = async () => {
        setIsLoading(true);
        const res = await onChange(search, page, pageSize);
        setIsLoading(false);

        setHasNext(res.hasNext);
        setHasPrevious(res.hasPrevious);
    }

    useEffect(() => {
        change();
    }, [search, page, pageSize]);

    const nextPage = () => {
        setPage((p) => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage((p) => p - 1);
    };

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
            <select className="select w-min" onChange={e => setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>

            <button
                className="btn btn-primary"
                onClick={prevPage}
                disabled={!hasPrevious || isLoading}
            >
                Previous
            </button>

            <p className="text-center">
                Page {page + 1}
            </p>

            <button
                className="btn btn-primary"
                onClick={nextPage}
                disabled={!hasNext || isLoading}
            >
                Next
            </button>
        </div>
    </div>
}