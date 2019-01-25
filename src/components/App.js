import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import '../assets/style';

import Navbar from './Navbar';
import Stories from './Stories';
import ROUTES from '../constants/routes';

/**
 * The main container of the app.
 */
class App extends Component {
  /**
   * Return the main container JSX.
   */
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to={ROUTES.TOP} />} />
            <Route exact path={ROUTES.TOP} component={() => <Stories />} />
            <Route exact path={ROUTES.NEW} component={() => <Stories />} />
            <Route exact path={ROUTES.BEST} component={() => <Stories />} />
            <Route path="/" render={() => <div>404 Invalid URL </div>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
