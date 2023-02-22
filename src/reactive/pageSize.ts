import { createRoot, createSignal, onCleanup, onMount } from "solid-js";

const getClientsSize = () => ({
    height: document.body.clientHeight,
    width: document.body.clientWidth,
});

const pageSize = () => {
    const [value, setValue] = createSignal(getClientsSize());

    onMount(() => {
        window.addEventListener("resize", handleResize);
    });

    const handleResize = () => {
        setValue(getClientsSize());
    };

    onCleanup(() => {
        console.log("pageSize onCleanup");
    });

    const isXl = () => value().width > 1280;
    const isLg = () => value().width > 1024;

    return { isXl, isLg, value };
};

export default createRoot(pageSize);
