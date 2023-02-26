import {
    createContext,
    createUniqueId,
    ParentComponent,
    useContext
} from 'solid-js';
import { createStore, produce } from 'solid-js/store';

export type SnackbarMessage = {
    message: string;
    type: 'success' | 'warning' | 'error';
    id?: string;
};

type UIState = {
    snackBars: SnackbarMessage[];
};

type UIDispatch = {
    addSnackbar: (s: SnackbarMessage) => void;
    removeSnackbar: (id: string) => () => void;
};

const UISateContext = createContext<UIState>();
const UIDispatchContext = createContext<UIDispatch>();

const defaultState = (): UIState => ({
    snackBars: []
});

const UIProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<UIState>(defaultState());

    const addSnackbar = (snackbar: SnackbarMessage) => {
        setStore(
            'snackBars',
            produce((snackBars) => {
                snackBars.push({
                    id: createUniqueId(),
                    ...snackbar
                });
            })
        );
    };

    const removeSnackbar = (id: string) => () => {
        setStore(
            'snackBars',
            produce((snackBars) => {
                const index = snackBars.findIndex(
                    (snackbar) => snackbar.id === id
                );

                if (index > -1) {
                    snackBars.splice(index, 1);
                }
            })
        );
    };

    return (
        <UISateContext.Provider value={store}>
            <UIDispatchContext.Provider value={{ addSnackbar, removeSnackbar }}>
                {props.children}
            </UIDispatchContext.Provider>
        </UISateContext.Provider>
    );
};

export const useUIState = () => useContext(UISateContext)!;
export const useUIDispatch = () => useContext(UIDispatchContext)!;

export default UIProvider;
