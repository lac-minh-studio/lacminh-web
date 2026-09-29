'use client';

import { useEffect, useState } from 'react';
import {
    DocumentData,
    Query,
    QueryDocumentSnapshot,
    onSnapshot,
} from 'firebase/firestore';
import { useNetworkStatus } from './useNetworkStatus';

export type FirestoreConnectionState =
    | 'connecting'
    | 'connected'
    | 'reconnecting'
    | 'error';

interface UseFirestoreRealtimeResult<T> {
    data: T[];
    isLoading: boolean;
    error: Error | null;
    connectionState: FirestoreConnectionState;
}

export function useFirestoreRealtime<T>(
    firestoreQuery: Query,
    mapper: (doc: QueryDocumentSnapshot<DocumentData>) => T
): UseFirestoreRealtimeResult<T> {
    const isOnline = useNetworkStatus();

    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [connectionState, setConnectionState] =
        useState<FirestoreConnectionState>('connecting');

    useEffect(() => {
        const unsubscribe = onSnapshot(
            firestoreQuery,
            (snapshot) => {
                try {
                    const parsedData = snapshot.docs.map(mapper);

                    setData(parsedData);
                    setIsLoading(false);
                    setError(null);
                    setConnectionState('connected');
                } catch (err) {
                    const parseError =
                        err instanceof Error
                            ? err
                            : new Error("Lỗi parse dữ liệu Firestore");

                    console.error(
                        "Lỗi parse dữ liệu realtime:",
                        parseError
                    );

                    setError(parseError);
                    setIsLoading(false);
                    setConnectionState('error');
                }
            },
            (err) => {
                console.error(
                    "Lỗi kết nối Firestore Realtime:",
                    err
                );

                setError(err);
                setIsLoading(false);
                setConnectionState('error');
            }
        );

        return unsubscribe;
    }, [firestoreQuery, mapper]);

    const effectiveConnectionState =
        !isOnline
            ? 'reconnecting'
            : connectionState;

    return {
        data,
        isLoading,
        error,
        connectionState: effectiveConnectionState,
    };
}