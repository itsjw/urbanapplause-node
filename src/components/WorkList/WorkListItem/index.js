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
            <p>{work.description}</p>
          </div>
        </div>
        <div className='card-footer'>
          <div className='card-footer-item '>
            Posted {timeSince(new Date(work.date_posted))} ago
          </div>
          <div className='card-footer-item'>
              <p className='control' onClick={this.handleDelete}>
                  <a className={` button is-danger`}>
                    <span className="icon is-small">
                      <Icon name="trash"/>
                    </span>
                    <span>Trash</span>
                  </a>
                </p>
                <p className='control' onClick={this.handleEdit}>
                  <a className={` button is-success`}>
                    <span className="icon is-small">
                      <Icon name="edit"/>
                    </span>
                    <span>Edit</span>
                  </a>
                </p>

          </div>
        </div>
      </div>

    )
  }
}

export default PostPreview;
