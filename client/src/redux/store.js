import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createIdleMonitorReduxMiddleware from 'redux-idle-timeout-monitor';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// configure middleware for 10 minute timeout
const idleMonitorMiddleware = createIdleMonitorReduxMiddleware(10 * 60 * 1000, autoLogout);

export function autoLogout() {
  alert("Idle time reached, you've been logged out!")
  return {
      type: 'LOGOUT',
  };
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, idleMonitorMiddleware)
)

export const persistor = persistStore(store)


// export default function configureStore() {
//   let store = createStore(
//     persistedReducer,
//     applyMiddleware(thunk)
//   )

//   let persistor = persistStore(store)

//   return { store, persistor }
// }