import C from '../constants';
import request from '../services/request';
let baseURL = C.SERVER_URL;

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
  return function(dispatch){
    dispatch(requestWorks());
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    return request({url: baseURL + "/api/works" + qs})
      .then(data => dispatch(receiveWorks(JSON.parse(data))));
  }
}

function submitNewWork(values) {
  let qs = "";
  qs = Object.keys(values).map(key => {
    let value = values[key];
    if (key=='place') {
      value = JSON.stringify(values[key]);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
  console.log('qs : ', qs);

  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_WORK_RESPONSE});
    console.log('made it to here');
    return request({url: baseURL + "/api/newwork", method: "POST", data: qs})
      .then((res) =>
        {
          console.log(res);
          if (res.successful ==true) {
          dispatch({type:C.RECEIVE_NEW_WORK_RESPONSE, data: JSON.parse(res.data)});
            dispatch(getWorks());
          } else {
            console.log('work form errors');
            dispatch({type: C.FAILED_NEW_WORK_RESPONSE, errors: JSON.parse(res.errors)});
          }
        })
  }
}
export let deleteWork = (id) => {
  var error = false;
		return function(dispatch,getState){
      return request({url: baseURL + "/api/deletework/" + id, method: "DELETE"})
        .then(data => dispatch(getWorks()));
    };
}

let findById = (id) => {
  return function(dispatch){
    dispatch(requestWork(id));
    return request({url: baseURL + "/api/works/" + id})
      .then(data => dispatch(receiveWork(JSON.parse(data))));
  }
}
function requestWork(id) {
  return {
    type: C.REQUEST_WORK_DATA,
  }
}

function receiveWork(data) {
  return {
    type: C.RECEIVE_WORK_DATA,
    work: data,
    didReceiveData: true,
    receivedAt: Date.now()
  }
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



export default {getWorks, submitNewWork, findById, startWorkEdit, cancelWorkEdit, submitWorkEdit, deleteWork};
