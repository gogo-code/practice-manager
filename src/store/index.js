import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducers'

import createSagaMiddleware from 'redux-saga'
import mySages from './sagas'

const sagaMiddleware = createSagaMiddleware(mySages);
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);
const store =  createStore(reducers, enhancer);

// 注意: 一定要放在最后
sagaMiddleware.run(mySages);

export default  store;