import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL de ton backend Flask
  headers: {
    'Content-Type': 'application/json'
  }
});


export default api;
