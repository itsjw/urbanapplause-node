
import {database as fire} from '../firebaseConfig';
import C from '../constants';
var userprofilesRef = fire.database().ref('userprofiles').orderByKey().limitToLast(100);

const startListeningToUserprofiles = () => {
  return function(dispatch,getState){
			userprofilesRef.on("value",function(snapshot){
        dispatch({ type: C.RECEIVE_USERPROFILES_DATA, data: snapshot.val() });
			});
		}
}

const startUserprofileEdit = (qid) => {
		return {type:C.START_ARTIST_EDIT,qid};
}

const cancelUserprofileEdit = (qid) => {
		return {type:C.FINISH_ARTIST_EDIT,qid};
}
const deleteUserprofile = (qid) => {
  var error = false;
		return function(dispatch,getState){
      dispatch({type:C.SUBMIT_ARTIST_EDIT,qid});
      fire.database().ref('userprofiles').child(qid).remove();
    };
}
const submitUserprofileEdit = (qid, content) => {
 console.log(qid);
  console.log(content);
  return function(dispatch,getState){
    console.log('in function');
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
      var error = false; //utils.validateUserprofile(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.SUBMIT_USERPROFILE_EDIT,qid});
        fire.database().ref('userprofiles').child(qid).update( content );

			}
		}
}

const submitNewUserprofile = (uid, content) => {


  return function(dispatch, getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
    var error = false; //utils.validateUserprofile(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.AWAIT_NEW_USERPROFILE_RESPONSE});
        fire.database().ref('userprofiles').push( content ),function(error){
					dispatch({type:C.RECEIVE_NEW_USERPROFILE_RESPONSE});
					if (error){
						dispatch({type:C.DISPLAY_ERROR,error:"Submission failed! "+error});
					} else {
						dispatch({type:C.DISPLAY_MESSAGE,message:"Submission successfully saved!"});
					}
        }
			}
		}

		}


export default {startListeningToUserprofiles, startUserprofileEdit, cancelUserprofileEdit, submitUserprofileEdit, deleteUserprofile, submitNewUserprofile};
