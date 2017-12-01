import React from 'react';
import WorkListItem from './WorkListItem';

class WorkList extends React.Component {
  render() {
        let listItems = this.props.works.map(work =>
            <WorkListItem key={work.id} work={work} onSearchKeyChange={this.props.onSearchKeyChange} onDelete={this.props.onDeleteWork}/>
        );
        if (this.props.hasreceiveddata==true) {
        return (
            <div className="worklist-container">
              {(this.props.works.length>0)?listItems:<span><strong>No results. Broaden your search to find matches. </strong></span>}
            </div>
        );
        } else {
          return (<div className='worklist-container'>Loading...</div>)
        }
    }
};

export default WorkList;
