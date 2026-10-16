import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { exportToCsv, type CsvColumn } from '../exportToCsv';

interface TestRow {
    name: string;
    email: string;
    note?: string | null;
    status: string;
}

const columns: CsvColumn<TestRow>[] = [
    { key: 'name', header: 'Họ và tên' },
    { key: 'email', header: 'Email' },
    { key: 'note', header: 'Ghi chú' },
    { key: 'status', header: 'Trạng thái' },
];

describe('exportToCsv', () => {
    const createObjectURL = vi.fn(() => 'blob:test-url');
    const revokeObjectURL = vi.fn();
    const blobInstances: Array<{
        parts: unknown[];
        options?: BlobPropertyBag;
    }> = [];

    beforeEach(() => {
        vi.clearAllMocks();
        blobInstances.length = 0;

        vi.stubGlobal('URL', {
            createObjectURL,
            revokeObjectURL,
        });

        // Lưu lại nội dung Blob để kiểm tra CSV và BOM.
        vi.stubGlobal(
            'Blob',
            class MockBlob {
                constructor(
                    public parts: unknown[],
                    public options?: BlobPropertyBag,
                ) {
                    blobInstances.push({ parts, options });
                }
            },
        );

        document.body.innerHTML = '';
        vi.spyOn(HTMLAnchorElement.prototype, 'click')
            .mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('không tạo file khi danh sách dữ liệu rỗng', () => {
        exportToCsv<TestRow>([], columns, 'staff.csv');

        expect(blobInstances).toHaveLength(0);
        expect(createObjectURL).not.toHaveBeenCalled();
        expect(revokeObjectURL).not.toHaveBeenCalled();
    });

    it('xuất đúng header và dữ liệu thông thường', () => {
        exportToCsv(
            [
                {
                    name: 'Nguyễn Văn A',
                    email: 'a@example.com',
                    note: 'Nhân sự mới',
                    status: 'Active',
                },
            ],
            columns,
            'staff.csv',
        );

        const csv = String(blobInstances[0].parts[0]);

        expect(csv).toBe(
            '\uFEFFHọ và tên,Email,Ghi chú,Trạng thái\r\n' +
            'Nguyễn Văn A,a@example.com,Nhân sự mới,Active',
        );
    });

    it('chuyển null và undefined thành chuỗi rỗng', () => {
        const testColumns: CsvColumn<TestRow>[] = [
            { key: 'name', header: 'Tên' },
            { key: 'note', header: 'Ghi chú' },
        ];

        exportToCsv(
            [
                {
                    name: 'Nguyễn Văn A',
                    email: 'a@example.com',
                    note: null,
                    status: 'Active',
                },
                {
                    name: 'Nguyễn Văn B',
                    email: 'b@example.com',
                    note: undefined,
                    status: 'Inactive',
                },
            ],
            testColumns,
            'staff.csv',
        );

        const csv = String(blobInstances[0].parts[0]);

        expect(csv).toBe(
            '\uFEFFTên,Ghi chú\r\n' +
            'Nguyễn Văn A,\r\n' +
            'Nguyễn Văn B,',
        );
    });

    it('escape dấu phẩy bằng cách bao giá trị trong dấu ngoặc kép', () => {
        const testColumns: CsvColumn<TestRow>[] = [
            { key: 'note', header: 'Ghi chú' },
        ];

        exportToCsv(
            [
                {
                    name: 'A',
                    email: 'a@example.com',
                    note: 'Frontend, Backend',
                    status: 'Active',
                },
            ],
            testColumns,
            'staff.csv',
        );

        expect(String(blobInstances[0].parts[0])).toBe(
            '\uFEFFGhi chú\r\n"Frontend, Backend"',
        );
    });

    it('escape dấu ngoặc kép bên trong giá trị', () => {
        const testColumns: CsvColumn<TestRow>[] = [
            { key: 'note', header: 'Ghi chú' },
        ];

        exportToCsv(
            [
                {
                    name: 'A',
                    email: 'a@example.com',
                    note: 'Nói "Xin chào"',
                    status: 'Active',
                },
            ],
            testColumns,
            'staff.csv',
        );

        expect(String(blobInstances[0].parts[0])).toBe(
            '\uFEFFGhi chú\r\n"Nói ""Xin chào"""',
        );
    });

    it('escape giá trị chứa ký tự xuống dòng', () => {
        const testColumns: CsvColumn<TestRow>[] = [
            { key: 'note', header: 'Ghi chú' },
        ];

        exportToCsv(
            [
                {
                    name: 'A',
                    email: 'a@example.com',
                    note: 'Dòng 1\nDòng 2',
                    status: 'Active',
                },
            ],
            testColumns,
            'staff.csv',
        );

        expect(String(blobInstances[0].parts[0])).toBe(
            '\uFEFFGhi chú\r\n"Dòng 1\nDòng 2"',
        );
    });

    it('xuất giá trị sau khi formatter xử lý', () => {
        const testColumns: CsvColumn<TestRow>[] = [
            {
                key: 'status',
                header: 'Trạng thái',
                formatter: (value) =>
                    value === 'Active'
                        ? 'Hoạt động'
                        : 'Không hoạt động',
            },
        ];

        exportToCsv(
            [
                {
                    name: 'A',
                    email: 'a@example.com',
                    status: 'Active',
                },
            ],
            testColumns,
            'staff.csv',
        );

        expect(String(blobInstances[0].parts[0])).toBe(
            '\uFEFFTrạng thái\r\nHoạt động',
        );
    });

    it('thêm UTF-8 BOM và cấu hình MIME type chính xác', () => {
        exportToCsv(
            [
                {
                    name: 'Nguyễn Văn A',
                    email: 'a@example.com',
                    status: 'Active',
                },
            ],
            columns,
            'staff.csv',
        );

        const blob = blobInstances[0];

        expect(String(blob.parts[0]).charCodeAt(0)).toBe(0xFEFF);
        expect(blob.options).toEqual({
            type: 'text/csv;charset=utf-8;',
        });
    });

    it('tải đúng tên file và thu hồi URL sau khi tải', () => {
        exportToCsv(
            [
                {
                    name: 'Nguyễn Văn A',
                    email: 'a@example.com',
                    status: 'Active',
                },
            ],
            columns,
            'staff.csv',
        );

        expect(createObjectURL).toHaveBeenCalledTimes(1);
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledTimes(1);
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
        expect(document.querySelector('a')).toBeNull();
    });
});
