import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import { reducer } from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export function StoreProvider(props) {
    return <Provider store={Store}>{props.children}</Provider>
}