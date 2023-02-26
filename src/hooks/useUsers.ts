import { FirebaseError } from 'firebase/app';
import { createSignal, onMount } from 'solid-js';
import { getUsers } from '../api/user';
import { useAuthState } from '../contexts/auth';
import { useUIDispatch } from '../contexts/ui';
import { User } from '../types/User';

const useUsers = () => {
    const { user } = useAuthState()!;
    const { addSnackbar } = useUIDispatch();
    const [users, setUsers] = createSignal<User[]>([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        await loadUsers();
    });

    const loadUsers = async () => {
        setLoading(true);
        try {
            const users = await getUsers(user!);
            setUsers(users);
        } catch (error) {
            const message = (error as FirebaseError).message;
            addSnackbar({ message: message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        loading
    };
};

export default useUsers;
