import ReactDOM from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { store } from "./features/app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}


