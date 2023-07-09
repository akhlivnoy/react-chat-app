import { applyMiddleware, configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from '#redux/sagas';
import { appSlice, userSlice } from '#redux/slices';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
});

const PERSIST_CONFIG: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

const sagaMiddleware: ReturnType<typeof createSagaMiddleware> = createSagaMiddleware();

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware)];

export const store = configureStore({
  reducer: persistedReducer,
  enhancers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Unсomment this line and re-launch the app to clear persisted cache
// persistor.purge();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
