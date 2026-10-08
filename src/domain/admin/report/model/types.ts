export interface MonthlyReportData {
    reportDate: string;

    metrics: {
        totalStaff: number;
        activeStaff: number;
        inactiveStaff: number;
    };

    titleStatistics: {
        title: string;
        count: number;
    }[];

    staffList: {
        id: string;
        fullName: string;
        email: string;
        title: string;
        department: string;
        role: string;
        status: string;
    }[];

    activities: {
        user: string;
        action: string;
        target: string;
        status: string;
        createdAt: string;
    }[];
}