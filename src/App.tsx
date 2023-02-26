import { Component } from 'solid-js';
import SnackbarContainer from './components/snackbar/Container';
import AppRouters from './router';

const App: Component = () => {
    return (
        <>
            <div id="popups" />
            <SnackbarContainer />
            <AppRouters />
        </>
    );
};

export default App;
