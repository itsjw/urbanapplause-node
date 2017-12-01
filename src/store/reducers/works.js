
import C from "../../constants";
import initialState from "../initialStore";
var  _ = require("lodash");


const worksReducer = (currentstate, action) => {
	var newstate;
  switch(action.type){
    case C.REQUEST_WORKS_DATA:
      return Object.assign({}, currentstate, {
        state: "requesting"
      });
    case C.RECEIVE_WORKS_DATA:
			return Object.assign({},currentstate,{
				hasreceiveddata: true,
        items: action.items,
        page: action.page,
        pageSize: action.pageSize,
        total: action.total,
        receivedAt: action.receivedAt
      });

    case C.REQUEST_WORK_DATA:
      return Object.assign({}, currentstate, {
        selectedWork: {
          work: {},
          hasreceiveddata: false,
        },
      });
    case C.RECEIVE_WORK_DATA:
			return Object.assign({},currentstate,{
        selectedWork: {
          work: action.work,
				  hasreceiveddata: true,
          receivedAt: action.receivedAt
        }
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
