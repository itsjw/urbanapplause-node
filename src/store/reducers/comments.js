import C from "../../constants";
import initialState from "../initialStore";
var  _ = require("lodash");


const commentsReducer = (currentstate, action) => {
	var newstate;
  switch(action.type){
    case C.REQUEST_COMMENTS_DATA:
      const newComments = {
          hasreceiveddata: false,
          items: []
        }
      const state = Object.assign({}, currentstate, {});
      state[action.work_id] = newComments;
      return state;

    case C.RECEIVE_COMMENTS_DATA:
      const workComments = {
          hasreceiveddata: true,
          items: action.items
        }
      const newState = Object.assign({}, currentstate, {});
      newState[action.work_id] = workComments;
      return newState;
    case C.AWAIT_NEW_COMMENT_RESPONSE:
      return Object.assign({},currentstate,{
      });
    case C.RECEIVE_NEW_COMMENT_RESPONSE:
      return Object.assign({},currentstate,{ });
    case C.FAILED_NEW_COMMENT_RESPONSE:
			return Object.assign({},currentstate,{
        submittingnew: false,
        newCommentErrors: action.errors
			});
		case C.START_COMMENT_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_COMMENT;
			return newstate;
		case C.FINISH_COMMENT_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_COMMENT_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_COMMENT;
			return newstate;

    default:
      return currentstate || initialState.comments;
	}
};

export default commentsReducer;
