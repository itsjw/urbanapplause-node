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
              <h3 className="title is-4"><a href={`/artists/${work.artist_id}`}>{work.artist}</a> in {work.city}</h3>
              <span className='subtitle is-5'>{work.formatted_address}</span>
            </div>
          </div>

          <div className='content'>
            <p>{work.description}</p><hr />
            <div className='columns'>
              <div className='column'>
                Posted {timeSince(new Date(work.date_posted))} ago
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
