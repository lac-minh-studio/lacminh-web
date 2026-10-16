
'use client';

import { ActivityData } from '../model/types';
import { X, ArrowRight, Clock, Monitor, Globe, User } from 'lucide-react';

interface AuditLogDiffModalProps {
    log: ActivityData | null;
    onClose: () => void;
}

function formatValue(value: unknown): string {
    if (value === null || value === undefined) {
        return 'Không có dữ liệu';
    }

    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }

    return String(value);
}

function isEqualValue(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function formatTimestamp(log: ActivityData): string {
    try {
        return log.createdAt.toDate().toLocaleString('vi-VN');
    } catch {
        return 'Không có thời gian';
    }
}

export function AuditLogDiffModal({
    log,
    onClose,
}: AuditLogDiffModalProps) {
    if (!log) return null;

    const before = log.before;
    const after = log.after;

    const keys = Array.from(
        new Set([
            ...Object.keys(before ?? {}),
            ...Object.keys(after ?? {}),
        ]),
    );

    const changedKeys = keys.filter(
        (key) => !isEqualValue(before?.[key], after?.[key]),
    );

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="audit-log-modal-title"
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-5 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-100"
            >
                <header className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="audit-log-modal-title"
                            className="text-xl font-semibold"
                        >
                            Chi tiết nhật ký
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {log.action} — {log.target}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Đóng chi tiết nhật ký"
                        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <User size={16} />
                            Người thực hiện
                        </div>
                        <p className="break-words font-medium">{log.user}</p>
                        {log.actorUid && (
                            <p className="mt-1 break-all text-xs text-gray-500">
                                UID: {log.actorUid}
                            </p>
                        )}
                    </div>

                    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={16} />
                            Thời gian
                        </div>
                        <p className="font-medium">{formatTimestamp(log)}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <Globe size={16} />
                            Địa chỉ IP
                        </div>
                        <p className="break-all font-medium">
                            {log.ipAddress || 'Không có dữ liệu'}
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                            <Monitor size={16} />
                            Thiết bị / trình duyệt
                        </div>
                        <p className="break-words text-sm">
                            {log.userAgent || 'Không có dữ liệu'}
                        </p>
                    </div>
                </div>

                <h3 className="mb-3 font-semibold">
                    So sánh thay đổi dữ liệu
                </h3>

                {!before && !after ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
                        Nhật ký này được tạo trước khi tính năng lưu
                        Before / After được triển khai.
                    </div>
                ) : changedKeys.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
                        Không tìm thấy trường dữ liệu thay đổi.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full min-w-[520px] text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="p-3">Trường dữ liệu</th>
                                    <th className="p-3">Trước (Before)</th>
                                    <th className="p-3">Sau (After)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {changedKeys.map((key) => (
                                    <tr
                                        key={key}
                                        className="border-t border-gray-200 dark:border-gray-700"
                                    >
                                        <td className="p-3 font-medium">
                                            {key}
                                        </td>
                                        <td className="p-3">
                                            <pre className="whitespace-pre-wrap break-words rounded bg-red-50 p-2 text-red-800 dark:bg-red-950 dark:text-red-200">
                                                {formatValue(before?.[key])}
                                            </pre>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-start gap-2">
                                                <ArrowRight
                                                    size={16}
                                                    className="mt-1 shrink-0 text-green-600"
                                                />
                                                <pre className="whitespace-pre-wrap break-words rounded bg-green-50 p-2 text-green-800 dark:bg-green-950 dark:text-green-200">
                                                    {formatValue(after?.[key])}
                                                </pre>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
