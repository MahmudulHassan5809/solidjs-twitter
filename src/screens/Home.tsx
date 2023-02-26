import { Component, For } from 'solid-js';

import MainLayout from '../components/layouts/Main';
import GlidePost from '../components/glides/GlidePost';
import Messenger from '../components/utils/Messenger';
import useGlides from '../hooks/useGlides';

const HomeScreen: Component = () => {
    const { store, page, addGlide } = useGlides();

    return (
        <MainLayout>
            <Messenger onGlideAdded={addGlide} />
            <div class="h-px bg-gray-700 my-1" />
            <For each={Array.from({ length: page() })}>
                {(_, index) => (
                    <For each={store.pages[index() + 1]?.glides}>
                        {(glide) => <GlidePost glide={glide} />}
                    </For>
                )}
            </For>
        </MainLayout>
    );
};

export default HomeScreen;
