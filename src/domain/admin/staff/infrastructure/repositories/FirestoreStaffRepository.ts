import { db } from '@/config/firebase';
import {
    addDoc,
    collection,
    deleteDoc,
    DocumentData,
    orderBy,
    query,
    QueryDocumentSnapshot,
    serverTimestamp,
    Timestamp,
    updateDoc,
    doc,
    Query,
    getDocs,
    where,
    getDoc,
} from 'firebase/firestore';

import { z } from 'zod';
import { DepartmentSchema, IStaffFormInput, IStaffItem, IStaffRepository, RoleSchema, StaffFormSchema, TitleSchema, } from '../../model/Staff';

const FirestoreStaffSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    department: DepartmentSchema,
    title: TitleSchema,
    role: RoleSchema,
    status: z.boolean(),
    created_at: z.instanceof(Timestamp),
    updated_at: z.instanceof(Timestamp).optional(),
});


export class FirestoreStaffRepository implements IStaffRepository {
    private readonly collRef = collection(db, 'staffs');

    private handleError(context: string, error: unknown): never {
        const message = error instanceof Error ? error.message : 'Lỗi Firebase không xác định.';
        console.error(`[${context}]`, error);
        throw new Error(`${context}: ${message}`);
    }

    public static toStaff(snapshot: QueryDocumentSnapshot<DocumentData>): IStaffItem {
        const data = FirestoreStaffSchema.parse(snapshot.data({
            serverTimestamps: 'estimate',
        }));

        return {
            id: snapshot.id,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            department: data.department,
            title: data.title,
            role: data.role,
            status: data.status ? 'Active' : 'Inactive',
            createdAt: data.created_at.toDate(),
        };
    }

    // 
    async create(input: IStaffFormInput): Promise<string> {
        try {
            const data = StaffFormSchema.parse(input);
            const docRef = await addDoc(this.collRef, {
                ...data,
                status: data.status === 'Active',
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });
            return docRef.id;
        } catch (error) {
            this.handleError('Không thể tạo nhân sự', error);
        }
    }

    //
    async update(id: string, input: Partial<IStaffFormInput>): Promise<void> {
        try {
            const data = StaffFormSchema.partial().parse(input);
            const updatePayload: Record<string, unknown> = { updated_at: serverTimestamp() };
            if (data.fullName !== undefined) updatePayload.fullName = data.fullName;
            if (data.email !== undefined) updatePayload.email = data.email;
            if (data.phone !== undefined) updatePayload.phone = data.phone;
            if (data.department !== undefined) updatePayload.department = data.department;
            if (data.title !== undefined) updatePayload.title = data.title;
            if (data.role !== undefined) updatePayload.role = data.role;
            if (data.status !== undefined) updatePayload.status = data.status === 'Active';
            await updateDoc(doc(this.collRef, id), updatePayload);
        } catch (error) {
            this.handleError('Không thể cập nhật nhân sự', error);
        }
    }

    //
    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(doc(this.collRef, id));
        } catch (error) {
            this.handleError('Không thể xóa nhân sự', error);
        }
    }

    //lấy staff dựa trên ID
    async getById(id: string): Promise<IStaffItem | null> {
        const staffRef = doc(db, 'staffs', id);
        const snapshot = await getDoc(staffRef);

        if (!snapshot.exists()) {
            return null;
        }

        return FirestoreStaffRepository.toStaff(snapshot);
    }

    //
    public getRealtimeQuery(): Query {
        return query(
            this.collRef,
            orderBy('created_at', 'desc')
        );
    }
    public async getAll(): Promise<IStaffItem[]> {
        try {
            const q = query(
                this.collRef,
                orderBy('created_at', 'desc')
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(
                FirestoreStaffRepository.toStaff
            );
        } catch (error) {
            this.handleError(
                'Không thể lấy danh sách nhân sự',
                error
            );
        }
    }
    //lấy doc trong khoảng time
    public async getByCreatedAtRange(
        startDate: Date,
        endDate: Date,
    ): Promise<IStaffItem[]> {
        try {
            const q = query(
                this.collRef,
                where(
                    'created_at',
                    '>=',
                    Timestamp.fromDate(startDate),
                ),
                where(
                    'created_at',
                    '<',
                    Timestamp.fromDate(endDate),
                ),
                orderBy('created_at', 'desc'),
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(
                FirestoreStaffRepository.toStaff,
            );
        } catch (error) {
            this.handleError(
                'Không thể lấy danh sách nhân sự theo khoảng thời gian',
                error,
            );
        }
    }
}
