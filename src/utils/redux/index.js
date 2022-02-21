import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
  i18nReducer
} from 'react-redux-i18n';

import translactionObject from 'translations';
import * as additionalReducers from './reducers';

const store = createStore(
  combineReducers({
    routing: routerReducer,
    i18n: i18nReducer,
    additional: additionalReducers.additionalI18nReducer,
  }),
  applyMiddleware(thunk)
);

const createdHistory = createBrowserHistory();
const history = syncHistoryWithStore(createdHistory, store);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translactionObject));
// store.dispatch(setLocale('en'));
store.dispatch(additionalReducers.i18nInitialize());


export {store, history};