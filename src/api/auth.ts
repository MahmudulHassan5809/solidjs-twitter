import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../db';
import { AuthForm, RegisterForm } from '../types/Form';
import { User } from '../types/User';

export type AuthType = 'register' | 'login';

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
        followingsCount: 0
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

const authenticate = async (form: AuthForm, type: AuthType) => {
    return type === 'login'
        ? await login(form)
        : await register(form as RegisterForm);
};

const getUser = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User;
};

export { register, logout, login, authenticate, getUser };
