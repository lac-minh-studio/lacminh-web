import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp,
    serverTimestamp,
    FirestoreDataConverter,
    DocumentData,
    WithFieldValue
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { IStaffItem, IStaffFormInput, IStaffRepository } from '../../model/Staff';

//  Định nghĩa Type của Document lưu dưới Firebase để mapping an toàn
interface IFirestoreStaffDoc {
    fullName: string;
    email: string;
    phone: string;
    department: string;
    title: string;
    status: boolean;
    created_at: Timestamp | ReturnType<typeof serverTimestamp>;
}

// Data Converter với Generic Type chuẩn xác
const staffConverter: FirestoreDataConverter<IStaffItem> = {
    toFirestore(staff: WithFieldValue<IStaffItem>): DocumentData {
        const firestoreDoc: IFirestoreStaffDoc = {
            fullName: staff.fullName as string,
            email: staff.email as string,
            phone: staff.phone as string,
            department: staff.department as string,
            title: staff.title as string,
            status: staff.status === 'Active',
            created_at: staff.createdAt ? Timestamp.fromDate(staff.createdAt as Date) : serverTimestamp(),
        };
        return firestoreDoc as DocumentData;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IStaffItem {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            department: data.department,
            title: data.title,
            status: data.status === true ? 'Active' : 'Inactive',
            createdAt: data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(),
        };
    }
};

export class FirestoreStaffRepository implements IStaffRepository {
    private collRef = collection(db, 'staffs').withConverter(staffConverter);

    //  function để xử lý lỗi
    private handleError(context: string, error: unknown): never {
        if (error instanceof Error) {
            console.error(`[${context}] Error:`, error.message);
            throw new Error(error.message);
        }
        console.error(`[${context}] Unknown Error:`, error);
        throw new Error('Đã xảy ra lỗi không xác định từ Firebase Emulator.');
    }

    //fun async fetch all data staff
    async getAll(): Promise<IStaffItem[]> {
        try {
            const snapshot = await getDocs(this.collRef);
            return snapshot.docs.map(doc => doc.data());
        } catch (error: unknown) {
            this.handleError('Fetch staffs', error);
        }
    }

    //fun async create staff
    async create(data: IStaffFormInput): Promise<string> {
        try {
            // Ép kiểu an toàn 
            const docRef = await addDoc(this.collRef, data as IStaffItem);
            return docRef.id;
        } catch (error: unknown) {
            this.handleError('Create staff', error);
        }
    }

    //fun async update staff
    async update(id: string, data: Partial<IStaffFormInput>): Promise<void> {
        try {
            const docRef = doc(db, 'staffs', id);

            // Khởi tạo updatePayload sử dụng Record an toàn của TS
            const updatePayload: Record<string, string | boolean> = {};

            if (data.fullName) updatePayload.fullName = data.fullName;
            if (data.email) updatePayload.email = data.email;
            if (data.phone) updatePayload.phone = data.phone;
            if (data.department) updatePayload.department = data.department;
            if (data.title) updatePayload.title = data.title;

            // Xử lý status 
            if (data.status) {
                updatePayload.status = data.status === 'Active';
            }

            await updateDoc(docRef, updatePayload);
        } catch (error: unknown) {
            this.handleError('Update staff', error);
        }
    }

    //fun async delete staff
    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(db, 'staffs', id);
            await deleteDoc(docRef);
        } catch (error: unknown) {
            this.handleError('Delete staff', error);
        }
    }
}