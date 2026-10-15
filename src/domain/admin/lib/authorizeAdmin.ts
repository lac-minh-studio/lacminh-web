
import 'server-only';

import type { NextRequest } from 'next/server';
import { adminAuth } from '@/domain/admin/lib/firebase-admin';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';

export class AuthorizationError extends Error {
    constructor(
        public readonly status: 401 | 403,
        message: string,
    ) {
        super(message);
        this.name = 'AuthorizationError';
    }
}

export async function authorizeAdmin(
    request: NextRequest,
    allowedRoles: AdminRole[],
) {
    const authorization = request.headers.get('authorization');

    if (!authorization?.startsWith('Bearer ')) {
        throw new AuthorizationError(401, 'Missing authentication token');
    }

    const token = authorization.slice('Bearer '.length).trim();

    if (!token) {
        throw new AuthorizationError(401, 'Missing authentication token');
    }

    let decodedToken;

    try {
        decodedToken = await adminAuth.verifyIdToken(token, true);
    } catch {
        throw new AuthorizationError(401, 'Invalid or expired authentication token');
    }

    const role = decodedToken.role;

    if (
        role !== 'SUPER_ADMIN' &&
        role !== 'ADMIN' &&
        role !== 'STAFF'
    ) {
        throw new AuthorizationError(403, 'Invalid account role');
    }

    if (!allowedRoles.includes(role)) {
        throw new AuthorizationError(403, 'Insufficient permissions');
    }

    return {
        uid: decodedToken.uid,
        email: decodedToken.email ?? '',
        role,
    };
}
