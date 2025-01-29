import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import userReducer from '../src/slices/userSlice'
import blogDetailReducer from '../src/slices/BlogDetailsSlice'
import adminContentReducer from '../src/slices/AdminContent'


const rootReducer = combineReducers({
    user:userReducer,
    blogDetails:blogDetailReducer,
    adminContent:adminContentReducer

})


const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});



const persistor = persistStore(store);


export {store, persistor};