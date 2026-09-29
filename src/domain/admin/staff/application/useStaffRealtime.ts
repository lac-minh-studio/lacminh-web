'use client';

import { useMemo } from 'react';
import { IStaffItem } from '../model/Staff';
import { staffService } from '../application/staffService';
import { useFirestoreRealtime } from '@/domain/admin/hooks/useFirestoreRealtime';

export function useStaffRealtime() {
    const staffQuery = useMemo(
        () => staffService.getRealtimeStaffQuery(),
        []
    );

    const {
        data,
        isLoading,
        error,
    } = useFirestoreRealtime<IStaffItem>(
        staffQuery,
        staffService.mapStaff
    );

    return {
        staffList: data,
        isLoading,
        error,
    };
}