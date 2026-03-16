import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jayone-87f0a69e6159.herokuapp.com/api',
});

export default api;
