import { FirestoreStaffRepository } from '../infrastructure/repositories/FirestoreStaffRepository';
import { IStaffFormInput, IStaffItem, StaffFilterQuery } from '../model/Staff';
import { activityLogService } from '../../dashboard/application/activityLogService';
import { seedService } from '../../dashboard/infrastructure/seeding/seedService';

const staffRepository = new FirestoreStaffRepository();

const adminInfo = { id: 'IjanF2APuqOT0mQU031V', name: 'Hoàng Anh', email: 'hoanganh@lacminh.com', role: 'SUPER_ADMIN' };

async function recordStaffActivity(action: string, target: string): Promise<void> {
    try {
        await activityLogService.createLog({
            user: adminInfo.name,
            action,
            target,
            status: 'Success',
        });
    } catch (error) {
        console.error('Không thể ghi log hoạt động:', error);
    }
}

export const staffService = {
    //fetch all data staff gọi hàm getAll thông qua staffstaffRepository
    async getStaffPage(pageSize: number, cursor?: Parameters<FirestoreStaffRepository['getPage']>[1]) {
        await seedService.seedIfEmpty();
        return staffRepository.getPage(pageSize, cursor);
    },

    //create staff gọi hàm create thông qua staffstaffRepository
    async createStaff(data: IStaffFormInput): Promise<string> {
        const newId = await staffRepository.create(data);
        await recordStaffActivity('Thêm mới nhân sự', data.fullName);
        return newId;
    },

    //update staff gọi hàm update thông qua staffstaffRepository
    async updateStaff(id: string, data: Partial<IStaffFormInput>): Promise<void> {
        await staffRepository.update(id, data);
        const targetName = data.fullName || `Nhân sự #${id.slice(0, 6)}`;
        await recordStaffActivity('Cập nhật thông tin', targetName);
    },

    //delete staff gọi hàm delete thông qua staffstaffRepository
    async deleteStaff(id: string): Promise<void> {
        await staffRepository.delete(id);
        await recordStaffActivity('Xóa vĩnh viễn', `Nhân sự #${id.slice(0, 6)}`);
    },

    //change status gọi hàm update thông qua staffstaffRepository
    async toggleStatus(id: string, currentStatus: string): Promise<void> {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        await staffRepository.update(id, { status: newStatus as 'Active' | 'Inactive' });
        await recordStaffActivity(`Chuyển trạng thái sang ${newStatus}`, `Nhân sự #${id.slice(0, 6)}`);
    },

    async filterStaff(query: StaffFilterQuery): Promise<IStaffItem[]> {
        try {
            return await staffRepository.filterStaff(query);
        } catch (error) {
            console.error('Lỗi service Tìm kiếm nhân sự:', error);
            throw error;
        }
    },
    getRealtimeStaffQuery() {
        return staffRepository.getRealtimeQuery();
    },
    mapStaff: FirestoreStaffRepository.toStaff,

};