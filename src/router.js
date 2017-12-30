import React from 'react';

import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';

import {Router, Route, Redirect, Switch} from 'react-router-dom';

import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';

import WorkListContainer from './containers/WorkListContainer';
import WorkDetailContainer from './containers/WorkDetailContainer';
import WorkFormContainer from './containers/WorkFormContainer';
import BulkPostContainer from './containers/BulkPostContainer';

import BulkEditContainer from './containers/BulkEditContainer';
import ArtistListContainer from './containers/ArtistListContainer';
import ArtistProfileContainer from './containers/ArtistProfileContainer';
import ArtistFormContainer from './containers/ArtistFormContainer';

import UserListContainer from './containers/UserListContainer';
import UserProfileContainer from './containers/UserProfileContainer';

import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage from './pages/ContactPage';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export const router =
  (
    <Router history={history}>
      <div className="app-container">
        <div className="wrapper container" id="wrapper">

            <Route path='/:currentRoute' component={HeaderContainer}/>
          <Switch>
            <Route exact path='/' render={() =>
                (<Redirect to='/works'/>)
            }/>

            <Route exact path='/register' component={RegisterContainer}/>
            <Route exact path='/signin' component={LoginContainer}/>

            <Route exact path='/works' component={WorkListContainer}/>
            <Route exact path='/works/new' component={WorkFormContainer}/>
            <Route exact path='/works/bulk-add' component={BulkPostContainer}/>

             <Route exact path='/works/bulk-edit' component={BulkEditContainer}/>
             <Route exact path='/works/:id' component={WorkDetailContainer}/>

             <Route exact path='/users' component={UserListContainer}/>
             <Route exact path='/users/:id' component={UserProfileContainer}/>

             <Route exact path='/artists' component={ArtistListContainer}/>
             <Route exact path='/artists/new' component={ArtistFormContainer}/>

             <Route exact path='/artists/:id' component={ArtistProfileContainer}/>

             <Route exact path='/about' component={AboutPage}/>
             <Route exact path='/contact' component={ContactPage}/>
             <Route path='/' component={ErrorPage}/>
           </Switch>
         </div>
        <Footer />
        </div>
      </Router>
    )

