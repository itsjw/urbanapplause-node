import React from 'react';
import ArtistListItem from './ArtistListItem';

class ArtistList extends React.Component {
  render() {
        let listItems = this.props.artists.map(artist =>
          <ArtistListItem key={artist.id} artist={artist} onSearchKeyChange={this.props.onSearchKeyChange}/>
        );
        return (
            <div className="">
                {listItems}
            </div>
        );
    }
};

export default ArtistList;
