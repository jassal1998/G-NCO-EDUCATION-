import axios from 'axios';
import { BASE_URL } from './baseurl';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mobile',
  },
});

export default api;