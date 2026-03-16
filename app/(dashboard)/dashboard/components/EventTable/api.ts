import axios from 'axios';

const eventApi = axios.create({
  baseURL: 'https://jayone-87f0a69e6159.herokuapp.com',
});

export default eventApi;
