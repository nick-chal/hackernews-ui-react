import http from '../utils/http';

/**
 * Send appropriate axios request based on the type.
 *
 * @param {String} type Determine request for stories list, story or comment.
 * @param {Number} [id=null]
 */
const request = (type, id = null) => {
  if (!id) {
    return http.get(type + '.json');
  }

  return http.get(`item/${id}.json`);
};

export default request;
