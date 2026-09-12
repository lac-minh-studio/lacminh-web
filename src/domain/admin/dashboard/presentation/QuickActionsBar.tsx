'use client';

import React from 'react';
import { Card, Button } from '@heroui/react';
import { QuickAction, QuickActionKey } from '@/domain/admin/dashboard/model/adminUser';

interface QuickActionsBarProps {
    actions: QuickAction[];
    onActionClick?: (key: QuickActionKey) => void;
}

export function QuickActionsBar({ actions, onActionClick }: QuickActionsBarProps) {
    return (
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6">
            <Card.Content className="p-0 flex flex-row flex-wrap items-center justify-center gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Button
                            key={action.key}
                            variant="secondary"
                            onClick={() => onActionClick?.(action.key)}
                            className="font-medium"
                        >
                            <Icon size={16} className="mr-1.5" />
                            {action.label}
                        </Button>
                    );
                })}
            </Card.Content>
        </Card>
    );
}