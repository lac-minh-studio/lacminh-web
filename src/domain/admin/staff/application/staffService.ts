import { FirestoreStaffRepository } from '../infrastructure/repositories/FirestoreStaffRepository';
import { IStaffItem, IStaffFormInput } from '../model/Staff';

const staffRepository = new FirestoreStaffRepository();

export const staffService = {
    //fetch all data staff gọi hàm getAll thông qua staffstaffRepository
    async getAllStaffs(): Promise<IStaffItem[]> {
        return await staffRepository.getAll();
    },

    //create staff gọi hàm create thông qua staffstaffRepository
    async createStaff(data: IStaffFormInput): Promise<string> {
        return await staffRepository.create(data);
    },

    //update staff gọi hàm update thông qua staffstaffRepository
    async updateStaff(id: string, data: Partial<IStaffFormInput>): Promise<void> {
        return await staffRepository.update(id, data);
    },

    //delete staff gọi hàm delete thông qua staffstaffRepository
    async deleteStaff(id: string): Promise<void> {
        return await staffRepository.delete(id);
    },

    //change status gọi hàm update thông qua staffstaffRepository
    async toggleStatus(id: string, currentStatus: string): Promise<void> {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        return await staffRepository.update(id, { status: newStatus as 'Active' | 'Inactive' });
    }
};