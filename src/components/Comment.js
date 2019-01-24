import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import timeElapsed from '../utils/time';
/**
 * Display comment.
 */
class Comment extends React.Component {
  /**
   * Creates an instance of Comment.
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      kids: [],
      commentId: props.commentId
    };
  }

  fetchComment = () => {
    if (this.state.comment && this.state.comment > 0) {
      return;
    }

    api.getItem(this.state.commentId).then(response => {
      this.setState({
        comment: response.data
      });
    });
  };

  displayContent = () => {
    if (!this.state.comment) {
      return <div>Loading</div>;
    }

    return (
      <div className="comment">
        <div className="comment-body">
          <div>
            <h4>{this.state.comment.by}</h4>
            <span className="story-detail">
              {timeElapsed(Math.floor(this.state.comment.time / 100))}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: this.state.comment.text }} />
        </div>
        <div className="comment-sub">
          {this.state.comment.kids && this.state.comment.kids.length > 0
            ? this.state.comment.kids.map((value, index) => (
                <Comment commentId={value} key={`${value.id}${index}`} />
              ))
            : null}
        </div>
      </div>
    );
  };

  componentDidMount = () => {
    this.fetchComment();
  };

  /**
   * Render the comment.
   *
   */
  render = () => {
    const display = this.displayContent();

    return display;
  };
}

export default Comment;

Comment.propTypes = {
  commentId: PropTypes.number.isRequired
};
