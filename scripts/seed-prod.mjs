import {
    getApps,
    initializeApp,
} from 'firebase-admin/app';

import {
    getAuth,
} from 'firebase-admin/auth';

import {
    getFirestore,
    Timestamp,
} from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;


function validateEnvironment() {
    if (
        process.env.FIREBASE_AUTH_EMULATOR_HOST ||
        process.env.FIRESTORE_EMULATOR_HOST
    ) {
        throw new Error(
            '[Seed:Prod] Emulator environment detected. ' +
            'Production seed has been aborted.'
        );
    }

    if (!projectId) {
        throw new Error(
            '[Seed:Prod] Missing FIREBASE_PROJECT_ID.'
        );
    }

    if (!adminEmail) {
        throw new Error(
            '[Seed:Prod] Missing SEED_ADMIN_EMAIL.'
        );
    }

    if (!adminPassword) {
        throw new Error(
            '[Seed:Prod] Missing SEED_ADMIN_PASSWORD.'
        );
    }

    if (adminPassword.length < 6) {
        throw new Error(
            '[Seed:Prod] SEED_ADMIN_PASSWORD must contain at least 6 characters.'
        );
    }
}

function initializeFirebaseAdmin() {
    if (getApps().length > 0) {
        return getApps()[0];
    }

    return initializeApp({
        projectId,
    });
}

/**
 * Create or update the default SUPER_ADMIN account
 * and its corresponding Firestore staff document.
 */
async function seedProductionAdmin() {
    validateEnvironment();

    const app = initializeFirebaseAdmin();

    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log(
        `[Seed:Prod] Target project: ${projectId} `
    );

    console.log(
        `[Seed:Prod] Initializing SUPER_ADMIN: ${adminEmail} `
    );

    let user;

    try {
        user = await auth.getUserByEmail(adminEmail);

        console.log(
            `[Seed:Prod] Existing Auth user found: ${user.uid} `
        );

        await auth.updateUser(user.uid, {
            email: adminEmail,
            password: adminPassword,
            displayName: 'System Administrator',
        });

        console.log(
            '[Seed:Prod] Existing Auth user updated.'
        );
    } catch (error) {
        if (error?.code !== 'auth/user-not-found') {
            throw error;
        }

        user = await auth.createUser({
            email: adminEmail,
            password: adminPassword,
            displayName: 'System Administrator',
        });

        console.log(
            `[Seed:Prod] Auth user created: ${user.uid} `
        );
    }

    await auth.setCustomUserClaims(user.uid, {
        role: 'SUPER_ADMIN',
    });

    console.log(
        '[Seed:Prod] Custom claim assigned: SUPER_ADMIN'
    );

    const staffRef = db
        .collection('staffs')
        .doc(user.uid);

    const staffSnapshot = await staffRef.get();

    const now = Timestamp.now();

    const staffData = {
        fullName: 'System Administrator',
        email: adminEmail,
        phone: '',
        department: 'Management',
        title: 'Administrator',
        role: 'SUPER_ADMIN',
        status: true,
        updated_at: now,
    };

    if (!staffSnapshot.exists) {
        await staffRef.set({
            ...staffData,
            created_at: now,
        });

        console.log(
            `[Seed:Prod] Created staffs / ${user.uid} `
        );
    } else {
        await staffRef.set(
            staffData,
            {
                merge: true,
            }
        );

        console.log(
            `[Seed:Prod] Updated staffs / ${user.uid} `
        );
    }

    console.log(
        '[Seed:Prod] Production SUPER_ADMIN initialization completed successfully.'
    );
}

seedProductionAdmin()
    .catch((error) => {
        console.error(
            '[Seed:Prod] Failed:',
            error
        );

        process.exitCode = 1;
    });

