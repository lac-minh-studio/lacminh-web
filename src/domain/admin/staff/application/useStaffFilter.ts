import { useMemo, useState } from "react";
import { IStaffItem } from "../model/Staff";
import { useDebounce } from "./useDebounce";

export function useStaffFilter(staffList: IStaffItem[]) {
    const [searchTerm, setSearchTerm] = useState('');
    const [titleFilter, setTitleFilter] = useState('ALL');

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const filteredStaffList = useMemo(() => {
        const keyword = debouncedSearchTerm.trim().toLowerCase();

        return staffList.filter((staff) => {
            const matchesSearch =
                keyword === "" ||
                staff.fullName.toLowerCase().includes(keyword) ||
                staff.email.toLowerCase().includes(keyword);

            const matchesTitle =
                titleFilter === "ALL" ||
                staff.title === titleFilter;

            return matchesSearch && matchesTitle;
        });
    }, [staffList, debouncedSearchTerm, titleFilter]);

    return {
        searchTerm,
        setSearchTerm,
        titleFilter,
        setTitleFilter,
        filteredStaffList,
        isSearching: searchTerm !== debouncedSearchTerm,
    };
}