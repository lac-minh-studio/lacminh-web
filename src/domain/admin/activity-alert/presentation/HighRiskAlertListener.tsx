'use client';

import { useHighRiskAlerts } from '../application/useHighRiskAlerts';

export function HighRiskAlertListener() {
    useHighRiskAlerts();

    return null;
}