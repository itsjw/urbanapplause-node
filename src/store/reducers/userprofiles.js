import C from "../../constants";
import initialState from "../initialstate";
var  _ = require("lodash");


const userprofilesReducer = (currentstate,action) => {
	var newstate;
  switch(action.type){
    case C.RECEIVE_USERPROFILES_DATA:
			return Object.assign({},currentstate,{
				hasreceiveddata: true,
				data: action.data
      });
    case C.AWAIT_NEW_USERPROFILE_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_USERPROFILE_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: false
			});
		case C.START_USERPROFILE_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_USERPROFILE;
			return newstate;
		case C.FINISH_USERPROFILE_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_USERPROFILE_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_USERPROFILE;
			return newstate;

    default:
      return currentstate || initialState.userprofiles;
	}
};

export default userprofilesReducer;
