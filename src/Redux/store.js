import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuth from "./features/userSlice.js";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import  storage  from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({userAuth: userAuth})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
  }
});

export const persistor = persistStore(store)