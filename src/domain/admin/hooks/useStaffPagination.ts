import { useMemo, useState } from 'react';

interface UseStaffPaginationProps<T> {
    items: T[];
    pageSize?: number;
}

export function useStaffPagination<T>({
    items,
    pageSize = 6,
}: UseStaffPaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(items.length / pageSize)
    );

    const safePage = Math.min(currentPage, totalPages);

    const paginatedItems = useMemo(() => {
        const startIndex = (safePage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return items.slice(startIndex, endIndex);
    }, [items, safePage, pageSize]);

    const goToNextPage = () => {
        setCurrentPage((prev) =>
            Math.min(prev + 1, totalPages)
        );
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) =>
            Math.max(prev - 1, 1)
        );
    };

    const goToPage = (page: number) => {
        setCurrentPage(
            Math.min(
                Math.max(page, 1),
                totalPages
            )
        );
    };

    return {
        currentPage: safePage,
        totalPages,
        pageSize,
        paginatedItems,

        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,

        goToNextPage,
        goToPreviousPage,
        goToPage,
    };
}