import C from '../constants';
import request from '../services/request';

let baseURL = "http://localhost:3000";
function requestWorks() {
  return {
    type: C.REQUEST_WORKS_DATA,
  }
}

function receiveWorks(data) {
  return {
    type: C.RECEIVE_WORKS_DATA,
    items: data.items,
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    receivedAt: Date.now()
  }
}
function getWorks(values) {
  console.log('CALLING GET WORKS');
  return function(dispatch){
    dispatch(requestWorks());
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    return request({url: baseURL + "/works" + qs})
      .then(data => dispatch(receiveWorks(JSON.parse(data))));
  }
}

function submitNewWork(values) {

  let qs = "";
  qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');

  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_WORK_RESPONSE});
    return request({url: baseURL + "/newwork", method: "POST", data: qs})
      .then(data => dispatch({type:C.RECEIVE_NEW_WORK_RESPONSE, data: JSON.parse(data)}))
  }
}
export let deleteWork = (id) => {
  var error = false;
		return function(dispatch,getState){
      return request({url: baseURL + "/deletework/" + id, method: "DELETE"})
        .then(data => dispatch(getWorks()));
    };
}

export let findById = () => {
    return request({url: baseURL + "/works/" + id})
        .then(data => data = JSON.parse(data))
}

const startWorkEdit = (qid) => {
		return {type:C.START_WORK_EDIT,qid};
}

const cancelWorkEdit = (qid) => {
		return {type:C.FINISH_WORK_EDIT,qid};
}
const submitWorkEdit = (qid, content) => {
		return function(dispatch,getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
      var error = false; //utils.validateWork(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.SUBMIT_WORK_EDIT,qid});
        fire.database().ref('works').child(qid).update( content );

			}
		}
}



export default {getWorks, submitNewWork, startWorkEdit, cancelWorkEdit, submitWorkEdit, deleteWork};
