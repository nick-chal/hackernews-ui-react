import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import api from '../services/api';
import constant from '../constants/data';

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
  gotToPreviousPage = () => {
    if (this.state.currentPage === 0) {
      return;
    }
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1
    }));
  };

  /**
   * Goto next page.
   */
  gotToNextPage = () => {
    if (this.state.currentPage < constant.TOTALPAGES) {
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
        <ul className="stories-list">
          {this.state.stories && this.state.stories.length > 0 ? (
            this.state.stories.map((value, index) =>
              value && index >= this.start && index < this.end ? (
                <li className="story" key={value.id}>
                  <a href={value.url}>{`${value.title}`}</a> <br />
                  <span>{`-(${value.by})   score: ${value.score}`}</span>
                </li>
              ) : null
            )
          ) : (
            <div className="no-items"> {'Loading...'}</div>
          )}
        </ul>
        <div>
          <button onClick={this.gotToPreviousPage}>P</button>
          <span>
            {this.state.currentPage + 1}
            <button onClick={this.gotToNextPage}>N</button>
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Stories);

Stories.propTypes = {
  location: PropTypes.object.isRequired
};
