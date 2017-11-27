
import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';

import UserEditForm from '../components/UserEditForm';
import userActions from '../actions/users';
import {connect} from 'react-redux';

class UserProfileContainer  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  componentDidMount(){
    this.props.getUser(this.props.match.params.id);
  }
  closeForm = () => {
    this.setState({
      isEditing: false
    });
  }

  openForm = () => {
    this.setState({
      isEditing: true
    });
  }
  handleUpdate = (id, content) => {
    this.props.onUpdate(id, content);
  }
  render() {
    const id = this.props.match.params.id;
    if (this.state.isEditing) {
      return(
        <div>
          <UserEditForm user={this.props.user} onSubmit={this.handleUpdate} onCancel={this.closeForm}/>
        </div>);
    } else {
      return (
        <div>
          <UserInfo user={this.props.user}/>
          <button className='button' onClick={this.openForm}>Edit</button>
        </div>
      )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    user: appState.users.selectedUser.user,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getUser: function(id){ dispatch(userActions.findById(id)); },
    getWorks: function(user_id) {dispatch(workActions.findWorksForUser(user_id));},
    onUpdate: function(id, content){ dispatch(userActions.submitUserEdit(id, content)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
