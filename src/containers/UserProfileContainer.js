
import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';
import userActions from '../actions/users';
import {connect} from 'react-redux';

class UserProfileContainer  extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'public'
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id != this.props.match.params.id) {
    this.props.getUser(nextProps.match.params.id);
    }
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }
  setActiveTab = (e) => {
    this.setState({
      activeTab: e.target.name
    });
  }
  render() {
    var tabContent = <UserInfo
              uid={this.props.match.params.id}
              user={this.props.user}
              isEditable={true}
              onUpdate={this.props.onUpdate}
            />
      if (this.state.activeTab =='applause'){
        tabContent = <div>applause</div>
      }
      if (this.state.activeTab =='account'){
        tabContent = <div> <h1 className='title is-3'>Account Info</h1></div>
      }

    const id = this.props.match.params.id;
    if (this.props.auth.currently=='LOGGED_IN' && this.props.auth.user.id==id){
      return (
        <div>
          <h1 className='title'>Welcome, {this.props.auth.user.username}!</h1>
          <div className="tabs">
            <ul style={{paddingLeft:'0'}}>
              <li
                className={(this.state.activeTab=='public')?'is-active':''}>
                <a
                  name='public'
                  onClick={this.setActiveTab}>
                  Public Profile
                </a>
              </li>
              <li
                className={(this.state.activeTab=='account')?'is-active':''}>
                <a
                  name='account'
                  onClick={this.setActiveTab}>
                  Account
                </a>
              </li>
            </ul>
          </div>
          <div className='tab-content'>
            {tabContent}
          </div>

        </div>
      )
    } else {
      return (
        <div>
          <h1 className='title'>{this.props.user.username}</h1>
          <UserInfo user={this.props.user}/>
        </div>
      )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    user: appState.users.selectedUser.user,
    auth: appState.auth,
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
