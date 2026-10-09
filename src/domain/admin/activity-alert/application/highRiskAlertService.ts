import { ActivityData } from '@/domain/admin/dashboard/model/adminUser';

export type HighRiskAlertType =
    | 'STAFF_DELETED'
    | 'ACCOUNT_BLOCKED'
    | 'ROLE_PROMOTED_TO_SUPER_ADMIN';


export interface HighRiskAlert {
    type: HighRiskAlertType;
    title: string;
    message: string;
    activityId: string;
}

export const highRiskAlertService = {
    detect(activity: ActivityData): HighRiskAlert | null {
        //bỏ qua các action failed 
        if (activity.status !== 'Success') {
            return null;
        }
        //
        if (activity.action === 'Xóa vĩnh viễn') {
            return {
                type: 'STAFF_DELETED',
                title: 'Cảnh báo xóa nhân sự',
                message: `${activity.user} đã xóa ${activity.target}.`,
                activityId: activity.id,
            };
        }

        //
        if (
            activity.action ===
            'Chuyển trạng thái sang Inactive'
        ) {
            return {
                type: 'ACCOUNT_BLOCKED',
                title: 'Cảnh báo khóa tài khoản',
                message: `${activity.user} đã khóa ${activity.target}.`,
                activityId: activity.id,
            };
        }
        //
        if (activity.action === 'Nâng quyền thành SUPER_ADMIN') {
            return {
                type: 'ROLE_PROMOTED_TO_SUPER_ADMIN',
                title: 'Cảnh báo nâng quyền quản trị',
                message: `${activity.user} đã nâng quyền ${activity.target} thành SUPER_ADMIN.`,
                activityId: activity.id,
            };
        }

        return null;
    },
};