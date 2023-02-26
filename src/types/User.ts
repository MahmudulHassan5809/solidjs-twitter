import { DocumentReference } from 'firebase/firestore';

export interface User {
    uid: string;
    nickName: string;
    fullName: string;
    email: string;
    avatar: string;
    followers: DocumentReference[];
    followings: DocumentReference[];
    followersCount: number;
    followingsCount: number;
}
