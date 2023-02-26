import { For } from 'solid-js';
import { useUIDispatch, useUIState } from '../../contexts/ui';
import { Snackbar } from './index';

export default function SnackbarContainer() {
    const { snackBars } = useUIState();
    const { removeSnackbar } = useUIDispatch();
    return (
        <div class="fixed z-50 top-0 right-0 p-4 w-ful md:max-w-xs">
            <ul class="flex flex-col space-y-2">
                <For each={snackBars}>
                    {(snackbar) => (
                        <Snackbar
                            message={snackbar.message}
                            type={snackbar.type}
                            onClose={removeSnackbar(snackbar.id!)}
                        />
                    )}
                </For>
            </ul>
        </div>
    );
}
