import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import info from './modules/info';
import PublishList from './modules/PublishList/PublishList.reducers.js';
import details from './modules/Details/Details.reducers.js';
import publish from './modules/Publish/Publish.reducers.js';

export default combineReducers({
    routing: routerReducer,
    PublishList,
    details,
    publish
});
