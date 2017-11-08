import {combineReducers} from 'redux';
import authReducer from './auth';
import worksReducer from './works';
import artistsReducer from './artists';
import userprofilesReducer from './userprofiles';

const rootReducer = combineReducers({
  auth: authReducer,
  works: worksReducer,
  artists: artistsReducer,
  userprofiles: userprofilesReducer
});

export default rootReducer;

