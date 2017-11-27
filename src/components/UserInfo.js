import React, { Component } from 'react';

class UserInfo extends Component {

  render() {
    if (this.props.user) {
      const {user} = this.props;
    return(
      <div>
        <h3>User Id</h3>
        <p>{this.props.user.id}</p>

        <h3>Username</h3>
        <p>{this.props.user.username}</p>

        <h3>Bio</h3>
        <p>{this.props.user.bio}</p>

        <h3>Member Since</h3>
        <p>{new Date(this.props.user.date_joined).toString()}</p>

      </div>
      )
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default UserInfo;
