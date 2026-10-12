
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityData } from "../model/types";
import { ActivityLogCursor, activityLogService } from "./activityLogService";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";


//
function mergeLogs(
    existing: ActivityData[],
    incoming: ActivityData[],
): ActivityData[] {
    const logsById = new Map<string, ActivityData>();

    for (const log of existing) {
        logsById.set(log.id, log);
    }

    for (const log of incoming) {
        logsById.set(log.id, log);
    }

    return Array.from(logsById.values()).sort(
        (a, b) =>
            b.createdAt.toMillis() - a.createdAt.toMillis(),
    );
}

export function useCursorPagination(pageSize = 10) {
    const [items, setItems] = useState<ActivityData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadingRef = useRef(false);
    const cursorRef = useRef<ActivityLogCursor | null>(null);
    const hasMoreRef = useRef(true);
    const mountedRef = useRef(false);

    // Query ổn định để theo dõi 10 log mới nhất.
    const notificationQuery = useMemo(
        () => activityLogService.getRecentNotificationQuery(pageSize),
        [pageSize],
    );

    const mapper = useCallback(
        (
            doc: QueryDocumentSnapshot<DocumentData>,
        ): ActivityData => activityLogService.mapActivityLog(doc),
        [],
    );

    const {
        data: realtimeLogs,
        error: realtimeError,
    } = useFirestoreRealtime<ActivityData>(
        notificationQuery,
        mapper,
    );

    // Giữ các log mới nhất đồng bộ với lịch sử đã tải.
    useEffect(() => {
        if (realtimeLogs.length === 0) return;

        setItems((previous) => mergeLogs(previous, realtimeLogs));
    }, [realtimeLogs]);

    // Hàm tải một trang lịch sử bằng cursor pagination.
    const fetchPage = useCallback(
        (cursor: ActivityLogCursor | null) =>
            activityLogService.getRecentLogsPage(
                cursor,
                pageSize,
            ),
        [pageSize],
    );

    // Tải trang đầu tiên.
    useEffect(() => {
        let active = true;
        mountedRef.current = true;

        async function loadInitialPage() {
            loadingRef.current = true;
            setIsLoading(true);
            setError(null);

            try {
                const page = await fetchPage(null);

                if (!active) return;

                //  để không ghi đè log realtime vừa nhận.
                setItems((previous) =>
                    mergeLogs(previous, page.items),
                );

                cursorRef.current = page.nextCursor;
                hasMoreRef.current = page.hasMore;
                setHasMore(page.hasMore);
            } catch (err) {
                if (!active) return;

                setError(
                    err instanceof Error
                        ? err
                        : new Error('Không thể tải audit log.'),
                );
            } finally {
                if (active) {
                    loadingRef.current = false;
                    setIsLoading(false);
                }
            }
        }

        void loadInitialPage();

        return () => {
            active = false;
            mountedRef.current = false;
            loadingRef.current = false;
        };
    }, [fetchPage]);

    // Tải tiếp các log cũ hơn.
    const loadMore = useCallback(async () => {
        if (
            loadingRef.current ||
            !hasMoreRef.current ||
            !cursorRef.current
        ) {
            return;
        }

        loadingRef.current = true;
        setIsLoadingMore(true);
        setError(null);

        try {
            const page = await fetchPage(cursorRef.current);

            if (!mountedRef.current) return;

            setItems((previous) =>
                mergeLogs(previous, page.items),
            );

            cursorRef.current = page.nextCursor;
            hasMoreRef.current = page.hasMore;
            setHasMore(page.hasMore);
        } catch (err) {
            if (!mountedRef.current) return;

            setError(
                err instanceof Error
                    ? err
                    : new Error('Không thể tải thêm audit log.'),
            );
        } finally {
            loadingRef.current = false;

            if (mountedRef.current) {
                setIsLoadingMore(false);
            }
        }
    }, [fetchPage]);

    return {
        items,
        isLoading,
        isLoadingMore,
        error: error ?? realtimeError,
        hasMore,
        loadMore,
    };
}
