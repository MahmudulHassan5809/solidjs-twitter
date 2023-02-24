import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBSivgjEpeo55AxzneDf-v6URGy0v-flQk',
    authDomain: 'solidjs-twitter.firebaseapp.com',
    projectId: 'solidjs-twitter',
    storageBucket: 'solidjs-twitter.appspot.com',
    messagingSenderId: '111678592628',
    appId: '1:111678592628:web:1ce575994a6d4d57ab6321',
    measurementId: 'G-3C2PY4405C'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firebaseAuth = getAuth(app);
