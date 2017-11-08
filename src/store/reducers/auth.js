import initialstate from "../initialstate";

import C from '../../constants';

const authReducer = (currentstate,action) => {
	switch(action.type){
		case C.ATTEMPTING_LOGIN:
			return {
				currently: C.AWAITING_AUTH_RESPONSE,
				email: "guest",
				uid: null
			};
		case C.LOGOUT:
			return {
				currently: C.ANONYMOUS,
				email: "guest",
				uid: null
			};
		case C.LOGIN_USER:
			return {
				currently: C.LOGGED_IN,
				email: action.email,
				uid: action.uid
			};
    default:
      return currentstate || initialstate.auth;
	}
}

export default authReducer;
