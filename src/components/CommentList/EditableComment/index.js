import React, { Component } from 'react';

class EditableComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      editedText: null
    }
  }
  componentWillMount(){
    this.setState({
      editedText: this.props.comment.text
    });
  }
  startEdit = () => {
    this.setState({
      isEditing: true
    });
  }
  cancelEdit = () => {
    this.setState({
      isEditing: false,
      editedText: this.props.comment.text
    });
  }
  saveEdit = () => {
    this.setState({
      isEditing: false
    });
    this.props.submitEdit(this.state.editedText);
  }
  onChangeText = (e) => {
    this.setState({
      editedText: e.target.value
    });
  }
  handleDelete = () => {
    var comment = this.props.comment;
    this.props.onDelete(comment.id, comment.work_id);
  }
  render() {
    const {comment} = this.props;
    if (this.state.isEditing == true) {
      return (
        <div>
          <input type='text' value={this.state.editedText} onChange={this.onChangeText} className='input'/>
          <button className='button' onClick={this.saveEdit}>Save</button>
          <button className='button' onClick={this.cancelEdit}>Cancel</button>
        </div>)
    } else {
    return(
      <div>
        <strong><a href={`users/${comment.user_id}`}>{comment.username} </a>on {comment.date_posted||'[Date]'} </strong><br/>
        {comment.text}<br/>
        <button className='button' onClick={this.startEdit}>Edit</button>

        <button className='button' onClick={this.handleDelete}>Delete</button>
      </div>
    )
    }
  }
}

export default EditableComment;
