import React, { Component } from 'react';
import {timeSince} from '../../../services/utils';

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
              <h3 className="title is-4">{work.artist}in {work.city}</h3>
            </div>
          </div>

          <div className='content'>
            Posted {timeSince(new Date(work.date_posted))} ago <button className='button is-danger' onClick={this.handleDelete}>Delete</button>
          </div>

        </div>
      </div>

    )
  }
}

export default PostPreview;
