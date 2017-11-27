import {combineReducers} from 'redux';
import authReducer from './auth';
import worksReducer from './works';
import artistsReducer from './artists';
import usersReducer from './users';

const rootReducer = combineReducers({
  auth: authReducer,
  works: worksReducer,
  artists: artistsReducer,
  users: usersReducer
});

export default rootReducer;

