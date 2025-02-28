import initialstate from "../initialStore";
import C from '../../constants';

const authReducer = (currentstate,action) => {
  switch(action.type){
    case C.REGISTER_REQUEST:
      return Object.assign({},currentstate,{
        registrationStatus: 'loading'
      })
    case C.REGISTER_SUCCESS:
      return Object.assign({},currentstate,{
        registrationStatus: 'success',
        registrationErrors: null
      })
    case C.REGISTER_FAILURE:
      return Object.assign({},currentstate,{
        registrationStatus: 'failure',
        registrationErrors: action.data.errors
      })
    case C.REGISTER_RESET:
      return Object.assign({},currentstate,{
        registrationStatus: 'ready'
      })

    case C.LOGIN_REQUEST:
      return Object.assign({},currentstate,{
        currently: 'loading',
        user: {},
        loginError: null
      })
    case C.LOGIN_SUCCESS:
      return Object.assign({},currentstate,{
        currently: "LOGGED_IN",
        user: action.data.user,
        token: action.data.token,
        expires: action.data.expires,
        loginError: null
      })
    case C.LOGIN_FAILURE:
      return Object.assign({},currentstate,{
        currently: C.ANONYMOUS,
        token: null,
        user: {},
        expires: null,
        loginError: action.errorMsg
      })
    case C.LOGIN_RESET:
      return Object.assign({},currentstate,{
        currently: null,
        loginError: null
      })
		case C.LOGOUT:
			return Object.assign({},currentstate,{
				currently: C.ANONYMOUS,
        email: "guest",
        user: {},
        expires: null
			});
    default:
      return currentstate || initialstate.auth;
	}
}

export default authReducer;
