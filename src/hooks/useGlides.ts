import { FirebaseError } from 'firebase/app';
import { createSignal, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { getGlides } from '../api/glide';
import { Glide } from '../types/Glide';

type State = {
    pages: {
        [key: string]: { glides: Glide[] };
    };
    loading: boolean;
};

const createInitialState = () => ({ pages: {}, loading: false });

const useGlides = () => {
    const [page, setPage] = createSignal(1);
    const [store, setStore] = createStore<State>(createInitialState());

    onMount(async () => {
        await loadGlides();
    });

    const loadGlides = async () => {
        const _page = page();
        setStore('loading', true);
        try {
            const { glides } = await getGlides();
            if (glides.length > 0) {
                setStore(
                    produce((store) => {
                        store.pages[_page] = { glides };
                    })
                );
            }
            // setStore('glides', glides);
        } catch (error) {
            const message = (error as FirebaseError).message;
            console.log(message);
        } finally {
            setStore('loading', false);
        }
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

    return {
        page,
        store,
        addGlide,
        loadGlides
    };
};

export default useGlides;
