import { staffService } from "../../staff/application/staffService";
import { MonthlyReportData } from "../model/types";

export const reportService = {
    async generateMonthlyReport(): Promise<MonthlyReportData> {
        const staffList = await staffService.getStaff();

        //tổng staff
        const totalStaff = staffList.length;

        //staff đang active
        const activeStaff = staffList.filter(
            (staff) => staff.status === 'Active'
        ).length;

        //staff đang inactive
        const inactiveStaff = staffList.filter(
            (staff) => staff.status === 'Inactive'
        ).length;


        //gom nhóm và đếm
        const titleMap = new Map<string, number>();
        staffList.forEach((staff) => {
            const currentCount = titleMap.get(staff.title) ?? 0;
            titleMap.set(
                staff.title,
                currentCount + 1
            );
        });

        //
        const titleStatistics = Array.from(
            titleMap.entries()
        ).map(([title, count]) => ({
            title,
            count,
        }));

        return {
            reportDate: new Date().toLocaleDateString(),
            metrics: {
                totalStaff,
                activeStaff,
                inactiveStaff,
            },
            titleStatistics,
            staffList,
            activities: [],
        };
    },
};