import { useEffect, useState } from "react";
import {
    DocumentData,
    Query,
    QueryDocumentSnapshot,
    onSnapshot,
} from "firebase/firestore";

export function useFirestoreRealtime<T>(
    query: Query,
    mapper: (doc: QueryDocumentSnapshot<DocumentData>) => T
) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query,
            (snapshot) => {
                try {
                    const parsedData = snapshot.docs.map(mapper);

                    setData(parsedData);
                    setIsLoading(false);
                    setError(null);
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
                }
            },
            (err) => {
                console.error(
                    "Lỗi kết nối Firestore Realtime:",
                    err
                );

                setError(err);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, [query, mapper]);

    return {
        data,
        isLoading,
        error,
    };
}