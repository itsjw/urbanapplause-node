import C from '../constants';
import request from '../services/request';
let baseURL = C.SERVER_URL;

function requestComments(work_id) {
  return {
    type: C.REQUEST_COMMENTS_DATA,
    work_id: work_id
  }
}

function receiveComments(work_id, data) {
  return {
    type: C.RECEIVE_COMMENTS_DATA,
    work_id: work_id,
    items: data.items,
  }
}

function getCommentsForWork(work_id) {
  return function(dispatch){
    dispatch(requestComments(work_id));
    return request({url: baseURL + "/api/comments/" + work_id})
      .then(data => dispatch(receiveComments(work_id,JSON.parse(data)))
      )
  }
}

function submitNewComment(values) {
  let qs = "";
  qs = Object.keys(values).map(key => {
    let value = values[key];
    if (key=='place') {
      value = JSON.stringify(values[key]);
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');

  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_COMMENT_RESPONSE});
    return request({url: baseURL + "/api/newcomment", method: "POST", data: values})
      .then((resString) => JSON.parse(resString))
      .then((res) =>
        {
          if (res.successful ==true) {
            var newCommentTemp = values;
            newCommentTemp.id = res.data[0].id;
            dispatch({type:C.RECEIVE_NEW_COMMENT_RESPONSE, data: newCommentTemp});
            dispatch(getCommentsForWork(values.work_id));
          } else {
            const errors = {};
            res.errors.map((error, i) => {
              errors[error.param] = {
                msg: error.msg,
                value: error.value
              }
            })
            dispatch({type: C.FAILED_NEW_COMMENT_RESPONSE, errors: errors});
          }
        })
  }
}

let deleteComment = (id, work_id) => {
  console.log(id, work_id);
  var error = false;
		return function(dispatch,getState){
      return request({url: baseURL + "/api/deletecomment/" + id, method: "DELETE"})
        .then(data =>
          dispatch(getCommentsForWork(work_id))
        );
    };
}

const startCommentEdit = (qid) => {
		return {type:C.START_COMMENT_EDIT,qid};
}

const cancelCommentEdit = (qid) => {
		return {type:C.FINISH_COMMENT_EDIT,qid};
}

const submitCommentEdit = (qid, content) => {
		return function(dispatch,getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
      var error = false; //utils.validateComment(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.SUBMIT_COMMENT_EDIT,qid});
        fire.database().ref('comments').child(qid).update( content );

			}
		}
}



export default {getCommentsForWork, submitNewComment, startCommentEdit, cancelCommentEdit, submitCommentEdit, deleteComment};
