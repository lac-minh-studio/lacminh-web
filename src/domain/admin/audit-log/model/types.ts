import { Timestamp } from "firebase/firestore";

export interface ActivityData {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
    status: 'Success' | 'Pending' | 'Failed';
    createdAt: Timestamp;

    before?: Record<string, unknown> | null;
    after?: Record<string, unknown> | null;

    actorUid?: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}