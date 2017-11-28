import C from '../constants';
import request from '../services/request';
let baseURL = C.SERVER_URL;

function requestArtists(values) {
  return {
    type: C.REQUEST_ARTISTS_DATA,
  }
}

function receiveArtists(data) {
  return {
    type: C.RECEIVE_ARTISTS_DATA,
    items: data.items,
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    receivedAt: Date.now()
  }
}


function getArtists(values) {
  return function(dispatch){
    dispatch(requestArtists(values));
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    return request({url: baseURL + "/api/artists" + qs})
      .then(data => dispatch(receiveArtists(JSON.parse(data))));
  }
}

function submitNewArtist(values) {
  let qs = "";
  qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
  return function(dispatch, getState){
    dispatch({type: C.AWAIT_NEW_ARTIST_RESPONSE});
    return request({url: baseURL + "/api/newartist", method: "POST", data: qs})
      .then((data) =>
        {
          dispatch({type:C.RECEIVE_NEW_ARTIST_RESPONSE, data: JSON.parse(data)})
          dispatch(getArtists());
        })
  }
}

function submitArtistEdit(id, values) {
  let qs = "";
  qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
  return function(dispatch, getState){
    dispatch({type: C.SUBMIT_ARTIST_EDIT, id: id, values: values});
    return request({url: baseURL + "/api/updateartist/" + id, method: "PUT", data: qs});
  }
}



let findById = (id) => {
  return function(dispatch){
    dispatch(requestArtist(id));
    return request({url: baseURL + "/api/artists/" + id})
      .then(data => dispatch(receiveArtist(JSON.parse(data))));
  }
}
function requestArtist(id) {
  return {
    type: C.REQUEST_ARTIST_DATA,
  }
}

function receiveArtist(data) {
  return {
    type: C.RECEIVE_ARTIST_DATA,
    artist: data,
    didReceiveData: true,
    receivedAt: Date.now()
  }
}

const startArtistEdit = (qid) => {
		return {type:C.START_ARTIST_EDIT,qid};
}

const cancelArtistEdit = (qid) => {
		return {type:C.FINISH_ARTIST_EDIT,qid};
}
const deleteArtist = (qid) => {
  var error = false;
		return function(dispatch,getState){
      dispatch({type:C.SUBMIT_ARTIST_EDIT,qid});
      fire.database().ref('artists').child(qid).remove();
    };
}


export default {getArtists, findById, submitNewArtist, startArtistEdit, cancelArtistEdit, submitArtistEdit, deleteArtist};
