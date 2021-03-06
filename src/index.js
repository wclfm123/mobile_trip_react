/**
 * Created by jiang on 2017/7/3.
 */
import React from 'react';
import { render } from 'react-dom';
import createStore from './redux/create';
import client from './js/ApiClient.js';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
// import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from './routes';
import './scss/app.scss';
const root = document.getElementById('root');
const store = createStore(hashHistory, client);
const history = syncHistoryWithStore(hashHistory, store);
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

render(
    <Provider store={store} key="provider">
        <Router history={history}>
            {getRoutes(store)}
        </Router>
    </Provider>, root
);
