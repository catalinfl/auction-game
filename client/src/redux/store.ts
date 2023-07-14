import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import containerSlice from './slices/containerSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({
    themeSlice, authSlice, containerSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;