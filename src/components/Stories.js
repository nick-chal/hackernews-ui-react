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
   * Change the page number.
   *
   * @param {Number} value
   */
  pageHandler = value => {
    if (
      (this.state.currentPage === 0 && value === -1) ||
      (this.state.currentPage === 4 && value === 1)
    ) {
      return;
    }
    this.setState(prevState => ({
      currentPage: prevState.currentPage + value
    }));
  };

  /**
   * Load the storiesId and update StoriesIDList.
   */
  updateStoriesList = () => {
    if (this.state.storiesIdList && this.state.storiesIdList.length > 1) {
      this.loadStories();

      return;
    }
    api(this.state.storyType)
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
      api('story', this.state.storiesIdList[i]).then(story => {
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
              index >= this.start && index < this.end ? (
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
          <button
            onClick={() => {
              this.pageHandler(-1);
            }}
          >
            P
          </button>
          <span>
            {this.state.currentPage + 1}
            <button
              onClick={() => {
                this.pageHandler(1);
              }}
            >
              N
            </button>
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
