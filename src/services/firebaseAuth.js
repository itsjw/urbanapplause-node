import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDQe4Dp36lZIxRIVaWLWtdSyezBQySuiv4",
    authDomain: "react-e4ea1.firebaseapp.com",
    databaseURL: "https://react-e4ea1.firebaseio.com",
    projectId: "react-e4ea1",
    storageBucket: "react-e4ea1.appspot.com",
    messagingSenderId: "340532256758"
  };
var fire = firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

function signIn()  {
return firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  return result;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}

const getToken = () => {
  firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
export {fire, signIn, getToken}
