import React, { Component } from 'react';
import WorkList from '../components/WorkList';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import RangeSlider from '../components/RangeSlider';
import WorksMapView from '../components/WorksMapView';
import WorkFormContainer from './WorkFormContainer';
import workActions from '../actions/works';
import {connect} from 'react-redux';
import {Icon} from 'react-fa';

class WorkListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchKey: '',
          min: 0,
          max: 30,
          works: [],
          total: 0,
          page: 1,
          mapView:false
        };
    }
    componentDidMount() {
      this.findWorks();
    }
  searchKeyChangeHandler(searchKey) {
    console.log(searchKey);
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
    const {works} = this.props;
    return(
      <div>
        <section className="section">
          <div className='columns'>

            <div className='column'>
              <SearchBar searchKey={this.state.searchKey} onChange={this.searchKeyChangeHandler.bind(this)}/>
            </div>

            <div className='column is-narrow'>
              <div className='field has-addons'>
                <span className='control' onClick={this.closeMap}>
                  <a className={`button is-primary ${(this.state.mapView==false)?"is-active":"is-outlined"}`}>
                    <span className="icon is-small">
                      <Icon name="list"/>
                    </span>
                    <span>List</span>
                  </a>
                </span>
                <span className='control' onClick={this.openMap} style={{height: '36px'}}>
                  <a className={`button is-primary ${(this.state.mapView==true)?"is-active":"is-outlined"}`}>
                    <span className="icon is-small">
                      <Icon name="map-marker"/>
                    </span>
                    <span>Map</span>
                  </a>
                </span>
              </div>
            </div>


            {(this.props.auth.currently=="LOGGED_IN")?
      <div className='column is-narrow'>
              <a className='button is-primary' href="/works/new">+ New Work</a>
            </div>:''}
          </div>
        </section>

        <section className='section'>
          <Paginator page={works.page} pageSize={works.pageSize} total={works.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>
        </section>
        {(this.state.mapView==true)?
            <WorksMapView works={works.items} total={works.total} onDeleteWork={this.props.deleteWork} />:
            <WorkList works={works.items} total={works.total} onDeleteWork={this.props.deleteWork} />}
        <Paginator page={works.page} pageSize={works.pageSize} total={works.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>

      </div>
    )
  }
}
var mapStateToProps = function(appState){
  return {
    works: appState.works,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getWorks: function(values){ dispatch(workActions.getWorks(values)); },
    deleteWork: function(id){ dispatch(workActions.deleteWork(id)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkListContainer);
