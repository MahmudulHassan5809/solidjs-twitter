import { FirebaseError } from 'firebase/app';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createGlide } from '../api/glide';
import { useAuthState } from '../contexts/auth';
import { useUIDispatch } from '../contexts/ui';
import { GliderInputEvent, MessengerForm } from '../types/Form';

const useMessenger = () => {
    const { isAuthenticated, user } = useAuthState()!;
    const { addSnackbar } = useUIDispatch();
    const [loading, setLoading] = createSignal(false);
    const [form, setForm] = createStore<MessengerForm>({
        content: ''
    });

    const handleInput = (e: GliderInputEvent) => {
        const { name, value } = e.currentTarget;
        setForm(name, value);
    };

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            addSnackbar({
                message: 'Your are not authenticated',
                type: 'error'
            });
            return;
        }
        setLoading(true);
        const glide = {
            ...form,
            uid: user!.uid
        };

        try {
            await createGlide(glide);
            addSnackbar({ message: 'Glide added', type: 'success' });
            setForm({ content: '' });
        } catch (error) {
            const message = (error as FirebaseError).message;
            addSnackbar({ message: message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };
    return { handleInput, handleSubmit, form, loading };
};

export default useMessenger;
