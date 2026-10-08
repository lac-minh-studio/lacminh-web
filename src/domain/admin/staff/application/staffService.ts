import { FirestoreStaffRepository } from '../infrastructure/repositories/FirestoreStaffRepository';
import { IStaffFormInput } from '../model/Staff';
import { activityLogService } from '../../dashboard/application/activityLogService';
import { seedService } from '../../dashboard/infrastructure/seeding/seedService';
import { AdminUser } from '../../dashboard/model/adminUser';


const staffRepository = new FirestoreStaffRepository();

async function recordStaffActivity(actor: AdminUser, action: string, target: string): Promise<void> {
    try {

        await activityLogService.createLog({
            user: actor.name,
            action,
            target,
            status: 'Success',
        });
    } catch (error) {
        console.error('Không thể ghi log hoạt động:', error);
    }
}

export const staffService = {
    async getStaff() {
        await seedService.seedIfEmpty();

        return staffRepository.getAll();
    },


    //create staff gọi hàm create thông qua staffstaffRepository
    async createStaff(actor: AdminUser, data: IStaffFormInput): Promise<string> {
        const newId = await staffRepository.create(data);
        await recordStaffActivity(actor, 'Thêm mới nhân sự', data.fullName);
        return newId;
    },

    //update staff gọi hàm update thông qua staffstaffRepository
    async updateStaff(actor: AdminUser, id: string, data: Partial<IStaffFormInput>): Promise<void> {
        await staffRepository.update(id, data);
        const targetName = data.fullName || `Nhân sự #${id.slice(0, 6)}`;
        await recordStaffActivity(actor, 'Cập nhật thông tin', targetName);
    },

    //delete staff gọi hàm delete thông qua staffstaffRepository
    async deleteStaff(actor: AdminUser, id: string): Promise<void> {
        await staffRepository.delete(id);
        await recordStaffActivity(actor, 'Xóa vĩnh viễn', `Nhân sự #${id.slice(0, 6)
            }`);
    },

    //change status gọi hàm update thông qua staffstaffRepository
    async toggleStatus(actor: AdminUser, id: string, currentStatus: string): Promise<void> {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        await staffRepository.update(id, { status: newStatus as 'Active' | 'Inactive' });
        await recordStaffActivity(actor, `Chuyển trạng thái sang ${newStatus}`, `Nhân sự #${id.slice(0, 6)} `);
    },

    // 
    getRealtimeStaffQuery() {
        return staffRepository.getRealtimeQuery();
    },
    mapStaff: FirestoreStaffRepository.toStaff,



};