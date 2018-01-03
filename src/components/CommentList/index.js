import React, { Component } from 'react';
import EditableComment from './EditableComment';

class PostPreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      newCommentText: ''
    }
  }
  updateNewCommentText = (e) => {
    this.setState({
      newCommentText: e.target.value
    });
  }
  handleSubmitNew = () => {
    var comment = {
      user_id: this.props.auth.user.id,
      text: this.state.newCommentText,
      date_posted: Date.now(),
      work_id: this.props.work_id,
      token: this.props.auth.token
    }
    this.props.submitNew(comment);
    this.setState({
      newCommentText: ''
    });
    this.props.get();
  }
  handleDelete = (id, work_id) => {
    console.log('hanld delete', work_id);
    this.props.delete(id, work_id);
  }
  render() {

    const newCommentForm = (
      <div style={{paddingTop: '20px'}}>
        <input type='text' value={this.state.newCommentText} onChange={this.updateNewCommentText} className='input' placeholder='Leave your own comment...'/>
        <button className='button' onClick={this.handleSubmitNew}>Save</button>
      </div>);
      const comments = this.props.comments[this.props.work_id];
    if (comments && comments.hasreceiveddata==true) {
      if (comments.items.length ==0) {
        return <div>0 Comments {newCommentForm}</div>
      } else {
        return(
          <div>
            {comments.items.map((comment, i) => {
              return (<EditableComment
                  comment={comment}
                  key={i}
                  onDelete={this.handleDelete}/>)
            })}
            {newCommentForm}
          </div>
        )
      }
    } else {
      return(
        <div>
          Loading comments...
        </div>
      )
    }
  }
}

export default PostPreview;
