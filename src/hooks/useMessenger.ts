import { FirebaseError } from 'firebase/app';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createGlide, uploadImage } from '../api/glide';
import { useAuthState } from '../contexts/auth';
import { useUIDispatch } from '../contexts/ui';
import { GliderInputEvent, MessengerForm, UploadImage } from '../types/Form';

const defaultImage = () => ({
    buffer: new ArrayBuffer(0),
    name: '',
    previewUrl: ''
});

const useMessenger = (answerTo?: string) => {
    const { isAuthenticated, user } = useAuthState()!;
    const { addSnackbar } = useUIDispatch();
    const [image, setImage] = createSignal<UploadImage>(defaultImage());
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
            if (image().buffer.byteLength > 0) {
                const downloadUrl = await uploadImage(image());
                glide.mediaUrl = downloadUrl;
            }

            const newGlide = await createGlide(glide, answerTo);
            newGlide.user = {
                nickName: user!.nickName,
                avatar: user!.avatar
            };
            addSnackbar({ message: 'Glide added', type: 'success' });
            setForm({ content: '' });
            setImage(defaultImage());
            return newGlide;
        } catch (error) {
            const message = (error as FirebaseError).message;
            addSnackbar({ message: message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };
    return { handleInput, handleSubmit, form, loading, image, setImage };
};

export default useMessenger;
