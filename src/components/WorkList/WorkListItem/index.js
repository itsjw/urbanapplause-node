import React, { Component } from 'react';

class PostPreview extends Component {
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
        </div>
      </div>

    )
  }
}

export default PostPreview;
