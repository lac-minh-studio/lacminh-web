import {
    createFirebaseEmulatorTest,
    readFirebaseEmulatorTests,
} from './firebaseEmulatorPoc';

async function main() {
    console.log('Starting Firebase Emulator POC...');

    const createdId = await createFirebaseEmulatorTest();

    console.log('Created document:', createdId);

    const records = await readFirebaseEmulatorTests();

    console.log('Read records:');
    console.dir(records, { depth: null });

    console.log('Firebase Emulator POC completed successfully.');
}

main().catch((error) => {
    console.error('Firebase Emulator POC failed.');
    console.error(error);

    process.exit(1);
});