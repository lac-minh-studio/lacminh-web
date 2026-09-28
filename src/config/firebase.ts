import { getApps, initializeApp } from 'firebase/app';
import {
    connectAuthEmulator,
    getAuth,
} from 'firebase/auth';
import {
    connectFirestoreEmulator,
    getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
    getApps().length > 0
        ? getApps()[0]
        : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const isDevelopment =
    process.env.NEXT_PUBLIC_ENV === 'development';

if (isDevelopment) {
    const EMULATOR_HOST = '127.0.0.1';
    const AUTH_PORT = 9099;
    const FIRESTORE_PORT = 8080;

    connectAuthEmulator(
        auth,
        `http://${EMULATOR_HOST}:${AUTH_PORT}`,
        {
            disableWarnings: true,
        }
    );

    connectFirestoreEmulator(
        db,
        EMULATOR_HOST,
        FIRESTORE_PORT
    );
}

export { app };