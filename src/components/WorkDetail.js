import React, { Component } from 'react';

class WorkDetail extends Component {
  render() {
    const work = this.props.work;
    return(
      <div>
       <h3 className='title is-3'>Artist</h3>
        {work.artist}
        <img src={work.image}/>
       <h3 className='title is-3'>Description</h3>
       {work.description}
      <h3 className='title is-3'>Posted By</h3>
        {work.username}
      </div>
    )
  }
}

export default WorkDetail;
