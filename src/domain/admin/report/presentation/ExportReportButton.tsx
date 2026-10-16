'use client';

import { pdf } from '@react-pdf/renderer';
import { FileDown } from 'lucide-react';

import { reportService } from '../application/reportService';
import MonthlyReportDocument from './MonthlyReportDocument';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
interface ExportReportButtonProps {
    selectedMonth: string;
}
export function ExportReportButton({
    selectedMonth,
}: ExportReportButtonProps) {
    const handleExport = async () => {
        try {
            const report =
                await reportService.generateMonthlyReport(selectedMonth);

            //
            const blob = await pdf(
                <MonthlyReportDocument report={report} />
            ).toBlob();

            //
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download =
                `staff-activity-report-${selectedMonth}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success(`Đã xuất thành công báo cáo tháng ${selectedMonth} `)

            //
        } catch (error) {
            console.error(
                'Không thể tạo báo cáo PDF:',
                error
            );

            toast.error(`Đã xảy ra lỗi khi export file`);

        }
    };

    return (
        <Button
            onPress={handleExport}
            aria-label='nút xuất báo cáo PDF'
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
            <FileDown size={18} />

            Xuất báo cáo PDF
        </Button >

    );
}