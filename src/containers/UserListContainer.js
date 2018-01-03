import React, { Component } from 'react';
import UserList from '../components/UserList';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import RangeSlider from '../components/RangeSlider';
import userActions from '../actions/users';
import {connect} from 'react-redux';
import {Icon} from 'react-fa';

class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchKey: '',
          min: 0,
          max: 30,
          users: [],
          total: 0,
          page: 1,
          mapView:false
        };
    }
    componentDidMount() {
      this.findUsers();
    }
  searchKeyChangeHandler(searchKey) {
    console.log(searchKey);
        this.setState({searchKey: searchKey, page: 1}, this.findUsers);
    }

    rangeChangeHandler(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findUsers);
    }

    findUsers() {
        this.props.getUsers({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
    }

    nextPageHandler() {
        let p = this.state.page + 1;
        this.setState({page: p}, this.findUsers);
    }

    prevPageHandler() {
        let p = this.state.page - 1;
        this.setState({page: p}, this.findUsers);
    }

    openMap = () => {
      this.setState({
        mapView: true
      });
    }
    closeMap = () => {
      this.setState({
        mapView: false
      });
    }



  render() {
    const {users} = this.props;
    return(
      <div>
        <section className="section">
          <div className='columns'>

            <div className='column'>
              <SearchBar searchKey={this.state.searchKey} onChange={this.searchKeyChangeHandler.bind(this)}/>
            </div>


          </div>
        </section>

        <section className='section'>
          <Paginator page={users.page} pageSize={users.pageSize} total={users.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>
        </section>
        <UserList
          users={users.items}
          total={users.total}
          hasreceiveddata={users.hasreceiveddata}
        />
        <Paginator page={users.page} pageSize={users.pageSize} total={users.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>

      </div>
    )
  }
}
var mapStateToProps = function(appState){
  return {
    users: appState.users
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getUsers: function(values){ dispatch(userActions.getUsers(values)); },
    deleteUser: function(id){ dispatch(userActions.deleteUser(id)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
