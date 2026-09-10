// components/dashboard/MetricCards.tsx
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
                    <Card key={item.id}>
                        <Card.Content className="flex flex-row items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-soft text-accent shrink-0">
                                <Icon size={22} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm text-default-500">{item.title}</span>
                                {isLoading ? (
                                    <div className="h-6 w-24 bg-default-soft rounded animate-pulse mt-1" />
                                ) : (
                                    <span className="text-xl font-semibold truncate">{item.value}</span>
                                )}
                                <div
                                    className={`flex items-center gap-1 text-xs mt-1 ${item.isPositive ? 'text-success-600' : 'text-danger-600'
                                        }`}
                                >
                                    {item.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                    <span>{item.change}</span>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                );
            })}
        </div>
    );
}