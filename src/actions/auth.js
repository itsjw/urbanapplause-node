import {database as fire, googleProvider} from '../firebaseConfig';
var C = require("../constants")
var auth = fire.auth()
var userprofilesRef = fire.database().ref('userprofiles').orderByKey().limitToLast(100);

import userprofileActions from './userprofiles';

const createUserWithEmailAndPassword = (user) => {
    return fire.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

const signInWithEmailAndPassword = (user) => {
    return fire.auth().signInWithEmailAndPassword(user.email, user.password);
}


const startListeningToAuth = () => {
	return function(dispatch,getState){
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
          dispatch({
              type: C.LOGIN_USER,
              uid: user.uid,
            email: user.email
          });
       userprofilesRef.on("value",function(snapshot){
         if (!(snapshot.val()[user.uid])) {
           dispatch(userprofileActions.submitUserprofileEdit(user.uid, {firstName: user.email, email: user.email, description: '', dateJoined: Date.now()}));
         }
       });



      } else {
        dispatch({type:C.LOGOUT});
      }

    }
)};
}


const attemptGoogleLogin = () => {
  return function(dispatch,getState){
    dispatch({type:C.ATTEMPTING_LOGIN});
    fire.auth().signInWithPopup(googleProvider).then(function(result) {}).catch(function(error) {
					dispatch({type:C.DISPLAY_ERROR,error:"Login failed! "+error});
					dispatch({type:C.LOGOUT});
				});
  }
}


const logoutUser = () => {

    return function(dispatch,getState){
      dispatch({type:C.LOGOUT}); // don't really need to do this, but nice to get immediate feedback
      fire.auth().signOut();
    }
}


export default {createUserWithEmailAndPassword, signInWithEmailAndPassword, startListeningToAuth,attemptGoogleLogin, logoutUser};
