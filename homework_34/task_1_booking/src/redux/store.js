import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import reducer from './reducer';
import rootSaga from './sagas';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(routerMiddleware, sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export default store;