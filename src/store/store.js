// store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from '../reducers/reducers';
import rootSaga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();


// export default function configrugeStore() {
//     const store = createStore(app,applyMiddleware(sagaMiddleware))
//     sagaMiddleware.run(rootSaga)
//     return store
// }

const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
