import React from 'react';
import UserListItem from './UserListItem';

class UserList extends React.Component {
  render() {
        let listItems = this.props.users.map(user =>
          <UserListItem key={user.id} user={user} onSearchKeyChange={this.props.onSearchKeyChange}/>
        );
        return (
            <div className="">
                {listItems}
            </div>
        );
    }
};

export default UserList;
