'use client';

import { Popover, Button, Avatar, Chip } from '@heroui/react';
import { Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { ActivityData } from '@/domain/admin/dashboard/model/adminUser';
interface ActivityNotificationPopoverProps {
    data: ActivityData[];
    isLoading?: boolean;
    error?: Error | null;
}

const statusColorMap: Record<ActivityData['status'], 'success' | 'warning' | 'danger'> = {
    Success: 'success',
    Pending: 'warning',
    Failed: 'danger',
};

const statusIconMap = {
    Success: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,
    Pending: <Clock className="h-3.5 w-3.5 text-warning" />,
    Failed: <AlertCircle className="h-3.5 w-3.5 text-danger" />,
};

export function ActivityNotificationPopover({
    data: logs,
    isLoading = false,
    error = null,
}: ActivityNotificationPopoverProps) {

    return (
        <Popover>
            <Popover.Trigger>
                <Button
                    isIconOnly
                    aria-label="Nhật ký hoạt động"
                    variant="outline"
                    className="relative rounded-full text-text-secondary hover:bg-background"
                >
                    <Bell className="h-5 w-5" />

                    {logs.length > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />
                    )}
                </Button>
            </Popover.Trigger>

            <Popover.Content
                placement="bottom"
                className="w-80 sm:w-96 rounded-2xl border border-border bg-surface p-0 shadow-lg"
            >
                <div className="flex items-center justify-between border-b border-border p-4 pb-3">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-text-dark">
                            Nhật ký hoạt động
                        </h3>

                        <Chip
                            size="sm"
                            variant="soft"
                            color="default"
                        >
                            <Chip.Label>
                                {logs.length}
                            </Chip.Label>
                        </Chip>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-border/40">
                    {isLoading ? (
                        <p className="py-8 text-center text-sm text-text-muted">
                            Đang tải hoạt động...
                        </p>
                    ) : error ? (
                        <p className="py-8 text-center text-sm text-danger">
                            Không thể tải nhật ký hoạt động.
                        </p>
                    ) : logs.length === 0 ? (
                        <p className="py-8 text-center text-sm text-text-muted italic">
                            Không có hoạt động nào gần đây
                        </p>
                    ) : (
                        logs.map((item) => (
                            <div
                                key={item.id}
                                className="flex cursor-pointer items-start gap-3 p-3.5 transition-colors hover:bg-background/60"
                            >
                                <div className="relative shrink-0">
                                    <Avatar
                                        size="md"
                                        className="bg-primary/10 text-primary font-semibold text-sm"
                                    >
                                        <Avatar.Fallback>
                                            {item.user.charAt(0)}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <span className="absolute -bottom-1 -right-1 rounded-full bg-surface p-0.5 shadow-xs">
                                        {statusIconMap[item.status]}
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-xs leading-snug text-text-dark">
                                        <span className="font-semibold">
                                            {item.user}
                                        </span>{' '}
                                        <span>{item.action}</span>{' '}
                                        <span className="font-medium text-primary">
                                            {item.target}
                                        </span>
                                    </p>

                                    <div className="flex items-center justify-between pt-0.5">
                                        <span className="text-2sx text-text-muted">
                                            {item.time}
                                        </span>

                                        <Chip
                                            color={statusColorMap[item.status]}
                                            variant="soft"
                                            size="sm"
                                            className="h-5 px-1.5 text-[10px]"
                                        >
                                            <Chip.Label>
                                                {item.status}
                                            </Chip.Label>
                                        </Chip>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {logs.length > 0 && (
                    <div className="border-t border-border p-2 text-center">
                        <button
                            type="button"
                            className="w-full cursor-pointer rounded-lg py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-background"
                        >
                            Xem tất cả nhật ký
                        </button>
                    </div>
                )}
            </Popover.Content>
        </Popover>
    );
}