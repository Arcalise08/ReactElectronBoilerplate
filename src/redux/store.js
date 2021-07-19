import React from 'react';
import {createStore} from 'redux';
import globalState from './reducers';
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, globalState);

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}
