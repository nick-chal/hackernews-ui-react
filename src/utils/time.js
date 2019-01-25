/**
 * Find the time elapsed after certain time.
 *
 * @param {Number} thenTimeUnix
 */
const timeElapsed = thenTimeUnix => {
  const then = thenTimeUnix * 100000;
  const now = Date.now();

  const diff = (now - then) / 1000 / 60;

  const yearDiff = Math.floor(diff / 60 / 24 / 365);
  const monthDiff = Math.floor(diff / 60 / 24 / 30);
  const dateDiff = Math.floor(diff / 60 / 24);
  const hourDiff = Math.floor(diff / 60);
  const minuteDiff = Math.floor(diff);

  if (yearDiff > 0) {
    return `${yearDiff} years ago`;
  }

  if (monthDiff > 0) {
    return `${monthDiff} months ago`;
  }

  if (dateDiff > 0) {
    return `${dateDiff} days ago`;
  }

  if (hourDiff > 0) {
    return `${hourDiff} hours ago`;
  }

  return `${minuteDiff} minutes ago`;
};

export default timeElapsed;
