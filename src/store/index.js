import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import initialStore from './initialStore';

const store = applyMiddleware(thunk,logger)(createStore)(rootReducer,initialStore);

export default store;

