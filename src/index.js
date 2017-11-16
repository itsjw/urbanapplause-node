import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import Header from './components/Header';
import Footer from './components/Footer';


import WorkListContainer from './containers/WorkListContainer';
import ArtistListContainer from './containers/ArtistListContainer';
import ArtistProfileContainer from './containers/ArtistProfileContainer';
import WorkFormContainer from './containers/WorkFormContainer';
import ArtistFormContainer from './containers/ArtistFormContainer';

import './sass/main.scss';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app-container">
            <div className="wrapper container" id="wrapper">
              <Header text="Urban Applause"/>
              <Switch>
                <Route exact path='/' render={() =>
                    (<Redirect to='/works'/>)
                   }/>
                 <Route exact path='/works' component={WorkListContainer}/>
                 <Route exact path='/works/new' component={WorkFormContainer}/>
                 <Route exact path='/artists' component={ArtistListContainer}/>

                 <Route exact path='/artists/new' component={ArtistFormContainer}/>
                 <Route path='/artists/:id' render={(match) => <ArtistProfileContainer id={match.match.params.id} />} />
               </Switch>
             </div>
            </div>
        </BrowserRouter>
      </Provider>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("root"));

