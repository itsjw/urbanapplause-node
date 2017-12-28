import React from 'react';

class WorkGallery extends React.Component {
  render() {

    let listItems = this.props.works.map(work =>
      <div className='tile is-4'>
        <a href={`/works/${work.id}`}>
          <figure className="image is-4by3">
            <img src={work.image}/>
          </figure>
        </a>
      </div>
        );
        if (this.props.hasreceiveddata==true) {
        return (
            <div className="tile is-ancestor">
              {(this.props.works.length>0)?listItems:<span><strong>No results for this artist. </strong></span>}
            </div>
        );
        } else {
          return (<div className='worklist-container'>Loading...</div>)
        }
    }
};

export default WorkGallery;
