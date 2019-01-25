import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Comment from './Comment';
import api from '../services/api';
import timeElapsed from '../utils/time';

/**
 * Display all the details and comments of the story.
 */
class Story extends React.Component {
  /**
   * Creates an instance of Comments.
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      storyId: props.match.params.id,
      notFound: false
    };
  }

  fetchStory = () => {
    if (this.state.story && this.state.story > 0) {
      return;
    }

    api.getItem(this.state.storyId).then(response => {
      if (response.data === null) {
        this.setState({ notFound: true });

        return;
      }

      this.setState({
        story: response.data
      });
    });
  };

  displayContent = () => {
    if (this.state.notFound) {
      return <div>404 No such link found! Check the address</div>;
    }

    if (!this.state.story) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h2 className="story-heading">
          <a href={this.state.story.url}>{this.state.story.title}</a>
        </h2>
        <span className="story-detail">{`by ${this.state.story.by} ${
          this.state.story.score
        } points ${this.state.story.descendants} comments ${timeElapsed(
          Math.ceil(this.state.story.time / 100)
        )}`}</span>
      </div>
    );
  };

  componentDidMount = () => {
    this.fetchStory();
  };

  /**
   * Render the component.
   */
  render() {
    const display = this.displayContent();

    return (
      <React.Fragment>
        {display}
        <div className="comment-section">
          {this.state.story && this.state.story.kids ? (
            this.state.story.kids.map(comment => {
              return <Comment commentId={comment} key={comment} />;
            })
          ) : (
            <div className="comment-main">No Comments</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Story);

Story.propTypes = {
  match: PropTypes.object.isRequired
};
