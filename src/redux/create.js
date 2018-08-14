import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reduxReducer';
export default function createStore(history, client) {
    const reduxRouterMiddleware = routerMiddleware(history);
    const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

    const finalCreateStore = applyMiddleware(...middleware)(_createStore);
    const store = finalCreateStore(reducer);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./reduxReducer', () => {
            store.replaceReducer(require('./reduxReducer'));
        });
    }

    return store;
}
