import React, { Component } from 'react';
import WorkList from '../components/WorkList';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import RangeSlider from '../components/RangeSlider';
import WorkFormContainer from './WorkFormContainer';
import workActions from '../actions/works';
import {connect} from 'react-redux';

class WorkListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            min: 0,
            max: 30,
            works: [],
            total: 0,
            page: 1
        }
    }
    componentDidMount() {
      this.findWorks();
    }
    searchKeyChangeHandler(searchKey) {
        this.setState({searchKey: searchKey, page: 1}, this.findWorks);
    }

    rangeChangeHandler(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findWorks);
    }

    findWorks() {
        this.props.getWorks({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
    }

    nextPageHandler() {
        let p = this.state.page + 1;
        this.setState({page: p}, this.findWorks);
    }

    prevPageHandler() {
        let p = this.state.page - 1;
        this.setState({page: p}, this.findWorks);
    }


  render() {
    const {works} = this.props;
    return(
      <div>
        <section className="section">
          <div className="columns">
            <div className="column is-three-quarters">
              <SearchBar searchKey={this.state.searchKey} onChange={this.searchKeyChangeHandler.bind(this)}/>
            </div>
            <div className="column is-on-quarter">
              <WorkFormContainer/>
                          </div>
          </div>
                  </section>

                <section className='section'>
                  <Paginator page={works.page} pageSize={works.pageSize} total={works.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>
                </section>
                <WorkList works={works.items} total={works.total} onDeleteWork={this.props.deleteWork} />

      </div>
    )
  }
}
var mapStateToProps = function(appState){
  return {
    works: appState.works
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getWorks: function(values){ dispatch(workActions.getWorks(values)); },
    deleteWork: function(id){ dispatch(workActions.deleteWork(id)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkListContainer);
