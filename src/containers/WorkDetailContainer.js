
import React, { Component } from 'react';
import WorkDetail from '../components/WorkDetail';

import WorkEditForm from '../components/WorkEditForm';
import workActions from '../actions/works';
import {connect} from 'react-redux';

class WorkDetailContainer  extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  componentDidMount(){
    console.log('param, ', this.props.match.params.id);
    this.props.getWork(this.props.match.params.id);
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
          <WorkEditForm work={this.props.work} onSubmit={this.handleUpdate} onCancel={this.closeForm}/>
        </div>);
    } else {
      return (
          <WorkDetail work={this.props.work}/>
      )
    }
  }
}

var mapStateToProps = function(appState){
  return {
    work: appState.works.selectedWork.work,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getWork: function(id){ dispatch(workActions.findById(id)); },
    getWorks: function(work_id) {dispatch(workActions.findWorksForWork(work_id));},
    onUpdate: function(id, content){ dispatch(workActions.submitWorkEdit(id, content)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkDetailContainer);
