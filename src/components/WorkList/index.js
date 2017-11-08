import React from 'react';
import WorkListItem from './WorkListItem';

class WorkList extends React.Component {
  render() {
        let listItems = this.props.works.map(work =>
            <WorkListItem key={work.id} work={work} onSearchKeyChange={this.props.onSearchKeyChange}/>
        );
        return (
            <div className="">
                {listItems}
            </div>
        );
    }
};

export default WorkList;
