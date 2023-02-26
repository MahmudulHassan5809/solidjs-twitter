import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    startAfter,
    Timestamp,
    where
} from 'firebase/firestore';
import { db } from '../db';
import { Glide } from '../types/Glide';
import { User } from '../types/User';

const createGlide = async (form: {
    content: string;
    uid: string;
}): Promise<Glide> => {
    const userRef = doc(db, 'users', form.uid);
    const glideToStore = {
        ...form,
        user: userRef,
        likesCount: 0,
        subGlidesCount: 0,
        date: Timestamp.now()
    };
    const glideCollection = collection(db, 'glides');
    const added = await addDoc(glideCollection, glideToStore);
    return { ...glideToStore, id: added.id };
};

const getGlides = async (
    loggedInUser: User,
    lastGlide: QueryDocumentSnapshot | null
) => {
    const _loggedInUserDoc = doc(db, 'users', loggedInUser.uid);
    const constraints: QueryConstraint[] = [orderBy('date', 'desc'), limit(10)];

    if (loggedInUser.followings.length > 0) {
        constraints.push(
            where('user', 'in', [...loggedInUser.followings, _loggedInUserDoc])
        );
    } else {
        constraints.push(where('user', '==', _loggedInUserDoc));
    }
    if (!!lastGlide) {
        constraints.push(startAfter(lastGlide));
    }
    const q = query(collection(db, 'glides'), ...constraints);
    const qSnapshot = await getDocs(q);
    const _lastGlide = qSnapshot.docs[qSnapshot.docs.length - 1];
    const glides = await Promise.all(
        qSnapshot.docs.map(async (doc) => {
            const glide = doc.data() as Glide;
            const userSnap = await getDoc(glide.user as DocumentReference);
            glide.user = userSnap.data() as User;
            return { ...glide, id: doc.id };
        })
    );

    return { glides, lastGlide: _lastGlide };
};

export { createGlide, getGlides };
