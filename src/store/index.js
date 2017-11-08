import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import initialState from './initialState';

const store = applyMiddleware(thunk,logger)(createStore)(rootReducer,initialState);

export default store;

