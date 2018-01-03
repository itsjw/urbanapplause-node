import React from 'react';
import ArtistListItem from './ArtistListItem';

class ArtistList extends React.Component {
  render() {
        let listItems = this.props.artists.map(artist =>
          <ArtistListItem key={artist.id} artist={artist} onSearchKeyChange={this.props.onSearchKeyChange}/>
        );

        if (this.props.hasreceiveddata==true) {
          return (
            <div>
              {(this.props.artists.length>0)?listItems:<span><strong>No results. Broaden your search to find matches. </strong></span>}
                  {listItems}
              </div>
          );
        } else {
          return (<div className='worklist-container'>Loading...</div>)
        }

    }
};

export default ArtistList;
