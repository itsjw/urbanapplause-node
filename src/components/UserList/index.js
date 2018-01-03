import React from 'react';
import UserListItem from './UserListItem';

class UserList extends React.Component {
  render() {
        let listItems = this.props.users.map(user =>
          <UserListItem key={user.id} user={user} onSearchKeyChange={this.props.onSearchKeyChange}/>
        );
        if (this.props.hasreceiveddata==true) {
        return (
            <div className="userlist-container">
              {(this.props.users.length>0)?listItems:<span><strong>No results. Broaden your search to find matches. </strong></span>}
            </div>
        );
        } else {
          return (<div className='userlist-container'>Loading...</div>)
        }
   }
};

export default UserList;
