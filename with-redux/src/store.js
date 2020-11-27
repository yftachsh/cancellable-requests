import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxpack } from 'redux-pack';

import cancellable from './redux-cancellable';

import rootReducer from './reducers';

export default createStore(
    rootReducer,
    applyMiddleware(reduxpack, cancellable)
);