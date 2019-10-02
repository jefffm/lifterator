import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {
    serviceWorker.unregister()
} else {
    serviceWorker.register()
}