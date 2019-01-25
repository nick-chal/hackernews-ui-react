import axios from 'axios';

const http = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

export default http;
