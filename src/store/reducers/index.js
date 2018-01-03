import {combineReducers} from 'redux';
import authReducer from './auth';
import worksReducer from './works';
import artistsReducer from './artists';
import usersReducer from './users';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  auth: authReducer,
  works: worksReducer,
  artists: artistsReducer,
  users: usersReducer,
  comments: commentsReducer,
});

export default rootReducer;

