//định nghĩa cột
export interface CsvColumn<T> {
    key: keyof T;
    header: string;
    formatter?: (
        value: T[keyof T],
        row: T,
    ) => string;
}

//xử lí giá trị CSV
const escapeCsvValue = (value: unknown): string => {
    //xử lí null và underfined
    if (value === null || value === undefined) {
        return '';
    }

    //chuyển value thành String
    const stringValue = String(value);

    if (
        stringValue.includes(',') ||
        stringValue.includes('"') ||
        stringValue.includes('\n') ||
        stringValue.includes('\r')
    ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
};

export const exportToCsv = <T>(
    data: T[],
    columns: CsvColumn<T>[],
    fileName: string,
): void => {
    //check data rỗng
    if (data.length === 0) {
        return;
    }

    //khởi tạo header
    const header = columns
        .map((column) => escapeCsvValue(column.header))
        .join(',');


    //duyệt từng row
    const rows = data.map((row) =>
        columns.map((column) => {
            //lấy value theo column.key
            const value = row[column.key];

            //formatter value 
            const formattedValue = column.formatter
                ? column.formatter(value, row)
                : value;

            //
            return escapeCsvValue(formattedValue);
        })
            .join(','),
    );

    //ghép header với rows 
    const csv = [
        header,
        ...rows,
    ].join('\r\n');

    //chèn UTF-8 để Excel đọc đúng tiếng Việt.
    const BOM = '\uFEFF';

    //chuyển đổi text -> file
    const blob = new Blob(
        [BOM + csv],
        {
            type: 'text/csv;charset=utf-8;',
        },
    );

    //tạo url tạm thời
    const url = URL.createObjectURL(blob);
    //tạo link
    const link = document.createElement('a');
    //gán href
    link.href = url;
    //gán download
    link.download = fileName;
    //append vào DOM
    document.body.appendChild(link);
    //mô phỏng click
    link.click();
    //xóa khỏi DOM
    document.body.removeChild(link);

    //xóa url
    URL.revokeObjectURL(url);
};