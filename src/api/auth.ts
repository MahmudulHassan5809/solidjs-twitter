import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../db';
import { AuthForm, RegisterForm } from '../types/Form';
import { User } from '../types/User';

const register = async (form: RegisterForm) => {
    const { user: registeredUser } = await createUserWithEmailAndPassword(
        firebaseAuth,
        form.email,
        form.password
    );

    const user: User = {
        uid: registeredUser.uid,
        fullName: form.fullName,
        email: form.email,
        nickName: form.nickName,
        avatar: form.avatar,
        followers: [],
        followings: [],
        followersCount: 0,
        followingCount: 0
    };

    await setDoc(doc(db, 'users', registeredUser.uid), user);

    return registeredUser;
};

const logout = async () => {
    return await signOut(firebaseAuth);
};

const login = async (loginForm: AuthForm) => {
    const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        loginForm.email,
        loginForm.password
    );

    return user;
};

export { register, logout, login };
