'use client';

import { useSyncExternalStore } from 'react';
import { Card } from '@heroui/react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { LineChartPoint, PieChartSegment } from '@/domain/admin/dashboard/model/adminUser';

interface AnalyticsChartsProps {
    lineData: LineChartPoint[];
    pieData: PieChartSegment[];
    isLoading?: boolean;
}

// Hook kiểm tra Client-side mount chuẩn theo khuyến nghị của React (không gây cascading render)
const emptySubscribe = () => () => { };
function useHasMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

export function AnalyticsCharts({ lineData, pieData, isLoading }: AnalyticsChartsProps) {
    const isMounted = useHasMounted();

    if (isLoading || !isMounted) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-80 bg-default-soft animate-pulse rounded-2xl flex items-center justify-center text-text-muted text-sm">
                    Đang tải biểu đồ...
                </div>
                <div className="lg:col-span-1 h-80 bg-default-soft animate-pulse rounded-2xl flex items-center justify-center text-text-muted text-sm">
                    Đang tải biểu đồ...
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line Chart */}
            <Card className="lg:col-span-2 border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
                <Card.Header className="p-0 border-none">
                    <Card.Title className="text-md font-bold text-text-dark">
                        Tăng trưởng Người dùng & Doanh thu
                    </Card.Title>
                </Card.Header>
                <Card.Content className="p-0 w-full h-65 min-h-65">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="period" stroke="#888888" fontSize={12} tickLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} name="Người dùng" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card.Content>
            </Card>

            {/* Pie Chart */}
            <Card className="lg:col-span-1 border border-border bg-surface shadow-sm rounded-2xl p-6 space-y-4">
                <Card.Header className="p-0 border-none">
                    <Card.Title className="text-md font-bold text-text-dark">
                        Phân bổ Nhân sự
                    </Card.Title>
                </Card.Header>
                <Card.Content className="p-0 flex flex-col items-center justify-between w-full h-65 min-h-65">
                    <div className="w-full h-50">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 justify-center pb-2">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center gap-1.5 text-xs">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <span className="text-text-secondary">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}