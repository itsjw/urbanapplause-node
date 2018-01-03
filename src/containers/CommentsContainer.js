import React, { Component } from 'react';
import CommentList from '../components/CommentList';
import commentActions from '../actions/comments';

import {connect} from 'react-redux';




var mapStateToProps = function(appState){
  return {
    auth: appState.auth,
    comments: appState.comments
  }
}
var mapDispatchToProps = function(dispatch){
  return {

    getCommentsForWork: function(work_id){ dispatch(commentActions.getCommentsForWork(work_id))},
    submitNew: function(values){ dispatch(commentActions.submitNewComment(values))},

    submitEdit: function(id){ dispatch(commentActions.submitCommentEdit(id))},
    delete: function(id, work_id){ dispatch(commentActions.deleteComment(id, work_id))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
