import C from '../constants';
import request from '../services/request';

let baseURL = "https://urbanapplause.herokuapp.com";
function requestUsers(values) {
  return {
    type: C.REQUEST_USERS_DATA,
  }
}

function receiveUsers(data) {
  return {
    type: C.RECEIVE_USERS_DATA,
    items: data.items,
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    receivedAt: Date.now()
  }
}


function getUsers(values) {
  return function(dispatch){
    dispatch(requestUsers(values));
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    return request({url: baseURL + "/api/users" + qs})
      .then(data => dispatch(receiveUsers(JSON.parse(data))));
  }
}

function submitNewUser(values) {
  console.log('submit new user', values);
  let qs = "";
  qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_USER_RESPONSE});
    return request({url: baseURL + "/api/newuser", method: "POST", data: qs})
      .then((data) =>
        {
          dispatch({type:C.RECEIVE_NEW_USER_RESPONSE, data: JSON.parse(data)})
          dispatch(getUsers());
        })
  }
}

function submitUserEdit(id, values) {
  let qs = "";
  qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
  return function(dispatch, getState){
    dispatch({type: C.SUBMIT_USER_EDIT, id: id, values: values});
    return request({url: baseURL + "/api/updateuser/" + id, method: "PUT", data: qs});
  }
}



let findById = (id) => {
  return function(dispatch){
    dispatch(requestUser(id));
    return request({url: baseURL + "/api/users/" + id})
      .then(data => dispatch(receiveUser(JSON.parse(data))));
  }
}
function requestUser(id) {
  return {
    type: C.REQUEST_USER_DATA,
  }
}

function receiveUser(data) {
  return {
    type: C.RECEIVE_USER_DATA,
    user: data,
    didReceiveData: true,
    receivedAt: Date.now()
  }
}

const startUserEdit = (qid) => {
		return {type:C.START_USER_EDIT,qid};
}

const cancelUserEdit = (qid) => {
		return {type:C.FINISH_USER_EDIT,qid};
}
const deleteUser = (qid) => {
  var error = false;
		return function(dispatch,getState){
      dispatch({type:C.SUBMIT_USER_EDIT,qid});
      fire.database().ref('users').child(qid).remove();
    };
}


export default {getUsers, findById, submitNewUser, startUserEdit, cancelUserEdit, submitUserEdit, deleteUser};
