import React, { Component } from 'react';
import {getMonthName} from '../services/utils';

class UserInfo extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.uid != this.props.uid) {
      this.forceUpdate();
    }
  }
  render() {
  const date_joined = new Date(this.props.user.date_joined);
    if (this.props.user) {
      const {user} = this.props;
    return(
      <div>
        <h3>Username</h3>
        <p>{this.props.user.username}</p>

        <h3>Member Since</h3>
        <p>{getMonthName(date_joined)} {date_joined.getFullYear()}</p>

      </div>
      )
    } else {
      return (<span>Loading</span>);
    }
  }
}

export default UserInfo;
