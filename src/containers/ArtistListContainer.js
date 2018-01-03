import React, { Component } from 'react';
import ArtistList from '../components/ArtistList';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';
import RangeSlider from '../components/RangeSlider';
import ArtistFormContainer from './ArtistFormContainer';
import ArtistProfileContainer from './ArtistProfileContainer';
import artistActions from '../actions/artists';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class ArtistListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            min: 0,
            max: 30,
            artists: [],
            total: 0,
            page: 1
        }
    }
  componentDidMount() {
      this.findArtists();
    }
    searchKeyChangeHandler(searchKey) {
        this.setState({searchKey: searchKey, page: 1}, this.findArtists);
    }

    rangeChangeHandler(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findArtists);
    }

  findArtists() {
        this.props.getArtists({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
    }

    nextPageHandler() {
        let p = this.state.page + 1;
        this.setState({page: p}, this.findArtists);
    }

    prevPageHandler() {
        let p = this.state.page - 1;
        this.setState({page: p}, this.findArtists);
    }


  render() {
    const {artists} = this.props;
    return(
      <div>
        <Switch>
          <Route exact path='/artists'>
            <div>
              <section className="section">
                <div className='columns'>
                  <div className='column'>

                <SearchBar searchKey={this.state.searchKey} onChange={this.searchKeyChangeHandler.bind(this)} placeholder="Search for an artist by name"/>
              </div>
      <div className='column is-narrow'>
              <a className='button is-primary' href='/artists/new'>+ Add Artist</a>
            </div>
          </div>
              </section>

              <section className='section'>
                <Paginator page={artists.page} pageSize={artists.pageSize} total={artists.total} onPrevious={this.prevPageHandler.bind(this)} onNext={this.nextPageHandler.bind(this)}/>
              </section>
              <ArtistList
                artists={artists.items}
                total={artists.total}
                hasreceiveddata={artists.hasreceiveddata}/>
            </div>
          </Route>
          <Route path='/artists/:artist_id' render={(match) => {
            return <ArtistProfileContainer id={match.match.params.artist_id} />
            }} />
        </Switch>
      </div>
    )
  }
}
var mapStateToProps = function(appState){
  return {
    artists: appState.artists,
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    getArtists: function(values){ dispatch(artistActions.getArtists(values)); },
    getArtist: function(id){ dispatch(artistActions.findById(id)); },
    deleteArtist: function(id){ dispatch(artistActions.deleteArtist(id)); }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtistListContainer);
