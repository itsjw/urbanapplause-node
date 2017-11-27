import React, { Component } from 'react';

class UserInfo extends Component {

  render() {
    if (this.props.user) {
      const {user} = this.props;
    return(
      <div>
        <h3>Bio</h3>
        <p>{this.props.user.bio}</p>
      </div>
      )
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default UserInfo;
