import { describe, it, expect, vi } from 'vitest';
import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { FirestoreStaffRepository } from '../../infrastructure/repositories/FirestoreStaffRepository';

vi.mock('@/config/firebase', () => ({
    db: {},
    auth: {}
}));

describe('FirestoreStaffRepository.toStaff', () => {
    it('Nên chuyển đổi đúng từ Firestore Document Snapshot sang IStaffItem', () => {
        const createdAt = Timestamp.fromDate(
            new Date('2026-09-23T10:00:00.000Z')
        );

        const mockDocSnap = {
            id: 'staff-123',
            data: () => ({
                fullName: 'Nguyễn Văn A',
                email: 'a@example.com',
                phone: '0901234567',
                department: 'Engineering',
                title: 'Frontend Developer',
                role: 'STAFF',
                status: true,
                created_at: createdAt,
            }),
        };

        const staff = FirestoreStaffRepository.toStaff(
            mockDocSnap as unknown as QueryDocumentSnapshot<DocumentData>
        );

        expect(staff.id).toBe('staff-123');
        expect(staff.fullName).toBe('Nguyễn Văn A');
        expect(staff.email).toBe('a@example.com');
        expect(staff.status).toBe('Active');
        expect(staff.createdAt).toEqual(
            createdAt.toDate()
        );
    });
});