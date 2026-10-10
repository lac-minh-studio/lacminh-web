'use client';

import { Card } from '@heroui/react';
import { MetricCardConfig } from '@/domain/admin/dashboard/model/adminUser';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardsProps {
    configs: MetricCardConfig[];
    isLoading?: boolean;
}

export function MetricsGrid({ configs, isLoading }: MetricCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {configs.map((item) => {
                const Icon = item.icon;
                return (
                    <Card
                        key={item.id}
                        className="rounded-xl border border-border bg-surface p-5 hover:bg-background/60 transition-colors shadow-xs"
                    >
                        <Card.Content className="p-0 space-y-4">
                            {/* Header: Icon + Title */}
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-text-secondary shrink-0" />
                                <span className="text-sm font-medium text-text-secondary truncate">
                                    {item.title}
                                </span>
                            </div>

                            {/* Value + Change Rate */}
                            <div className="flex items-baseline justify-between gap-2">
                                {isLoading ? (
                                    <div className="h-9 w-28 bg-border/40 rounded-lg animate-pulse" />
                                ) : (
                                    <p className="text-3xl font-bold tracking-tight text-text-dark">
                                        {item.value}
                                    </p>
                                )}

                                {/* Chỉ số biến động (%) nếu có */}
                                {item.change && (
                                    <div
                                        className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${item.isPositive
                                            ? 'bg-success/10 text-success'
                                            : 'bg-danger/10 text-danger'
                                            }`}
                                    >
                                        {item.isPositive ? (
                                            <ArrowUp size={12} />
                                        ) : (
                                            <ArrowDown size={12} />
                                        )}
                                        <span>{item.change}</span>
                                    </div>
                                )}
                            </div>
                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
}