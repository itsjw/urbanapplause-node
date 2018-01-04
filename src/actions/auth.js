import C from '../constants';
import {history} from '../router'
let baseURL = C.SERVER_URL;

import request from '../services/request';
import userActions from './users';

const onLogin = (values) => {
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
    dispatch({type: C.LOGIN_REQUEST});
    return request({url: baseURL + "/api/login", method: "POST", data: values})
      .then((res) =>
        {
          var data = JSON.parse(res);
          if (data.token) {
            dispatch({type:C.LOGIN_SUCCESS, data: JSON.parse(res)});
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('expires', data.expires);
            history.push("/");
          } else {
            dispatch({type:C.LOGIN_FAILURE, errorMsg: "Incorrect username or password"});
          }
          return 'xdata';
        })
        .then((error) => {
          return error;
      });
  }
}

const onRegister = (values) => {
  console.log('onRegister ', values);
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
    dispatch({type: C.REGISTER_REQUEST});
    return request({url: baseURL + "/api/register", method: "POST", data: values})
      .then((res) =>
        {
          var data = JSON.parse(res);
          if (data.sucessful==true) {
            dispatch({type:C.REGISTER_SUCCESS, data: JSON.parse(res)});
            history.push("/signin");
          } else {

            dispatch({type:C.REGISTER_FAILURE, data: JSON.parse(res)});
          }
        })
        .then((error) => {

            dispatch({type:C.REGISTER_FAILURE, data: JSON.parse(res)});
        });
  }
}

const onLogout = () => {
  localStorage.clear();
  return({
      type: C.LOGOUT,
    });
  }
const checkLocalAuthState = () => {
  return function(dispatch){
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');
    if (user && token && expires) {
      dispatch({
        type: C.LOGIN_SUCCESS,
        data: {
          user: JSON.parse(user),
          token: token,
          expires: expires
        }
      });
    }
    return;
  }
}

const resetRegistrationStatus = () => {
  return function(dispatch) {
    dispatch({type: C.REGISTER_RESET});
  }
}
const resetLoginStatus = () => {
  return function(dispatch) {
    dispatch({type: C.LOGIN_RESET});
  }
}

export default {onRegister, onLogin, onLogout, checkLocalAuthState, resetRegistrationStatus, resetLoginStatus};
