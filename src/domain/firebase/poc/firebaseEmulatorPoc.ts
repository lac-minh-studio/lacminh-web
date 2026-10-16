import {
    addDoc,
    collection,
    getDocs,
    limit,
    query,
    serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/config/firebase';

const COLLECTION_NAME = 'emulator-tests';

export async function createFirebaseEmulatorTest() {
    const collectionRef = collection(db, COLLECTION_NAME);

    const docRef = await addDoc(collectionRef, {
        message: 'Firebase Emulator Test',
        createdAt: serverTimestamp(),
    });

    return docRef.id;
}

export async function readFirebaseEmulatorTests() {
    const collectionRef = collection(db, COLLECTION_NAME);

    const q = query(
        collectionRef,
        limit(10)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}