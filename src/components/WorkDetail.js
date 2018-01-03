import React, { Component } from 'react';
import C from '../constants';

class WorkDetail extends Component {
  render() {
    const work = this.props.work;
    return(
      <div>
       <h3 className='title is-3'>Artist</h3>
       <a href={`/artists/${work.artist_id}`}>{work.artist}</a>

       <h3 className='title is-3'>Photo</h3>
       <img src={`${C.SERVER_URL}/${C.UPLOADS_SUBPATH}/${work.image}`}/>
       <h3 className='title is-3'>Description</h3>
       {work.description}
       <h3 className='title is-3'>Posted By</h3>
       <a href={`/users/${work.user_id}`}>{work.username}</a>

       <h3 className='title is-3'>Posted On</h3>
       {new Date(work.date_posted).toString()}
      </div>
    )
  }
}

export default WorkDetail;
