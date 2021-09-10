import { createStore, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = createStore(
  combineReducers({
    // ...reducers,
    routing: routerReducer
  })
)

const createdHistory = createBrowserHistory();
const history = syncHistoryWithStore(createdHistory, store);


export {store, history};