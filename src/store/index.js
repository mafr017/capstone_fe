import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerAbout from './reducer-about'
import reducerMe from './reducer-me'
import reducerProducts from './reducer-products'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['me']
}

const reducers = combineReducers({
  products: reducerProducts,
  about: reducerAbout,
  me: reducerMe
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)