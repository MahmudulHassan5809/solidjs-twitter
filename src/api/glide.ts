import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    setDoc,
    startAfter,
    Timestamp,
    where
} from 'firebase/firestore';
import { db } from '../db';
import { Glide, UserGlide } from '../types/Glide';
import { User } from '../types/User';

const getGlideById = async (id: string, uid: string) => {
    const userDocRef = doc(db, 'users', uid);
    const userGlideRef = doc(userDocRef, 'glides', id);

    const userGlideSnap = await getDoc(userGlideRef);
    const userGlide = userGlideSnap.data() as UserGlide;
    const glideSnap = await getDoc(userGlide.lookup);
    const userDocSnap = await getDoc(userDocRef);

    const glide = {
        ...glideSnap.data(),
        user: userDocSnap.data(),
        id: glideSnap.id,
        lookup: glideSnap.ref.path
    } as Glide;

    return glide;
};

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
    const userGlideRef = doc(userRef, 'glides', added.id);
    await setDoc(userGlideRef, { lookup: added });
    return { ...glideToStore, id: added.id, lookup: added.path };
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
            return { ...glide, id: doc.id, lookup: doc.ref.path };
        })
    );

    return { glides, lastGlide: _lastGlide };
};

const subscribeToGlides = async (
    loggedInUser: User,
    getCallback: (glides: Glide[]) => void
) => {
    const _collection = collection(db, 'glides');
    const constraints = [
        where('date', '>', Timestamp.now()),
        where('user', 'in', loggedInUser.followings)
    ];

    const q = query(_collection, ...constraints);

    return onSnapshot(q, async (querySnapshot) => {
        const glides = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const glide = doc.data() as Glide;
                const userSnap = await getDoc(glide.user as DocumentReference);
                glide.user = userSnap.data() as User;
                return { ...glide, id: doc.id, lookup: doc.ref.path };
            })
        );

        getCallback(glides);
    });
};

export { createGlide, getGlides, subscribeToGlides, getGlideById };
