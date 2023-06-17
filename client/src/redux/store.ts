import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({
    themeSlice: persistReducer(persistConfig, themeSlice),
    authSlice: persistReducer(persistConfig, authSlice)
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;