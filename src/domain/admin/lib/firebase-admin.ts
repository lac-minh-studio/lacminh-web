
import 'server-only';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { applicationDefault, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!projectId) {
    throw new Error('Missing Firebase project ID');
}

function initializeFirebaseAdmin() {
    const existingApp = getApps().find(
        (app) => app.name === '[DEFAULT]',
    );

    if (existingApp) {
        return getApp();
    }

    const useEmulator =
        process.env.NEXT_PUBLIC_ENV === 'development';

    if (useEmulator) {
        // Admin SDK tự kết nối Emulator thông qua biến môi trường.
        return initializeApp({ projectId });
    }

    const clientEmail =
        process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    const privateKey =
        process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    if (clientEmail && privateKey) {
        return initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
            projectId,
        });
    }

    return initializeApp({
        credential: applicationDefault(),
        projectId,
    });
}

const adminApp = initializeFirebaseAdmin();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
