// src/redux/store.ts

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {rootReducer} from "./slices";
import rootSaga from "./sagas"; // Defaults to localStorage for web

// Import your slice reducers

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Configure persist settings
const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['example'], // Specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Configure persistor
export const persistor = persistStore(store);

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
