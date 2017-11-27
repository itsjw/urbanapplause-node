import C from "../../constants";
import initialState from "../initialStore";
var  _ = require("lodash");


const usersReducer = (currentstate,action) => {
	var newstate;
  switch(action.type){
    case C.RECEIVE_USERS_DATA:
      return Object.assign({},currentstate,{
				hasreceiveddata: true,
        items: action.items,
        page: action.page,
        pageSize: action.pageSize,
        total: action.total,
        receivedAt: action.receivedAt
      });
    case C.RECEIVE_USER_DATA:
      return Object.assign({},currentstate,{
        selectedUser: {
          hasrreceiveddata: action.didReceiveData,
          user: action.user,
          receivedAt: action.receivedAt}
      });
    case C.AWAIT_NEW_USER_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_USER_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: false
			});
		case C.START_USER_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.EDITING_USER;
			return newstate;
		case C.FINISH_USER_EDIT:
			newstate = _.cloneDeep(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_USER_EDIT:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_USER;
			return newstate;

    default:
      return currentstate || initialState.users;
	}
};

export default usersReducer;
