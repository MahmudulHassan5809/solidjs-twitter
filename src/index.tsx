import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import { Router } from '@solidjs/router';
import AuthProvider from './contexts/auth';
import UIProvider from './contexts/ui';

render(
    () => (
        <Router>
            <UIProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </UIProvider>
        </Router>
    ),
    document.getElementById('root')!
);
