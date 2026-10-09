'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { activityLogService } from '@/domain/admin/dashboard/application/activityLogService';
import { highRiskAlertService } from './highRiskAlertService';
import { onSnapshot } from 'firebase/firestore';

export function useHighRiskAlerts(): void {
    useEffect(() => {
        let isInitialSnapshot = true;

        const unsubscribe = onSnapshot(
            activityLogService.getHighRiskLogsQuery(),
            (snapshot) => {
                //bỏ qua các log cũ
                if (isInitialSnapshot) {
                    isInitialSnapshot = false;
                    return;
                }

                snapshot.docChanges().forEach((change) => {
                    // Chỉ hiển thị  log mới được thêm vào.
                    if (change.type !== 'added') {
                        return;
                    }

                    //
                    const activity =
                        activityLogService.mapActivityLog(change.doc);

                    //
                    const alert =
                        highRiskAlertService.detect(activity);

                    if (!alert) {
                        return;
                    }

                    toast.error(
                        `${alert.title}: ${alert.message}`
                    );
                });
            },
            (error) => {
                console.error(
                    'Không thể lắng nghe cảnh báo nguy cơ cao:',
                    error,
                );
            },
        );

        return () => {
            unsubscribe();
        };
    }, []);
}