export function getMonthDateRange(month: string) {
    const [year, monthNumber] = month.split('-').map(Number);

    const startDate = new Date(Date.UTC(year, monthNumber - 1, 1));

    const endDate = new Date(Date.UTC(year, monthNumber, 1));

    return {
        startDate,
        endDate,
    };
}