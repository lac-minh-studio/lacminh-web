import { useEffect, useState } from "react";
import { staffService } from "./staffService";
import { useDebounce } from "./useDebounce";
import { IStaffItem } from "../model/Staff";

export function useStaffFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [titleFilter, setTitleFilter] = useState('ALL');

    const [filteredStaffList, setFilteredStaffList] =
        useState<IStaffItem[]>([]);

    const [isSearching, setIsSearching] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const debouncedSearchTerm =
        useDebounce(searchTerm, 400);

    useEffect(() => {
        const filterStaff = async () => {
            setIsSearching(true);
            setError(null);

            try {
                const result =
                    await staffService.filterStaff({
                        searchTerm: debouncedSearchTerm,
                        title: titleFilter,
                    });

                setFilteredStaffList(result);
            } catch (error) {
                console.error(
                    'Lỗi khi tìm kiếm/lọc nhân sự:',
                    error
                );

                setError(
                    'Không thể tìm kiếm nhân sự'
                );
            } finally {
                setIsSearching(false);
            }
        };

        filterStaff();
    }, [
        debouncedSearchTerm,
        titleFilter,
    ]);

    return {
        searchTerm,
        setSearchTerm,

        titleFilter,
        setTitleFilter,

        isSearching,
        filteredStaffList,

        error,
    };
}