import { FirestoreStaffRepository } from '../infrastructure/repositories/FirestoreStaffRepository';
import { IStaffFormInput, IStaffItem, } from '../model/Staff';
import { activityLogService } from '../../dashboard/application/activityLogService';
import { seedService } from '../../dashboard/infrastructure/seeding/seedService';
const staffRepository = new FirestoreStaffRepository();

export const staffService = {
    //fetch all data staff gọi hàm getAll thông qua staffstaffRepository
    async getStaffPage(pageSize: number, cursor?: Parameters<FirestoreStaffRepository['getPage']>[1]) {
        await seedService.seedIfEmpty();
        return staffRepository.getPage(pageSize, cursor);
    },

    //create staff gọi hàm create thông qua staffstaffRepository
    async createStaff(data: IStaffFormInput): Promise<string> {
        const newId = await staffRepository.create(data);

        // Kích hoạt ghi log
        try {
            await activityLogService.createLog({
                user: 'Nguyễn Văn A',
                action: 'Thêm mới nhân sự',
                target: data.fullName,
                status: 'Success',
            });
        } catch (error) {
            console.error('Không thể ghi log:', error);
        }

        return newId;
    },

    //update staff gọi hàm update thông qua staffstaffRepository
    async updateStaff(id: string, data: Partial<IStaffFormInput>): Promise<void> {
        await staffRepository.update(id, data);

        // Kích hoạt ghi log
        try {
            await activityLogService.createLog({
                user: 'Nguyễn Văn A',
                action: 'Cập nhật thông tin',
                target: data.fullName || `Nhân sự #${id.slice(0, 6)}`,
                status: 'Success',
            });
        } catch (error) {
            console.error('Không thể ghi log:', error);
        }
    },

    //delete staff gọi hàm delete thông qua staffstaffRepository
    async deleteStaff(id: string): Promise<void> {
        await staffRepository.delete(id);

        // Kích hoạt ghi log
        try {
            await activityLogService.createLog({
                user: 'Nguyễn Văn A',
                action: 'Xóa vĩnh viễn',
                target: `Nhân sự #${id.slice(0, 6)}`,
                status: 'Success',
            });
        } catch (error) {
            console.error('Không thể ghi log:', error);
        }
    },

    //change status gọi hàm update thông qua staffstaffRepository
    async toggleStatus(id: string, currentStatus: string): Promise<void> {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        await staffRepository.update(id, { status: newStatus as 'Active' | 'Inactive' });

        // Kích hoạt ghi log
        try {
            await activityLogService.createLog({
                user: 'Nguyễn Văn A',
                action: `Chuyển trạng thái sang ${newStatus}`,
                target: `Nhân sự #${id.slice(0, 6)}`,
                status: 'Success',
            });
        } catch (error) {
            console.error('Không thể ghi log:', error);
        }
    },

    async searchStaffByName(searchTerm: string): Promise<IStaffItem[]> {
        try {
            return await staffRepository.searchStaffByName(searchTerm);
        } catch (error) {
            console.error("Lỗi service tìm kiếm:", error);
            return [];
        }
    }
};
