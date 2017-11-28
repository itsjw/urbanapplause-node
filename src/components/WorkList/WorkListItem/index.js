import React, { Component } from 'react';
import {timeSince} from '../../../services/utils';
import {Icon} from 'react-fa';

class PostPreview extends Component {
  handleDelete = () => {
    this.props.onDelete(this.props.work.id);
  }
  render() {
    const work  = this.props.work;
    return(
      <div className="card">
        <div className='card-image'>
          <img src={work.image}/>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <h3 className="title is-4" style={{marginBottom: '0px'}}>
                {(work.artist_id==0)?
                  'Unknown Artist ':
                  <a href={`/artists/${work.artist_id}`}>{work.artist} </a>}
                  in {work.city}
                </h3>
              <small className='subtitle is-5'><span className='icon'><Icon name='map-marker'/> </span>{work.formatted_address}</small>
            </div>
          </div>

          <div className='content'>
            <p>{work.description}</p>
            <a href={`/works/${work.id}`} className='buton is-info'>View Details</a><hr />
            <div className='columns'>
              <div className='column'>
                Posted {timeSince(new Date(work.date_posted))} ago by <a href={`/users/${work.user_id}`}>{work.username}</a>
              </div>
              <div className='column is-narrow'>
                      <span onClick={this.handleDelete} className="icon is-medium action-icon">
                        <Icon name="trash"/>
                      </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default PostPreview;
