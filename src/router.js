
import React from 'react';

import HeaderContainer from './containers/HeaderContainer';
import Footer from './components/Footer';


import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import ContactPage from './pages/ContactPage';

import WorkListContainer from './containers/WorkListContainer';
import ArtistListContainer from './containers/ArtistListContainer';
import WorkFormContainer from './containers/WorkFormContainer';
import ArtistFormContainer from './containers/ArtistFormContainer';
import ArtistProfileContainer from './containers/ArtistProfileContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import UserListContainer from './containers/UserListContainer';

export const router =
  (<BrowserRouter>
          <div className="app-container">
            <div className="wrapper container" id="wrapper">
              <HeaderContainer/>
              <Switch>
                <Route exact path='/' render={() =>
                    (<Redirect to='/works'/>)
                   }/>
                 <Route exact path='/works' component={WorkListContainer}/>
                 <Route exact path='/works/new' component={WorkFormContainer}/>

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
        </BrowserRouter>)

