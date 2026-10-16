
'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function GlobalError({
    error,
    reset,
}: GlobalErrorProps) {
    useEffect(() => {
        console.error('Global application error:', {
            message: error.message,
            digest: error.digest,
        });
    }, [error]);

    return (
        <html lang="vi">
            <body>
                <main
                    role="alert"
                    className="flex min-h-screen items-center justify-center bg-background px-6"
                >
                    <section className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 text-center shadow-lg">
                        <div
                            aria-hidden="true"
                            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-2xl text-destructive"
                        >
                            !
                        </div>

                        <h1 className="text-2xl font-bold text-text-dark">
                            Đã xảy ra lỗi hệ thống
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-text-secondary">
                            Ứng dụng gặp sự cố ngoài dự kiến.
                            Bạn có thể thử tải lại giao diện.
                            Nếu lỗi tiếp tục xảy ra, hãy thử lại sau.
                        </p>

                        {error.digest && (
                            <p className="mt-3 text-xs text-text-secondary">
                                Mã lỗi: {error.digest}
                            </p>
                        )}

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="rounded-lg bg-primary px-5 py-2.5 font-medium text-text-light"
                            >
                                Thử lại
                            </button>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="rounded-lg border border-border px-5 py-2.5 font-medium text-text-dark"
                            >
                                Tải lại trang
                            </button>
                        </div>
                    </section>
                </main>
            </body>
        </html>
    );
}
