import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { ALLOW_REDUX_DEVTOOLS_EXTENSION } from 'services/constants/env';
import { history } from 'routes/history';
import createRootReducer from './reducers/rootReducer';
import rootSagas from './rootSagas';
import { persistConfig } from './persistConfig';

// ================================================================================
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(sagaMiddleware, routerMiddleware(history)),
	devTools: ALLOW_REDUX_DEVTOOLS_EXTENSION,
	preloadedState: {},
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export { store, persistor };
