import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {BrowserRouter} from "react-router-dom";
import {store} from "./state/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);

serviceWorkerRegistration.register();

