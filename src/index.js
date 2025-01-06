import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'

import {store} from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LocalStorage, LOCAL_STORAGE_KEY} from './util/localStorage';

LocalStorage.set(LOCAL_STORAGE_KEY.REDUX_STATE, store.getState());
store.subscribe(() => {
    LocalStorage.set(LOCAL_STORAGE_KEY.REDUX_STATE, store.getState());
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
