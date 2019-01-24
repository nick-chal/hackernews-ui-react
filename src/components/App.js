import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';

import '../assets/css/style';

import Story from './Story';
import Navbar from './Navbar';
import StoryList from './StoryList';
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
            <Route exact path={ROUTES.TOP} component={() => <StoryList />} />
            <Route exact path={ROUTES.NEW} component={() => <StoryList />} />
            <Route exact path={ROUTES.BEST} component={() => <StoryList />} />
            <Route exact path="/:id" component={() => <Story />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
