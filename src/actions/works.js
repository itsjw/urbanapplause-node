import C from '../constants';
import request from '../services/request';
import commentActions from './comments';
import requestUpload from '../services/request/uploadFiles';

import {AJAXSubmit} from '../services/request/uploadFiles';
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
      .then((data) => {
        let jsonData =  JSON.parse(data);
        dispatch(receiveWorks(jsonData))
        console.log(jsonData)

        let getCommentsForWork = function(work_id){ dispatch(commentActions.getCommentsForWork(work_id))};
        jsonData.items.map((work, i) => {
          getCommentsForWork(work.id);
        });

      });
  }
}

function setNewFiles(files){
  return function(dispatch) {
    dispatch({type: C.SET_NEW_FILES, files: files});
  };
}

function uploadFiles(e){
  return function(dispatch) {
    dispatch({type: C.AWAIT_IMAGE_UPLOAD_RESPONSE});
    return AJAXSubmit(e, baseURL + '/uploads')
      .then((res) => {
        console.log('RES', res);
        dispatch({type: C.IMAGE_UPLOAD_SUCCESS, files: JSON.parse(res)});
      });
  };
}

function submitNewWork(values) {
  console.log(values);
  let qs = "";
  qs = Object.keys(values).map(key => {
    let value = values[key];
    if (key=='place') {
      value = JSON.stringify(values[key]);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');

  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_WORK_RESPONSE});
    return request({url: baseURL + "/api/newwork", method: "POST", data: values, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then((resString) => JSON.parse(resString))
      .then((res) =>
        {
          if (res.successful ==true) {
          dispatch({type:C.RECEIVE_NEW_WORK_RESPONSE, data: res.data});
            dispatch(getWorks());
          } else {
            const errors = {};
            res.errors.map((error, i) => {
              errors[error.param] = {
                msg: error.msg,
                value: error.value
              }
            })
            dispatch({type: C.FAILED_NEW_WORK_RESPONSE, errors: errors});
          }
        })
  }
}

let deleteWork = (id) => {
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



export default {getWorks, submitNewWork, uploadFiles, setNewFiles, findById, startWorkEdit, cancelWorkEdit, submitWorkEdit, deleteWork};
