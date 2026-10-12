'use client';

import { useCallback, useMemo } from 'react';


import { useFirestoreRealtime } from '@/domain/admin/hooks/useFirestoreRealtime';
import { activityLogService } from './activityLogService';
import { ActivityData } from '../model/types';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export function useRealtimeNotifications() {
    const firestoreQuery = useMemo(
        () => activityLogService.getRecentNotificationQuery(10),
        [],
    );

    const mapper = useCallback(
        (
            doc: QueryDocumentSnapshot<DocumentData>,
        ): ActivityData =>
            activityLogService.mapActivityLog(doc),
        [],
    );

    return useFirestoreRealtime<ActivityData>(
        firestoreQuery,
        mapper,
    );
}