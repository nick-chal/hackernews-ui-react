import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import api from '../services/api';
import constant from '../constants/data';
import timeElapsed from '../utils/time';

/**
 * The main page showing all the top stories.
 */
class Stories extends React.Component {
  /**
   * Creates the instance of Home.
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      storyType: props.location.pathname,
      storiesIdList: [],
      stories: [],
      currentPage: 0
    };
  }

  /**
   * Goto previous page.
   */
  goToPreviousPage = () => {
    if (this.state.currentPage <= 0) {
      return;
    }
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1
    }));
  };

  /**
   * Goto next page.
   */
  goToNextPage = () => {
    if (this.state.currentPage >= constant.TOTALPAGES - 1) {
      return;
    }
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }));
  };
  /**
   * Load the storiesId and update StoriesIDList.
   */
  updateStoriesList = () => {
    if (this.state.storiesIdList && this.state.storiesIdList.length > 0) {
      this.loadStories();

      return;
    }
    api
      .getList(this.state.storyType)
      .then(storiesList => {
        this.setState({ storiesIdList: storiesList.data }, this.loadStories);
      })
      .catch(err => this.setState({ err: err }));
  };

  /**
   * Load individual stories from storiesIDList.
   *
   */
  loadStories = () => {
    if (this.state.stories && this.state.stories.length > this.end) {
      return;
    }
    for (let i = this.start; i < this.end; i++) {
      api.getItem(this.state.storiesIdList[i]).then(story => {
        this.setState({ stories: [...this.state.stories, story.data] });
      });
    }
  };

  displayStories = () => {
    const result = this.state.stories.map((value, index) =>
      value && index >= this.start && index < this.end ? (
        <Link to={`/${value.id}`} key={value.id}>
          <li className="story">
            <p>{`${value.title}`}</p>
            <span className="story-detail">{`-by ${value.by} | ${
              value.score
            } points | ${value.descendants} comments | ${timeElapsed(
              Math.floor(value.time / 100)
            )}`}</span>
          </li>
        </Link>
      ) : null
    );

    return result;
  };

  /**
   * Called after the component is mounted in dom.
   */
  componentDidMount = () => {
    this.updateStoriesList();
  };

  /**
   * Update the shown after changing page.
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.currentPage !== this.state.currentPage) {
      this.updateStoriesList();
    }
  };

  /**
   * Renders the Home content.
   */
  render() {
    this.start = this.state.currentPage * constant.STORYPERPAGE;
    this.end = this.start + constant.STORYPERPAGE;

    return (
      <div>
        <div>
          <button onClick={this.goToPreviousPage}>{'<'}</button>
          <span>
            {this.state.currentPage + 1}
            <button onClick={this.goToNextPage}>{'>'}</button>
          </span>
        </div>
        <ul className="stories-list">
          {this.state.stories && this.state.stories.length > this.start ? (
            this.displayStories()
          ) : (
            <div className="no-items"> {'Loading...'}</div>
          )}
        </ul>
      </div>
    );
  }
}

export default withRouter(Stories);

Stories.propTypes = {
  location: PropTypes.object.isRequired
};
