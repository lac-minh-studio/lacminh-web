import {
    addDoc,
    collection,
    deleteDoc,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    serverTimestamp,
    startAfter,
    Timestamp,
    updateDoc,
    doc,
} from 'firebase/firestore';
import { z } from 'zod';
import { db } from '@/config/firebase';
import {
    DepartmentSchema,
    IStaffFormInput,
    IStaffItem,
    IStaffRepository,
    RoleSchema,
    StaffFormSchema,
    TitleSchema,
} from '../../model/Staff';

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

export type StaffPageCursor = QueryDocumentSnapshot<DocumentData> | null;

export interface StaffPage {
    items: IStaffItem[];
    nextCursor: StaffPageCursor;
}

export class FirestoreStaffRepository implements IStaffRepository {
    private readonly collRef = collection(db, 'staffs');

    private handleError(context: string, error: unknown): never {
        const message = error instanceof Error ? error.message : 'Lỗi Firebase không xác định.';
        console.error(`[${context}]`, error);
        throw new Error(`${context}: ${message}`);
    }

    private toStaff(snapshot: QueryDocumentSnapshot<DocumentData>): IStaffItem {
        const data = FirestoreStaffSchema.parse(snapshot.data());
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

    async getPage(pageSize: number, cursor?: StaffPageCursor): Promise<StaffPage> {
        try {
            const constraints: QueryConstraint[] = [orderBy('created_at', 'desc'), limit(pageSize + 1)];
            if (cursor) constraints.splice(1, 0, startAfter(cursor));
            const snapshot = await getDocs(query(this.collRef, ...constraints));
            const pageDocuments = snapshot.docs.slice(0, pageSize);
            return {
                items: pageDocuments.map((item) => this.toStaff(item)),
                nextCursor: snapshot.docs.length > pageSize ? pageDocuments.at(-1) ?? null : null,
            };
        } catch (error) {
            this.handleError('Không thể tải danh sách nhân sự', error);
        }
    }

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

    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(doc(this.collRef, id));
        } catch (error) {
            this.handleError('Không thể xóa nhân sự', error);
        }
    }

    // Tìm kiếm
    async searchStaffByName(searchTerm: string): Promise<IStaffItem[]> {
        try {
            // Lấy toàn bộ danh sách nhân sự từ collection 'staffs'
            const snapshot = await getDocs(this.collRef);
            const allStaffs = snapshot.docs.map(doc => this.toStaff(doc));

            const keyword = searchTerm.trim().toLowerCase();
            if (!keyword) return allStaffs;

            return allStaffs.filter(staff =>
                staff.fullName.toLowerCase().includes(keyword) ||
                staff.email.toLowerCase().includes(keyword)
            );
        } catch (error) {
            console.error("Lỗi khi search staff:", error);
            return [];
        }
    }
}
