import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {router} from './router';


import './sass/main.scss';

class App extends React.Component {


render() {
  const { children } = this.props
    return (
      <Provider store={store}>
        <div>{children}</div>
      </Provider>
        );
    }
};

ReactDOM.render(<App> {router} </App>, document.getElementById("root"));

