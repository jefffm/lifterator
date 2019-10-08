import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';

import rootReducer from './reducers'
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register()