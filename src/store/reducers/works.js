import C from "../../constants";
import initialState from "../initialstate";
var  _ = require("lodash");


const worksReducer = (currentstate,action) => {
	var newstate;
  switch(action.type){
    case C.RECEIVE_WORKS_DATA:
			return Object.assign({},currentstate,{
				hasreceiveddata: true,
				data: action.data
      });
    case C.AWAIT_NEW_WORK_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_WORK_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: false
			});
		case C.START_WORK_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_WORK;
			return newstate;
		case C.FINISH_WORK_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_WORK_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_WORK;
			return newstate;

    default:
      return currentstate || initialState.works;
	}
};

export default worksReducer;
