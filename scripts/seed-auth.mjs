import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import {
    getFirestore,
    Timestamp,
} from 'firebase-admin/firestore';

const PROJECT_ID = 'demo-no-project';

const USERS = [
    {
        email: 'hoanganh@lacminh.com',
        password: 'password123',
        displayName: 'Trần Hoàng Anh',
        role: 'SUPER_ADMIN',
        fullName: 'Trần Hoàng Anh',
        phone: '0374352511',
        department: 'Engineering',
        title: 'Frontend Developer',
        status: true,
    },
    {
        email: 'huunl@lacminh.com',
        password: 'password123',
        displayName: 'Nguyễn Lê Hữu',
        role: 'ADMIN',
        fullName: 'Nguyễn Lê Hữu',
        phone: '0912345678',
        department: 'Product',
        title: 'Product Manager',
        status: true,
    },
    {
        email: 'tam.pm@lacminh.com',
        password: 'password123',
        displayName: 'Phạm Minh Tâm',
        role: 'STAFF',
        fullName: 'Phạm Minh Tâm',
        phone: '0987654321',
        department: 'UI/UX Design',
        title: 'UX Designer',
        status: false,
    },
    {
        email: 'cuongle@lacminh.com',
        password: 'password123',
        displayName: 'Lê Cường',
        role: 'STAFF',
        fullName: 'Lê Cường',
        phone: '0909123123',
        department: 'Helpdesk',
        title: 'IT Support Engineer',
        status: true,
    },
];

if (
    !process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    !process.env.FIRESTORE_EMULATOR_HOST
) {
    process.exit(1);
}

const app =
    getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            projectId: PROJECT_ID,
        });

const auth = getAuth(app);
const db = getFirestore(app);

async function seedUsers() {
    for (const userData of USERS) {
        let user;

        /*
         * 1. Tìm user theo email.
         * Nếu chưa tồn tại thì tạo mới.
         */
        try {
            user = await auth.getUserByEmail(
                userData.email
            );

            console.log(
                `ℹ️ User đã tồn tại: ${userData.email}`
            );
        } catch (error) {
            if (
                error?.code === 'auth/user-not-found'
            ) {
                user = await auth.createUser({
                    email: userData.email,
                    password: userData.password,
                    displayName: userData.displayName,
                });

                console.log(
                    `✅ Created: ${userData.email}`
                );
            } else {
                throw error;
            }
        }

        /*
         * 2. Set Firebase Auth Custom Claim
         */
        await auth.setCustomUserClaims(
            user.uid,
            {
                role: userData.role,
            }
        );

        console.log(
            ` UID: ${user.uid} + Role: ${userData.role}`
        );
        /*
         * 3. Tạo / cập nhật Staff Profile
        */
        await db
            .collection('staffs')
            .doc(user.uid)
            .set(
                {
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phone,
                    department: userData.department,
                    title: userData.title,
                    role: userData.role,
                    status: userData.status,
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                },
                {
                    merge: true,
                }
            );

        console.log(
            `   └── staffs/${user.uid} updated`
        );

    }
}

seedUsers().catch((error) => {
    console.error(
        '\n❌ Seed failed:',
        error
    );

    process.exit(1);
});