import C from '../constants';
import {signIn} from '../services/firebaseAuth';
import userActions from './users';

const handleSignIn = () => {
  console.log('attempting signin')
  return function(dispatch) {
    dispatch({type: C.ATTEMPTING_LOGIN});
    signIn().then((info) => {
      dispatch(loginUser(info));
      userActions.submitNewUser({id: info.user.uid, email: info.user.email});
      localStorage.setItem('auth', JSON.stringify(info));
    });
    return;
  }
}
const loginUser = (info) => {
  return {
      type: C.LOGIN_USER,
      uid: info.user.uid,
      given_name: info.additionalUserInfo.profile.given_name,
      profile: info.additionalUserInfo.profile,
      credentials: info.credential
  }
}

const handleLogOut = () => {
    localStorage.clear();
  return({
      type: C.LOGOUT,
      profile: null,
      credentials: null,
      email: "guest"
    });
    return <Redirect to="/"/>;
  }
const checkLocalAuthState = () => {
  return function(dispatch){
    const auth = localStorage.getItem('auth');
    if (auth) {
      dispatch(loginUser(JSON.parse(auth)));
    }
    return;
  }
 }


export default {handleSignIn, handleLogOut, checkLocalAuthState};
