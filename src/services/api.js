import http from '../utils/http';

/**
 * Send appropriate axios request to get list of item ids.
 *
 * @param {String} type Determine request for top, best or new story.
 */
const getList = type => {
  return http.get(type + '.json');
};

/**
 * Send appropriate axios request to get specific item.
 *
 * @param {Number} id Id of the item to get.
 */
const getItem = id => {
  return http.get(`item/${id}.json`);
};

export default { getList, getItem };
