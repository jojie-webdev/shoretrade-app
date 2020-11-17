import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancer,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  persistReducer,
  persistStore,
  PersistConfig,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from 'store/reducers';

export const history = createBrowserHistory();

const isDevMode =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'editableListing',
    'getCustomFormData',
    'getListingFormData',
    'getMarketEstimate',
    'cart',
    'history',
  ],
};

const reducer = persistReducer(persistConfig, createRootReducer(history));
export const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history));

export const store: Store<any, any> = createStore(
  reducer,
  isDevMode ? composeWithDevTools(enhancer) : enhancer
);

export const persistor = (callback?: () => void): Persistor =>
  persistStore(store, undefined, callback);

export default store;
