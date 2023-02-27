import {
    DocumentReference,
    QueryDocumentSnapshot,
    Timestamp
} from 'firebase/firestore';
import { User } from './User';

export interface Glide {
    id: string;
    uid: string;
    lookup?: string;
    content: string;
    user: Partial<User> | DocumentReference;
    likesCount: number;
    subGlidesCount: number;
    date: Timestamp;
}

export type UserGlide = {
    lookup: DocumentReference;
};

export type UseGlideState = {
    pages: {
        [key: string]: { glides: Glide[] };
    };
    loading: boolean;
    lastGlide: QueryDocumentSnapshot | null;
};
