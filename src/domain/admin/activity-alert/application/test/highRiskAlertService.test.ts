import { describe, it, expect } from 'vitest';
import {
    highRiskAlertService,
    HighRiskAlertType,
} from '../highRiskAlertService';
import { ActivityData } from '@/domain/admin/dashboard/model/adminUser';

describe('highRiskAlertService', () => {
    //
    const createActivity = (
        overrides: Partial<ActivityData> = {},
    ): ActivityData => ({
        id: 'log-001',
        user: 'Admin Test',
        action: 'Cập nhật thông tin',
        target: 'Nguyễn Văn A',
        status: 'Success',
        time: 'Vừa xong',
        ...overrides,
    });

    //
    it('nhận diện cảnh báo khi xóa nhân sự thành công', () => {
        const activity = createActivity({
            action: 'Xóa vĩnh viễn',
        });

        const result = highRiskAlertService.detect(activity);

        expect(result).not.toBeNull();
        expect(result?.type).toBe<HighRiskAlertType>('STAFF_DELETED');
        expect(result?.activityId).toBe('log-001');
        expect(result?.title).toBe('Cảnh báo xóa nhân sự');
    });

    //
    it('nhận diện cảnh báo khi khóa tài khoản thành công', () => {
        const activity = createActivity({
            action: 'Chuyển trạng thái sang Inactive',
        });

        const result = highRiskAlertService.detect(activity);

        expect(result?.type).toBe<HighRiskAlertType>('ACCOUNT_BLOCKED');
        expect(result?.message).toContain('đã khóa');
    });

    //
    it('nhận diện cảnh báo khi nâng quyền lên SUPER_ADMIN', () => {
        const activity = createActivity({
            action: 'Nâng quyền thành SUPER_ADMIN',
        });

        const result = highRiskAlertService.detect(activity);

        expect(result).not.toBeNull();
        expect(result?.type).toBe<HighRiskAlertType>('ROLE_PROMOTED_TO_SUPER_ADMIN');
        expect(result?.title).toBe('Cảnh báo nâng quyền quản trị');
        expect(result?.message).toContain('SUPER_ADMIN');
        expect(result?.activityId).toBe('log-001');
    });

    //
    it('không tạo cảnh báo khi log có trạng thái Failed', () => {
        const activity = createActivity({
            action: 'Xóa vĩnh viễn',
            status: 'Failed',
        });

        expect(highRiskAlertService.detect(activity)).toBeNull();
    });

    //
    it('không tạo cảnh báo khi chỉ cập nhật thông tin thông thường', () => {
        const activity = createActivity({
            action: 'Cập nhật thông tin',
        });

        expect(highRiskAlertService.detect(activity)).toBeNull();
    });

    //
    it('không tạo cảnh báo nâng quyền khi đổi role sang ADMIN', () => {
        const activity = createActivity({
            action: "Thay đổi quyền từ STAFF sang ADMIN"
        });

        expect(highRiskAlertService.detect(activity)).toBeNull();
    });
});