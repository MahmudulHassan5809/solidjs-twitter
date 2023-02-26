import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    increment,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../db';
import { User } from '../types/User';

const getUsers = async (loggedInUser: User) => {
    const q = query(
        collection(db, 'users'),
        where('uid', '!=', loggedInUser.uid)
    );
    const querySnapShot = await getDocs(q);

    const users = querySnapShot.docs
        .map((doc) => {
            const user = doc.data() as User;
            return user;
        })
        .filter((user) => {
            const hasFollowing =
                loggedInUser.followings.filter(
                    (following) => following.id === user.uid
                ).length > 0;
            return !hasFollowing;
        });

    return users;
};

const followUser = async (followerUid: string, followingUid: string) => {
    const followerRef = doc(db, 'users', followerUid);
    const followingRef = doc(db, 'users', followingUid);

    await updateDoc(followerRef, {
        followings: arrayUnion(followingRef),
        followingsCount: increment(1)
    });

    await updateDoc(followingRef, {
        followers: arrayUnion(followerRef),
        followersCount: increment(1)
    });

    return followingRef;
};

export { getUsers, followUser };
