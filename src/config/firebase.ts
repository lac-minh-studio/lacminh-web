import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Tránh khởi tạo duplicate app khi Next.js HMR/Fast Refresh
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);

// Flag kiểm tra xem emulator đã được connect chưa (dành cho Next.js dev server)
let isEmulatorConnected = false;

if (process.env.NODE_ENV === 'development' && !isEmulatorConnected) {
    const EMULATOR_HOST = '127.0.0.1';
    const AUTH_PORT = 9099;
    const FIRESTORE_PORT = 8080;

    // 1. Kiểm tra môi trường (Guard check) trước khi connect
    fetch(`http://${EMULATOR_HOST}:${FIRESTORE_PORT}`)
        .catch(() => {
            console.error(
                '❌ ERROR: Firebase Local Emulator Suite chưa được khởi chạy!\n' +
                'Hãy chạy `npm run emulator` trước khi start ứng dụng để tránh rò rỉ dữ liệu lên Production.'
            );
        });

    // 2. Tích hợp Emulator
    connectAuthEmulator(auth, `http://${EMULATOR_HOST}:${AUTH_PORT}`, {
        disableWarnings: true,
    });
    connectFirestoreEmulator(db, EMULATOR_HOST, FIRESTORE_PORT);

    isEmulatorConnected = true;
}

export { app };