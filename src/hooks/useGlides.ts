import { FirebaseError } from 'firebase/app';
import { QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore';
import { createSignal, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getGlides, subscribeToGlides } from '../api/glide';
import { useAuthState } from '../contexts/auth';
import { Glide } from '../types/Glide';

type State = {
    pages: {
        [key: string]: { glides: Glide[] };
    };
    loading: boolean;
    lastGlide: QueryDocumentSnapshot | null;
    freshGlides: Glide[];
};

const createInitState = () => ({
    pages: {},
    loading: false,
    lastGlide: null,
    freshGlides: []
});

const useGlides = () => {
    const { user } = useAuthState()!;
    const [page, setPage] = createSignal(1);
    const [store, setStore] = createStore<State>(createInitState());

    let unSubscribe: Unsubscribe;

    onMount(() => {
        loadGlides();
    });

    const loadGlides = async () => {
        const _page = page();

        if (_page > 1 && !store.lastGlide) return;

        setStore('loading', true);
        try {
            const { glides, lastGlide } = await getGlides(
                user!,
                store.lastGlide
            );
            if (glides.length > 0) {
                setStore(
                    produce((store) => {
                        store.pages[_page] = { glides };
                    })
                );

                setPage(_page + 1);
            }
            setStore('lastGlide', lastGlide);
            // setStore('glides', glides);
        } catch (error) {
            const message = (error as FirebaseError).message;
            console.log(message);
        } finally {
            setStore('loading', false);
        }
    };

    const subscribeToNewGlides = async () => {
        if (user?.followings.length === 0) {
            return;
        }
        try {
            unSubscribe = await subscribeToGlides(
                user!,
                (freshGlides: Glide[]) => {
                    setStore('freshGlides', freshGlides);
                    console.log(freshGlides);
                }
            );
        } catch (error) {}
    };

    const unsubscribeFromGlides = () => {
        if (!!unSubscribe) {
            unSubscribe();
        }
    };

    const reSubscribe = () => {
        unsubscribeFromGlides();
        subscribeToNewGlides();
    };

    const addGlide = (glide: Glide | undefined) => {
        if (!glide) return;
        const page = 1;
        setStore(
            produce((store) => {
                if (!store.pages[page]) {
                    store.pages[page] = { glides: [] };
                }

                // store.pages[page].glides = [
                //     { ...glide },
                //     ...store.pages[page].glides
                // ];

                store.pages[page].glides.unshift({ ...glide });
            })
        );
    };

    const displayFreshGlides = () => {
        store.freshGlides.forEach((freshGlide) => {
            addGlide(freshGlide);
        });

        setStore('freshGlides', []);
        reSubscribe();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        page,
        loadGlides,
        addGlide,
        subscribeToNewGlides,
        store,
        unsubscribeFromGlides,
        displayFreshGlides
    };
};

export default useGlides;
