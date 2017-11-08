
import {database as fire} from '../firebaseConfig';
import C from '../constants';
var artistsRef = fire.database().ref('artists')

const startListeningToArtists = () => {
  return function(dispatch,getState){
    artistsRef.on("value",function(snapshot){
      console.log(snapshot)
        dispatch({ type: C.RECEIVE_ARTISTS_DATA, data: snapshot.val() });
			});
		}
}

const startArtistEdit = (qid) => {
		return {type:C.START_ARTIST_EDIT,qid};
}

const cancelArtistEdit = (qid) => {
		return {type:C.FINISH_ARTIST_EDIT,qid};
}
const deleteArtist = (qid) => {
  var error = false;
		return function(dispatch,getState){
      dispatch({type:C.SUBMIT_ARTIST_EDIT,qid});
      fire.database().ref('artists').child(qid).remove();
    };
}
const submitArtistEdit = (qid, content) => {
		return function(dispatch,getState){
      var error = false; //utils.validateArtist(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.SUBMIT_ARTIST_EDIT,qid});
        fire.database().ref('artists').child(qid).update( content );

			}
		}
}

const submitNewArtist = (content) => {
  console.log(content);
  return function(dispatch, getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
    var error = false; //utils.validateArtist(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.AWAIT_NEW_ARTIST_RESPONSE});
        fire.database().ref('artists').push( content ),function(error){
					dispatch({type:C.RECEIVE_NEW_ARTIST_RESPONSE});
					if (error){
						dispatch({type:C.DISPLAY_ERROR,error:"Submission failed! "+error});
					} else {
						dispatch({type:C.DISPLAY_MESSAGE,message:"Submission successfully saved!"});
					}
        }
			}
		}

		}


export default {startListeningToArtists, startArtistEdit, cancelArtistEdit, submitArtistEdit, deleteArtist, submitNewArtist};
